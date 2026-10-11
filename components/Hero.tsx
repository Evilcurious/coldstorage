"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, ThermometerSnowflake } from "lucide-react";
import { useQuote } from "./QuoteContext";

const CHAMBERS = [
  { id: "A1", temp: -22.1, status: "Optimal" },
  { id: "A2", temp: -20.4, status: "Optimal" },
  { id: "B1", temp: 3.2, status: "Optimal" },
  { id: "B4", temp: 5.1, status: "Optimal" },
  { id: "C2", temp: -18.6, status: "Optimal" },
  { id: "PH-1", temp: 4.8, status: "GDP Hold" },
  { id: "BF-3", temp: -38.0, status: "Blast Cycle" },
  { id: "D1", temp: 12.4, status: "Ambient Cool" },
];

export function Hero() {
  const { setOpen } = useQuote();
  const [temp, setTemp] = useState(-20.4);

  useEffect(() => {
    const id = setInterval(() => {
      setTemp((t) => {
        const next = t + (Math.random() - 0.5) * 0.12;
        return Math.min(-20.05, Math.max(-20.85, next));
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-warehouse.jpg"
          alt="Automated high-bay cold storage warehouse with robotic pallet systems"
          fill
          priority
          className="object-cover animate-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/55 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/30 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="bg-noise absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-28 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ice-400/25 bg-navy-950/40 px-3 py-1.5 backdrop-blur-md">
            <span className="live-dot" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ice-200">
              Baghdad campus online
            </span>
          </div>

          <p className="mb-4 font-display text-sm tracking-[0.28em] text-ice-300">
            تحسين جابر للخزن البارد
          </p>

          <h1 className="heading-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Next-Generation Cold Chain &amp; Logistics Infrastructure
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Precision temperature control from{" "}
            <span className="font-semibold text-ice-300">−25°C to +15°C</span> for
            food, pharmaceutical, and high-care cargo. HACCP-aligned chambers,
            redundant power, and chain-of-custody visibility across Iraq&apos;s
            premier cold storage campus.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
              Request Storage Quote
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#facilities" className="btn-ghost">
              Explore Facilities
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <ThermometerSnowflake className="h-4 w-4 text-ice-400" />
              Multi-zone −25°C / 0–4°C / +15°C
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-ice-400" />
              Food &amp; pharma safety protocols
            </span>
          </div>
        </div>

        <div className="mt-12 max-w-xl">
          <div className="glass flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl px-5 py-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="live-dot" />
              Live
            </span>
            <p className="font-display text-sm text-white sm:text-base">
              Facility Temp:{" "}
              <span className="text-ice-300 tabular-nums">
                {temp.toFixed(1)}°C
              </span>
              <span className="mx-2 text-slate-600">|</span>
              Status:{" "}
              <span className="text-emerald-300">Optimal</span>
            </p>
            <p className="w-full text-[11px] text-slate-400 sm:w-auto">
              Dual-feed power · Humidity 78–84% · All 24 chambers reporting
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-navy-950/70 backdrop-blur-md">
        <div className="overflow-hidden py-3">
          <div className="ticker-track flex w-max gap-10 pr-10">
            {[...CHAMBERS, ...CHAMBERS].map((c, i) => (
              <div
                key={`${c.id}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap text-xs text-slate-300"
              >
                <span className="rounded bg-ice-400/10 px-1.5 py-0.5 font-mono text-[10px] text-ice-300">
                  {c.id}
                </span>
                <span className="tabular-nums text-white">{c.temp.toFixed(1)}°C</span>
                <span className="text-emerald-400">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
