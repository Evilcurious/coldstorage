"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { zones } from "@/lib/site";

const SCALE_MIN = -30;
const SCALE_MAX = 25;
const SPAN = SCALE_MAX - SCALE_MIN;
const pct = (v: number) => ((v - SCALE_MIN) / SPAN) * 100;

/** Temperature regimes, with the current selection plotted on a single scale. */
export function Zones() {
  const [activeId, setActiveId] = useState(zones[0].id);
  const active = zones.find((z) => z.id === activeId) ?? zones[0];

  return (
    <section id="zones" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Temperature regimes"
          title="Independently controlled rooms for every product family"
          body="Each regime runs on its own refrigeration circuit, alarm set points and calibrated sensors."
        />

        {/* selector */}
        <div
          data-reveal
          className="mt-10 inline-flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1.5"
          role="tablist"
          aria-label="Temperature regime"
        >
          {zones.map((zone) => {
            const isActive = zone.id === activeId;
            return (
              <button
                key={zone.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(zone.id)}
                className={`flex items-baseline gap-2.5 rounded-lg px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-ink-900 shadow-card"
                    : "text-slate-500 hover:text-ink-800"
                }`}
              >
                {zone.label}
                <span
                  className={`text-[12.5px] font-semibold tabular-nums ${
                    isActive ? "text-ice-700" : "text-slate-400"
                  }`}
                >
                  {zone.temp}
                </span>
              </button>
            );
          })}
        </div>

        {/* scale */}
        <div data-reveal className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-ink-900">
              Operating range across the facility
            </p>
            <p className="text-[12.5px] text-slate-400">
              Selected regime highlighted · −30 °C to +25 °C
            </p>
          </div>

          <div className="relative mt-8 h-2 rounded-full bg-gradient-to-r from-ice-800 via-ice-300 to-slate-200">
            {/* regime bands */}
            <span
              className="absolute -top-1.5 h-5 rounded-md border border-ice-700/30 bg-ice-700/10 transition-all duration-500"
              style={{ left: `${pct(-30)}%`, width: `${pct(-18) - pct(-30)}%` }}
            />
            <span
              className="absolute -top-1.5 h-5 rounded-md border border-ice-500/40 bg-ice-500/10 transition-all duration-500"
              style={{ left: `${pct(-2)}%`, width: `${pct(2) - pct(-2)}%` }}
            />
            <span
              className="absolute -top-1.5 h-5 rounded-md border border-emerald-500/40 bg-emerald-500/10 transition-all duration-500"
              style={{ left: `${pct(2)}%`, width: `${pct(8) - pct(2)}%` }}
            />

            {/* active marker */}
            <span
              className="absolute -top-2.5 h-7 w-[3px] rounded-full bg-ink-900 transition-[left] duration-700 ease-out"
              style={{ left: `calc(${pct(active.numeric)}% - 1.5px)` }}
            />
            <span
              className="absolute -top-9 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink-900 px-2.5 py-1 font-display text-[11.5px] font-bold tabular-nums text-white transition-[left] duration-700 ease-out"
              style={{ left: `${pct(active.numeric)}%` }}
            >
              {active.temp}
            </span>
          </div>

          <div className="relative mt-3 h-4 text-[11px] font-medium tabular-nums text-slate-400">
            {[-30, -20, -10, 0, 10, 20, 25].map((tick) => (
              <span
                key={tick}
                className="absolute top-0 -translate-x-1/2"
                style={{
                  left: `${pct(tick)}%`,
                  transform:
                    tick === -30
                      ? "translateX(0)"
                      : tick === 25
                        ? "translateX(-100%)"
                        : undefined,
                }}
              >
                {tick > 0 ? `+${tick}` : tick} °C
              </span>
            ))}
          </div>
        </div>

        {/* detail */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div
            data-reveal="left"
            className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card"
          >
            <div key={active.id} className="enter relative aspect-[16/11] w-full">
              <Image
                src={active.image}
                alt={`${active.label} storage room`}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <SmokeTexture opacity={0.34} seed={40 + active.numeric} />
              <PanelSmoke variant="floor" intensity={0.75} className="bottom-0 top-auto h-2/3" />
              <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-800 backdrop-blur">
                {active.label} · {active.temp}
              </span>
            </div>
          </div>

          <div data-reveal="right" className="card flex flex-col p-6 sm:p-7">
            <p className="text-[14.5px] leading-relaxed text-slate-600">{active.body}</p>

            <dl className="mt-6 border-t border-slate-100 pt-2">
              {active.specs.map((spec) => (
                <div key={spec.label} className="table-row">
                  <dt className="text-[13px] text-slate-500">{spec.label}</dt>
                  <dd className="text-[13.5px] font-semibold tabular-nums text-ink-900">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Typical cargo
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.uses.map((use) => (
                  <span key={use} className="tag-ice">
                    {use}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 text-[13.5px] font-semibold text-ice-700 transition hover:gap-3 hover:text-ice-800"
            >
              Check availability for this regime
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
