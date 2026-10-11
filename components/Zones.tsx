"use client";

import { useState } from "react";
import Image from "next/image";
import { Droplets, Gauge, Snowflake, ThermometerSnowflake, Warehouse } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Snowfall } from "@/components/Snowfall";
import { zones } from "@/lib/site";

const MIN = -30;
const MAX = 20;
const fillFor = (t: number) => Math.min(Math.max((t - MIN) / (MAX - MIN), 0.06), 0.94);

export function Zones() {
  const [activeId, setActiveId] = useState(zones[0].id);
  const active = zones.find((z) => z.id === activeId) ?? zones[0];

  const fill = fillFor(active.numeric);
  const fillPercent = fill * 100;

  return (
    <section id="zones" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Temperature zones"
          title={
            <>
              Pick a temperature. <span className="gradient-text">We already hold it.</span>
            </>
          }
          body="Four independently controlled regimes, each with its own refrigeration circuit, alarm set points and calibrated sensors."
        />

        {/* selector */}
        <div data-reveal className="mt-12 flex flex-wrap justify-center gap-3">
          {zones.map((zone) => {
            const isActive = zone.id === activeId;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveId(zone.id)}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-all duration-500 ${
                  isActive
                    ? "border-transparent bg-brand-grad text-white shadow-glow"
                    : "border-frost-400 bg-white/80 text-ink-700 shadow-soft hover:-translate-y-0.5 hover:border-ice-400"
                }`}
              >
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                  <Snowflake
                    className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-ice-400"}`}
                  />
                  {zone.label}
                </span>
                <span className="mt-1 block font-display text-[22px] font-extrabold tabular-nums leading-none">
                  {zone.temp}
                </span>
                {isActive ? (
                  <span className="animate-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.12fr_1fr]">
          {/* ---- visual ---- */}
          <div
            data-reveal="scale"
            className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-lift"
          >
            <div key={active.id} className="enter relative aspect-[16/11] w-full overflow-hidden">
              <Image
                src={active.image}
                alt={`${active.label} storage room at ${active.temp}`}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/5 to-ice-300/20" />
              <Snowfall count={13} seed={active.numeric + 40} speed={active.numeric < -10 ? 1.3 : 0.85} />

              <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
                <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ice-700 backdrop-blur">
                  {active.label}
                </span>
                <span className="rounded-full bg-ink-900/75 px-3.5 py-1.5 font-display text-[13px] font-bold tabular-nums text-frost-100 backdrop-blur">
                  {active.temp}
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5">
                <p className="font-display text-[17px] font-bold text-white sm:text-[19px]">
                  Validated for {active.uses[0].toLowerCase()} and {active.uses.length - 1} more
                  cargo families
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.uses.map((use) => (
                    <span
                      key={use}
                      className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[11.5px] font-medium text-white backdrop-blur-sm"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- thermometer + detail ---- */}
          <div data-reveal="right" className="card relative overflow-hidden rounded-[32px] p-6 sm:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-frost-300/40 blur-3xl"
            />

            <div className="relative flex items-center justify-between">
              <h3 className="font-display text-[17px] font-bold text-ink-900">
                Holding conditions
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-frost-400/70 bg-white/80 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-ice-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-ice-500" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ice-500" />
                </span>
                Stabilised
              </span>
            </div>

            <div className="relative mt-6 flex items-stretch gap-6">
              {/* thermometer */}
              <div className="relative w-[86px] shrink-0">
                <svg viewBox="0 0 86 260" className="h-[236px] w-full">
                  <defs>
                    <linearGradient id="tubeFill" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#1b7cc4" />
                      <stop offset="60%" stopColor="#57b7ef" />
                      <stop offset="100%" stopColor="#a9d4f4" />
                    </linearGradient>
                    <clipPath id="tubeClip">
                      <path d="M35 34a8 8 0 0 1 16 0v168a14 14 0 1 1-16 0z" />
                    </clipPath>
                    <clipPath id="bulbClip">
                      <circle cx="43" cy="222" r="24" />
                    </clipPath>
                  </defs>

                  {/* tube outline */}
                  <path
                    d="M27 34a16 16 0 0 1 32 0v160a24 24 0 1 1-32 0z"
                    fill="#f2f8ff"
                    stroke="#cbe5fa"
                    strokeWidth="2"
                  />

                  {/* fill */}
                  <g clipPath="url(#tubeClip)">
                    <rect
                      x="27"
                      y={34 + 168 * (1 - fill)}
                      width="32"
                      height={168 * fill + 40}
                      fill="url(#tubeFill)"
                      className="transition-all duration-[1200ms] ease-out"
                    />
                  </g>
                  <g clipPath="url(#bulbClip)">
                    <circle cx="43" cy={222 + (24 - 24 * fill) * 0.2} r="24" fill="url(#tubeFill)" />
                  </g>

                  {/* ice point marker */}
                  <line x1="14" y1={34 + 168 * (1 - fillFor(0))} x2="72" y2={34 + 168 * (1 - fillFor(0))} stroke="#9bb2c6" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="14" y1="34" x2="72" y2="34" stroke="#9bb2c6" strokeWidth="1" strokeDasharray="3 3" />

                  <circle cx="43" cy="222" r="24" fill="none" stroke="#cbe5fa" strokeWidth="2" />
                </svg>

                {/* moving reading bubble */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-900 px-2.5 py-1 font-display text-[12px] font-bold tabular-nums text-white shadow-lift transition-all duration-[1200ms] ease-out"
                  style={{ bottom: `${28 + fillPercent * 1.55}px` }}
                >
                  {active.temp}
                </span>
              </div>

              <div className="flex-1">
                <p className="text-[14.5px] leading-relaxed text-ink-500">{active.body}</p>

                <dl className="mt-5 space-y-3.5">
                  {[
                    { icon: ThermometerSnowflake, label: "Set point", value: active.temp },
                    {
                      icon: Gauge,
                      label: "Allowable deviation",
                      value: active.id === "pharma" ? "±0.5 °C" : "±1.0 °C",
                    },
                    {
                      icon: Droplets,
                      label: "Relative humidity",
                      value: active.id === "chilled" ? "88 %" : "70 %",
                    },
                    {
                      icon: Warehouse,
                      label: "Room capacity",
                      value: active.id === "frozen" ? "7,400 pallets" : active.id === "chilled" ? "5,100 pallets" : "2,300 pallets",
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4">
                      <dt className="inline-flex items-center gap-2.5 text-[13.5px] text-ink-400">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-frost-100 text-ice-600">
                          <row.icon className="h-4 w-4" />
                        </span>
                        {row.label}
                      </dt>
                      <dd className="font-display text-[14px] font-bold tabular-nums text-ink-900">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="relative mt-6 rounded-2xl border border-frost-300 bg-frost-100/60 p-4">
              <p className="text-[12.5px] leading-relaxed text-ink-500">
                <span className="font-semibold text-ice-700">Every change is logged.</span> Door
                openings, defrost cycles and compressor starts are timestamped against the pallets
                inside the room, so you can reconstruct the history of any consignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
