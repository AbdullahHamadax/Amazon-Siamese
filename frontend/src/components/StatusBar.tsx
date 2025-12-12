import { Activity, Cpu, CheckCircle2, BookOpen } from "lucide-react";

interface StatusBarProps {
  status: string;
}

const StatusBar = ({ status }: StatusBarProps) => {
  const isReading = status === "Reading Data";

  return (
    <div className="h-10 bg-slate-950 border-t border-slate-800 flex items-center px-6 font-mono tracking-wider text-slate-500 select-none z-50 relative">
      {/* Left Status - Z-Index ensures it sits above the centered layer if screen is small */}
      <div className="flex items-center gap-4 z-10">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isReading ? "bg-cyan-500" : "bg-green-500"
            } animate-pulse`}
          />
          <span className="text-cyan-400 font-semibold text-xs">
            {isReading ? "ACCESSING DATABASE" : "SYSTEM READY"}
          </span>
        </div>
      </div>

      {/* Perfectly Centered Modules */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-12 opacity-90 pointer-events-none">
        <div className="flex items-center gap-3 text-cyan-300">
          <Cpu size={14} />
          <span className="text-xs">
            LSTM ENCODER:{" "}
            <span className="text-cyan-500 font-bold text-glow">ONLINE</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-cyan-300">
          <Activity size={14} />
          <span className="text-xs">
            CNN MODULE:{" "}
            <span className="text-cyan-500 font-bold text-glow">ONLINE</span>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-6 border-l border-slate-800 pl-6 z-10">
        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs">
          <span>UTF-8</span>
        </div>

        <div className="flex items-center gap-3">
          {status === "Processing..." && (
            <div className="w-3 h-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          )}

          <span
            className={
              status === "Processing..."
                ? "text-cyan-400 text-xs"
                : "text-slate-500 text-xs"
            }
          >
            {status}
          </span>

          {/* Icon Logic */}
          {isReading ? (
            <BookOpen size={14} className="text-cyan-500" />
          ) : (
            <CheckCircle2 size={14} className="text-green-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
