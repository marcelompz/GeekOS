import React from "react";
import { GeekOSAvatar } from "./GeekOSAvatar";
import {
  BookOpen,
  Terminal,
  Gamepad2,
  Cloud,
  Youtube,
  User as UserIcon,
  LogIn,
} from "lucide-react";
import { User } from "firebase/auth";

interface NavbarProps {
  activeTab: "anecdotas" | "terminal" | "simulador" | "drive";
  setActiveTab: (tab: "anecdotas" | "terminal" | "simulador" | "drive") => void;
  user: User | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
}) => {
  const tabs = [
    { id: "anecdotas", label: "Bitácoras & Anécdotas", icon: BookOpen },
    { id: "terminal", label: "Terminal GeekOS (IA)", icon: Terminal },
    { id: "simulador", label: "Simulador de Dilemas", icon: Gamepad2 },
    { id: "drive", label: "Google Drive Sync", icon: Cloud },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Channel Link */}
          <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={() => setActiveTab("anecdotas")}>
              <GeekOSAvatar size="sm" showBadge={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-slate-100 tracking-tight">
                  Geek<span className="text-amber-400">OS</span>
                </span>
                <a
                  href="https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                >
                  <Youtube className="w-3 h-3" />
                  <span>Canal YouTube</span>
                </a>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Mascota Cyber-Científica · Código & Dinámicas Humanas
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User / Google Drive Auth Button */}
          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={() => setActiveTab("drive")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-xs text-slate-300"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="hidden sm:inline font-medium truncate max-w-[120px]">
                  {user.displayName?.split(" ")[0] || "Drive"}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <Cloud className="w-3.5 h-3.5 text-cyan-400" />
                <span>Google Drive</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-950 px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? "text-amber-400 font-bold" : "text-slate-400"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
