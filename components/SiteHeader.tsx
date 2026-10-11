"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Menu, MessageCircle, Phone, X, type LucideIcon } from "lucide-react";
import { socialIconMap } from "@/components/SocialIcons";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/components/LanguageProvider";
import { LanguageChanger } from "@/components/LanguageChanger";
import { ContactIconRow } from "@/components/ContactChannels";
import { site, socials } from "@/lib/site";

/** One band, one row: identity, navigation, contact actions. */
export function SiteHeader() {
  const pathname = usePathname();
  const { content } = useI18n();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(window.scrollY / height, 1) : 0);
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

  /* the phone number is no longer shouted across the bar — it lives on the icons */
  const actions: { id: string; href: string; label: string; Icon: LucideIcon; external?: boolean; compact?: boolean }[] = [
    {
      id: "whatsapp",
      href: site.whatsapp,
      label: `${content.ui.whatsapp} · ${site.whatsappNumber}`,
      Icon: MessageCircle,
      external: true,
    },
    {
      id: "phone",
      href: site.phoneHref,
      label: `${content.ui.call} · ${content.hero.phoneLabel}`,
      Icon: Phone,
      compact: true,
    },
    {
      id: "email",
      href: `mailto:${site.email}`,
      label: `${content.ui.email} · ${site.email}`,
      Icon: Mail,
      compact: true,
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/95 backdrop-blur-md">
      <div className="shell flex h-[64px] items-center justify-between gap-2 sm:h-[68px] sm:gap-5">
        <Link
          href="/"
          aria-label={`${site.name} — ${content.ui.home}`}
          className="flex min-w-0 shrink-0 items-center"
        >
          <Logo className="h-9 sm:h-10" tone="light" compact />
        </Link>

        <nav className="hidden items-center gap-3.5 lg:flex xl:gap-5">
          {content.nav.map((item) => {
            const isActive = pathname === `/${item.slug}`;
            return (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                aria-current={isActive ? "page" : undefined}
                className="group relative whitespace-nowrap py-2 text-[13px] font-medium text-white/80 transition-colors hover:text-ember-300 xl:text-[13.5px]"
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-ember-400 transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {/* social channels — from xl, where the bar has room */}
          <ul className="hidden items-center gap-1 xl:flex">
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
                    className="grid h-8 w-8 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-ember-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>

          <span aria-hidden className="mx-0.5 hidden h-4 w-px bg-white/20 xl:block" />

          {/* contact icons — the number, without the number */}
          <div className="flex items-center gap-1.5">
            {actions.map(({ id, href, label, Icon, external, compact }) => (
              <a
                key={id}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className={`${compact ? "hidden sm:grid" : "grid"} h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition hover:border-ember-400 hover:bg-white/10 hover:text-ember-300`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <LanguageChanger />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? content.ui.closeMenu : content.ui.menu}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition hover:border-ember-400 hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="relative h-[2px] w-full">
        <span
          className="absolute start-0 top-0 h-full bg-gradient-to-r from-ember-500 to-ember-300 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        className={`overflow-hidden border-b border-white/10 bg-ink-950 transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[78svh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell grid gap-0.5 py-4">
          <Link
            href="/"
            className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-white/5 hover:text-ember-300 ${
              pathname === "/" ? "text-ember-300" : "text-white/90"
            }`}
          >
            {content.ui.home}
          </Link>
          {content.nav.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-white/5 hover:text-ember-300 ${
                pathname === `/${item.slug}` ? "text-ember-300" : "text-white/90"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <LanguageChanger variant="drawer" className="mt-5" />

          <div className="mt-5 grid gap-2.5">
            <Link href="/contact" className="btn w-full bg-white text-ink-900 hover:bg-slate-100">
              {content.ui.requestQuote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a href={site.phoneHref} className="btn-ondark numeric w-full">
              <Phone className="h-4 w-4" /> {content.hero.phoneLabel}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ondark numeric w-full"
            >
              <MessageCircle className="h-4 w-4" /> {site.whatsappNumber}
            </a>
          </div>

          <ContactIconRow className="mt-5 px-3" />

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
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-slate-300 transition hover:border-ember-400 hover:text-ember-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
