import { Logo } from "./Logo";
import { COMPANY, NAV } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo markId="iceGradFooter" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {COMPANY.arabic}
              <br />
              Precision cold chain for food and pharmaceutical integrity.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ice-400">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-ice-200">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ice-400">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <a href={`tel:${COMPANY.phoneTel}`} className="hover:text-ice-200">
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.landlineTel}`} className="hover:text-ice-200">
                  {COMPANY.landlineDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-ice-200">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.opsEmail}`} className="hover:text-ice-200">
                  {COMPANY.opsEmail}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ice-400">
              Campus
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {COMPANY.address}
              <br />
              {COMPANY.hours}
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tahseen Jaber Cold Storage. All rights reserved.</p>
          <p>ISO 22000 · HACCP · GDP · ISO 9001</p>
        </div>
      </div>
    </footer>
  );
}
