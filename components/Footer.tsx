import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Snowflake,
} from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { SubscribeForm } from "@/components/SubscribeForm";
import { Snowfall } from "@/components/Snowfall";
import { footerLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-frost-300 bg-gradient-to-b from-frost-100 to-frost-200">
      <Snowfall count={12} seed={303} speed={0.7} />
      <SnowflakeMark
        aria-hidden
        className="animate-spin-slow pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 opacity-[0.06]"
      />

      <div className="shell relative pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          {/* brand */}
          <div>
            <a href="#top" className="group inline-flex items-center gap-3">
              <SnowflakeMark className="h-11 w-11 transition-transform duration-700 group-hover:rotate-[120deg]" />
              <span className="leading-tight">
                <span className="block font-display text-[16px] font-extrabold tracking-tight text-ink-900">
                  {site.shortName}
                </span>
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ice-600">
                  Cold Storage
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-ink-500">
              {site.description}
            </p>

            <ul className="mt-6 space-y-3 text-[13.5px]">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2.5 text-ink-600 transition hover:text-ice-700"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl border border-frost-400 bg-white/70 text-ice-600">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-ink-600 transition hover:text-ice-700"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl border border-frost-400 bg-white/70 text-ice-600">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-ink-600">
                <span className="grid h-8 w-8 place-items-center rounded-xl border border-frost-400 bg-white/70 text-ice-600">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                {site.location}
              </li>
            </ul>

            <div className="mt-6 flex gap-2.5">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  aria-label="Social profile"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-frost-400 bg-white/70 text-ink-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-ice-400 hover:text-ice-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* links + newsletter */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerLinks.map((column) => (
              <div key={column.heading}>
                <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900">
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[13.5px] text-ink-500 transition hover:text-ice-700"
                      >
                        <Snowflake className="h-3 w-3 text-ice-300 transition-transform duration-500 group-hover:rotate-90" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* cold alert strip */}
        <div
          data-reveal
          className="mt-14 flex flex-col gap-4 rounded-3xl border border-frost-300 bg-white/80 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-grad text-white shadow-glow">
              <Snowflake className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="font-display text-[14.5px] font-bold text-ink-900">
                Capacity & cold-chain notes
              </p>
              <p className="mt-1 text-[12.5px] text-ink-400">
                One short email a month: available capacity, new rooms, seasonal advice.
              </p>
            </div>
          </div>
          <SubscribeForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-frost-300 pt-7 text-[12.5px] text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#faq" className="transition hover:text-ice-700">
              Terms
            </a>
            <a href="#faq" className="transition hover:text-ice-700">
              Privacy
            </a>
            <a href="#faq" className="transition hover:text-ice-700">
              Cold-chain policy
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Snowflake className="h-3.5 w-3.5 text-ice-400" />
              Keeping it cold since {site.founded}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
