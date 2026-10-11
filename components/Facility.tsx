import Image from "next/image";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { SectionHeading } from "@/components/SectionHeading";
import { capabilities, facilityStats } from "@/lib/site";

export function Facility() {
  return (
    <section id="facility" className="section border-y border-slate-200 bg-slate-50/70">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Infrastructure"
              title="Engineered so the cold has nowhere to escape"
              body="Insulated panels, heated door frames and sealed transfer tunnels hold every room at set point while the docks stay busy."
            />

            <div className="mt-9 border-t border-slate-200">
              {capabilities.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-slate-200 py-4"
                >
                  <p className="font-display text-[15px] font-semibold text-ink-900">
                    {item.title}
                  </p>
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ice-700">
                    {item.stat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" data-reveal="right">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-card sm:col-span-2">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/loading-dock.jpg"
                  alt="Refrigerated trailers docked at the cold storage facility"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
                <SmokeTexture opacity={0.34} seed={5} />
                <PanelSmoke variant="floor" intensity={0.8} className="bottom-0 top-auto h-1/2" />
                <span className="absolute left-4 top-4 rounded-md bg-white/92 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-800 backdrop-blur">
                  Six refrigerated docks
                </span>
              </div>
              <p className="border-t border-slate-100 px-5 py-4 text-[13.5px] font-semibold text-ink-900">
                Direct dock-to-room transfer
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-card">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/cold-corridor.jpg"
                  alt="Cold vapour drifting through an insulated corridor"
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                />
                <SmokeTexture opacity={0.38} seed={8} />
              </div>
              <p className="px-4 py-3.5 text-[12.5px] font-medium text-slate-500">
                Insulated transfer corridor
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-card">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/technician-panel.jpg"
                  alt="Technician inspecting a refrigeration control panel"
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="px-4 py-3.5 text-[12.5px] font-medium text-slate-500">
                Plant inspected twice daily
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-y-8 rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-card lg:grid-cols-4">
          {facilityStats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              className={i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}
            >
              <p className="font-display text-[24px] font-bold leading-none tracking-tight text-ink-900 tabular-nums numeric">
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
