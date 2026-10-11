"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const SCALE_MIN = -30;
const SCALE_MAX = -20;

type LiveConditionsProps = {
  room?: string;
  /** set point in °C */
  setPoint?: number;
  /** allowed band in °C */
  band?: [number, number];
  className?: string;
};

/**
 * Compact "live conditions" readout: current temperature, the permitted band and
 * where the room sits inside it. Values breathe slightly so the panel reads as
 * live, without becoming noisy.
 */
export function LiveConditions({
  room = "Deep freeze · Room 04",
  setPoint = -25,
  band = [-27, -23],
  className = "",
}: LiveConditionsProps) {
  const [reading, setReading] = useState(setPoint);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setReading(setPoint + (Math.random() - 0.5) * 0.6);
    }, 2800);
    return () => window.clearInterval(id);
  }, [setPoint]);

  const span = SCALE_MAX - SCALE_MIN;
  const pct = (v: number) => Math.min(Math.max(((v - SCALE_MIN) / span) * 100, 0), 100);

  return (
    <div className={`panel overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <span className="text-2xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {room}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Within range
        </span>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-[34px] font-bold leading-none tracking-tight text-ink-900 tabular-nums">
              {reading.toFixed(1)}
              <span className="ml-1 align-top text-[16px] font-semibold text-slate-400">°C</span>
            </p>
            <p className="mt-2 text-[12px] text-slate-500">
              Set point {setPoint.toFixed(1)} °C · band {band[0]} to {band[1]} °C
            </p>
          </div>
          <p className="text-right text-[11.5px] leading-relaxed text-slate-400">
            Verified
            <br />
            <span className="font-semibold text-slate-500">30 s ago</span>
          </p>
        </div>

        {/* band track */}
        <div className="relative mt-5 h-1.5 rounded-full bg-slate-100">
          <span
            className="absolute inset-y-0 rounded-full bg-ice-100"
            style={{ left: `${pct(band[0])}%`, right: `${100 - pct(band[1])}%` }}
          />
          <span
            className="absolute -top-1 h-3.5 w-[3px] rounded-full bg-ice-700 transition-[left] duration-[1400ms] ease-out"
            style={{ left: `calc(${pct(reading)}% - 1.5px)` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10.5px] font-medium tabular-nums text-slate-400">
          <span>{SCALE_MIN} °C</span>
          <span>{setPoint} °C set point</span>
          <span>{SCALE_MAX} °C</span>
        </div>
      </div>
    </div>
  );
}
