"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, ThermometerSnowflake, X } from "lucide-react";
import { site } from "@/lib/site";

export function TapToChatWidget() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setNudge(true), 4200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open ? (
        <div className="enter card w-[270px] overflow-hidden rounded-3xl p-5 shadow-lift">
          <div className="flex items-start justify-between">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ice-700">
              <ThermometerSnowflake className="h-4 w-4" />
              Operations desk
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat options"
              className="grid h-7 w-7 place-items-center rounded-full border border-frost-400 text-ink-400 transition hover:text-ice-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
            Need a room today? Message the duty supervisor — the intake line is answered around the
            clock.
          </p>
          <div className="mt-4 grid gap-2.5">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-3 !text-[13px]"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a href={site.phoneHref} className="btn-ghost !py-3 !text-[13px]">
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        {nudge && !open ? (
          <span className="enter hidden rounded-2xl border border-frost-300 bg-white/90 px-3.5 py-2 text-[12.5px] font-medium text-ink-600 shadow-soft backdrop-blur sm:block">
            Cold room ready in 2 hours?
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Contact operations"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-brand-grad text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-ice-300" />
          <span
            aria-hidden
            className="animate-sheen absolute inset-0 overflow-hidden rounded-full bg-white/20 blur-md"
          />
          {open ? (
            <X className="relative h-6 w-6" />
          ) : (
            <MessageCircle className="relative h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}
