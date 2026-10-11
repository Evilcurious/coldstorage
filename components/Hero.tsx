import Image from "next/image";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { LiveConditions } from "@/components/LiveConditions";
import { Snowfall } from "@/components/Snowfall";
import { heroStats, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[104px] lg:pt-[150px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(72%_58%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-ice-100/70 blur-3xl"
      />

      <div className="shell relative pb-16 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
          {/* copy */}
          <div className="enter">
            <span className="label">Cold chain infrastructure · Baghdad</span>

            <h1 className="mt-5 font-display text-[34px] font-bold leading-[1.1] tracking-tight text-ink-900 sm:text-[44px] lg:text-[50px]">
              Precision cold storage for food, pharmaceutical and specialty cargo
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-slate-600">
              {site.name} operates 18,000 pallet positions across four temperature regimes —
              blast freezing to −25 °C, validated 2–8 °C pharmaceutical rooms and 24/7 monitored
              operations at the Uuayrij Industrial Area.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                Request a quotation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#zones" className="btn-secondary">
                <CalendarCheck className="h-4 w-4 text-ice-600" />
                View temperature regimes
              </a>
              <a
                href={site.phoneHref}
                className="ml-1 hidden items-center gap-2 text-[13.5px] font-semibold text-ink-800 transition hover:text-ice-700 sm:inline-flex"
              >
                <Phone className="h-4 w-4 text-ice-600" />
                {site.phone}
              </a>
            </div>

            {/* headline metrics */}
            <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-slate-200 pt-8 sm:grid-cols-4">
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={i > 0 ? "sm:border-l sm:border-slate-200 sm:pl-6" : ""}
                >
                  <dd className="font-display text-[26px] font-bold leading-none tracking-tight text-ink-900 tabular-nums">
                    {stat.label === "Coldest room" ? "−" : ""}
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={Number.isInteger(stat.value) ? 0 : 2}
                    />
                  </dd>
                  <dt className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* visual */}
          <div className="enter relative [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="animate-drift absolute inset-0">
                  <Image
                    src="/images/hero-facility.jpg"
                    alt="Racked pallet positions inside a temperature-controlled cold storage room"
                    fill
                    priority
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <Snowfall count={7} seed={5} speed={0.7} />
                <span className="absolute right-4 top-4 rounded-md bg-ink-900/85 px-2.5 py-1.5 text-2xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                  Frozen storage · Aisle B
                </span>
              </div>
            </div>

            <LiveConditions
              className="mx-auto -mt-8 w-[330px] max-w-full lg:absolute lg:-bottom-12 lg:-left-12 lg:mt-0"
              room="Deep freeze · Room 04"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
