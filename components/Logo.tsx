import type { SVGProps } from "react";
import { site } from "@/lib/site";

/**
 * Brand mark: warehouse slats under a mountain ridge — navy outline, rust fill.
 * Rebuilt as vector art so it stays sharp at every size.
 */
export function BrandMark({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 132 80" fill="none" className={className} {...props}>
      <defs>
        <linearGradient id="slatFill" x1="10" y1="20" x2="52" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4683F" />
          <stop offset="55%" stopColor="#A8481E" />
          <stop offset="100%" stopColor="#8A3413" />
        </linearGradient>
        <linearGradient id="peakFill" x1="50" y1="18" x2="112" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4683F" />
          <stop offset="60%" stopColor="#A8481E" />
          <stop offset="100%" stopColor="#8A3413" />
        </linearGradient>
      </defs>

      {/* warehouse: vertical slats, roof edge stepping down to the right */}
      <g fill="url(#slatFill)">
        <rect x="8" y="20" width="5" height="40" />
        <rect x="15" y="16" width="5" height="44" />
        <rect x="22" y="13" width="5" height="47" />
        <rect x="29" y="15" width="5" height="45" />
        <rect x="36" y="19" width="5" height="41" />
        <rect x="43" y="24" width="5" height="36" />
      </g>

      {/* ground line + left column foot */}
      <g fill="#A8481E">
        <rect x="2" y="62" width="54" height="4" rx="1" />
        <rect x="8" y="52" width="5" height="10" />
      </g>

      {/* mountain ridge, navy outline */}
      <path
        d="M40 60 L72 24 L88 40 L104 22 L128 52"
        stroke="#1B3A63"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* inner ridge line, thinner, warmer */}
      <path
        d="M62 60 L84 34 L96 46 L110 32"
        stroke="#A8481E"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* filled peaks sitting inside the ridge */}
      <path d="M56 60 L78 34 L100 60 Z" fill="url(#peakFill)" />
      <path d="M92 60 L110 40 L126 60 Z" fill="url(#peakFill)" opacity="0.95" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** wordmark colour treatment */
  tone?: "dark" | "light";
};

/**
 * Full brand lockup: mark + "TAHSEEN JABER" wordmark with the routed
 * "COLD STORAGE" line beneath, as in the supplied logo.
 */
export function Logo({ className = "", tone = "dark" }: LogoProps) {
  const navy = tone === "dark" ? "text-ink-900" : "text-white";
  const rust = tone === "dark" ? "text-ember-600" : "text-ember-400";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <BrandMark className="h-full w-auto shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span
          className={`font-display text-[14px] font-extrabold uppercase leading-none tracking-[0.02em] sm:text-[15.5px] ${navy}`}
        >
          {site.wordmark}
        </span>
        <span className="mt-[5px] flex items-center gap-1.5">
          <span className={`h-px w-2.5 ${tone === "dark" ? "bg-ember-500" : "bg-ember-400"}`} />
          <span
            className={`text-[8px] font-semibold uppercase leading-none tracking-[0.3em] sm:text-[8.5px] ${rust}`}
          >
            {site.wordmarkSub}
          </span>
          <span className={`h-px w-2.5 ${tone === "dark" ? "bg-ember-500" : "bg-ember-400"}`} />
        </span>
      </span>
    </span>
  );
}
