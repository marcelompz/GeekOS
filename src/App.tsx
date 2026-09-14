import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { initAuth, googleSignIn, logout, getAccessToken } from "./services/firebaseAuth";
import { Navbar } from "./components/Navbar";
import { HeroGeekOS } from "./components/HeroGeekOS";
import { AnecdotesList } from "./components/AnecdotesList";
import { GeekOSTerminal } from "./components/GeekOSTerminal";
import { DilemmaSimulator } from "./components/DilemmaSimulator";
import { DriveBrowser } from "./components/DriveBrowser";
import { ExportConfirmModal } from "./components/ExportConfirmModal";
import { Anecdote } from "./types";
import { CheckCircle2, Youtube, ExternalLink } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"anecdotas" | "terminal" | "simulador" | "drive">("anecdotas");
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Export to Drive modal states
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [anecdoteToExport, setAnecdoteToExport] = useState<Anecdote | null>(null);
  const [customExportTitle, setCustomExportTitle] = useState<string | undefined>(undefined);
  const [customExportContent, setCustomExportContent] = useState<string | undefined>(undefined);
  const [exportSuccessAlert, setExportSuccessAlert] = useState<string | null>(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleTriggerExportAnecdote = (anecdote: Anecdote) => {
    setAnecdoteToExport(anecdote);
    setCustomExportTitle(undefined);
    setCustomExportContent(undefined);
    setExportModalOpen(true);
  };

  const handleTriggerExportCustom = (title: string, markdown: string) => {
    setAnecdoteToExport(null);
    setCustomExportTitle(title);
    setCustomExportContent(markdown);
    setExportModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => {
          if (!user) {
            handleLogin();
          } else {
            setActiveTab("drive");
          }
        }}
      />

      {/* Success Notification */}
      {exportSuccessAlert && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-2.5 text-xs text-emerald-300 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{exportSuccessAlert}</span>
            </div>
            <button
              onClick={() => setExportSuccessAlert(null)}
              className="text-slate-400 hover:text-white text-sm ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero Section */}
        <HeroGeekOS
          onStartChat={() => setActiveTab("terminal")}
          onViewDilemmas={() => setActiveTab("simulador")}
        />

        {/* Tab Content Display */}
        {activeTab === "anecdotas" && (
          <AnecdotesList
            onExportToDrive={handleTriggerExportAnecdote}
            hasGoogleAuth={Boolean(user && accessToken)}
            onOpenGoogleAuth={() => {
              setActiveTab("drive");
            }}
          />
        )}

        {activeTab === "terminal" && (
          <GeekOSTerminal
            onSaveToDrive={handleTriggerExportCustom}
            hasGoogleAuth={Boolean(user && accessToken)}
            onOpenGoogleAuth={() => setActiveTab("drive")}
          />
        )}

        {activeTab === "simulador" && <DilemmaSimulator />}

        {activeTab === "drive" && (
          <DriveBrowser
            user={user}
            accessToken={accessToken}
            onLogin={handleLogin}
            onLogout={handleLogout}
            isLoggingIn={isLoggingIn}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-amber-400 font-bold">GeekOS</span>
            <span>· Mascota Oficial de Tecnología & Sistemas</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>Visitar Canal de YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <span>Google Drive Workspace Integration</span>
          </div>
        </div>
      </footer>

      {/* Export Confirmation Modal (MANDATORY per Workspace guidelines) */}
      <ExportConfirmModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        anecdote={anecdoteToExport}
        customTitle={customExportTitle}
        customContent={customExportContent}
        accessToken={accessToken}
        onSuccess={(fileName) => {
          setExportSuccessAlert(`¡"${fileName}" fue guardado exitosamente en tu Google Drive!`);
        }}
      />
    </div>
  );
}
