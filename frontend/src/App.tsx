import { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";
import DatasetInfo from "./components/DatasetInfo";
import SystemLoad from "./components/SystemLoad";
import ArchitectureViz from "./components/ArchitectureViz";
import {
  Image as ImageIcon,
  UploadCloud,
  ArrowRight,
  Maximize2,
  AlertTriangle,
  X,
  Check,
} from "lucide-react";

// --- Sub-components ---

const ProductCard = ({
  title,
  score,
  img,
}: {
  title: string;
  score: number;
  img: string;
}) => (
  <div className="bg-slate-900/80 border border-slate-800 rounded overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer">
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
      />
      <div className="absolute top-2 right-2 bg-slate-950/90 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
        SIM: {score}%
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </div>
    <div className="p-3 border-t border-slate-800">
      <h3 className="text-cyan-100 text-xs font-mono truncate">{title}</h3>
      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
        <span>ID_8473</span>
        <span className="text-green-500">MATCH_FOUND</span>
      </div>
    </div>
  </div>
);

const Recommender = () => {
  // State for unified inputs
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSearch = () => {
    // 1. Reset previous errors
    setError(null);

    // 2. Validation Logic
    if (!inputText.trim() && !selectedImage) {
      setError("CRITICAL_ERROR: MISSING_ALL_INPUT_PARAMETERS");
      return;
    }
    if (!inputText.trim()) {
      setError("INPUT_ERROR: TEXT_DESCRIPTION_REQUIRED");
      return;
    }
    if (!selectedImage) {
      setError("INPUT_ERROR: REFERENCE_IMAGE_REQUIRED");
      return;
    }

    // 3. Proceed if valid
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasSearched(true);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-6">
      {/* Dashboard Top Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <ArchitectureViz />
        </div>
        <div className="flex items-center justify-center xl:justify-start h-full">
          <SystemLoad />
        </div>
      </div>

      {/* Unified Input Section */}
      <div className="w-full max-w-5xl mx-auto mb-10">
        {/* Input Container */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>

          <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
              <h3 className="text-cyan-400 font-mono text-xs font-bold tracking-widest">
                QUERY_PARAMETERS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Text Input Area */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>01. PRODUCT_DESCRIPTION</span>
                  {inputText.length > 0 && (
                    <Check size={12} className="text-green-500" />
                  )}
                </label>
                <div
                  className={`flex items-start gap-3 bg-slate-900/50 border rounded-lg p-4 h-32 transition-all ${
                    !inputText && error
                      ? "border-red-500/50 bg-red-900/10"
                      : "border-slate-800 focus-within:border-cyan-500/50"
                  }`}
                >
                  {/* FIXED: Changed size to text-sm, added bold, adjusted padding to align perfectly */}
                  <span className="text-cyan-500 font-mono text-sm font-bold pt-0.5">
                    &gt;
                  </span>
                  <textarea
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter detailed product attributes (e.g. 'Red floral summer dress with short sleeves')..."
                    className="bg-transparent border-none outline-none text-slate-200 w-full h-full font-mono text-sm placeholder:text-slate-700 resize-none custom-scrollbar"
                  />
                </div>
              </div>

              {/* 2. Image Upload Area */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>02. REFERENCE_IMAGE</span>
                  {selectedImage && (
                    <Check size={12} className="text-green-500" />
                  )}
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {selectedImage ? (
                  <div className="relative h-32 bg-slate-900/50 border border-cyan-500/30 rounded-lg overflow-hidden group/image">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-full object-cover opacity-60 group-hover/image:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/50 px-3 py-1 rounded text-xs font-mono flex items-center gap-2 backdrop-blur-sm"
                      >
                        <X size={12} /> REMOVE
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-500 transition-all cursor-pointer bg-slate-900/30
                          ${
                            error && !selectedImage
                              ? "border-red-500/40 bg-red-900/5 text-red-400"
                              : "border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-900/5"
                          }
                        `}
                  >
                    <UploadCloud size={24} className="mb-2" />
                    <span className="text-xs font-mono">
                      DRAG_DROP OR CLICK_TO_UPLOAD
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-2 border-t border-slate-800/50 gap-4">
              {/* Error Console */}
              <div className="flex-1 w-full md:w-auto h-8 flex items-center">
                {error && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20 text-xs font-mono animate-in slide-in-from-left-2 fade-in">
                    <AlertTriangle size={12} />
                    <span className="font-bold">{error}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full md:w-auto bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/50 px-8 py-2.5 rounded text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                {loading ? (
                  "PROCESSING_TENSORS..."
                ) : (
                  <>
                    INITIATE_SEQUENCE <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Terminal */}
      {(hasSearched || loading) && (
        <div className="border border-slate-800 bg-slate-950/80 rounded-lg overflow-hidden flex flex-col animate-in fade-in duration-500">
          <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <span className="text-xs text-cyan-500 font-mono flex items-center gap-2">
              <Maximize2 size={12} /> OUTPUT_CONSOLE
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              EXEC_TIME: 420ms
            </span>
          </div>

          <div className="p-6 min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 gap-4">
                <div className="font-mono text-cyan-400 text-sm animate-pulse">
                  &gt; FUSING TEXT_EMBEDDINGS + IMAGE_VECTORS...
                </div>
                <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 animate-[loading_1s_ease-in-out_infinite] w-1/3"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ProductCard
                  title="Floral_Summer_Dress_v2"
                  score={98.4}
                  img="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400"
                />
                <ProductCard
                  title="Red_Casual_Midi_01"
                  score={85.1}
                  img="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400"
                />
                <ProductCard
                  title="Vintage_Print_Y7"
                  score={72.0}
                  img="https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80&w=400"
                />
                <ProductCard
                  title="Evening_Gown_Red"
                  score={64.2}
                  img="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=400"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Layout ---

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="w-screen h-screen flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      {/* 1. Global Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] scanline"></div>

      {/* 2. Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-900/10 to-transparent"></div>
      </div>

      {/* 3. App Content */}
      <div className="relative z-10 flex flex-col h-full">
        <TopBar />

        <div className="flex-1 flex overflow-hidden">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
            {activeTab === "home" ? <Recommender /> : <DatasetInfo />}
          </main>
        </div>

        <StatusBar status={activeTab === "home" ? "Idle" : "Reading Data"} />
      </div>
    </div>
  );
}

export default App;
