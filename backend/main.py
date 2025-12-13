from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import numpy as np
from sklearn.neighbors import NearestNeighbors
import os
import io
import pickle

# TensorFlow / Keras Imports
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.applications.resnet50 import preprocess_input
from PIL import Image

# 1. Define the Custom Layer needed for the Model
@tf.keras.utils.register_keras_serializable()
class L2Normalize(tf.keras.layers.Layer):
    def __init__(self, **kwargs):
        super(L2Normalize, self).__init__(**kwargs)

    def call(self, inputs):
        return tf.math.l2_normalize(inputs, axis=1)
        
    def get_config(self):
        return super().get_config()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
data = {}
nn_model = None
encoder_model = None
tokenizer = None
MAX_SEQ_LENGTH = 20 

@app.on_event("startup")
async def load_data():
    global data, nn_model, encoder_model, tokenizer
    print("Loading system files...")
    
    base_path = "./model_files"
    
    try:
        # 1. Load Data Files
        print("Loading numpy arrays...")
        data["embeddings"] = np.load(f"{base_path}/embeddings_norm.npy")
        data["titles"] = np.load(f"{base_path}/titles.npy", allow_pickle=True)
        data["image_paths"] = np.load(f"{base_path}/image_paths.npy", allow_pickle=True)
        
        # 2. Fit Nearest Neighbors
        print("Fitting Nearest Neighbors...")
        nn_model = NearestNeighbors(n_neighbors=6, metric='cosine', algorithm='brute')
        nn_model.fit(data["embeddings"])
        
        # 3. Load Keras Model with Custom Objects
        print("Loading Keras Model...")
        model_path = f"{base_path}/ProductEncoder.keras"
        if not os.path.exists(model_path):
             model_path = f"{base_path}/ProductEncoder.h5"
        
        encoder_model = tf.keras.models.load_model(
            model_path, 
            custom_objects={'L2Normalize': L2Normalize}
        )
        
        # 4. Load Tokenizer
        print("Loading Tokenizer...")
        with open(f"{base_path}/tokenizer.pkl", 'rb') as handle:
            tokenizer = pickle.load(handle)

        print("System Online: Ready for inference.")
        
    except Exception as e:
        print(f"CRITICAL ERROR during startup: {e}")

if os.path.exists("./images"):
    app.mount("/images", StaticFiles(directory="./images"), name="images")

def process_image(image_bytes):
    """Resizes and preprocesses image for ResNet50"""
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def process_text(text_input):
    """Tokenizes and pads text"""
    if tokenizer is None:
        raise ValueError("Tokenizer failed to load on startup.")
        
    seq = tokenizer.texts_to_sequences([text_input])
    padded = pad_sequences(seq, maxlen=MAX_SEQ_LENGTH)
    return padded

@app.get("/products")
def get_random_products(limit: int = 10):
    import random
    if "titles" not in data:
        raise HTTPException(status_code=500, detail="Data not loaded")
        
    total_items = len(data["titles"])
    random_indices = random.sample(range(total_items), limit)
    
    results = []
    for idx in random_indices:
        img_filename = os.path.basename(str(data['image_paths'][idx]))
        results.append({
            "id": int(idx),
            "title": str(data["titles"][idx]),
            "image": f"http://localhost:8000/images/{img_filename}"
        })
    return results

@app.post("/search")
async def search(text: str = Form(...), image: UploadFile = File(...)):
    """
    Multimodal Search: Takes Text + Image -> Returns Similar Products
    """
    if encoder_model is None or nn_model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        # 1. Preprocess Inputs
        image_content = await image.read()
        processed_img = process_image(image_content) # Shape: (1, 224, 224, 3)
        processed_text = process_text(text)          # Shape: (1, 100)
        
        # 2. Generate Embedding
        # FIXED HERE: Swapped order to [Image, Text]
        embedding = encoder_model.predict([processed_img, processed_text], verbose=0)
        
        # 3. Find Neighbors
        distances, indices = nn_model.kneighbors(embedding)
        
        # 4. Format Results
        results = []
        for i in range(len(indices[0])):
            idx = indices[0][i]
            dist = distances[0][i]
            
            img_filename = os.path.basename(str(data['image_paths'][idx]))
            
            results.append({
                "id": int(idx),
                "title": str(data["titles"][idx]),
                "image": f"http://localhost:8000/images/{img_filename}",
                "score": float(1 - dist)
            })
            
        return {"results": results}

    except Exception as e:
        print(f"Search Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))