import Image from "next/image";
import { Leaf, ShieldCheck, SquareStack, Zap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FrostRule } from "@/components/Icons";
import { Snowfall } from "@/components/Snowfall";
import { facilityStats, features } from "@/lib/site";

const featureIcons = {
  bolt: Zap,
  shield: ShieldCheck,
  gauge: SquareStack,
  leaf: Leaf,
} as const;

export function Facility() {
  return (
    <section id="facility" className="section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          {/* ---- image collage ---- */}
          <div data-reveal="left" className="relative">
            <div className="relative overflow-hidden rounded-[34px] border border-white/70 shadow-lift">
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src="/images/loading-dock.jpg"
                  alt="Refrigerated trailers backed into the cold storage loading docks"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent" />
                <Snowfall count={9} seed={66} speed={0.9} />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ice-700 backdrop-blur">
                  Six refrigerated docks
                </div>
              </div>
            </div>

            {/* overlapping card */}
            <div className="card animate-float-slow absolute -bottom-10 right-2 w-[62%] overflow-hidden rounded-3xl p-3 sm:-right-8 sm:w-[54%]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                <Image
                  src="/images/frozen-racking.jpg"
                  alt="Frost on racking inside a frozen cold room"
                  fill
                  sizes="(min-width: 1024px) 25vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
              </div>
              <p className="px-2 pb-1 pt-3 text-[12.5px] font-semibold text-ink-800">
                Frost-managed room surfaces
              </p>
              <p className="px-2 pb-1 text-[11.5px] text-ink-400">
                Defrost cycles run overnight so ice never touches your packaging.
              </p>
            </div>

            <span
              aria-hidden
              className="animate-spin-slow pointer-events-none absolute -left-10 -top-10 h-32 w-32 text-ice-300/60"
            >
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="50" cy="50" r="30" strokeDasharray="4 8" />
                <path d="M50 8v84M14 29l72 42M86 29L14 71" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          {/* ---- copy + stats ---- */}
          <div className="lg:pl-4">
            <SectionHeading
              align="left"
              eyebrow="The facility"
              title={
                <>
                  Built so the cold <span className="gradient-text">has nowhere to leak</span>
                </>
              }
              body="Insulated panels, heated door frames, air curtains and insulated transfer tunnels keep every room at its set point — even when the doors are open and the docks are busy."
            />

            <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {features.map((feature, i) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <div
                    key={feature.title}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                    className="group"
                  >
                    <span className="inline-grid h-10 w-10 place-items-center rounded-2xl border border-frost-300 bg-white text-ice-600 shadow-soft transition-all duration-500 group-hover:border-ice-400 group-hover:bg-brand-grad group-hover:text-white">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="mt-3.5 font-display text-[15.5px] font-bold text-ink-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
                      {feature.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <FrostRule className="mt-9" />

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {facilityStats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-reveal="scale"
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                >
                  <p className="font-display text-[24px] font-extrabold tracking-tight text-ink-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[12.5px] font-semibold text-ice-700">{stat.label}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-400">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
