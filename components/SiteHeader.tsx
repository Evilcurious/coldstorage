"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { socialIconMap } from "@/components/SocialIcons";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/components/LanguageProvider";
import { LanguageChanger } from "@/components/LanguageChanger";
import { ContactIconRow } from "@/components/ContactChannels";
import { site, socials } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const { content } = useI18n();
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
        <div className="shell flex h-9 items-center justify-between gap-3 text-[12px]">
          <div className={`flex min-w-0 items-center gap-4 ${onDark ? "text-white/75" : "text-slate-300"}`}>
            <span className="inline-flex min-w-0 items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-ember-400" />
              <span className="truncate">{content.hero.eyebrow}</span>
            </span>

            {/* mail: icon only */}
            <a
              href={`mailto:${site.email}`}
              aria-label={`${content.ui.email} ${site.email}`}
              title={site.email}
              className="inline-flex shrink-0 items-center justify-center transition hover:text-ember-300"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* social channels */}
            <ul className="flex items-center gap-1">
              {socials.map((social) => {
                const Icon = socialIconMap[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.shortName} — ${social.label}`}
                      title={social.label}
                      className={`grid h-6 w-6 place-items-center rounded-md transition ${
                        onDark
                          ? "text-white/70 hover:bg-white/10 hover:text-ember-300"
                          : "text-slate-300 hover:bg-white/10 hover:text-ember-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <span aria-hidden className="h-4 w-px bg-white/20" />

            <span
              className={`hidden items-center gap-2 xl:inline-flex ${
                onDark ? "text-white/75" : "text-slate-300"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {content.ui.accepting}
            </span>

            <a
              href={site.phoneHref}
              className="numeric inline-flex items-center gap-2 font-semibold text-white transition hover:text-ember-300"
            >
              <Phone className="h-3.5 w-3.5" />
              {content.hero.phoneLabel}
            </a>

            <LanguageChanger />
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
        <div className="shell flex h-[64px] items-center justify-between gap-3 sm:h-[68px] sm:gap-6">
          <Link href="/" aria-label={`${site.name} — ${content.ui.home}`} className="flex shrink-0 items-center">
            {/* on the dark hero the navy wordmark sits on a white plate */}
            <span
              className={`flex h-10 max-w-full items-center rounded-lg transition-all duration-300 sm:h-11 ${
                onDark ? "bg-white/95 pl-2 pr-3 shadow-card" : "pl-0"
              }`}
            >
              <Logo className="h-7 sm:h-8" />
            </span>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-5">
            {content.nav.map((item) => {
              const isActive = pathname === `/${item.slug}`;
              return (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative py-2 text-[13.5px] font-medium transition-colors ${
                    onDark
                      ? "text-white/80 hover:text-ember-300"
                      : "text-slate-600 hover:text-ember-700"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-[2px] origin-left transition-transform duration-300 group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    } ${onDark ? "bg-ember-300" : "bg-ember-600"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageChanger className="md:hidden" />
            <Link
              href="/contact"
              className={`btn hidden !h-10 !px-5 sm:inline-flex ${
                onDark
                  ? "border border-white/40 text-white hover:border-ember-400 hover:bg-white/10 hover:text-ember-300"
                  : "bg-ice-600 text-white hover:bg-ember-700"
              }`}
            >
              {content.ui.requestQuote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? content.ui.closeMenu : content.ui.menu}
              aria-expanded={open}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border transition lg:hidden ${
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
            className={`absolute start-0 top-0 h-full transition-[width] duration-150 ease-out ${
              onDark ? "bg-white/70" : "bg-gradient-to-r from-ink-900 to-ember-600"
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-slate-200 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[78svh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell grid gap-0.5 py-4">
          <Link
            href="/"
            className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-slate-50 hover:text-ember-700 ${
              pathname === "/" ? "text-ice-700" : "text-ink-800"
            }`}
          >
            {content.ui.home}
          </Link>
          {content.nav.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-slate-50 hover:text-ember-700 ${
                pathname === `/${item.slug}` ? "text-ice-700" : "text-ink-800"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <LanguageChanger variant="drawer" className="mt-5" />

          <div className="mt-5 grid gap-2.5">
            <Link href="/contact" className="btn-primary w-full">
              {content.ui.requestQuote}
            </Link>
            <a href={site.phoneHref} className="btn-secondary numeric w-full">
              <Phone className="h-4 w-4" /> {content.hero.phoneLabel}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
              {content.ui.whatsapp} · {site.whatsappNumber}
            </a>
          </div>

          <ContactIconRow tone="light" className="mt-4 px-3" />

          <div className="mt-4 flex flex-wrap items-center gap-2 px-3 pb-2">
            {socials.map((social) => {
              const Icon = socialIconMap[social.id];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.shortName} — ${social.label}`}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-ember-400 hover:text-ember-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
            <a
              href={`mailto:${site.email}`}
              aria-label={`${content.ui.email} ${site.email}`}
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-ember-400 hover:text-ember-700"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
