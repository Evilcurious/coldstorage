"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Info, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { plans } from "@/lib/site";

type Basis = "pallet" | "tonne";

/** Smoothly animates between numbers so price changes feel physical. */
function Ticker({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    const duration = 620;
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

export function Pricing() {
  const [basis, setBasis] = useState<Basis>("pallet");
  const [volume, setVolume] = useState(120);

  const rate = 26; // representative blended rate for the estimator
  const handling = Math.round(volume * 3.4);
  const monthly = volume * rate + handling;

  return (
    <section id="pricing" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Transparent storage rates, <span className="gradient-text">no cold surprises</span>
            </>
          }
          body="Storage is billed on the space you occupy, handling on the pallets that move. We quote both up front so your landed cost per kilo is predictable."
        />

        <div className="mt-10 flex justify-center">
          <div
            data-reveal="scale"
            className="relative inline-flex rounded-full border border-frost-400 bg-white/85 p-1.5 shadow-soft backdrop-blur"
          >
            <span
              aria-hidden
              className="absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full bg-brand-grad shadow-glow transition-transform duration-500 ease-out"
              style={{ transform: basis === "pallet" ? "translateX(0)" : "translateX(100%)" }}
            />
            {(["pallet", "tonne"] as Basis[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBasis(option)}
                aria-pressed={basis === option}
                className={`relative z-10 min-w-[142px] rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors duration-300 ${
                  basis === option ? "text-white" : "text-ink-500 hover:text-ice-700"
                }`}
              >
                Per {option} / month
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              className={`card sheen group relative flex flex-col overflow-hidden p-7 ${
                plan.featured
                  ? "border-ice-300 shadow-lift lg:-mt-4 lg:mb-4"
                  : "card-hover"
              }`}
            >
              {plan.featured ? (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-brand-grad px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white shadow-glow">
                  <Sparkles className="h-3 w-3" /> Most requested
                </span>
              ) : null}

              {plan.featured ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(87,183,239,0.35),transparent)]"
                />
              ) : null}

              <h3 className="relative font-display text-[20px] font-extrabold text-ink-900">
                {plan.name}
              </h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-ink-400">
                {plan.blurb}
              </p>

              <div className="relative mt-6 flex items-end gap-2">
                <span className="font-display text-[40px] font-extrabold leading-none tracking-tight text-ink-900">
                  <Ticker value={basis === "pallet" ? plan.pallet : plan.tonne} />
                </span>
                <span className="pb-1.5 text-[12.5px] font-medium text-ink-400">
                  / {basis} / month
                </span>
              </div>

              <p className="relative mt-2 inline-flex items-center gap-1.5 text-[11.5px] text-ink-300">
                <Info className="h-3.5 w-3.5" /> Indicative rate · final quote depends on volume
                and temperature regime
              </p>

              <ul className="relative mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[13.5px] text-ink-600">
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        plan.featured ? "bg-brand-grad text-white" : "bg-frost-200 text-ice-700"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`relative mt-8 ${plan.featured ? "btn-primary" : "btn-ghost"} group/btn w-full`}
              >
                Request a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </article>
          ))}
        </div>

        {/* estimator */}
        <div data-reveal className="card mt-8 overflow-hidden rounded-[32px] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h3 className="font-display text-[18px] font-bold text-ink-900">
                Quick monthly estimate
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
                Move the slider to see how storage and handling stack up. Frozen storage at −22 °C,
                FEFO rotation and live stock visibility are always included.
              </p>

              <div className="mt-7">
                <div className="flex items-end justify-between">
                  <label htmlFor="volume" className="text-[12.5px] font-semibold text-ink-500">
                    Pallets stored
                  </label>
                  <span className="font-display text-[22px] font-extrabold tabular-nums text-ink-900">
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
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-frost-200 accent-ice-500 outline-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-ice-500 [&::-webkit-slider-thumb]:shadow-glow"
                  style={{
                    background: `linear-gradient(90deg, #2e9be6 ${((volume - 20) / 780) * 100}%, #e0efff ${
                      ((volume - 20) / 780) * 100
                    }%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-[11px] font-medium text-ink-300">
                  <span>20 pallets</span>
                  <span>800 pallets</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-frost-300 bg-gradient-to-br from-frost-50 via-white to-frost-200 p-6">
              <span
                aria-hidden
                className="animate-frost-breathe absolute -right-16 -top-16 h-44 w-44 rounded-full bg-ice-300/40 blur-2xl"
              />
              <dl className="relative space-y-3">
                <div className="flex items-center justify-between text-[13.5px]">
                  <dt className="text-ink-500">
                    Storage · {volume} pallets × ${rate}
                  </dt>
                  <dd className="font-semibold tabular-nums text-ink-800">
                    <Ticker value={volume * rate} />
                  </dd>
                </div>
                <div className="flex items-center justify-between text-[13.5px]">
                  <dt className="text-ink-500">Handling & rotation</dt>
                  <dd className="font-semibold tabular-nums text-ink-800">
                    <Ticker value={handling} />
                  </dd>
                </div>
                <div className="frost-divider my-2" />
                <div className="flex items-end justify-between">
                  <dt className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                    Estimated monthly
                  </dt>
                  <dd className="font-display text-[32px] font-extrabold leading-none tracking-tight text-ink-900">
                    <Ticker value={monthly} />
                  </dd>
                </div>
              </dl>
              <a href="#contact" className="btn-primary mt-6 w-full">
                Lock this in — request quote
              </a>
              <p className="mt-3 text-center text-[11px] text-ink-300">
                Estimates exclude VAT and refrigerated transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
