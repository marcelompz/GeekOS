import React, { useState, useEffect } from "react";
import { DriveFileItem } from "../types";
import { listDriveFiles, createDevLogInDrive, deleteDriveFile } from "../services/driveService";
import {
  Cloud,
  FileText,
  Trash2,
  ExternalLink,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  FolderSync,
  Clock,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { User } from "firebase/auth";

interface DriveBrowserProps {
  user: User | null;
  accessToken: string | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
}

export const DriveBrowser: React.FC<DriveBrowserProps> = ({
  user,
  accessToken,
  onLogin,
  onLogout,
  isLoggingIn,
}) => {
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Note Modal state
  const [showNewNoteModal, setShowNewNoteModal] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Mandatory Confirmation Dialog State for destructive/mutating operations
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionType: "delete" | "create";
    targetId?: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: "",
    description: "",
    actionType: "create",
    onConfirm: async () => {},
  });

  const fetchFiles = async () => {
    if (!accessToken) return;
    setIsLoadingFiles(true);
    setError(null);
    try {
      const items = await listDriveFiles(accessToken);
      setFiles(items);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al conectar con Google Drive.");
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchFiles();
    }
  }, [accessToken]);

  // Request user confirmation before creating a new DevLog
  const handleRequestCreateDevLog = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    setConfirmModal({
      isOpen: true,
      title: "¿Guardar nueva bitácora en Google Drive?",
      description: `Se creará el archivo "${noteTitle}.md" en tu almacenamiento personal de Google Drive.`,
      actionType: "create",
      onConfirm: async () => {
        if (!accessToken) return;
        setIsSaving(true);
        try {
          await createDevLogInDrive(accessToken, noteTitle, noteContent);
          setSuccessMessage(`¡Archivo "${noteTitle}.md" guardado exitosamente en Google Drive!`);
          setShowNewNoteModal(false);
          setNoteTitle("");
          setNoteContent("");
          await fetchFiles();
        } catch (err: any) {
          setError(err.message || "Error al guardar el archivo en Drive.");
        } finally {
          setIsSaving(false);
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // Request user confirmation before deleting (MANDATORY per Workspace skill)
  const handleRequestDelete = (file: DriveFileItem) => {
    setConfirmModal({
      isOpen: true,
      title: `¿Eliminar "${file.name}" de Google Drive?`,
      description: `Esta acción moverá o eliminará el archivo permanentemente de tu cuenta de Google Drive con ID: ${file.id}. Esta operación no se puede deshacer silenciosamente.`,
      actionType: "delete",
      targetId: file.id,
      onConfirm: async () => {
        if (!accessToken) return;
        try {
          await deleteDriveFile(accessToken, file.id);
          setSuccessMessage(`Archivo "${file.name}" eliminado correctamente.`);
          await fetchFiles();
        } catch (err: any) {
          setError(err.message || "Error al eliminar el archivo.");
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // If user is not authenticated, show official Sign In With Google button
  if (!user || !accessToken) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
          <Cloud className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-100">
            Sincronización con Google Drive
          </h3>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Conecta tu cuenta para respaldar bitácoras de código, exportar anécdotas de GeekOS en formato Markdown y organizar tus reflexiones directamente en tu Google Drive.
          </p>
        </div>

        {/* Official Google Sign-In Button compliant with guidelines */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onLogin}
            disabled={isLoggingIn}
            className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-medium text-sm border border-slate-300 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5 shrink-0"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <span className="font-semibold text-slate-700">
              {isLoggingIn ? "Conectando con Google..." : "Sign in with Google"}
            </span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          * La aplicación accederá a tus archivos en Google Drive con el permiso explícito de los usuarios de la aplicación.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Info & Drive Actions Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "Usuario"}
              className="w-11 h-11 rounded-full border-2 border-amber-400/50"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center">
              <UserIcon className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-100">
                {user.displayName || "Usuario Google"}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Drive Conectado
              </span>
            </div>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewNoteModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Crear DevLog</span>
          </button>

          <button
            onClick={fetchFiles}
            disabled={isLoadingFiles}
            title="Refrescar archivos de Drive"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={onLogout}
            title="Desconectar cuenta"
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Files List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            <FolderSync className="w-4 h-4 text-amber-400" />
            <span>Archivos Recientes en Google Drive ({files.length})</span>
          </div>
          <span className="text-[11px] text-slate-500">Ordenados por última modificación</span>
        </div>

        {isLoadingFiles ? (
          <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
            <span>Sincronizando con Google Drive...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No se encontraron archivos o no hay archivos creados aún. ¡Crea un nuevo DevLog o exporta una anécdota!
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {files.map((file) => (
              <div
                key={file.id}
                className="p-3.5 hover:bg-slate-800/50 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs md:text-sm font-semibold text-slate-200 truncate">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-0.5">
                      <span>{file.mimeType}</span>
                      {file.modifiedTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(file.modifiedTime).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {file.webViewLink && (
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Abrir en Google Drive"
                      className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => handleRequestDelete(file)}
                    title="Eliminar de Drive (requiere confirmación)"
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create DevLog Modal */}
      {showNewNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Nueva Bitácora Técnica para Drive
              </h3>
              <button
                onClick={() => setShowNewNoteModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Título del Archivo (se guardará como .md)
                </label>
                <input
                  type="text"
                  placeholder="ej. Refactor-Async-Architecture-2025"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Contenido de la Bitácora (Markdown)
                </label>
                <textarea
                  rows={6}
                  placeholder="# Lecciones Aprendidas&#10;&#10;- Desafío técnico: ...&#10;- Dinámica de equipo: ..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => setShowNewNoteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleRequestCreateDevLog}
                disabled={!noteTitle.trim() || !noteContent.trim() || isSaving}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors disabled:opacity-50"
              >
                Guardar en Drive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY Explicit Confirmation Dialog for Drive Operations */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmModal.actionType === "delete"
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                {confirmModal.title}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              {confirmModal.description}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors ${
                  confirmModal.actionType === "delete"
                    ? "bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                }`}
              >
                {confirmModal.actionType === "delete" ? "Sí, Eliminar de Drive" : "Confirmar y Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
