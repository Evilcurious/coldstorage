import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Snowflake,
  Sparkles,
  ThermometerSnowflake,
} from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { FrostCrystal } from "@/components/Icons";
import { Snowfall } from "@/components/Snowfall";
import { TempGauge } from "@/components/TempGauge";
import { heroStats, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-[92px] sm:pb-20 lg:pb-28 lg:pt-[132px]">
      {/* frosted grid + soft ice blooms */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-ice-grid bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-frost-300/50 blur-3xl"
      />

      {/* snowfall drifting across the whole hero, above the blue wash */}
      <Snowfall count={12} seed={5} speed={0.55} />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
        {/* ---------------- copy ---------------- */}
        <div className="enter">
          <span className="eyebrow">
            <Snowflake className="h-3.5 w-3.5 text-ice-500" />
            {site.location.split(",").pop()?.trim()} · Cold chain since {site.founded}
          </span>

          <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[1.03] tracking-tight text-ink-900 sm:text-[54px] lg:text-[62px]">
            Cold storage that
            <br className="hidden sm:block" />{" "}
            <span className="animate-shimmer-text gradient-text">never lets the</span>{" "}
            temperature slip.
          </h1>

          <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-ink-500">
            Blast freezing, deep frozen storage and validated pharma cold rooms under one
            white-cold roof — with every pallet, door and compressor watched by our{" "}
            <span className="font-semibold text-ice-700">ColdSense</span> monitoring network,
            twenty-four hours a day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a href="#contact" className="btn-primary group">
              Book a facility tour
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#chain" className="btn-ghost group">
              <ThermometerSnowflake className="h-4 w-4 text-ice-500" />
              See how the cold chain works
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[13.5px] font-medium text-ink-500">
            {[
              "No warm-air transfer",
              "Same-day emergency intake",
              "Audit-ready temperature logs",
            ].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ice-500" />
                {item}
              </li>
            ))}
          </ul>

          {/* live stat strip */}
          <dl className="card mt-10 grid grid-cols-2 gap-y-5 rounded-3xl px-6 py-6 sm:grid-cols-4 sm:gap-x-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="relative sm:px-2">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[26px] font-extrabold tracking-tight text-ink-900 tabular-nums">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={Number.isInteger(stat.value) ? 0 : 2}
                  />
                </dd>
                <dd className="mt-1 text-[11.5px] font-medium uppercase tracking-[0.12em] text-ink-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------- visual ---------------- */}
        <div className="enter relative [animation-delay:180ms]">
          <div className="relative">
            {/* halo */}
            <div
              aria-hidden
              className="animate-frost-breathe absolute -inset-6 rounded-[46px] bg-gradient-to-br from-frost-300/70 via-white/40 to-ice-300/50 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white shadow-lift">
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[5/4.4]">
                <div className="animate-drift absolute inset-0">
                  <Image
                    src="/images/hero-facility.jpg"
                    alt="Bright white cold storage aisle with racked pallets under cool blue lighting"
                    fill
                    priority
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {/* cold wash + legibility gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/10 to-ice-300/25" />

                {/* scanning frost line */}
                <div
                  aria-hidden
                  className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-white/45 to-transparent"
                />

                <Snowfall count={11} seed={21} speed={1.25} />

                {/* rotating crystal watermark */}
                <FrostCrystal
                  aria-hidden
                  className="animate-spin-slow pointer-events-none absolute -right-14 -top-14 h-56 w-56 text-white/70"
                />

                {/* top badges */}
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ice-700 shadow-soft backdrop-blur">
                    <Snowflake className="h-3.5 w-3.5" /> 12 rooms at set point
                  </span>
                </div>
                <div className="absolute right-5 top-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-frost-200 backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5 text-ice-300" /> ColdSense · 1,204 sensors
                  </span>
                </div>

                {/* bottom caption */}
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-[15px] font-bold text-ink-900">
                      Uuayrij facility · Aisle B
                    </p>
                    <p className="text-[12px] text-ink-500">
                      −22 °C holding room · narrow-aisle racking
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-frost-400 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ice-700 shadow-soft sm:inline-flex">
                    18,000 pallet positions
                  </span>
                </div>
              </div>
            </div>

            {/* floating live gauge */}
            <TempGauge
              value={-25}
              className="animate-float-slow mx-auto -mt-10 w-[300px] max-w-full lg:absolute lg:-bottom-12 lg:-left-14 lg:mt-0 lg:w-[318px]"
            />
          </div>
        </div>
      </div>

      <a
        href="#chain"
        className="mx-auto mt-16 hidden w-fit flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-300 transition hover:text-ice-500 lg:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-float-fast" />
      </a>
    </section>
  );
}
