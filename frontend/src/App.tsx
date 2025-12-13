import { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";
import DatasetInfo from "./components/DatasetInfo";
import SystemLoad from "./components/SystemLoad";
import ArchitectureViz from "./components/ArchitectureViz";
import {
  UploadCloud,
  ArrowRight,
  Maximize2,
  AlertTriangle,
  X,
  Check,
  Search,
} from "lucide-react";

// --- Components ---

const ProductCard = ({
  title,
  score,
  img,
}: {
  title: string;
  score: number;
  img: string;
}) => (
  <div className="flex flex-col bg-slate-900 border border-slate-700/50 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300 group shadow-lg hover:shadow-cyan-500/20">
    {/* Image Container */}
    <div className="relative w-full h-64 bg-white/5 p-4 flex items-center justify-center overflow-hidden">
      <img
        src={img}
        alt={title}
        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).src =
            "https://placehold.co/400x600/1e293b/475569?text=Image+Not+Found";
        }}
      />

      {/* Similarity Badge */}
      <div className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur px-2 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-500/30 shadow-sm z-10">
        {(score * 100).toFixed(1)}% MATCH
      </div>
    </div>

    {/* Text Info */}
    <div className="p-3 bg-slate-950 border-t border-slate-800 flex-1 flex flex-col justify-between">
      <div>
        <h3
          className="text-slate-200 text-sm font-medium leading-tight mb-1 line-clamp-2"
          title={title}
        >
          {title}
        </h3>
        <p className="text-[10px] text-slate-500 font-mono">
          ID: REF_{Math.floor(Math.random() * 9999)}
        </p>
      </div>
    </div>
  </div>
);

const Recommender = () => {
  const [inputText, setInputText] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSearch = async () => {
    setError(null);

    if (!inputText.trim()) {
      setError("INPUT_ERROR: TEXT_DESCRIPTION_REQUIRED");
      return;
    }
    if (!selectedImageFile) {
      setError("INPUT_ERROR: REFERENCE_IMAGE_REQUIRED");
      return;
    }

    setLoading(true);
    setResults([]); // Clear previous results immediately

    try {
      const formData = new FormData();
      formData.append("text", inputText);
      formData.append("image", selectedImageFile);

      // --- DEBUGGING LOG ---
      console.log("Sending Request to Backend...");

      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data); // Check your browser console!

      setResults(data.results);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("CRITICAL_ERROR: INFERENCE_FAILED_OR_BACKEND_OFFLINE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-6 bg-slate-950">
      {/* 1. Header / Viz Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <ArchitectureViz />
        </div>
        <div className="flex items-center justify-center xl:justify-start h-full">
          <SystemLoad />
        </div>
      </div>

      {/* 2. Input Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>

          <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
              <Search className="text-cyan-400" size={18} />
              <h3 className="text-cyan-400 font-mono text-sm font-bold tracking-widest">
                MULTIMODAL_SEARCH_ENGINE
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 flex justify-between">
                  <span>PRODUCT DESCRIPTION</span>
                  {inputText.length > 0 && (
                    <Check size={14} className="text-green-500" />
                  )}
                </label>
                <div
                  className={`flex items-start gap-3 bg-slate-950 border rounded-lg p-3 h-32 transition-all ${
                    !inputText && error
                      ? "border-red-500/50"
                      : "border-slate-800 focus-within:border-cyan-500/50"
                  }`}
                >
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="E.g. 'Blue denim jacket with collar'..."
                    className="bg-transparent border-none outline-none text-slate-200 w-full h-full font-sans text-sm placeholder:text-slate-600 resize-none custom-scrollbar"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 flex justify-between">
                  <span>REFERENCE IMAGE</span>
                  {selectedImageFile && (
                    <Check size={14} className="text-green-500" />
                  )}
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {previewUrl ? (
                  <div className="relative h-32 bg-slate-950 border border-cyan-500/30 rounded-lg overflow-hidden group/image flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full object-contain p-2"
                    />
                    <button
                      onClick={() => {
                        setSelectedImageFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-2 right-2 bg-slate-900/80 hover:bg-red-500/20 text-red-400 border border-red-500/30 p-1.5 rounded transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-500 transition-all cursor-pointer bg-slate-950 ${
                      error && !selectedImageFile
                        ? "border-red-500/40 text-red-400"
                        : "border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400"
                    }`}
                  >
                    <UploadCloud size={24} className="mb-2" />
                    <span className="text-xs font-mono">UPLOAD IMAGE</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-slate-800 gap-4">
              <div className="flex-1 text-red-400 text-xs font-mono">
                {error}
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

      {/* 3. Results Grid */}
      {(hasSearched || loading) && (
        <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <Maximize2 size={16} className="text-cyan-500" />
            <h2 className="text-lg text-slate-200 font-mono tracking-wider">
              SEARCH_RESULTS <span className="text-slate-600">//</span>{" "}
              {results.length} ITEMS FOUND
            </h2>
          </div>

          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center border border-slate-800 rounded-xl bg-slate-900/50">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-cyan-500 font-mono animate-pulse">
                Running Neural Inference...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {results.map((rec) => (
                <ProductCard
                  key={rec.id}
                  title={rec.title}
                  score={rec.score}
                  img={rec.image}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Main App Layout ---

function App() {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div className="w-screen h-screen flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden relative text-slate-200">
      <div className="fixed inset-0 pointer-events-none z-[9999] scanline"></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-900/10 to-transparent"></div>
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <TopBar />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
            {activeTab === "home" ? <Recommender /> : <DatasetInfo />}
          </main>
        </div>
        <StatusBar
          status={activeTab === "home" ? "System Ready" : "Reading Data"}
        />
      </div>
    </div>
  );
}

export default App;
