import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SubscribeForm } from "@/components/SubscribeForm";
import { footerLinks, site } from "@/lib/site";
import { pages } from "@/lib/pages";

export function Footer() {
  return (
    <footer className="on-dark border-t border-white/10 bg-ink-950 text-slate-400">
      <div className="shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" aria-label={`${site.name} — home`} className="inline-flex">
              <span className="flex h-12 items-center rounded-lg bg-white/95 pl-2 pr-3.5 shadow-card">
                <Logo className="h-8" />
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-slate-400">
              {site.description}
            </p>

            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-3 text-[13.5px] text-slate-300 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-ice-400" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 text-[13.5px] text-slate-300 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 text-ice-400" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-[13.5px] text-slate-300">
                <MapPin className="h-4 w-4 text-ice-400" />
                {site.location}
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-300 transition hover:border-white/40 hover:text-white"
              aria-label="Company profile"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerLinks.map((column) => (
              <div key={column.heading}>
                <h3 className="text-2xs font-semibold uppercase tracking-[0.16em] text-white">
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-slate-400 transition hover:text-ice-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* capacity updates */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-[14.5px] font-bold text-white">
              Capacity and cold-chain updates
            </p>
            <p className="mt-1 text-[12.5px] text-slate-400">
              One email a month: available capacity, new rooms, seasonal guidance.
            </p>
          </div>
          <SubscribeForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[12.5px] text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/monitoring" className="transition hover:text-ice-200">
              Terms of service
            </Link>
            <Link href="/monitoring" className="transition hover:text-ice-200">
              Privacy policy
            </Link>
            <Link href="/monitoring" className="transition hover:text-ice-200">
              Cold-chain policy
            </Link>
            <span>Operating since {site.founded}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
