import React, { useState } from "react";
import { Anecdote } from "../types";
import { ANECDOTES_DATA } from "../data/anecdotesData";
import {
  BookOpen,
  Terminal,
  Users,
  Sparkles,
  CloudUpload,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Code2,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";

interface AnecdotesListProps {
  onExportToDrive: (anecdote: Anecdote) => void;
  hasGoogleAuth: boolean;
  onOpenGoogleAuth: () => void;
}

export const AnecdotesList: React.FC<AnecdotesListProps> = ({
  onExportToDrive,
  hasGoogleAuth,
  onOpenGoogleAuth,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeAnecdote, setActiveAnecdote] = useState<Anecdote | null>(null);

  const filteredAnecdotes = ANECDOTES_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "todas" || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.techChallenge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.humanDilemma.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = [
    { id: "todas", label: "Todas las Bitácoras" },
    { id: "backend", label: "Backend & Concurrencia" },
    { id: "arquitectura", label: "Arquitectura & Legacy" },
    { id: "devops", label: "DevOps & Timezones" },
    { id: "relaciones-humanas", label: "Relaciones & Egos" },
    { id: "cultura", label: "Síndrome del Impostor" },
  ];

  return (
    <div id="anecdotes-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-sm uppercase tracking-wider font-semibold">
            <BookOpen className="w-4 h-4" />
            Bitácora de Sistemas & Dinámicas de Equipo
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">
            Anécdotas Reales del Laboratorio de GeekOS
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Historias técnicas donde el mayor desafío no fue solo escribir el algoritmo correcto, sino lidiar con la comunicación, los egos y la presión humana en sistemas vivos.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por bug, stack, tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Anecdotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAnecdotes.map((anecdote) => (
          <div
            key={anecdote.id}
            className="group flex flex-col justify-between bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 transition-all shadow-md hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono uppercase font-semibold bg-slate-800 text-amber-400 border border-slate-700">
                  {anecdote.projectType}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  {anecdote.readTime}
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                {anecdote.title}
              </h3>
              <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                {anecdote.tagline}
              </p>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {anecdote.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-cyan-900/40 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GeekOS Moral preview */}
              <div className="mt-4 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/15">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/90 italic line-clamp-2">
                    "{anecdote.geekosMoral}"
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveAnecdote(anecdote)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Leer Bitácora</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (!hasGoogleAuth) {
                    onOpenGoogleAuth();
                  } else {
                    onExportToDrive(anecdote);
                  }
                }}
                title="Guardar en Google Drive"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                <CloudUpload className="w-3.5 h-3.5 text-cyan-400" />
                <span>Drive</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAnecdotes.length === 0 && (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Terminal className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-slate-300 text-sm font-medium">
            No se encontraron bitácoras para "{searchQuery}"
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Prueba buscando con palabras como "PostgreSQL", "Legacy", "Timezone" o "Ego".
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {activeAnecdote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {activeAnecdote.projectType}
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-2">
                  {activeAnecdote.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{activeAnecdote.tagline}</p>
              </div>
              <button
                onClick={() => setActiveAnecdote(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Technical Challenge */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
                <Code2 className="w-4 h-4" />
                El Reto Técnico & de Programación
              </div>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-800">
                {activeAnecdote.techChallenge}
              </p>
            </div>

            {/* Code Snippet if available */}
            {activeAnecdote.codeSnippet && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Arquitectura / Código de Referencia</span>
                  <span className="text-[10px] text-amber-400 font-semibold">GeekOS Debug Mode</span>
                </div>
                <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-200/90 overflow-x-auto">
                  <code>{activeAnecdote.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Human Dilemma */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-400">
                <HeartHandshake className="w-4 h-4" />
                El Desafío de Relaciones Humanas
              </div>
              <p className="text-sm text-slate-300 leading-relaxed bg-rose-500/5 p-3.5 rounded-xl border border-rose-500/15">
                {activeAnecdote.humanDilemma}
              </p>
            </div>

            {/* Resolution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                La Resolución en el Mundo Real
              </div>
              <p className="text-sm text-slate-300 leading-relaxed bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/15">
                {activeAnecdote.resolution}
              </p>
            </div>

            {/* GeekOS Moral Quote */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                La Máxima de GeekOS
              </div>
              <blockquote className="text-sm text-amber-200 mt-1 font-medium italic">
                "{activeAnecdote.geekosMoral}"
              </blockquote>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                Lecciones Clave para tu Carrera
              </span>
              <ul className="space-y-1">
                {activeAnecdote.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveAnecdote(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cerrar
              </button>

              <button
                onClick={() => {
                  const toExport = activeAnecdote;
                  setActiveAnecdote(null);
                  if (!hasGoogleAuth) {
                    onOpenGoogleAuth();
                  } else {
                    onExportToDrive(toExport);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20 transition-all"
              >
                <CloudUpload className="w-4 h-4" />
                <span>Exportar Bitácora a Google Drive</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
