import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { capabilities, facilityStats } from "@/lib/site";

export function Facility() {
  return (
    <section id="facility" className="section border-y border-slate-200 bg-slate-50/70">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Infrastructure"
              title="Engineered so the cold has nowhere to escape"
              body="Insulated panels, heated door frames, air curtains and sealed transfer tunnels keep every room at its set point — even while the docks are busy and the doors are open."
            />

            <div className="mt-10 space-y-6">
              {capabilities.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="border-l-2 border-slate-200 pl-5"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-[15.5px] font-bold text-ink-900">
                      {item.title}
                    </h3>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ice-700">
                      {item.stat}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2" data-reveal="right">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card sm:col-span-2">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/loading-dock.jpg"
                  alt="Refrigerated trailers docked at the cold storage facility"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1.5 text-2xs font-semibold uppercase tracking-[0.12em] text-ink-800 backdrop-blur">
                  Six refrigerated docks
                </span>
              </div>
              <div className="border-t border-slate-100 px-5 py-4">
                <p className="text-[13.5px] font-semibold text-ink-900">
                  Direct dock-to-room transfer
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                  Trailers are sealed to insulated dock shelters, so cargo moves into the cold
                  without crossing ambient air.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/frozen-racking.jpg"
                  alt="Frost formed on racking inside a frozen storage room"
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="px-4 py-4 text-[12.5px] leading-relaxed text-slate-500">
                Overnight defrost cycles keep ice off surfaces and packaging.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/pharma-coldroom.jpg"
                  alt="Validated pharmaceutical cold room with monitoring equipment"
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="px-4 py-4 text-[12.5px] leading-relaxed text-slate-500">
                Validated 2–8 °C rooms with calibrated, mapped sensors.
              </p>
            </div>
          </div>
        </div>

        {/* facility metrics */}
        <div className="mt-14 grid grid-cols-2 gap-y-8 rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-card lg:grid-cols-4">
          {facilityStats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className={i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}
            >
              <p className="font-display text-[24px] font-bold leading-none tracking-tight text-ink-900 tabular-nums">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] font-semibold text-ink-800">{stat.label}</p>
              <p className="mt-1 text-[12px] text-slate-400">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
