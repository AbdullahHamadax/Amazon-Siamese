import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-void-900 text-slate-100 font-sans overflow-hidden">
      {/* grid and glow layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-600/10" />
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-neon/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-[800px] -translate-x-1/2 bg-gradient-radial from-white/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen pb-10">{children}</div>
    </div>
  );
};
