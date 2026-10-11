"use client";

import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { site } from "@/lib/site";

/** Discreet contact affordance for the operations desk. */
export function TapToChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open ? (
        <div className="enter w-[268px] rounded-xl border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-start justify-between">
            <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Operations desk
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close contact options"
              className="grid h-6 w-6 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-ink-800"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
            Need capacity at short notice? The intake line is answered around the clock.
          </p>

          <div className="mt-4 grid gap-2">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !h-10 !text-[13px]"
            >
              <MessageCircle className="h-4 w-4" /> Message on WhatsApp
            </a>
            <a href={site.phoneHref} className="btn-secondary !h-10 !text-[13px]">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Contact operations"
        className="grid h-12 w-12 place-items-center rounded-full bg-ice-600 text-white shadow-panel transition hover:bg-ice-700"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
