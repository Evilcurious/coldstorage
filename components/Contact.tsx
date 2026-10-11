"use client";

import { FormEvent, useState } from "react";
import { COMPANY } from "@/lib/constants";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[28px] border border-ice-400/20 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-ice-500/20 via-navy-900 to-navy-950 p-8 sm:p-12">
            <p className="section-kicker">Commercial desk</p>
            <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
              Reserve capacity before the season peaks.
            </h2>
            <p className="mt-4 max-w-md text-slate-300">
              Share your commodity, volume, and temperature band. A specialist
              responds within one business hour during desk hours — and
              operations never close.
            </p>
            <dl className="mt-10 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-ice-400">
                  Direct
                </dt>
                <dd className="mt-1 text-lg text-white">{COMPANY.phoneDisplay}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ice-400">
                  Email
                </dt>
                <dd className="mt-1 text-white">{COMPANY.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ice-400">
                  WhatsApp
                </dt>
                <dd className="mt-1 text-white">Instant commercial chat</dd>
              </div>
            </dl>
          </div>
          <div className="bg-navy-900/80 p-8 sm:p-12">
            {sent ? (
              <div className="flex h-full min-h-[280px] flex-col justify-center">
                <p className="font-display text-2xl text-white">Request received.</p>
                <p className="mt-3 text-slate-400">
                  Thank you. Our commercial team will confirm chamber availability
                  and a formal rate card shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs uppercase tracking-widest text-slate-400">
                    Full name
                    <input name="name" required className="mt-2" placeholder="Your name" />
                  </label>
                  <label className="block text-xs uppercase tracking-widest text-slate-400">
                    Company
                    <input name="company" required className="mt-2" placeholder="Organisation" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs uppercase tracking-widest text-slate-400">
                    Email
                    <input type="email" name="email" required className="mt-2" placeholder="you@company.com" />
                  </label>
                  <label className="block text-xs uppercase tracking-widest text-slate-400">
                    Phone
                    <input type="tel" name="phone" required className="mt-2" placeholder="+964 …" />
                  </label>
                </div>
                <label className="block text-xs uppercase tracking-widest text-slate-400">
                  Cargo notes
                  <textarea
                    name="notes"
                    rows={4}
                    className="mt-2"
                    placeholder="Product type, tonnage, temperature, inbound date…"
                  />
                </label>
                <button type="submit" className="btn-primary w-full">
                  Submit inquiry
                </button>
                <p className="text-center text-[11px] text-slate-500">
                  By submitting you agree to be contacted regarding storage capacity.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
