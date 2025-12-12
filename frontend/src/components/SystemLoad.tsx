import { useEffect, useState } from "react";

const SystemLoad = () => {
  const [load, setLoad] = useState(0);

  // Simulate loading effect on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad((prev) => {
        if (prev >= 12) {
          clearInterval(interval);
          return 12;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md bg-slate-900/50 border border-slate-800/80 rounded-xl p-6 font-mono text-sm shadow-lg backdrop-blur-md">
      <div className="flex justify-between items-center mb-3">
        <span className="text-cyan-400 font-bold tracking-widest">
          SYSTEM_LOAD
        </span>
        <span className="text-cyan-400 font-bold">{load}%</span>
      </div>

      {/* Progress Bar Background */}
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-6">
        {/* Animated Bar */}
        <div
          className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-300 ease-out"
          style={{ width: `${load}%` }}
        />
      </div>

      <div className="space-y-2 text-slate-400 text-xs md:text-sm">
        <p className="flex items-center gap-3">
          <span className="text-cyan-600 font-bold">&gt;</span> Initializing
          Contrastive Loss...
        </p>
        <p className="flex items-center gap-3">
          <span className="text-cyan-600 font-bold">&gt;</span> Loading
          Amazon_Product_Dataset...
        </p>
        <p className="flex items-center gap-3 animate-pulse text-slate-500">
          <span className="text-cyan-500 font-bold">&gt;</span> Waiting for user
          input...
        </p>
      </div>
    </div>
  );
};

export default SystemLoad;
