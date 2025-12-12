import { Cpu, Activity, Github } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div className="pointer-events-auto bg-void-800/70 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_10px_60px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/60 to-purple-500/60 flex items-center justify-center border border-white/10 shadow-inner">
            <Cpu className="text-white" size={18} />
          </div>
          <div>
            <p className="text-[10px] font-mono text-cyan-200/80 tracking-[0.35em]">MULTIMODAL</p>
            <span className="text-sm font-bold tracking-tight text-white">
              SIAMESE<span className="text-neon">-REC</span>
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-white/10" />

        <div className="flex items-center gap-3 text-[11px] font-mono text-gray-300">
          <Activity size={14} className="text-green-400" />
          <span>Inference grid synced</span>
        </div>

        <div className="h-6 w-px bg-white/10" />

        <a
          href="https://github.com"
          className="flex items-center gap-2 text-[11px] font-mono text-cyan-200 hover:text-white transition-colors"
        >
          <Github size={14} />
          <span>Repo</span>
        </a>
      </div>
    </header>
  );
};
