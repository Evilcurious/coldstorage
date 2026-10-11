"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Fingerprint, ShieldCheck, Zap } from "lucide-react";

const PILLARS = [
  {
    icon: Fingerprint,
    title: "24/7 biometric security",
    copy: "Mantraps, biometric access, CCTV analytics, and sealed dock protocols. Every movement is logged against a named custodian.",
  },
  {
    icon: Zap,
    title: "Backup power redundancy",
    copy: "N+1 generators, dual utility feeds, and UPS on critical controls. Temperature never waits on the grid.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance by design",
    copy: "HACCP, ISO 22000, GDP mapping, and documented SOPs for food and pharmaceutical cargo — audit-ready on demand.",
  },
];

const STATS = [
  { label: "Total cubic capacity", value: 185000, suffix: " m³", format: "comma" },
  { label: "Documented uptime", value: 99.98, suffix: "%", format: "decimal" },
  { label: "Tons on campus", value: 28000, suffix: "+", format: "comma" },
  { label: "Active chambers", value: 24, suffix: "", format: "comma" },
];

function useCount(target: number, start: boolean, decimal: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1400;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return decimal ? n.toFixed(2) : Math.round(n).toLocaleString();
}

function Stat({
  value,
  suffix,
  format,
  label,
  start,
}: {
  value: number;
  suffix: string;
  format: string;
  label: string;
  start: boolean;
}) {
  const display = useCount(value, start, format === "decimal");
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-display text-3xl text-white animate-countglow tabular-nums sm:text-4xl">
        {display}
        <span className="text-ice-400">{suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
    </div>
  );
}

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStart(true);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="why-us" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="heading-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
              Trust, engineered into every cubic metre.
            </h2>
            <p className="mt-4 text-slate-400">
              Global-standard cold chain discipline, operated from Baghdad for
              Iraq, the GCC, and Levant corridors.
            </p>
            <div className="mt-10 space-y-5">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-ice-400/20 bg-ice-400/10 text-ice-300">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7" ref={ref}>
            <div className="grid gap-4 sm:grid-cols-2">
              {STATS.map((s) => (
                <Stat key={s.label} {...s} start={start} />
              ))}
            </div>
            <div className="relative mt-4 h-56 overflow-hidden rounded-2xl border border-white/10 sm:h-64">
              <Image
                src="/images/pharma-storage.jpg"
                alt="GDP pharmaceutical cold room with monitored shelving"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
