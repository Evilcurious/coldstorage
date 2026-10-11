"use client";

import { useId } from "react";

type Plume = {
  left: string;
  top: string;
  size: string;
  opacity: number;
  duration: number;
  delay: number;
  x: string;
  y: string;
  cool?: boolean;
};

const pagePlumes: Plume[] = [
  { left: "-12%", top: "4%", size: "46rem", opacity: 0.34, duration: 52, delay: 0, x: "9%", y: "-7%" },
  { left: "58%", top: "18%", size: "38rem", opacity: 0.28, duration: 46, delay: -12, x: "-8%", y: "6%", cool: true },
  { left: "12%", top: "52%", size: "52rem", opacity: 0.3, duration: 58, delay: -22, x: "7%", y: "8%", cool: true },
  { left: "66%", top: "68%", size: "44rem", opacity: 0.32, duration: 50, delay: -6, x: "-10%", y: "-6%" },
];

function Plumes({ plumes }: { plumes: Plume[] }) {
  return (
    <>
      {plumes.map((plume, i) => (
        <span
          key={i}
          className={`smoke-plume ${plume.cool ? "smoke-plume--cool" : ""}`}
          style={
            {
              left: plume.left,
              top: plume.top,
              width: plume.size,
              height: plume.size,
              "--smoke-opacity": plume.opacity,
              "--smoke-duration": `${plume.duration}s`,
              "--smoke-delay": `${plume.delay}s`,
              "--smoke-x": plume.x,
              "--smoke-y": plume.y,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

/**
 * Site-wide cold vapour: a fixed layer of slow, very faint plumes that drifts
 * above the page content. Purely decorative and non-interactive.
 */
export function SiteSmoke() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden mix-blend-normal"
    >
      <Plumes plumes={pagePlumes} />
    </div>
  );
}

/**
 * Local smoke for hero and photographic panels. `variant="floor"` adds a heavier
 * rolling mist close to the bottom edge.
 */
export function PanelSmoke({
  className = "",
  variant = "drift",
  intensity = 1,
}: {
  className?: string;
  variant?: "drift" | "floor" | "both";
  intensity?: number;
}) {
  const plumes: Plume[] = [
    { left: "-16%", top: "18%", size: "34rem", opacity: 0.4 * intensity, duration: 40, delay: 0, x: "10%", y: "-8%", cool: true },
    { left: "42%", top: "6%", size: "30rem", opacity: 0.34 * intensity, duration: 34, delay: -9, x: "-9%", y: "7%" },
    { left: "58%", top: "46%", size: "38rem", opacity: 0.36 * intensity, duration: 46, delay: -18, x: "8%", y: "-7%", cool: true },
  ];

  const showFloor = variant === "floor" || variant === "both";
  const showDrift = variant === "drift" || variant === "both";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {showDrift ? <Plumes plumes={plumes} /> : null}
      {showFloor ? (
        <span className="smoke-floor absolute inset-x-[-10%] bottom-[-6%] h-[52%]" />
      ) : null}
    </div>
  );
}

/**
 * Animated turbulence texture — reads as thin, slowly churning vapour.
 * Rendered at low resolution and stretched, so the filter stays cheap.
 */
export function SmokeTexture({
  className = "",
  opacity = 0.3,
  seed = 3,
  scale = 1,
  animated = false,
}: {
  className?: string;
  opacity?: number;
  seed?: number;
  scale?: number;
  /** animate the noise: only enable where the layer is prominent */
  animated?: boolean;
}) {
  const raw = useId().replace(/[:]/g, "");
  const id = `smoke-${raw}-${seed}`;

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <defs>
        <filter id={id} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={`${0.008 * scale} ${0.03 * scale}`}
            numOctaves="3"
            seed={seed}
            result="noise"
          >
            {animated ? (
              <animate
                attributeName="baseFrequency"
                dur="38s"
                values={`${0.008 * scale} ${0.03 * scale};${0.016 * scale} ${0.046 * scale};${
                  0.008 * scale
                } ${0.03 * scale}`}
                repeatCount="indefinite"
              />
            ) : null}
          </feTurbulence>
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0.85 0.45 0 0 -0.6"
          />
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>
      <rect width="600" height="300" filter={`url(#${id})`} />
    </svg>
  );
}
