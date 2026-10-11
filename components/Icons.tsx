import type { SVGProps } from "react";

/** Brand mark: a snowflake formed from cold-chain fins inside a frozen tile. */
export function SnowflakeMark({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} {...props}>
      <defs>
        <linearGradient id="markFill" x1="4" y1="4" x2="44" y2="44">
          <stop offset="0%" stopColor="#8ed2f8" />
          <stop offset="45%" stopColor="#2e9be6" />
          <stop offset="100%" stopColor="#1b7cc4" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="14" fill="url(#markFill)" />
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="14"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <g stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round">
        <path d="M24 11v26" />
        <path d="M13 17.5 35 30.5" />
        <path d="M35 17.5 13 30.5" />
        <path d="M24 11 20.5 15M24 11l3.5 4" />
        <path d="M24 37l-3.5-4M24 37l3.5-4" />
      </g>
      <circle cx="24" cy="24" r="3.2" fill="#ffffff" />
    </svg>
  );
}

/** Six-armed crystal used as a decorative, slowly rotating backdrop. */
export function FrostCrystal({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 60} 100 100)`}>
            <path d="M100 100V22" />
            <path d="M100 44l-14-14M100 44l14-14" />
            <path d="M100 66l-10-10M100 66l10-10" />
            <path d="M100 88l-7-7M100 88l7-7" />
          </g>
        ))}
        <circle cx="100" cy="100" r="7" />
        <circle cx="100" cy="100" r="30" strokeDasharray="3 7" />
      </g>
    </svg>
  );
}

/** Long, brushed-ice divider band with a snowflake rhythm. */
export function FrostRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-4 ${className}`}>
      <span className="frost-divider flex-1" />
      <SnowflakeMark className="h-4 w-4 opacity-50" />
      <span className="frost-divider flex-1" />
    </div>
  );
}

/** Little puff of frost used at section corners. */
export function FrostPuff({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 240 120" className={className} fill="none">
      <path
        d="M4 118c22-46 52-72 88-78 30-5 52 8 74 26 18 15 36 30 70 34"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="6 10"
        opacity="0.65"
      />
      <path
        d="M18 118c20-36 46-56 76-60 26-4 44 8 62 22"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.45"
      />
    </svg>
  );
}
