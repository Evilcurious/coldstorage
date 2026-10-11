"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { useI18n } from "@/components/LanguageProvider";
import { zoneMedia, zoneKeys } from "@/lib/media";

const SCALE_MIN = -30;
const SCALE_MAX = 25;
const SPAN = SCALE_MAX - SCALE_MIN;
const pct = (v: number) => ((v - SCALE_MIN) / SPAN) * 100;

/** Temperature regimes, with the current selection plotted on a single scale. */
export function Zones() {
  const { content } = useI18n();
  const [activeId, setActiveId] = useState(zoneKeys[0]);
  const activeIndex = Math.max(zoneKeys.indexOf(activeId as (typeof zoneKeys)[number]), 0);
  const active = content.zones.items[activeIndex] ?? content.zones.items[0];
  const meta = zoneMedia[active.key];

  return (
    <section id="zones" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={content.zones.eyebrow}
          title={content.zones.title}
          body={content.zones.body}
        />

        {/* selector */}
        <div
          data-reveal
          className="mt-10 flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1.5"
          role="tablist"
          aria-label={content.zones.title}
        >
          {content.zones.items.map((zone) => {
            const isActive = zone.key === active.key;
            return (
              <button
                key={zone.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(zone.key)}
                className={`flex w-full items-baseline justify-between gap-2.5 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 sm:w-auto sm:flex-1 sm:justify-center sm:px-5 sm:text-[13.5px] ${
                  isActive
                    ? "bg-white text-ink-900 shadow-card"
                    : "text-slate-500 hover:text-ember-700"
                }`}
              >
                {zone.label}
                <span
                  className={`numeric text-[12px] font-semibold sm:text-[12.5px] ${
                    isActive ? "text-ember-700" : "text-slate-400"
                  }`}
                >
                  {zone.temp}
                </span>
              </button>
            );
          })}
        </div>

        {/* scale */}
        <div data-reveal className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-[13px] font-semibold text-ink-900">{content.zones.scaleTitle}</p>
            <p className="text-[12px] text-slate-400 sm:text-[12.5px]">{content.zones.scaleHint}</p>
          </div>

          <div className="relative mt-10 h-2 rounded-full bg-gradient-to-r from-ice-800 via-ice-300 to-slate-200">
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
              style={{ left: `calc(${pct(meta.numeric)}% - 1.5px)` }}
            />
            <span
              className="numeric absolute -top-10 left-0 whitespace-nowrap rounded-md bg-ink-900 px-2.5 py-1 font-display text-[11.5px] font-bold text-white transition-[left] duration-700 ease-out"
              style={{ left: `${pct(meta.numeric)}%`, transform: "translateX(-50%)" }}
            >
              {active.temp}
            </span>
          </div>

          <div className="numeric relative mt-3 h-4 text-[10.5px] font-medium text-slate-400 sm:text-[11px]">
            {[-30, -20, -10, 0, 10, 20, 25].map((tick) => (
              <span
                key={tick}
                className={`absolute top-0 ${
                  [-30, -10, 10, 25].includes(tick) ? "" : "hidden sm:block"
                }`}
                style={{
                  left: `${pct(tick)}%`,
                  transform:
                    tick === -30
                      ? "translateX(0)"
                      : tick === 25
                        ? "translateX(-100%)"
                        : "translateX(-50%)",
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
            <div key={active.key} className="enter relative aspect-[16/11] w-full">
              <Image
                src={meta.src}
                alt={`${active.label} · ${active.temp}`}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <SmokeTexture opacity={0.34} seed={40 + meta.numeric} />
              <PanelSmoke variant="floor" intensity={0.75} className="bottom-0 top-auto h-2/3" />
              <span className="numeric absolute start-4 top-4 rounded-md bg-white/95 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-800 backdrop-blur">
                {active.label} · {active.temp}
              </span>
            </div>
          </div>

          <div data-reveal="right" className="card flex flex-col p-6 sm:p-7">
            <p className="text-[14.5px] leading-relaxed text-slate-600">{active.body}</p>

            <dl className="mt-6 border-t border-slate-100 pt-2">
              {active.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0"
                >
                  <dt className="text-[13px] text-slate-500">{spec.label}</dt>
                  <dd className="numeric text-[13.5px] font-semibold text-ink-900">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {content.zones.cargoHeading}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.uses.map((use) => (
                  <span key={use} className="tag-ice">
                    {use}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 text-[13.5px] font-semibold text-ice-700 transition hover:gap-3 hover:text-ember-700"
            >
              {content.ui.checkAvailability}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
