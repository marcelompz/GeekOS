import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { GeekOSAvatar } from "./GeekOSAvatar";
import {
  Send,
  Sparkles,
  RefreshCw,
  CloudUpload,
  Bot,
  User as UserIcon,
  HelpCircle,
  Cpu,
  MessageSquareCode,
  Terminal,
} from "lucide-react";

interface GeekOSTerminalProps {
  onSaveToDrive: (title: string, markdown: string) => void;
  hasGoogleAuth: boolean;
  onOpenGoogleAuth: () => void;
}

export const GeekOSTerminal: React.FC<GeekOSTerminalProps> = ({
  onSaveToDrive,
  hasGoogleAuth,
  onOpenGoogleAuth,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "geekos",
      content: `*Ajusta sus gafas de aumento óptico y pulsa una combinación en el teclado mecánico*\n\n¡Hola colega de código! Soy **GeekOS**, la mascota cyber-científica del canal. He navegado desde fallos de segmentación a las 3 AM hasta acaloradas discusiones de diseño de sistemas donde el ego humano era más complejo de depurar que cualquier puntero en C.\n\n¿En qué desafío técnico o dilema de equipo te encuentras hoy? Cuéntame tu situación o escoge una de las sugerencias rápidas abajo.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customTopic, setCustomTopic] = useState<string>("");
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    "¿Cómo dar feedback sincero en un PR sin herir susceptibilidades?",
    "Tengo un bug intermitente de race condition y no sé por dónde empezar.",
    "El PM quiere cambiar la arquitectura a 3 días del lanzamiento, ¿qué hago?",
    "Siento síndrome del impostor al liderar mi primer gran proyecto.",
    "Cuéntame una anécdota sobre un deploy de viernes que casi destruye todo.",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/geekos/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          userMessage: messageText,
        }),
      });

      const data = await response.json();
      const geekosMsg: ChatMessage = {
        id: "geekos-" + Date.now(),
        role: "geekos",
        content: data.reply || "Mis sensores neuronales no respondieron. Reintenta en un momento.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, geekosMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "geekos",
          content:
            "⚠️ Hubo un breve glitch en mi enlace neural. Por favor verifica la conexión y reintenta.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStory = async () => {
    if (!customTopic.trim() || isGeneratingStory) return;
    setIsGeneratingStory(true);

    try {
      const response = await fetch("/api/geekos/anecdote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: customTopic,
          difficulty: "Senior / Arquitectura",
          humanFactor: "Dinámicas de equipo y comunicación bajo presión",
        }),
      });

      const story = await response.json();
      const storyText = `### 🦎 Bitácora Especial de GeekOS: ${story.title}\n\n**Contexto:**\n${story.context}\n\n**Reto Técnico:**\n${story.techChallenge}\n\n**Desafío Humano:**\n${story.humanDilemma}\n\n**Solución:**\n${story.solution}\n\n> 💡 **La Máxima de GeekOS:** "${story.geekosMoral}"`;

      setMessages((prev) => [
        ...prev,
        {
          id: "story-req-" + Date.now(),
          role: "user",
          content: `Genera una bitácora técnica y humana sobre: "${customTopic}"`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "story-resp-" + Date.now(),
          role: "geekos",
          content: storyText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setCustomTopic("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const exportCurrentChatToDrive = () => {
    if (!hasGoogleAuth) {
      onOpenGoogleAuth();
      return;
    }

    const title = `GeekOS-Sesion-Consejos-${new Date().toISOString().slice(0, 10)}`;
    let md = `# Bitácora de Sesión con GeekOS\n\n*Fecha: ${new Date().toLocaleString()}*\n*Mascota del canal: https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg*\n\n---\n\n`;

    messages.forEach((m) => {
      md += `### ${m.role === "geekos" ? "🦎 GeekOS" : "👤 Desarrollador"} (${m.timestamp})\n\n${m.content}\n\n---\n\n`;
    });

    onSaveToDrive(title, md);
  };

  return (
    <div className="space-y-4">
      {/* Terminal Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[640px]">
        {/* Terminal Header Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-[1px] bg-slate-800 mx-1" />
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>geekos@lab-terminal:~ (Gemini 3.8 Flash Engine)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCurrentChatToDrive}
              title="Guardar sesión completa en Google Drive"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <CloudUpload className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Guardar en Drive</span>
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {msg.role === "geekos" ? (
                <div className="shrink-0 mt-0.5">
                  <GeekOSAvatar size="sm" isSpeaking={isLoading} showBadge={false} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}

              <div
                className={`rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-500 text-slate-950 font-medium"
                    : "bg-slate-800/80 text-slate-200 border border-slate-700/80 shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-70 font-mono">
                  <span>{msg.role === "geekos" ? "GeekOS" : "Tú"}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 mr-auto">
              <GeekOSAvatar size="sm" isSpeaking={true} showBadge={false} />
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-amber-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>GeekOS está analizando la arquitectura y calibrando su reflexión...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
            Sugerencias:
          </span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/60 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Pregúntale a GeekOS sobre un bug, un desacuerdo de equipo, o pide un consejo..."
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-semibold text-sm flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <span>Enviar</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Generator Box for Custom Anecdote */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200">
              ¿Quieres que GeekOS invente una anécdota a medida?
            </h4>
            <p className="text-xs text-slate-400">
              Escribe cualquier tema técnico (ej. "migrar de REST a GraphQL", "microfrontends", "broma en el canal de release").
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Tema técnico o dilema..."
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerateStory();
            }}
            className="flex-1 md:w-64 px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={handleGenerateStory}
            disabled={isGeneratingStory || !customTopic.trim()}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors disabled:opacity-50"
          >
            {isGeneratingStory ? "Generando..." : "Generar Bitácora"}
          </button>
        </div>
      </div>
    </div>
  );
};
