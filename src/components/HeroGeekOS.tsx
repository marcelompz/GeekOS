import React from "react";
import { GeekOSAvatar } from "./GeekOSAvatar";
import {
  Youtube,
  Cpu,
  HeartHandshake,
  ExternalLink,
  Sparkles,
  Terminal,
} from "lucide-react";

interface HeroGeekOSProps {
  onStartChat: () => void;
  onViewDilemmas: () => void;
}

export const HeroGeekOS: React.FC<HeroGeekOSProps> = ({
  onStartChat,
  onViewDilemmas,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
      {/* Background cyber grid effect */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Mascot Avatar with status */}
        <div className="shrink-0 flex flex-col items-center">
          <GeekOSAvatar size="lg" isSpeaking={false} statusText="GeekOS · Cyber-Gecko" />
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

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-3xl">
            Comparto las anécdotas de mis proyectos tecnológicos más desafiantes, los retos que he superado programando y, sobre todo, el arte invisible de encarar las relaciones humanas en los sistemas de software actuales. Porque detrás de cada servidor en llamas, siempre hay personas buscando soluciones.
          </p>

          {/* Quick Dual Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300 block font-mono">Retos Técnicos</span>
                Arquitecturas resilientes, concurrencia, rescates de código legacy y depuración en caliente.
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300">
              <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-300 block font-mono">Relaciones Humanas</span>
                Desactivar egos en PRs, cultura sin culpas, síndrome del impostor y empatía en equipos tech.
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
            <button
              onClick={onStartChat}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
            >
              <Terminal className="w-4 h-4" />
              <span>Conversar con GeekOS (IA)</span>
            </button>

            <button
              onClick={onViewDilemmas}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
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
