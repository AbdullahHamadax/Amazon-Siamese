import { FileText, Image as ImageIcon, Box, GitMerge } from "lucide-react";

const ArchBox = ({ icon: Icon, title, sub, color }: any) => (
  <div
    className={`flex flex-col items-center justify-center p-6 border border-slate-800 bg-slate-900/90 rounded-2xl w-44 h-32 relative group hover:border-${color}-500/50 transition-all shadow-lg`}
  >
    <Icon className={`text-${color}-400 mb-3`} size={28} />
    <span className="text-xs uppercase text-slate-300 font-bold tracking-wider">
      {title}
    </span>
    <span className={`text-[10px] text-${color}-400 font-mono mt-1`}>
      {sub}
    </span>

    {/* Tech corners */}
    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-slate-700 group-hover:border-${color}-500/30 transition-colors" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-slate-700 group-hover:border-${color}-500/30 transition-colors" />
  </div>
);

const ArchitectureViz = () => {
  return (
    <div className="w-full border border-slate-800/60 bg-slate-950/60 rounded-2xl p-8 relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 left-0 px-4 py-1.5 bg-slate-900 border-r border-b border-slate-800 text-xs text-cyan-400 font-mono font-bold tracking-widest">
        ARCHITECTURE VISUALIZATION
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-6">
        {/* Inputs */}
        <div className="flex flex-col gap-6">
          <ArchBox
            icon={FileText}
            title="Text Encoder"
            sub="LSTM (Bi-Directional)"
            color="cyan"
          />
          <ArchBox
            icon={ImageIcon}
            title="Image Encoder"
            sub="CNN (ResNet50)"
            color="cyan"
          />
        </div>

        {/* Connections */}
        <div className="hidden md:flex flex-col items-center justify-center h-full opacity-60">
          <div className="w-24 h-[2px] bg-gradient-to-r from-slate-700 to-cyan-500 transform -rotate-[20deg] translate-y-8"></div>
          <div className="w-24 h-[2px] bg-gradient-to-r from-slate-700 to-cyan-500 transform rotate-[20deg] -translate-y-8"></div>
        </div>

        {/* Fusion */}
        <div className="relative z-10 scale-125">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="w-28 h-28 rounded-full border-2 border-cyan-500/30 bg-slate-950 flex flex-col items-center justify-center relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <GitMerge className="text-cyan-400 mb-2" size={32} />
            <span className="text-[10px] text-cyan-200 tracking-[0.2em] font-bold">
              FUSION
            </span>
          </div>
        </div>

        {/* Output Connection */}
        <div className="hidden md:block w-24 h-[2px] bg-gradient-to-r from-cyan-900 to-slate-700 opacity-60"></div>

        {/* Output */}
        <ArchBox
          icon={Box}
          title="Embedding Space"
          sub="128-DIM VECTOR"
          color="green"
        />
      </div>
    </div>
  );
};

export default ArchitectureViz;
