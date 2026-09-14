import React from "react";
import { motion } from "motion/react";

interface GeekOSAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  isSpeaking?: boolean;
  statusText?: string;
  showBadge?: boolean;
}

export const GeekOSAvatar: React.FC<GeekOSAvatarProps> = ({
  size = "md",
  isSpeaking = false,
  statusText,
  showBadge = true,
}) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-28 h-28",
    xl: "w-44 h-44",
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl p-1 bg-gradient-to-b from-amber-500/20 via-cyan-500/10 to-slate-900 border border-amber-500/30 shadow-lg shadow-amber-500/10 flex items-center justify-center overflow-hidden`}
      >
        {/* Ambient high-tech background grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:8px_8px]" />

        {/* Animated Cyber Gecko SVG */}
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full relative z-10 drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Skin Gradient */}
            <linearGradient id="geckoSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#facc15" />
              <stop offset="70%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            {/* Suit Gradient */}
            <linearGradient id="cyberSuit" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Goggle Lens Amber Glow */}
            <radialGradient id="goggleAmber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="40%" stopColor="#fbbf24" />
              <stop offset="80%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>

            {/* Neon Cyan Circuit */}
            <linearGradient id="cyberCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Cyber Exoskeleton Collar & Shoulders */}
          <path
            d="M 25 155 Q 80 120 135 155 L 145 160 L 15 160 Z"
            fill="url(#cyberSuit)"
            stroke="#0f172a"
            strokeWidth="3"
          />

          {/* Suit Harness & Center Arc Core */}
          <path
            d="M 50 140 L 80 130 L 110 140 L 95 160 L 65 160 Z"
            fill="#1e293b"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <circle cx="80" cy="142" r="6" fill="#06b6d4" className="animate-pulse" />
          <circle cx="80" cy="142" r="3" fill="#ffffff" />

          {/* Neck with Cyber Mesh */}
          <path
            d="M 60 105 L 100 105 L 108 132 L 52 132 Z"
            fill="#0284c7"
            stroke="#0f172a"
            strokeWidth="2"
          />
          {/* Cyber ribbed cables */}
          <line x1="68" y1="112" x2="92" y2="112" stroke="#38bdf8" strokeWidth="2" />
          <line x1="66" y1="120" x2="94" y2="120" stroke="#38bdf8" strokeWidth="2" />
          <line x1="64" y1="128" x2="96" y2="128" stroke="#38bdf8" strokeWidth="2" />

          {/* Gecko Head Base */}
          <ellipse
            cx="80"
            cy="80"
            rx="46"
            ry="34"
            fill="url(#geckoSkin)"
            stroke="#1e293b"
            strokeWidth="2.5"
          />

          {/* Reptilian Crest / Spikes (Yellow Tech Horns) */}
          <polygon points="50,56 56,42 62,54" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
          <polygon points="66,50 74,34 80,48" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
          <polygon points="82,48 88,34 96,50" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
          <polygon points="100,54 106,42 112,56" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />

          {/* Cybernetic Headband / Goggle Strap */}
          <path
            d="M 36 78 C 36 68 124 68 124 78"
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 36 78 C 36 68 124 68 124 78"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Dual Ocular High-Tech Goggles (Left & Right) */}
          {/* Goggle Housing Left */}
          <circle cx="56" cy="76" r="19" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Goggle Lens Left */}
          <circle cx="56" cy="76" r="14" fill="url(#goggleAmber)" />
          {/* Gecko Pupil Left */}
          <ellipse cx="56" cy="76" rx="3.5" ry="11" fill="#020617" />
          {/* Ocular Reticle / HUD */}
          <circle cx="56" cy="76" r="8" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="53" cy="72" r="2.5" fill="#ffffff" opacity="0.8" />

          {/* Goggle Bridge with Hardware Connector */}
          <rect x="71" y="73" width="18" height="6" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="80" y1="73" x2="80" y2="79" stroke="#06b6d4" strokeWidth="1.5" />

          {/* Goggle Housing Right */}
          <circle cx="104" cy="76" r="19" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Goggle Lens Right */}
          <circle cx="104" cy="76" r="14" fill="url(#goggleAmber)" />
          {/* Gecko Pupil Right */}
          <ellipse cx="104" cy="76" rx="3.5" ry="11" fill="#020617" />
          {/* Ocular Reticle / HUD */}
          <circle cx="104" cy="76" r="8" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="101" cy="72" r="2.5" fill="#ffffff" opacity="0.8" />

          {/* Gecko Snout & Smile */}
          <path
            d="M 58 98 Q 80 106 102 98"
            fill="none"
            stroke="#15803d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Subtle Cyber Mic / Comm Headset on the left cheek */}
          <path d="M 38 84 Q 40 102 54 105" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <circle cx="54" cy="105" r="3.5" fill="#38bdf8" />

          {/* Scale Patterns on Forehead and Cheeks */}
          <circle cx="80" cy="62" r="2.5" fill="#ca8a04" />
          <circle cx="75" cy="58" r="1.8" fill="#ca8a04" />
          <circle cx="85" cy="58" r="1.8" fill="#ca8a04" />
          <circle cx="44" cy="92" r="1.5" fill="#ca8a04" />
          <circle cx="116" cy="92" r="1.5" fill="#ca8a04" />
        </svg>

        {/* Dynamic Voice Waves if speaking */}
        {isSpeaking && (
          <div className="absolute bottom-1 inset-x-2 flex items-center justify-center gap-0.5 z-20">
            <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-4 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          </div>
        )}

        {/* Mini online indicator */}
        <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-sm shadow-emerald-400/50" />
      </div>

      {showBadge && (
        <div className="mt-2 text-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            {statusText || "GeekOS v2.6 · Online"}
          </span>
        </div>
      )}
    </div>
  );
};
