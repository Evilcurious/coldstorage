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

/** The journey of a consignment, presented as a documented four-stage process. */
export function Chain() {
  const [active, setActive] = useState(0);

  return (
    <section id="chain" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Cold chain process"
          title="Product never leaves the cold, from intake to dispatch"
          body="Every consignment follows four controlled stages. Insulated transfer tunnels and frozen vestibules mean no pallet is ever exposed to ambient air between them."
        />

        <div className="relative mt-12">
          {/* process rail */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-slate-200 lg:block"
          >
            <div
              className="h-px bg-ice-600 transition-[width] duration-500 ease-out"
              style={{ width: `${((active + 1) / chain.length) * 100}%` }}
            />
          </div>

          <ol className="relative grid gap-x-8 gap-y-10 lg:grid-cols-4">
            {chain.map((step, i) => {
              const Icon = icons[step.icon];
              const isActive = active === i;
              return (
                <li
                  key={step.id}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
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
                    <span className="text-2xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Stage {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[17px] font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{step.body}</p>

                  <dl className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-[12.5px] text-slate-400">Temperature</dt>
                      <dd className="text-[13px] font-semibold tabular-nums text-ink-900">
                        {step.temp}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-[12.5px] text-slate-400">Cycle time</dt>
                      <dd className="text-[13px] font-semibold text-ink-900">{step.duration}</dd>
                    </div>
                  </dl>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
          <p className="text-[14px] font-semibold text-ink-900">
            Set points are held within ±0.5 °C for 99.98 % of operating hours
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {chain.map((step, i) => (
              <span
                key={step.id}
                className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[12px] font-semibold tabular-nums transition-colors duration-300 ${
                  active === i
                    ? "border-ice-200 bg-white text-ice-700"
                    : "border-transparent text-slate-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active === i ? "bg-ice-600" : "bg-slate-300"
                  }`}
                />
                {step.temp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
