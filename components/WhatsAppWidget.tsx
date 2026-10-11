"use client";

import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { useI18n } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

/** Discreet contact affordance for the operations desk. */
export function TapToChatWidget() {
  const { content } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 end-4 z-40 flex flex-col items-end gap-3 sm:bottom-5 sm:end-5">
      {open ? (
        <div className="enter w-[min(84vw,268px)] rounded-xl border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {content.widget.title}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={content.ui.closeMenu}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-ink-800"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-slate-600">{content.widget.body}</p>

          <div className="mt-4 grid gap-2">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !h-10 !text-[13px]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span className="numeric truncate">
                {content.ui.whatsapp} {site.whatsappNumber}
              </span>
            </a>
            <a href={site.phoneHref} className="btn-secondary numeric !h-10 !text-[13px]">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="truncate">{content.hero.phoneLabel}</span>
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={content.widget.title}
        className="grid h-12 w-12 place-items-center rounded-full bg-ice-600 text-white shadow-panel transition hover:bg-ember-700"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
