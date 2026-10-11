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
};

function buildFlakes(count: number, seed: number): Flake[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    size: 1.5 + rand() * 2.5,
    duration: 22 + rand() * 20,
    delay: -rand() * 26,
    drift: (rand() - 0.5) * 50,
    opacity: 0.18 + rand() * 0.3,
  }));
}

type SnowfallProps = {
  count?: number;
  seed?: number;
  className?: string;
  speed?: number;
};

/**
 * Very restrained snowfall — a few slow flakes, used inside photographic panels
 * only. Presentational: hidden from assistive technology, non-interactive.
 */
export function Snowfall({ count = 8, seed = 7, className = "", speed = 1 }: SnowfallProps) {
  const flakes = useMemo(() => buildFlakes(count, seed), [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {flakes.map((flake, i) => (
        <span
          key={i}
          className="animate-snowfall absolute top-0 block rounded-full bg-white"
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
        />
      ))}
    </div>
  );
}
