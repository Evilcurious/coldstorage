"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Snowflake,
  Thermometer,
  Timer,
  Truck,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { chain } from "@/lib/site";

const icons = {
  truck: Truck,
  snowflake: Snowflake,
  thermometer: Thermometer,
  package: Package,
} as const;

export function Chain() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % chain.length), 3200);
    return () => window.clearInterval(id);
  }, [auto]);

  return (
    <section id="chain" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="The cold chain"
          title={
            <>
              Cargo never crosses <span className="gradient-text">warm air</span>
            </>
          }
          body="From the loading dock to the dispatch bay, product travels through insulated tunnels and frozen vestibules. Follow one pallet through the facility."
        />

        <div
          className="relative mt-14"
          onMouseEnter={() => setAuto(false)}
          onMouseLeave={() => setAuto(true)}
        >
          {/* flowing connector */}
          <div
            aria-hidden
            className="absolute left-[8%] right-[8%] top-[54px] hidden h-[2px] lg:block"
          >
            <div className="cold-line-flow h-full w-full" />
          </div>

          <ol className="relative grid gap-5 lg:grid-cols-4 lg:gap-6">
            {chain.map((step, i) => {
              const Icon = icons[step.icon];
              const isActive = active === i;
              return (
                <li
                  key={step.id}
                  data-reveal="scale"
                  style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                  onMouseEnter={() => setActive(i)}
                  className="group"
                >
                  <div
                    className={`card sheen h-full overflow-hidden p-6 transition-all duration-500 ease-out ${
                      isActive
                        ? "-translate-y-1.5 border-ice-300 shadow-lift"
                        : "hover:-translate-y-1 hover:border-frost-400"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`relative grid h-12 w-12 place-items-center rounded-2xl transition-all duration-500 ${
                          isActive
                            ? "bg-brand-grad text-white shadow-glow"
                            : "bg-frost-100 text-ice-600"
                        }`}
                      >
                        <Icon className="h-[22px] w-[22px]" />
                        {isActive ? (
                          <span className="animate-pulse-ring absolute inset-0 rounded-2xl border border-ice-400" />
                        ) : null}
                      </span>
                      <span className="rounded-full border border-frost-300 bg-white/80 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-ice-700">
                        {step.temp}
                      </span>
                    </div>

                    <p className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-300">
                      <Timer className="h-3.5 w-3.5" /> {step.minutes}
                    </p>
                    <h3 className="mt-2 font-display text-[18px] font-bold leading-snug text-ink-900">
                      <span className="mr-2 text-ice-400">0{i + 1}</span>
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-ink-500">{step.body}</p>

                    <span
                      className={`mt-5 block h-1 rounded-full bg-brand-grad transition-all duration-700 ${
                        isActive ? "w-full opacity-100" : "w-6 opacity-40"
                      }`}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* temperature ribbon */}
        <div data-reveal className="card mt-8 overflow-hidden rounded-3xl p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-[15px] font-bold text-ink-900">
              Temperature across the journey
            </p>
            <p className="text-[12.5px] text-ink-400">
              Set points held within ±0.5 °C for 99.98% of operating hours
            </p>
          </div>

          <div className="relative mt-6">
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-gradient-to-r from-ice-700 via-ice-400 to-frost-300">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.75)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer-text"
              />
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {chain.map((step, i) => (
                <div key={step.id} className="text-center">
                  <span
                    className={`mx-auto block h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                      active === i ? "scale-125 bg-ice-600 shadow-glow" : "bg-frost-400"
                    }`}
                  />
                  <p className="mt-2 text-[11.5px] font-semibold tabular-nums text-ink-700">
                    {step.temp}
                  </p>
                  <p className="text-[11px] text-ink-400">{step.title.split(" ")[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
