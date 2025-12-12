import { clsx } from "clsx";
import { Home, Database, Power } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Dashboard" },
    { id: "dataset", icon: Database, label: "Dataset" },
  ];

  return (
    <div className="w-16 h-full flex flex-col items-center py-6 bg-slate-950/80 border-r border-slate-800 backdrop-blur-sm z-40 relative">
      {/* Navigation */}
      <div className="flex flex-col gap-6 w-full items-center flex-1 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              className="relative group w-full flex justify-center"
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}

              <button
                onClick={() => onTabChange(item.id)}
                className={clsx(
                  "p-3 rounded-md transition-all duration-300 relative cursor-pointer",
                  isActive
                    ? "text-cyan-400 bg-cyan-500/5"
                    : "text-slate-600 hover:text-cyan-200 hover:bg-slate-900"
                )}
              >
                <Icon size={20} strokeWidth={1.5} />
              </button>

              {/* Tooltip */}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                            bg-slate-900 border border-slate-700 text-cyan-100 text-[10px] font-mono tracking-wide
                            opacity-0 -translate-x-2 pointer-events-none
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 shadow-xl"
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom */}
      <button className="mt-auto mb-4 p-3 text-red-500/60 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer">
        <Power size={20} />
      </button>
    </div>
  );
};

export default Sidebar;
