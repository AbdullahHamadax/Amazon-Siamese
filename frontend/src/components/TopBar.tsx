import { Network, Terminal, Settings, Shield } from "lucide-react";

const TopBar = () => {
  const menuItems = ["SYSTEM", "DATA", "MODELS", "LOGS"];

  return (
    <div className="h-12 w-full bg-slate-950/90 border-b border-slate-800 flex items-center px-4 select-none backdrop-blur-md z-50 sticky top-0">
      {/* Brand - The Screenshot Style */}
      <div className="flex items-center gap-3 mr-12 pl-2">
        <div className="p-1.5 border border-cyan-500/30 rounded bg-cyan-500/5">
          <Network size={18} className="text-cyan-400" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-slate-100 font-bold tracking-widest text-base font-mono">
            EDEENY<span className="text-cyan-400">SOORA</span>
          </span>
          <span className="text-[9px] text-cyan-600 tracking-[0.2em] uppercase">
            Multimodal Recommender
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex gap-8 text-[11px] font-mono tracking-wider">
        {menuItems.map((item) => (
          <span
            key={item}
            className="text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-4 left-0 w-0 h-[2px] bg-cyan-500/50 transition-all group-hover:w-full" />
          </span>
        ))}
      </div>

      {/* Right Controls */}
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-400 font-mono">
          <Shield size={10} className="text-green-500" />
          SECURE V1.0
        </div>
        <Terminal
          size={16}
          className="text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors"
        />
        <Settings
          size={16}
          className="text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors"
        />
      </div>
    </div>
  );
};

export default TopBar;
