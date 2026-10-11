"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useQuote } from "./QuoteContext";

export function QuoteModal() {
  const { open, setOpen } = useQuote();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setSent(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (!open) return null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        aria-label="Close quote dialog"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="relative z-10 w-full max-w-lg rounded-t-3xl border border-white/10 bg-navy-900 p-6 shadow-glow-lg sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 hover:text-white"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {sent ? (
          <div className="py-8">
            <p id="quote-title" className="font-display text-2xl text-white">
              Quote request sent
            </p>
            <p className="mt-3 text-sm text-slate-400">
              A commercial specialist will return a capacity hold and rate indication shortly.
            </p>
            <button type="button" className="btn-primary mt-6" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.22em] text-ice-400">Storage quote</p>
            <h2 id="quote-title" className="heading-display mt-2 text-2xl">
              Request reserved capacity
            </h2>
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input name="company" required placeholder="Company" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="name" required placeholder="Contact name" />
                <input type="email" name="email" required placeholder="Email" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="tel" name="phone" required placeholder="Phone / WhatsApp" />
                <select name="product" defaultValue="meat" aria-label="Product type">
                  <option value="meat">Meat & Poultry</option>
                  <option value="pharma">Pharmaceuticals</option>
                  <option value="produce">Produce</option>
                  <option value="dairy">Dairy</option>
                </select>
              </div>
              <input name="tonnage" placeholder="Estimated tonnage" />
              <textarea name="notes" rows={3} placeholder="Temperature band, inbound date, special handling" />
              <button type="submit" className="btn-primary w-full">
                Send quote request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
