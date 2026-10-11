"use client";

import { useMemo, useState } from "react";
import { Apple, Beef, Milk, Pill, SlidersHorizontal } from "lucide-react";
import { useQuote } from "./QuoteContext";

type ProductKey = "meat" | "pharma" | "produce" | "dairy";

const PRODUCTS: Record<
  ProductKey,
  {
    label: string;
    icon: typeof Beef;
    tempMin: number;
    tempMax: number;
    defaultTemp: number;
    m3PerTon: number;
    chamber: string;
    note: string;
  }
> = {
  meat: {
    label: "Meat & Poultry",
    icon: Beef,
    tempMin: -25,
    tempMax: -18,
    defaultTemp: -20,
    m3PerTon: 1.65,
    chamber: "Deep Freeze",
    note: "Export-grade freeze, blast-capable inbound.",
  },
  pharma: {
    label: "Pharmaceuticals",
    icon: Pill,
    tempMin: 2,
    tempMax: 8,
    defaultTemp: 5,
    m3PerTon: 2.8,
    chamber: "GDP Cold Room",
    note: "Validated mapping, excursion alarms, dual probes.",
  },
  produce: {
    label: "Fresh Produce",
    icon: Apple,
    tempMin: 0,
    tempMax: 4,
    defaultTemp: 2,
    m3PerTon: 2.4,
    chamber: "Chilled Fresh",
    note: "High air-change, ethylene-aware zoning.",
  },
  dairy: {
    label: "Dairy",
    icon: Milk,
    tempMin: 1,
    tempMax: 6,
    defaultTemp: 3,
    m3PerTon: 2.1,
    chamber: "Dairy Chill",
    note: "Hygienic rooms with dedicated dock segregation.",
  },
};

export function Calculator() {
  const { setOpen } = useQuote();
  const [product, setProduct] = useState<ProductKey>("meat");
  const [tons, setTons] = useState(120);
  const [days, setDays] = useState(90);
  const spec = PRODUCTS[product];
  const [temp, setTemp] = useState(spec.defaultTemp);

  const onProduct = (key: ProductKey) => {
    setProduct(key);
    setTemp(PRODUCTS[key].defaultTemp);
  };

  const result = useMemo(() => {
    const volume = tons * spec.m3PerTon;
    const pallets = Math.ceil(volume / 1.73);
    const sqm = Math.ceil(pallets * 1.35);
    const energy = 1 + Math.abs(temp - 8) / 40;
    const monthly = Math.round(pallets * 11.5 * energy);
    const total = Math.round((monthly / 30) * days);
    const utilization = Math.min(98, Math.round((pallets / 420) * 100));
    return { volume, pallets, sqm, monthly, total, utilization };
  }, [tons, spec, temp, days]);

  const tempPct =
    ((temp - spec.tempMin) / (spec.tempMax - spec.tempMin)) * 100;

  return (
    <section id="calculator" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-ice-400/20 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-6 shadow-glow sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Live Storage Calculator
              </p>
              <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
                Estimate space &amp; temperature in seconds.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-400">
                Indicative planning figures for reserved pallet positions. Final
                allocation is confirmed by our commercial desk after product
                survey.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-ice-500">
              Non-binding · Instant
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Product type
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(Object.keys(PRODUCTS) as ProductKey[]).map((key) => {
                  const p = PRODUCTS[key];
                  const Icon = p.icon;
                  const active = product === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onProduct(key)}
                      className={`rounded-2xl border px-3 py-4 text-left transition ${
                        active
                          ? "border-ice-400/50 bg-ice-400/10 shadow-glow"
                          : "border-white/10 bg-white/5 hover:border-ice-400/30"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${active ? "text-ice-300" : "text-slate-400"}`} />
                      <p className="mt-3 text-sm font-medium text-white">{p.label}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex justify-between text-xs uppercase tracking-widest text-slate-400">
                    Tonnage
                    <span className="tabular-nums text-ice-300">{tons} t</span>
                  </span>
                  <input
                    type="range"
                    min={10}
                    max={800}
                    step={10}
                    value={tons}
                    onChange={(e) => setTons(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                    aria-label="Tonnage"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex justify-between text-xs uppercase tracking-widest text-slate-400">
                    Set-point
                    <span className="tabular-nums text-ice-300">{temp}°C</span>
                  </span>
                  <input
                    type="range"
                    min={spec.tempMin}
                    max={spec.tempMax}
                    step={1}
                    value={temp}
                    onChange={(e) => setTemp(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                    aria-label="Temperature set-point"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 flex justify-between text-xs uppercase tracking-widest text-slate-400">
                    Reservation window
                    <span className="tabular-nums text-ice-300">{days} days</span>
                  </span>
                  <input
                    type="range"
                    min={30}
                    max={365}
                    step={15}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                    aria-label="Reservation days"
                  />
                </label>
              </div>
              <p className="mt-4 text-sm text-slate-500">{spec.note}</p>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-strong relative overflow-hidden rounded-3xl p-6">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ice-400/10 blur-3xl" />
                <p className="text-xs uppercase tracking-[0.22em] text-ice-400">
                  Indicative allocation
                </p>
                <p className="mt-2 font-display text-lg text-white">{spec.chamber}</p>

                <div className="mt-6 flex items-center gap-5">
                  <div
                    className="relative grid h-28 w-28 place-items-center rounded-full"
                    style={{
                      background: `conic-gradient(#22d3ee ${tempPct}%, rgba(255,255,255,0.08) 0)`,
                    }}
                    aria-hidden
                  >
                    <div className="grid h-[5.4rem] w-[5.4rem] place-items-center rounded-full bg-navy-900">
                      <span className="font-display text-xl text-white tabular-nums">
                        {temp}°
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Chamber class</p>
                    <p className="text-sm text-slate-200">
                      Range {spec.tempMin}°C to {spec.tempMax}°C
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      Campus utilization {result.utilization}%
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white/5 p-3">
                    <dt className="text-[11px] uppercase tracking-wider text-slate-500">
                      Pallet positions
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-white tabular-nums">
                      {result.pallets.toLocaleString()}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <dt className="text-[11px] uppercase tracking-wider text-slate-500">
                      Floor equivalent
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-white tabular-nums">
                      {result.sqm.toLocaleString()} m²
                    </dd>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <dt className="text-[11px] uppercase tracking-wider text-slate-500">
                      Volume
                    </dt>
                    <dd className="mt-1 font-display text-xl text-ice-200 tabular-nums">
                      {Math.round(result.volume).toLocaleString()} m³
                    </dd>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <dt className="text-[11px] uppercase tracking-wider text-slate-500">
                      Indicative {days}d
                    </dt>
                    <dd className="mt-1 font-display text-xl text-ice-200 tabular-nums">
                      ${result.total.toLocaleString()}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  className="btn-primary mt-6 w-full"
                  onClick={() => setOpen(true)}
                >
                  Convert estimate to a formal quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
