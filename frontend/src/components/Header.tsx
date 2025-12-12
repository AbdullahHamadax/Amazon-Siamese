import { Cpu, Activity } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none">
      {/* Floating Island Header */}
      <div className="pointer-events-auto bg-[#0B0C15]/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-6 shadow-2xl shadow-black">
        <div className="flex items-center gap-2">
          <Cpu className="text-neon h-4 w-4" />
          <span className="text-sm font-bold tracking-tight text-white">
            SIAMESE<span className="text-neon">REC</span>
          </span>
        </div>

        <div className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
          <Activity size={12} className="text-green-500" />
          <span>SYSTEM ONLINE</span>
        </div>
      </div>
    </header>
  );
};
