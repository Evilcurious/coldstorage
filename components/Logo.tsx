export function Logo({ compact = false, markId = "iceGrad" }: { compact?: boolean; markId?: string }) {
  const gid = markId;
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="Tahseen Jaber Cold Storage home">
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 shrink-0 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="55%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <polygon
          points="32,4 56,18 56,46 32,60 8,46 8,18"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="1.6"
        />
        <polygon
          points="32,12 48,21 48,43 32,52 16,43 16,21"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="1"
          opacity="0.55"
        />
        <path
          d="M24 38 V26 h6 a6 6 0 0 1 0 12 H24 Z"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M32 4 L32 12 M56 18 L48 21 M56 46 L48 43 M32 60 L32 52 M8 46 L16 43 M8 18 L16 21"
          stroke={`url(#${gid})`}
          strokeWidth="1"
          opacity="0.7"
        />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-[13px] font-semibold tracking-[0.18em] text-white group-hover:text-ice-200 transition">
            TAHSEEN JABER
          </span>
          <span className="text-[10px] font-medium tracking-[0.32em] text-ice-400">
            COLD STORAGE
          </span>
        </span>
      )}
    </a>
  );
}
