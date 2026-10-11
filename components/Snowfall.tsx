"use client";

import { useMemo } from "react";
import { mulberry32 } from "@/lib/rand";

type Flake = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  ring: boolean;
};

function buildFlakes(count: number, seed: number): Flake[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const size = 2 + rand() * 4.5;
    return {
      left: rand() * 100,
      size,
      duration: 11 + rand() * 16,
      delay: -rand() * 22,
      drift: (rand() - 0.5) * 90,
      opacity: 0.28 + rand() * 0.5,
      ring: rand() > 0.72,
    };
  });
}

type SnowfallProps = {
  count?: number;
  seed?: number;
  className?: string;
  /** warp the layer to feel slower/faster */
  speed?: number;
};

/**
 * Light, decorative snowfall. Renders only inside a positioned, overflow-hidden
 * parent. Purely presentational: hidden from assistive tech, non-interactive.
 */
export function Snowfall({
  count = 14,
  seed = 7,
  className = "",
  speed = 1,
}: SnowfallProps) {
  const flakes = useMemo(() => buildFlakes(count, seed), [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {flakes.map((flake, i) => (
        <span
          key={i}
          className="animate-snowfall absolute top-0 block"
          style={
            {
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              "--flake-drift": `${flake.drift}px`,
              "--flake-duration": `${flake.duration / speed}s`,
              "--flake-delay": `${flake.delay}s`,
              "--flake-opacity": flake.opacity,
            } as React.CSSProperties
          }
        >
          {flake.ring ? (
            <span className="block h-full w-full rounded-full border border-white/90 bg-white/30 shadow-[0_0_6px_rgba(142,210,248,0.9)]" />
          ) : (
            <span className="block h-full w-full rounded-full bg-white shadow-[0_0_8px_rgba(142,210,248,0.85)]" />
          )}
        </span>
      ))}
    </div>
  );
}
