import React, { useState } from "react";
import { DILEMMAS_DATA } from "../data/dilemmasData";
import { GeekOSAvatar } from "./GeekOSAvatar";
import {
  ShieldAlert,
  Users,
  CheckCircle2,
  RefreshCcw,
  Sparkles,
  Award,
  Zap,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export const DilemmaSimulator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [techScore, setTechScore] = useState<number>(50);
  const [humanScore, setHumanScore] = useState<number>(50);

  const scenario = DILEMMAS_DATA[currentIndex];
  const selectedOption = scenario.options.find((opt) => opt.id === selectedOptionId);

  const handleSelectOption = (optionId: string) => {
    if (selectedOptionId) return; // Prevent double choosing
    const opt = scenario.options.find((o) => o.id === optionId);
    if (!opt) return;

    setSelectedOptionId(optionId);
    setTechScore((prev) => Math.min(100, Math.max(0, prev + opt.techImpact * 2)));
    setHumanScore((prev) => Math.min(100, Math.max(0, prev + opt.humanImpact * 2)));
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    setCurrentIndex((prev) => (prev + 1) % DILEMMAS_DATA.length);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setCurrentIndex(0);
    setTechScore(50);
    setHumanScore(50);
  };

  return (
    <div className="space-y-6">
      {/* Simulator Top Stats & Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tech Health Meter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase">
              <Zap className="w-4 h-4" />
              Salud Técnica del Sistema
            </span>
            <span className="font-bold">{techScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                techScore > 70
                  ? "bg-emerald-400"
                  : techScore > 40
                  ? "bg-amber-400"
                  : "bg-rose-500"
              }`}
              style={{ width: `${techScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Rendimiento, arquitectura, deuda técnica y estabilidad en producción.
          </p>
        </div>

        {/* Human Trust Meter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs font-mono text-rose-400 mb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase">
              <Users className="w-4 h-4" />
              Confianza & Empatía del Equipo
            </span>
            <span className="font-bold">{humanScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                humanScore > 70
                  ? "bg-emerald-400"
                  : humanScore > 40
                  ? "bg-amber-400"
                  : "bg-rose-500"
              }`}
              style={{ width: `${humanScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Seguridad psicológica, respeto interpersonal, moral y retención de talento.
          </p>
        </div>

        {/* Balance Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
              Equilibrio Ingenieril
            </span>
            <h4 className="text-base font-bold text-slate-100 mt-0.5">
              {techScore + humanScore >= 150
                ? "🌟 Líder Sobresaliente"
                : techScore + humanScore >= 100
                ? "⚖️ Balance Estable"
                : "⚠️ Crisis Sistémica"}
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Escenario {currentIndex + 1} de {DILEMMAS_DATA.length}
            </p>
          </div>
          <button
            onClick={handleReset}
            title="Reiniciar simulador"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            Dilema en Producción #{currentIndex + 1}
          </div>
          <h3 className="text-xl font-bold text-slate-100 mt-1">
            {scenario.title}
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            {scenario.situation}
          </p>
        </div>

        {/* Stakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/40 text-cyan-200">
            <span className="font-bold block text-cyan-400 font-mono mb-1">
              Impacto Técnico:
            </span>
            {scenario.techStakes}
          </div>
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-rose-200">
            <span className="font-bold block text-rose-400 font-mono mb-1">
              Impacto Humano:
            </span>
            {scenario.humanStakes}
          </div>
        </div>

        {/* Decision Options */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase font-semibold text-slate-400">
            ¿Cómo decides actuar como ingeniero/a?
          </label>
          <div className="space-y-2.5">
            {scenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={Boolean(selectedOptionId)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs md:text-sm leading-relaxed ${
                    isSelected
                      ? opt.humanImpact >= 0
                        ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-100 ring-1 ring-emerald-500/40"
                        : "bg-rose-500/10 border-rose-500/60 text-rose-100 ring-1 ring-rose-500/40"
                      : "bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                      {opt.id.replace("opt-", "")}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback & GeekOS Wisdom (Appears when an option is selected) */}
        {selectedOption && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <GeekOSAvatar size="sm" showBadge={false} />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Evaluación de GeekOS:
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      selectedOption.techImpact >= 0
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    Tech: {selectedOption.techImpact > 0 ? `+${selectedOption.techImpact}` : selectedOption.techImpact}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      selectedOption.humanImpact >= 0
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    Humano: {selectedOption.humanImpact > 0 ? `+${selectedOption.humanImpact}` : selectedOption.humanImpact}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {selectedOption.feedback}
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-xs text-amber-200 font-medium italic">
                    🦎 "{selectedOption.geekosWisdom}"
                  </p>
                </div>
              </div>
            </div>

            {/* Next Scenario Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
              >
                <span>Siguiente Dilema</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
