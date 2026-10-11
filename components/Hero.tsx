"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { heroSlides, site } from "@/lib/site";

const SLIDE_MS = 3000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const elapsed = useRef(0);

  const total = heroSlides.length;
  const active = heroSlides[index];

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      elapsed.current = 0;
      setPrevious(index);
      setDirection(dir);
      setIndex(((next % total) + total) % total);
    },
    [index, total],
  );

  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
    pausedRef.current = paused;
  }, [index, paused]);

  /* alternate the travel direction on every automatic change */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tick = 120;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      elapsed.current += tick;
      if (elapsed.current >= SLIDE_MS) {
        const current = indexRef.current;
        goTo(current + 1, current % 2 === 0 ? 1 : -1);
      }
    }, tick);
    return () => window.clearInterval(id);
  }, [goTo]);

  const slideStyle = (i: number): React.CSSProperties => {
    const isActive = i === index;
    const isLeaving = i === previous && previous !== index;
    const shift = isActive ? 0 : isLeaving ? -direction : direction;
    return {
      transform: `translate3d(${shift * 100}%, 0, 0) scale(${isActive ? 1 : 1.03})`,
      opacity: isActive ? 1 : 0,
      zIndex: isActive ? 2 : isLeaving ? 1 : 0,
    };
  };

  return (
    <section id="top" className="on-dark relative z-20 isolate overflow-hidden bg-ink-950">
      {/* ---------- slides ---------- */}
      <div
        className="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start === null || end === null) return;
          const delta = end - start;
          if (Math.abs(delta) < 48) return;
          goTo(index + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
        }}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            className="hero-slide absolute inset-0"
            style={slideStyle(i)}
            aria-hidden={i !== index}
          >
            <div
              className={`absolute inset-0 ${
                i === index ? (direction === 1 ? "kenburns-right" : "kenburns-left") : ""
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* ---------- overlays: scrim, smoke, texture ---------- */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-ink-950/85 via-ink-950/45 to-ink-950/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/60"
        />
        <PanelSmoke className="z-[4]" variant="both" intensity={1.05} />
        <SmokeTexture
          className="z-[4] bottom-0 top-auto h-[58%]"
          opacity={0.42}
          seed={11}
          scale={1.1}
          animated
        />

        {/* ---------- content ---------- */}
        <div className="shell relative z-10 flex h-full flex-col justify-end pb-16 pt-[132px] sm:justify-center sm:pb-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ice-200">
              <span className="h-[2px] w-8 rounded-full bg-ember-400" />
              {site.location}
            </span>

            <h1 className="mt-5 font-display text-[38px] font-bold leading-[1.05] text-white sm:text-[54px] lg:text-[62px]">
              Keep the cold chain
              <span className="block text-ice-200">unbroken</span>
            </h1>

            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slate-200">
              Blast freezing, deep frozen storage and validated pharmaceutical cold rooms —
              monitored around the clock in Baghdad.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="btn h-[46px] bg-white px-6 text-ink-900 hover:-translate-y-px hover:bg-slate-100"
              >
                Request a quotation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={site.phoneHref}
                className="btn h-[46px] border border-white/35 px-6 text-white hover:border-white/70 hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>

            {/* slide caption + live temperature */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-5">
              <span className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white">
                {active.label}
              </span>
              <span className="text-[12.5px] font-medium tabular-nums text-ice-200">
                {active.temp}
              </span>
              <span className="hidden text-[12.5px] text-slate-300 sm:inline">{active.detail}</span>
            </div>
          </div>
        </div>

        {/* ---------- controls ---------- */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="shell flex items-center justify-between gap-6 pb-6">
            {/* indicators */}
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Facility slides">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${slide.label}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className="group relative h-[3px] w-10 overflow-hidden rounded-full bg-white/30 sm:w-14"
                >
                  <span
                    className={`block h-full w-full rounded-full bg-white ${
                      i === index ? "slide-progress" : "scale-x-0"
                    }`}
                    key={`${i}-${index}`}
                    style={
                      {
                        "--slide-ms": `${SLIDE_MS}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      } as React.CSSProperties
                    }
                  />
                </button>
              ))}
              <span className="ml-2 font-display text-[12px] font-semibold tabular-nums text-white/70">
                {String(index + 1).padStart(2, "0")}
                <span className="text-white/40"> / {String(total).padStart(2, "0")}</span>
              </span>
            </div>

            {/* arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1, -1)}
                aria-label="Previous slide"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition hover:border-white/70 hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1, 1)}
                aria-label="Next slide"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition hover:border-white/70 hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
