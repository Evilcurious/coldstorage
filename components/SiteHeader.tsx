"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(y / height, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* utility bar */}
      <div className="hidden bg-ink-900 text-white md:block">
        <div className="shell flex h-9 items-center justify-between text-[12px]">
          <div className="flex items-center gap-6 text-slate-300">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-ice-300" />
              {site.location}
            </span>
            <span className="hidden lg:inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-ice-300" />
              <a href={`mailto:${site.email}`} className="transition hover:text-white">
                {site.email}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-slate-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Accepting consignments 24/7
            </span>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-ice-300"
            >
              <Phone className="h-3.5 w-3.5" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div
        className={`border-b bg-white/95 backdrop-blur transition-all duration-300 ${
          scrolled ? "border-slate-200 shadow-card" : "border-transparent"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-8">
          <a href="#top" className="flex shrink-0 items-center gap-3">
            <SnowflakeMark className="h-9 w-9" />
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-bold tracking-tight text-ink-900">
                {site.shortName}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Cold Storage
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 text-[13.5px] font-medium text-slate-600 transition-colors hover:text-ink-900"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-ice-600 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden text-[13.5px] font-semibold text-ink-800 transition hover:text-ice-700 xl:inline-flex"
            >
              Request a quotation
            </a>
            <a href="#contact" className="btn-primary hidden !h-10 sm:inline-flex">
              Book a site visit
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-ink-800 transition hover:bg-slate-50 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* reading progress */}
        <div className="relative h-[2px] w-full">
          <span
            className="absolute left-0 top-0 h-full bg-ice-600 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-b border-slate-200 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell grid gap-0.5 py-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink-800 transition hover:bg-slate-50"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 grid gap-2.5">
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              Book a site visit
            </a>
            <a href={site.phoneHref} className="btn-secondary w-full">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
