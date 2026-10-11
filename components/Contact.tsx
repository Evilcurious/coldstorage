"use client";

import { useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { site } from "@/lib/site";

const cargoTypes = [
  "Frozen food / meat / poultry",
  "Seafood",
  "Dairy & chilled produce",
  "Bakery & confectionery",
  "Pharmaceutical / medical",
  "Other perishable",
];

const regimes = ["Deep frozen −25 °C", "Chilled 0 °C", "Validated 2–8 °C", "Not yet confirmed"];

const channels = [
  { icon: Phone, label: "Intake line · 24 hours", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Commercial desk", value: site.email, href: `mailto:${site.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Message operations", href: site.whatsapp },
  { icon: MapPin, label: "Facility", value: site.location },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    cargo: cargoTypes[0],
    regime: regimes[0],
    volume: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_30%_0%,black,transparent)]"
      />

      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* details */}
          <div>
            <span className="label text-ice-300 before:bg-ice-400">Contact</span>
            <h2 className="mt-4 font-display text-[28px] font-bold leading-tight text-white sm:text-[34px]">
              Talk to our commercial team
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
              Send the details of your consignment and we will come back with available capacity, a
              temperature plan and indicative pricing — normally within one working day.
            </p>

            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {channels.map((channel) => (
                <div key={channel.label} className="flex items-start gap-4 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-ice-300">
                    <channel.icon className="h-[17px] w-[17px]" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {channel.label}
                    </dt>
                    <dd className="mt-1.5">
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="break-words text-[14.5px] font-semibold text-white transition hover:text-ice-300"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        <span className="text-[14.5px] font-semibold text-white">
                          {channel.value}
                        </span>
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-ice-300" />
                {site.hours}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-ice-300" />
                Site visits daily at 09:00 and 15:00
              </span>
            </div>
          </div>

          {/* form */}
          <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-panel sm:p-8">
            {sent ? (
              <div className="enter flex min-h-[520px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-ice-50 text-ice-600">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-[20px] font-bold text-ink-900">
                  Enquiry received
                </h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-slate-600">
                  Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Your enquiry is with
                  our commercial desk and will be answered within one working day — sooner if the
                  cargo is already in transit.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a href={site.phoneHref} className="btn-secondary">
                    <Phone className="h-4 w-4" /> Call the intake line
                  </a>
                  <button type="button" onClick={() => setSent(false)} className="btn-primary">
                    Send another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-ink-900">
                      Storage enquiry
                    </h3>
                    <p className="mt-1 text-[12.5px] text-slate-500">
                      Fields marked * are required
                    </p>
                  </div>
                  <span className="tag-ice shrink-0">Reply within 1 working day</span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="field-label">Full name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className="field"
                    />
                  </label>
                  <label>
                    <span className="field-label">Company</span>
                    <input
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Company name"
                      className="field"
                    />
                  </label>
                  <label>
                    <span className="field-label">Email *</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@company.com"
                      className="field"
                    />
                  </label>
                  <label>
                    <span className="field-label">Phone / WhatsApp</span>
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+964 …"
                      className="field"
                    />
                  </label>
                  <label>
                    <span className="field-label">Cargo type</span>
                    <select
                      value={form.cargo}
                      onChange={(e) => update("cargo", e.target.value)}
                      className="field"
                    >
                      {cargoTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="field-label">Temperature regime</span>
                    <select
                      value={form.regime}
                      onChange={(e) => update("regime", e.target.value)}
                      className="field"
                    >
                      {regimes.map((regime) => (
                        <option key={regime}>{regime}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="field-label">Expected volume</span>
                  <input
                    value={form.volume}
                    onChange={(e) => update("volume", e.target.value)}
                    placeholder="e.g. 220 pallets, long-hold storage"
                    className="field"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="field-label">Additional requirements</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Timing, packaging, audit requirements, collection points…"
                    className="field resize-none"
                  />
                </label>

                <button type="submit" className="btn-primary mt-6 w-full">
                  <Send className="h-4 w-4" />
                  Send enquiry
                </button>
                <p className="mt-3 text-center text-[11.5px] text-slate-400">
                  Your details are used only to answer this enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
