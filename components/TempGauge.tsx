"use client";

import { useEffect, useState } from "react";

const MIN = -35;
const MAX = 25;

function fractionOf(t: number) {
  return Math.min(Math.max((t - MIN) / (MAX - MIN), 0), 1);
}

/** Polar helper: 0° = straight up, negative rotates counter-clockwise. */
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
}

const arc = (() => {
  const [x0, y0] = polar(100, 100, 78, -90);
  const [x1, y1] = polar(100, 100, 78, 90);
  return `M ${x0} ${y0} A 78 78 0 0 1 ${x1} ${y1}`;
})();

const arcFill = (() => {
  const f = fractionOf(-25);
  const [x0, y0] = polar(100, 100, 78, -90);
  const [x1, y1] = polar(100, 100, 78, -90 + f * 180);
  return `M ${x0} ${y0} A 78 78 0 0 1 ${x1} ${y1}`;
})();

type TempGaugeProps = {
  /** centre temperature in °C */
  value: number;
  label?: string;
  caption?: string;
  className?: string;
};

/**
 * A glassy analogue temperature dial. The needle breathes around `value`
 * so the readout always looks live without being noisy.
 */
export function TempGauge({
  value,
  label = "Room 04 · Deep freeze",
  caption = "Set point −25.0 °C · deviation ±0.2 °C",
  className = "",
}: TempGaugeProps) {
  const [reading, setReading] = useState(value);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setReading(value + (Math.random() - 0.45) * 0.7);
    }, 2100);
    return () => window.clearInterval(id);
  }, [value]);

  const rotation = -90 + fractionOf(reading) * 180;

  return (
    <div className={`card sheen overflow-hidden p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ice-600">
            {label}
          </p>
          <p className="mt-1 text-[11.5px] text-ink-400">{caption}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-frost-400/70 bg-frost-100/80 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-ice-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-ice-500" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ice-500" />
          </span>
          Live
        </span>
      </div>

      <div className="mt-3 flex items-end gap-5">
        <svg viewBox="0 0 200 130" className="h-[104px] w-[168px] shrink-0 overflow-visible">
          <defs>
            <linearGradient id="gaugeTrack" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbe5fa" />
              <stop offset="100%" stopColor="#e0efff" />
            </linearGradient>
            <linearGradient id="gaugeFill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1b7cc4" />
              <stop offset="100%" stopColor="#8ed2f8" />
            </linearGradient>
          </defs>

          <path d={arc} stroke="url(#gaugeTrack)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path
            d={arcFill}
            stroke="url(#gaugeFill)"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            className="[stroke-dasharray:260] [stroke-dashoffset:0] transition-all duration-700"
          />

          {Array.from({ length: 7 }).map((_, i) => {
            const t = MIN + (i * (MAX - MIN)) / 6;
            const deg = -90 + fractionOf(t) * 180;
            const [x1, y1] = polar(100, 100, 66, deg);
            const [x2, y2] = polar(100, 100, 58, deg);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(46,155,230,0.35)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            );
          })}

          <g
            className="transition-transform duration-[1400ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "100px 100px" }}
          >
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="38"
              stroke="#0a2540"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          <circle cx="100" cy="100" r="7" fill="#ffffff" stroke="#2e9be6" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="2.5" fill="#2e9be6" />
        </svg>

        <div className="pb-2">
          <p className="font-display text-[38px] font-extrabold leading-none tracking-tight text-ink-900 tabular-nums">
            {reading.toFixed(1)}
            <span className="ml-1 align-top text-lg font-bold text-ice-500">°C</span>
          </p>
          <p className="mt-2 text-[11.5px] font-medium text-ink-400">
            In-range for <span className="tabular-nums text-ice-700">412</span> days
          </p>
        </div>
      </div>

      {/* temperature history strip */}
      <div className="mt-3 flex h-9 items-end gap-[3px]">
        {[26, 22, 18, 20, 15, 14, 17, 12, 13, 11, 14, 10, 12, 9, 11, 13, 10, 12, 9, 8, 11, 10, 12, 9].map(
          (h, i) => (
            <span
              key={i}
              className="animate-rise-fall flex-1 rounded-sm bg-gradient-to-t from-ice-300/70 to-ice-500/80"
              style={{ height: `${h + 6}px`, animationDelay: `${i * 90}ms` }}
            />
          ),
        )}
      </div>
    </div>
  );
}
