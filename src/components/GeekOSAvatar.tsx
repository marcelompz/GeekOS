import React from "react";

export type GeekOSExpression = "default" | "coding" | "thinking" | "happy" | "debugging";

interface GeekOSAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  expression?: GeekOSExpression;
  isSpeaking?: boolean;
  statusText?: string;
  showBadge?: boolean;
}

export const GeekOSAvatar: React.FC<GeekOSAvatarProps> = ({
  size = "md",
  expression = "default",
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

  const getBorderTheme = () => {
    switch (expression) {
      case "coding":
        return "border-cyan-400/50 shadow-cyan-500/20 bg-gradient-to-b from-cyan-500/20 via-slate-900 to-slate-950";
      case "thinking":
        return "border-amber-400/50 shadow-amber-500/20 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950";
      case "happy":
        return "border-emerald-400/50 shadow-emerald-500/20 bg-gradient-to-b from-emerald-500/20 via-slate-900 to-slate-950";
      case "debugging":
        return "border-rose-400/50 shadow-rose-500/20 bg-gradient-to-b from-rose-500/20 via-slate-900 to-slate-950";
      default:
        return "border-amber-500/30 shadow-amber-500/10 bg-gradient-to-b from-amber-500/20 via-cyan-500/10 to-slate-900";
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl p-1 border shadow-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${getBorderTheme()}`}
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
              <stop offset="40%" stopColor={expression === "debugging" ? "#f43f5e" : expression === "coding" ? "#38bdf8" : "#fbbf24"} />
              <stop offset="80%" stopColor={expression === "debugging" ? "#be123c" : expression === "coding" ? "#0284c7" : "#d97706"} />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
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
            stroke={expression === "happy" ? "#10b981" : expression === "coding" ? "#06b6d4" : "#f59e0b"}
            strokeWidth="2"
          />
          <circle
            cx="80"
            cy="142"
            r="6"
            fill={expression === "happy" ? "#10b981" : expression === "debugging" ? "#f43f5e" : "#06b6d4"}
            className="animate-pulse"
          />
          <circle cx="80" cy="142" r="3" fill="#ffffff" />

          {/* Neck with Cyber Mesh */}
          <path
            d="M 60 105 L 100 105 L 108 132 L 52 132 Z"
            fill="#0284c7"
            stroke="#0f172a"
            strokeWidth="2"
          />
          <line x1="68" y1="112" x2="92" y2="112" stroke="#38bdf8" strokeWidth="2" />
          <line x1="66" y1="120" x2="94" y2="120" stroke="#38bdf8" strokeWidth="2" />
          <line x1="64" y1="128" x2="96" y2="128" stroke="#38bdf8" strokeWidth="2" />

          {/* Head Container with Tilt Transformation if thinking */}
          <g transform={expression === "thinking" ? "rotate(-5 80 75)" : ""}>
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

            {/* Cybernetic Headband */}
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
              stroke={expression === "coding" ? "#38bdf8" : "#f59e0b"}
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Goggle Housing Left */}
            <circle cx="56" cy="76" r="19" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="56" cy="76" r="14" fill="url(#goggleAmber)" />
            
            {/* Pupil Left */}
            {expression === "happy" ? (
              // Joyful crescent eye
              <path d="M 48 76 Q 56 68 64 76" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
            ) : (
              <ellipse cx="56" cy="76" rx={expression === "coding" ? 2.5 : 3.5} ry="11" fill="#020617" />
            )}
            
            {/* Ocular HUD Left */}
            <circle cx="56" cy="76" r="8" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="53" cy="72" r="2.5" fill="#ffffff" opacity="0.8" />

            {/* Goggle Bridge */}
            <rect x="71" y="73" width="18" height="6" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="80" y1="73" x2="80" y2="79" stroke="#06b6d4" strokeWidth="1.5" />

            {/* Goggle Housing Right */}
            <circle cx="104" cy="76" r="19" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="104" cy="76" r="14" fill="url(#goggleAmber)" />
            
            {/* Pupil Right */}
            {expression === "happy" ? (
              // Joyful crescent eye
              <path d="M 96 76 Q 104 68 112 76" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
            ) : (
              <ellipse cx="104" cy="76" rx={expression === "coding" ? 2.5 : 3.5} ry="11" fill="#020617" />
            )}
            
            {/* Ocular HUD Right */}
            <circle cx="104" cy="76" r="8" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="101" cy="72" r="2.5" fill="#ffffff" opacity="0.8" />

            {/* Mouth / Smile depending on expression */}
            {expression === "happy" ? (
              // Big happy enthusiastic open smile
              <g>
                <path
                  d="M 56 96 Q 80 114 104 96 Z"
                  fill="#7f1d1d"
                  stroke="#15803d"
                  strokeWidth="2.5"
                />
                <path d="M 68 104 Q 80 112 92 104" fill="#fb7185" />
              </g>
            ) : expression === "thinking" ? (
              // Pensive, sideways smirk
              <path
                d="M 64 100 Q 82 98 96 95"
                fill="none"
                stroke="#15803d"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ) : expression === "debugging" ? (
              // Serious determined straight line
              <line x1="62" y1="99" x2="98" y2="99" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
            ) : (
              // Default warm smile
              <path
                d="M 58 98 Q 80 106 102 98"
                fill="none"
                stroke="#15803d"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            )}

            {/* Comm Mic */}
            <path d="M 38 84 Q 40 102 54 105" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            <circle cx="54" cy="105" r="3.5" fill="#38bdf8" />

            {/* Scales details */}
            <circle cx="80" cy="62" r="2.5" fill="#ca8a04" />
            <circle cx="75" cy="58" r="1.8" fill="#ca8a04" />
            <circle cx="85" cy="58" r="1.8" fill="#ca8a04" />
          </g>

          {/* EXPRESSION SPECIFIC OVERLAYS */}

          {/* 1. CODING: Holographic terminal matrix and keyboard fingertips */}
          {expression === "coding" && (
            <g>
              {/* Floating Holographic code console */}
              <rect x="20" y="112" width="120" height="36" rx="6" fill="#030712" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="26" y="124" fill="#4ade80" fontSize="7" fontFamily="monospace" fontWeight="bold">
                $ vim kernel.rs
              </text>
              <text x="26" y="134" fill="#38bdf8" fontSize="6" fontFamily="monospace">
                &gt; async fn sync_ledger()
              </text>
              <text x="26" y="143" fill="#facc15" fontSize="6" fontFamily="monospace">
                &gt; compiling: 100% OK
              </text>
              {/* Blinking cursor */}
              <rect x="110" y="137" width="4" height="6" fill="#38bdf8" className="animate-pulse" />

              {/* Cyber gecko mechanical typing paws */}
              <circle cx="34" cy="150" r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="44" cy="148" r="4.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="116" cy="148" r="4.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="126" cy="150" r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
            </g>
          )}

          {/* 2. THINKING: Cyber hand scratching chin and floating architectural gears */}
          {expression === "thinking" && (
            <g>
              {/* Floating idea node / gear */}
              <circle cx="124" cy="38" r="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M 124 30 L 124 46 M 116 38 L 132 38" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
              <circle cx="124" cy="38" r="4" fill="#06b6d4" />
              {/* Question / spark glyph */}
              <text x="138" y="32" fill="#facc15" fontSize="11" fontWeight="bold" fontFamily="monospace">
                ?
              </text>

              {/* Cyber claw holding chin */}
              <path
                d="M 94 116 Q 96 104 88 102"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="88" cy="102" r="3.5" fill="#06b6d4" />
            </g>
          )}

          {/* 3. HAPPY: Celebratory stars and cyber thumbs-up */}
          {expression === "happy" && (
            <g>
              {/* Golden sparkles */}
              <polygon points="30,34 33,26 36,34 44,37 36,40 33,48 30,40 22,37" fill="#facc15" className="animate-ping" />
              <polygon points="128,48 130,42 132,48 138,50 132,52 130,58 128,52 122,50" fill="#38bdf8" />

              {/* Cyber thumbs-up hand on right shoulder */}
              <g transform="translate(118, 116)">
                <rect x="0" y="6" width="16" height="18" rx="4" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
                {/* Thumb pointing up */}
                <path d="M 4 8 L 4 0 Q 8 -4 12 0 L 12 8 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                <circle cx="8" cy="2" r="1.5" fill="#ffffff" />
                {/* Glow spark */}
                <circle cx="8" cy="-6" r="3" fill="#10b981" className="animate-pulse" />
              </g>
            </g>
          )}

          {/* 4. DEBUGGING: Radar HUD and tracking crosshair */}
          {expression === "debugging" && (
            <g>
              {/* Radar scanner sweep on top left */}
              <circle cx="34" cy="40" r="12" fill="#881337" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="34" y1="28" x2="34" y2="52" stroke="#f43f5e" strokeWidth="1" />
              <line x1="22" y1="40" x2="46" y2="40" stroke="#f43f5e" strokeWidth="1" />
              {/* Little cyber bug target icon */}
              <circle cx="34" cy="40" r="3" fill="#f43f5e" className="animate-ping" />

              <text x="50" y="42" fill="#fda4af" fontSize="7" fontFamily="monospace" fontWeight="bold">
                DEADLOCK LOCATED
              </text>
            </g>
          )}
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

        {/* Mini online status dot */}
        <div
          className={`absolute top-1.5 right-1.5 w-3 h-3 rounded-full border-2 border-slate-900 shadow-sm ${
            expression === "debugging"
              ? "bg-rose-500 shadow-rose-500/50 animate-pulse"
              : expression === "coding"
              ? "bg-cyan-400 shadow-cyan-400/50"
              : "bg-emerald-400 shadow-emerald-400/50"
          }`}
        />
      </div>

      {showBadge && (
        <div className="mt-2 text-center">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border transition-all ${
              expression === "coding"
                ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                : expression === "thinking"
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                : expression === "happy"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : expression === "debugging"
                ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                : "bg-slate-800 text-slate-300 border-slate-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                expression === "coding"
                  ? "bg-cyan-400 animate-ping"
                  : expression === "happy"
                  ? "bg-emerald-400"
                  : expression === "debugging"
                  ? "bg-rose-400 animate-pulse"
                  : "bg-amber-400"
              }`}
            />
            {statusText ||
              (expression === "coding"
                ? "Compilando en Debian"
                : expression === "thinking"
                ? "Analizando Arquitectura"
                : expression === "happy"
                ? "¡Deploy Exitoso!"
                : expression === "debugging"
                ? "Rastreando Deadlock"
                : "GeekOS v2.6 · Online")}
          </span>
        </div>
      )}
    </div>
  );
};
