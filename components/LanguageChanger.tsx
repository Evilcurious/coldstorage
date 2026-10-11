"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./LanguageProvider";
import { locales, type LocaleCode } from "@/lib/i18n";

type Props = {
  /** `bar` sits in the header utility row, `drawer` fills the mobile drawer. */
  variant?: "bar" | "drawer";
  className?: string;
};

export function LanguageChanger({ variant = "bar", className = "" }: Props) {
  const { content, locale, meta, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: LocaleCode) => {
    setLocale(code);
    setOpen(false);
  };

  if (variant === "drawer") {
    return (
      <div className={className}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ice-300">
          {content.ui.language}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {locales.map((entry) => {
            const active = entry.code === locale;
            return (
              <button
                key={entry.code}
                type="button"
                lang={entry.htmlLang}
                onClick={() => choose(entry.code)}
                aria-pressed={active}
                className={`min-h-11 rounded-xl border px-3 py-2 text-sm transition ${
                  active
                    ? "border-ember-500 bg-ember-500/15 text-white"
                    : "border-white/15 bg-white/5 text-ice-200 hover:border-ember-500/60 hover:text-ember-300"
                }`}
              >
                {entry.native}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={content.ui.language}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-2 text-[11px] font-medium text-ice-200 transition hover:border-ember-500/70 hover:bg-ember-500/10 hover:text-ember-300 sm:h-auto sm:px-2.5 sm:py-1"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="hidden h-3.5 w-3.5 sm:block">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18-2.6-3-2.6-15 0-18Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        <span className="hidden xl:inline">{meta.native}</span>
        <span className="uppercase xl:hidden">{locale}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={`hidden h-3 w-3 transition sm:block ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={content.ui.language}
          className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/12 bg-ice-900 shadow-[0_18px_44px_-18px_rgba(6,15,30,0.85)]"
        >
          {locales.map((entry) => {
            const active = entry.code === locale;
            return (
              <li key={entry.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  lang={entry.htmlLang}
                  onClick={() => choose(entry.code)}
                  className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-start text-sm transition ${
                    active ? "bg-ember-500/15 text-ember-300" : "text-ice-200 hover:bg-white/8 hover:text-ember-300"
                  }`}
                >
                  <span>{entry.native}</span>
                  {active && (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                      <path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LanguageChanger;
