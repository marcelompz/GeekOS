import React, { useState } from "react";
import { Anecdote } from "../types";
import { createDevLogInDrive } from "../services/driveService";
import { CloudUpload, CheckCircle2, AlertTriangle, FileText, Loader2 } from "lucide-react";

interface ExportConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  anecdote: Anecdote | null;
  customTitle?: string;
  customContent?: string;
  accessToken: string | null;
  onSuccess: (fileName: string) => void;
}

export const ExportConfirmModal: React.FC<ExportConfirmModalProps> = ({
  isOpen,
  onClose,
  anecdote,
  customTitle,
  customContent,
  accessToken,
  onSuccess,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const title = customTitle || (anecdote ? `GeekOS-DevLog-${anecdote.title.replace(/\s+/g, "-")}` : "GeekOS-Bitacora");
  
  let markdownBody = customContent || "";
  if (!markdownBody && anecdote) {
    markdownBody = `# Bitácora Técnica: ${anecdote.title}
*Proyecto: ${anecdote.projectType}*
*Fecha: ${anecdote.date}*
*Canal GeekOS: https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg*

---

## 🛠️ El Reto Técnico & de Programación
${anecdote.techChallenge}

${anecdote.codeSnippet ? `\`\`\`typescript\n${anecdote.codeSnippet}\n\`\`\`\n` : ""}

## 🤝 El Desafío Humano en Sistemas Actuales
${anecdote.humanDilemma}

## 🚀 Resolución en el Mundo Real
${anecdote.resolution}

## 💡 La Máxima de GeekOS
> "${anecdote.geekosMoral}"

## 📌 Lecciones Clave:
${anecdote.keyTakeaways.map((t) => `- ${t}`).join("\n")}
`;
  }

  const handleConfirmExport = async () => {
    if (!accessToken) {
      setError("No hay una sesión activa de Google Drive.");
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      await createDevLogInDrive(accessToken, title, markdownBody);
      onSuccess(`${title}.md`);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al exportar a Google Drive.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <CloudUpload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Confirmación de Exportación a Google Drive
              </h3>
              <p className="text-[11px] text-slate-400">
                Se requiere tu confirmación para crear un archivo en tu Drive
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">
              Nombre del archivo en Google Drive:
            </span>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>{title}.md</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">
              Previsualización del Contenido:
            </span>
            <div className="max-h-48 overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed scrollbar-thin">
              {markdownBody}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmExport}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando en Drive...</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                <span>Confirmar y Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
