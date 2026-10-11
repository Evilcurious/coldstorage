"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { socialIconMap } from "@/components/SocialIcons";
import { Logo } from "@/components/Logo";
import { SubscribeForm } from "@/components/SubscribeForm";
import { ContactIconRow } from "@/components/ContactChannels";
import { useI18n } from "@/components/LanguageProvider";
import { site, socials } from "@/lib/site";

export function Footer() {
  const { content } = useI18n();

  return (
    <footer className="on-dark border-t border-white/10 bg-ink-950 text-slate-400">
      <div className="shell py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr] lg:gap-12">
          <div>
            <Link href="/" aria-label={`${site.name} — ${content.ui.home}`} className="inline-flex">
              <Logo className="h-11" tone="light" />
            </Link>

            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-slate-400">
              {content.footer.blurb}
            </p>

            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="numeric inline-flex items-center gap-3 text-[13.5px] text-slate-300 transition hover:text-ember-300"
                >
                  <Phone className="h-4 w-4 shrink-0 text-ice-400" />
                  {content.hero.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 text-[13.5px] text-slate-300 transition hover:text-ember-300"
                >
                  <Mail className="h-4 w-4 shrink-0 text-ice-400" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[13.5px] text-slate-300 transition hover:text-ember-300"
                  title={`${content.contact.channels[3]?.label ?? "Location"}: ${site.address}`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ice-400" />
                  {site.address}
                </a>
              </li>
            </ul>

            <ul className="mt-6 flex items-center gap-2.5">
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
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-slate-300 transition hover:-translate-y-0.5 hover:border-ember-400 hover:text-ember-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  aria-label={`${content.ui.email} ${site.email}`}
                  title={site.email}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-slate-300 transition hover:-translate-y-0.5 hover:border-ember-400 hover:text-ember-300"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            {content.footer.columns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-slate-400 transition hover:text-ember-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* contact channels as icons — where the commercial-terms entry used to be */}
            <div className="col-span-2 sm:col-span-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                {content.contact.eyebrow}
              </h3>
              <div className="mt-4">
                <ContactIconRow />
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-slate-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {content.ui.accepting}
              </p>
            </div>
          </div>
        </div>

        {/* capacity updates */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-[14.5px] font-bold text-white">
              {content.footer.updatesTitle}
            </p>
            <p className="mt-1 text-[12.5px] text-slate-400">{content.footer.updatesBody}</p>
          </div>
          <SubscribeForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[12.5px] text-slate-500 sm:flex-row">
          <p className="numeric text-center sm:text-start">
            © {new Date().getFullYear()} {site.name}. {content.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {content.footer.legal.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-ember-300">
                {link.label}
              </Link>
            ))}
            <span className="numeric">{content.footer.since}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
