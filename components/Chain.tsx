"use client";

import { useState } from "react";
import { Package, Snowflake, Thermometer, Truck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { chain } from "@/lib/site";

const icons = {
  truck: Truck,
  snowflake: Snowflake,
  thermometer: Thermometer,
  package: Package,
} as const;

/** Four-stage process. Copy is limited to one line per stage. */
export function Chain() {
  const [active, setActive] = useState(0);

  return (
    <section id="chain" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Cold chain process"
          title="Product never leaves the cold"
        />

        <div className="relative mt-10">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-slate-200 lg:block"
          >
            <div
              className="h-px bg-ice-600 transition-[width] duration-500 ease-out"
              style={{ width: `${((active + 1) / chain.length) * 100}%` }}
            />
          </div>

          <ol className="relative grid gap-x-8 gap-y-9 lg:grid-cols-4">
            {chain.map((step, i) => {
              const Icon = icons[step.icon];
              const isActive = active === i;
              return (
                <li
                  key={step.id}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
                        isActive
                          ? "border-ice-600 bg-ice-600 text-white"
                          : "border-slate-200 bg-white text-ice-600"
                      }`}
                    >
                      <Icon className="h-[21px] w-[21px]" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Stage {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-[16.5px] font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                    {step.body}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[13px] font-semibold tabular-nums text-ice-700 numeric">
                      {step.temp}
                    </span>
                    <span className="text-[12.5px] text-slate-400">{step.duration}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
