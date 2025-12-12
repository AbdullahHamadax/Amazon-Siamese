import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Image, Type, UploadCloud } from "lucide-react";

export const InputConsole = () => {
  const [mode, setMode] = useState<"text" | "image">("text");

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 relative z-20">
      {/* The Main Console Box */}
      <div className="bg-[#0B0C15] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
        {/* Top Bar with Modern Toggles */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#05050A]">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>

          {/* New Segmented Control */}
          <div className="flex bg-white/5 p-1 rounded-lg">
            <button
              onClick={() => setMode("text")}
              className={`relative px-4 py-1 text-xs font-bold rounded-md transition-all duration-300 flex items-center gap-2 ${
                mode === "text"
                  ? "text-black bg-white shadow-lg"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <Type size={12} /> TEXT
            </button>
            <button
              onClick={() => setMode("image")}
              className={`relative px-4 py-1 text-xs font-bold rounded-md transition-all duration-300 flex items-center gap-2 ${
                mode === "image"
                  ? "text-black bg-white shadow-lg"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <Image size={12} /> IMAGE
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-2">
          <div className="bg-[#0F1119] rounded-xl border border-white/5 min-h-[180px] p-4 relative">
            <AnimatePresence mode="wait">
              {mode === "text" ? (
                <motion.textarea
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-transparent border-none text-gray-200 font-mono text-sm placeholder:text-gray-700 resize-none focus:ring-0 leading-relaxed"
                  placeholder="> Input textual description vector..."
                />
              ) : (
                <motion.div
                  key="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-32 flex flex-col items-center justify-center border border-dashed border-gray-700 rounded-lg bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors"
                >
                  <UploadCloud className="text-gray-500 mb-2" size={20} />
                  <span className="text-xs text-gray-500 font-mono">
                    DRAG_DROP_IMAGE_MATRIX
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <div className="absolute bottom-4 right-4">
              <button className="flex items-center gap-2 bg-neon hover:bg-[#FFC247] text-black text-xs font-black py-2 px-4 rounded-lg transition-all shadow-[0_0_20px_rgba(255,174,0,0.2)] hover:shadow-[0_0_30px_rgba(255,174,0,0.4)] active:scale-95">
                <Search size={14} strokeWidth={3} />
                RUN_INFERENCE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
