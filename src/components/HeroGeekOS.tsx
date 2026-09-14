import React, { useState } from "react";
import { GeekOSAvatar, GeekOSExpression } from "./GeekOSAvatar";
import {
  Youtube,
  Cpu,
  HeartHandshake,
  ExternalLink,
  Sparkles,
  Terminal,
  Code,
  Brain,
  PartyPopper,
  Bug,
  MessageSquare,
} from "lucide-react";

interface HeroGeekOSProps {
  onStartChat: () => void;
  onViewDilemmas: () => void;
}

export const HeroGeekOS: React.FC<HeroGeekOSProps> = ({
  onStartChat,
  onViewDilemmas,
}) => {
  const [currentExpression, setCurrentExpression] = useState<GeekOSExpression>("coding");

  const expressionsConfig = [
    {
      id: "coding" as GeekOSExpression,
      label: "Programando",
      icon: Code,
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      quote:
        "Compilando el bridge asíncrono de OmniFlow en la terminal y depurando drivers para SBCs. ¡Nada como el aroma de código fresco en Debian!",
    },
    {
      id: "thinking" as GeekOSExpression,
      label: "Reflexionando",
      icon: Brain,
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      quote:
        "¿Monolito modular o microservicios? Con Omnigastro aprendí que el hardware modesto en un restaurante real castiga la sobre-ingeniería. La simplicidad gana.",
    },
    {
      id: "happy" as GeekOSExpression,
      label: "Deploy Exitoso",
      icon: PartyPopper,
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      quote:
        "¡Todos los tests pasaron en verde! La demo con el cliente fue un éxito y la sincronización con Google Drive está intacta. ¡Hora de un café bien cargado!",
    },
    {
      id: "debugging" as GeekOSExpression,
      label: "Cazando Bugs",
      icon: Bug,
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      quote:
        "Mis visores ámbar detectan un deadlock cíclico a las 3 AM. Pero recuerda la regla de oro: cero cacerías de brujas en la sala de guerra.",
    },
  ];

  const activeConfig = expressionsConfig.find((c) => c.id === currentExpression) || expressionsConfig[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
      {/* Dynamic ambient color glow according to expression */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div
        className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
          currentExpression === "coding"
            ? "bg-cyan-500/10"
            : currentExpression === "thinking"
            ? "bg-amber-500/10"
            : currentExpression === "happy"
            ? "bg-emerald-500/10"
            : "bg-rose-500/10"
        }`}
      />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Mascot Avatar with Interactive Expression */}
        <div className="shrink-0 flex flex-col items-center">
          <GeekOSAvatar
            size="lg"
            expression={currentExpression}
            isSpeaking={false}
            statusText={`GeekOS · ${activeConfig.label}`}
          />

          {/* Quick Expression Selector Pills */}
          <div className="mt-3 flex items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            {expressionsConfig.map((exp) => {
              const Icon = exp.icon;
              const isSelected = currentExpression === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setCurrentExpression(exp.id)}
                  title={`Expresión: ${exp.label}`}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                    isSelected
                      ? "bg-slate-800 text-amber-300 font-bold shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline text-[10px]">{exp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Mascota Oficial de Tecnología
            </span>
            <a
              href="https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>Canal de YouTube</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Hola, soy <span className="text-amber-400">GeekOS</span>: Ciencia, Código y Relaciones Humanas
          </h1>

          {/* Dynamic Reactive Speech Bubble */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-left transition-all">
            <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                Estado Actual · Modo {activeConfig.label}
              </span>
              <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed">
                "{activeConfig.quote}"
              </p>
            </div>
          </div>

          {/* Dual Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300 block font-mono">Retos Técnicos</span>
                Arquitecturas desacopladas, distros Debian acotadas, OmniFlow y depuración de concurrencia.
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300">
              <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-300 block font-mono">Relaciones Humanas</span>
                Choque cultural Microsoft vs Linux, el valor de cancelar demos a tiempo y empatía en PRs.
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <button
              onClick={onStartChat}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
            >
              <Terminal className="w-4 h-4" />
              <span>Conversar con GeekOS (IA)</span>
            </button>

            <button
              onClick={onViewDilemmas}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Jugar Simulador de Dilemas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
