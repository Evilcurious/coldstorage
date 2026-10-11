"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { pages } from "@/lib/pages";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(y / height, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* every page opens on a full-bleed photograph, so the bar starts transparent */
  const onDark = !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`hidden transition-colors duration-300 md:block ${
          onDark ? "border-b border-white/10 bg-transparent" : "border-b border-white/10 bg-ink-950"
        }`}
      >
        <div className="shell flex h-9 items-center justify-between text-[12px]">
          <div className={`flex items-center gap-6 ${onDark ? "text-white/75" : "text-slate-300"}`}>
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
            <span
              className={`hidden items-center gap-2 sm:inline-flex ${
                onDark ? "text-white/75" : "text-slate-300"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Accepting consignments 24/7
            </span>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-ice-200"
            >
              <Phone className="h-3.5 w-3.5" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b backdrop-blur transition-colors duration-300 ${
          onDark
            ? "border-white/10 bg-gradient-to-b from-ink-950/70 to-transparent"
            : "border-slate-200 bg-white/95 shadow-card"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <SnowflakeMark className="h-9 w-9" />
            <span className="leading-tight">
              <span
                className={`block font-display text-[15px] font-bold tracking-tight transition-colors ${
                  onDark ? "text-white" : "text-ink-900"
                }`}
              >
                {site.shortName}
              </span>
              <span
                className={`block text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  onDark ? "text-white/60" : "text-slate-400"
                }`}
              >
                Cold Storage
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {pages.map((page) => {
              const isActive = pathname === page.slug;
              return (
                <Link
                  key={page.slug}
                  href={page.slug}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative py-2 text-[13.5px] font-medium transition-colors ${
                    onDark ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-ink-900"
                  }`}
                >
                  {page.label}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-[2px] origin-left transition-transform duration-300 group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    } ${onDark ? "bg-white" : "bg-ice-600"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`btn hidden !h-10 sm:inline-flex ${
                onDark
                  ? "border border-white/40 text-white hover:border-white/80 hover:bg-white/10"
                  : "bg-ice-600 text-white hover:bg-ice-700"
              }`}
            >
              Request a quotation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition lg:hidden ${
                onDark
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-slate-300 text-ink-800 hover:bg-slate-50"
              }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="relative h-[2px] w-full">
          <span
            className={`absolute left-0 top-0 h-full transition-[width] duration-150 ease-out ${
              onDark ? "bg-white/70" : "bg-ice-600"
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-slate-200 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell grid gap-0.5 py-4">
          <Link
            href="/"
            className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-slate-50 ${
              pathname === "/" ? "text-ice-700" : "text-ink-800"
            }`}
          >
            Home
          </Link>
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={page.slug}
              className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-slate-50 ${
                pathname === page.slug ? "text-ice-700" : "text-ink-800"
              }`}
            >
              {page.label}
            </Link>
          ))}
          <div className="mt-3 grid gap-2.5">
            <Link href="/contact" className="btn-primary w-full">
              Request a quotation
            </Link>
            <a href={site.phoneHref} className="btn-secondary w-full">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
