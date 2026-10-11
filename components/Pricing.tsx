"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Info } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { plans } from "@/lib/site";

type Basis = "pallet" | "tonne";

/** Animates between figures so a change of basis reads clearly. */
function Ticker({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    const duration = 480;
    let frame = 0;

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) frame = requestAnimationFrame(step);
      else fromRef.current = to;
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span className="tabular-nums">
      {prefix}
      {Math.round(display).toLocaleString("en-US")}
    </span>
  );
}

const RATE = 26;

export function Pricing() {
  const [basis, setBasis] = useState<Basis>("pallet");
  const [volume, setVolume] = useState(120);

  const handling = Math.round(volume * 3.4);
  const monthly = volume * RATE + handling;
  const fill = ((volume - 20) / 780) * 100;

  return (
    <section id="pricing" className="section border-y border-slate-200 bg-slate-50/70">
      <div className="shell">
        <SectionHeading
          eyebrow="Commercial terms"
          title="Storage billed on space, handling billed on movement"
          body="Both components quoted up front, so your landed cost per kilo stays predictable."
          aside={
            <div className="inline-flex gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-card">
              {(["pallet", "tonne"] as Basis[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setBasis(option)}
                  aria-pressed={basis === option}
                  className={`rounded-md px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                    basis === option
                      ? "bg-ice-600 text-white"
                      : "text-slate-500 hover:text-ink-800"
                  }`}
                >
                  Per {option}
                </button>
              ))}
            </div>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={`card flex flex-col overflow-hidden ${
                plan.featured ? "border-ice-600/40 shadow-panel" : ""
              }`}
            >
              {plan.featured ? (
                <div className="flex items-center justify-between bg-ice-600 px-6 py-2.5">
                  <span className="text-2xs font-semibold uppercase tracking-[0.16em] text-white">
                    Recommended
                  </span>
                  <span className="text-2xs font-medium uppercase tracking-[0.12em] text-ice-100">
                    Most widely used
                  </span>
                </div>
              ) : (
                <div className="h-[42px] border-b border-slate-100 px-6 py-2.5">
                  <span className="text-2xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Standard agreement
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[18px] font-bold text-ink-900">{plan.name}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{plan.blurb}</p>

                <div className="mt-6 flex items-end gap-2 border-b border-slate-100 pb-6">
                  <span className="font-display text-[36px] font-bold leading-none tracking-tight text-ink-900">
                    <Ticker value={basis === "pallet" ? plan.pallet : plan.tonne} />
                  </span>
                  <span className="pb-1 text-[12.5px] text-slate-400">
                    per {basis} / month
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ice-600" strokeWidth={2.5} />
                      <span className="text-[13.5px] leading-relaxed text-slate-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`${plan.featured ? "btn-primary" : "btn-secondary"} mt-7 w-full`}
                >
                  Request a quotation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* estimator */}
        <div data-reveal className="card mt-6 p-6 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <h3 className="font-display text-[17px] font-bold text-ink-900">
                Indicative monthly cost
              </h3>
              <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-slate-500">
                Frozen storage at −22 °C, FEFO rotation and live stock visibility are included at
                every tier. Move the slider to size an agreement.
              </p>

              <div className="mt-8">
                <div className="flex items-end justify-between">
                  <label htmlFor="volume" className="text-[13px] font-semibold text-ink-800">
                    Pallet positions required
                  </label>
                  <span className="font-display text-[20px] font-bold tabular-nums text-ink-900">
                    {volume}
                  </span>
                </div>
                <input
                  id="volume"
                  type="range"
                  min={20}
                  max={800}
                  step={10}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-ice-600 [&::-webkit-slider-thumb]:shadow-card"
                  style={{
                    background: `linear-gradient(90deg, #1470ac ${fill}%, #e2e8f0 ${fill}%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-[11.5px] font-medium tabular-nums text-slate-400">
                  <span>20</span>
                  <span>800</span>
                </div>
              </div>

              <p className="mt-6 inline-flex items-start gap-2 text-[12px] leading-relaxed text-slate-400">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Estimates exclude VAT and refrigerated transport. A formal quotation is issued
                after a capacity check.
              </p>
            </div>

            <dl className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <dt className="text-[13px] text-slate-500">
                  Storage · {volume} pallets × ${RATE}
                </dt>
                <dd className="text-[13.5px] font-semibold tabular-nums text-ink-900">
                  <Ticker value={volume * RATE} />
                </dd>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <dt className="text-[13px] text-slate-500">Handling & FEFO rotation</dt>
                <dd className="text-[13.5px] font-semibold tabular-nums text-ink-900">
                  <Ticker value={handling} />
                </dd>
              </div>

              <div className="my-5 h-px bg-slate-200" />

              <div className="flex items-end justify-between">
                <dt className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Estimated monthly
                </dt>
                <dd className="font-display text-[30px] font-bold leading-none tracking-tight text-ink-900">
                  <Ticker value={monthly} />
                </dd>
              </div>

              <a href="#contact" className="btn-primary mt-6 w-full">
                Request a formal quotation
              </a>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
