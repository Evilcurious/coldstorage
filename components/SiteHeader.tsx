"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Menu, Phone, Snowflake, X } from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [roomTemp, setRoomTemp] = useState(-25);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 14);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(y / height, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // a live, gently breathing temperature readout so the header feels "cold & awake"
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoomTemp(() => -25 + Math.round((Math.random() - 0.5) * 4) / 10);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* live readout strip */}
      <div className="hidden bg-ink-900 text-frost-200 md:block">
        <div className="shell flex h-9 items-center justify-between text-[12px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-ice-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ice-300" />
            </span>
            <Snowflake className="h-3.5 w-3.5 text-ice-300" />
            <span className="font-medium tabular-nums">
              Deep freeze room holding {roomTemp.toFixed(1)} °C
            </span>
            <span className="text-frost-400/70">· all 12 rooms at set point</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-ice-300" />
              {site.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-ice-300" />
              {site.hours}
            </span>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-white transition hover:text-ice-300"
            >
              <Phone className="h-3.5 w-3.5" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-frost-300/80 bg-white/85 shadow-[0_10px_30px_-24px_rgba(10,37,64,0.55)] backdrop-blur-xl"
            : "border-b border-transparent bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative">
              <SnowflakeMark className="h-10 w-10 transition-transform duration-700 group-hover:rotate-[120deg]" />
              <span className="animate-frost-breathe absolute -inset-1 rounded-2xl bg-ice-300/40 blur-md" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink-900">
                {site.shortName}
              </span>
              <span className="block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ice-600">
                Cold Storage
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink-600 transition-colors hover:text-ice-700"
              >
                {item.label}
                <span className="absolute inset-x-3.5 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-ice-400 to-ice-600 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="hidden rounded-full border border-frost-400 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-ice-400 hover:text-ice-700 sm:inline-flex"
            >
              Request pricing
            </a>
            <a
              href="#contact"
              className="btn-primary hidden !px-5 !py-2.5 !text-[13px] sm:inline-flex"
            >
              Book a tour
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-frost-400 bg-white/80 text-ink-800 shadow-soft transition hover:border-ice-400 hover:text-ice-700 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* scroll progress: a slowly freezing line */}
        <div className="relative h-[3px] w-full bg-transparent">
          <span
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-ice-300 via-ice-500 to-ice-700 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-b border-frost-300 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell grid gap-1 py-5">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-[15px] font-medium text-ink-700 transition hover:border-frost-300 hover:bg-frost-100 hover:text-ice-700"
            >
              {item.label}
              <Snowflake className="h-4 w-4 text-ice-300" />
            </a>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={site.phoneHref} className="btn-ghost !py-3">
              <Phone className="h-4 w-4" /> Call us
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary !py-3">
              Book a tour
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
