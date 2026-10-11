import type { SVGProps } from "react";

/** Corporate mark: a snowflake formed from cold-chain fins inside a rounded tile. */
export function SnowflakeMark({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} {...props}>
      <defs>
        <linearGradient id="markFill" x1="4" y1="4" x2="44" y2="44">
          <stop offset="0%" stopColor="#2A89C8" />
          <stop offset="100%" stopColor="#0E5C8F" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="10" fill="url(#markFill)" />
      <g stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round">
        <path d="M24 11v26" />
        <path d="M13 17.5 35 30.5" />
        <path d="M35 17.5 13 30.5" />
        <path d="M24 11 20.5 15M24 11l3.5 4" />
        <path d="M24 37l-3.5-4M24 37l3.5-4" />
      </g>
    </svg>
  );
}

/** Outlined six-arm crystal — used only as a watermark inside dark panels. */
export function FrostCrystal({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 60} 100 100)`}>
            <path d="M100 100V18" />
            <path d="M100 46l-12-12M100 46l12-12" />
            <path d="M100 70l-9-9M100 70l9-9" />
            <path d="M100 92l-6-6M100 92l6-6" />
          </g>
        ))}
        <circle cx="100" cy="100" r="8" />
      </g>
    </svg>
  );
}
