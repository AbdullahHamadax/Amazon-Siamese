import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Image, Type, UploadCloud, Sparkles } from "lucide-react";

export const InputConsole = () => {
  const [mode, setMode] = useState<"text" | "image">("text");

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 relative z-20">
      <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-neon/20 rounded-[32px] -z-10" />

      <div className="bg-void-800/80 border border-white/10 rounded-[24px] overflow-hidden shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-void-700/80">
          <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span>Console interface</span>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
            <button
              onClick={() => setMode("text")}
              className={`relative px-4 py-1 text-[11px] font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                mode === "text" ? "text-void-900 bg-cyan-300 shadow-lg shadow-cyan-400/30" : "text-gray-500 hover:text-white"
              }`}
            >
              <Type size={12} /> TEXT
            </button>
            <button
              onClick={() => setMode("image")}
              className={`relative px-4 py-1 text-[11px] font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                mode === "image" ? "text-void-900 bg-purple-300 shadow-lg shadow-purple-400/30" : "text-gray-500 hover:text-white"
              }`}
            >
              <Image size={12} /> IMAGE
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="bg-void-900/70 rounded-2xl border border-white/5 min-h-[200px] p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0 pointer-events-none" />
            <AnimatePresence mode="wait">
              {mode === "text" ? (
                <motion.textarea
                  key="text"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="w-full h-full bg-transparent border-none text-slate-100 font-mono text-sm placeholder:text-slate-500 resize-none focus:ring-0 leading-relaxed"
                  placeholder="> Describe the product DNA in text..."
                />
              ) : (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="h-40 flex flex-col items-center justify-center border border-dashed border-cyan-400/40 rounded-2xl bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors"
                >
                  <UploadCloud className="text-cyan-300 mb-2" size={22} />
                  <span className="text-xs text-slate-300 font-mono">DRAG & DROP IMAGE VECTORS</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button className="flex items-center gap-2 bg-neon text-void-900 text-xs font-black py-2 px-4 rounded-lg transition-all shadow-[0_0_20px_rgba(255,174,0,0.3)] hover:shadow-[0_0_30px_rgba(255,174,0,0.5)] active:scale-95">
                <Search size={14} strokeWidth={3} />
                RUN INFERENCE
              </button>
              <button className="p-2 rounded-lg border border-white/10 bg-white/5 text-cyan-200 hover:border-cyan-300 transition">
                <Sparkles size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-[0.25em]">
            <span>Contrastive loss enabled</span>
            <span>Dual encoders: LSTM + CNN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
