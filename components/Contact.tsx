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
  Snowflake,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Snowfall } from "@/components/Snowfall";
import { site } from "@/lib/site";

const cargoTypes = [
  "Frozen food / meat / poultry",
  "Seafood",
  "Dairy & chilled produce",
  "Bakery & confectionery",
  "Pharmaceutical / medical",
  "Other perishable",
];

const zoneOptions = ["Deep frozen (−25 °C)", "Chilled (0 °C)", "Pharma (2–8 °C)", "Not sure yet"];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    cargo: cargoTypes[0],
    zone: zoneOptions[0],
    pallets: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const inputClass =
    "w-full rounded-2xl border border-frost-400 bg-white/85 px-4 py-3 text-[14px] text-ink-800 shadow-inner outline-none transition-all duration-300 placeholder:text-ink-300 focus:border-ice-400 focus:bg-white focus:shadow-soft";

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-gradient-to-br from-frost-100 via-white to-frost-200 p-6 shadow-lift sm:p-10 lg:p-12">
          <Snowfall count={16} seed={99} speed={0.75} />
          <span
            aria-hidden
            className="animate-drift pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ice-300/35 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            {/* ---- info ---- */}
            <div>
              <SectionHeading
                align="left"
                eyebrow="Book a tour or request a quote"
                title={
                  <>
                    Come feel the cold <span className="gradient-text">for yourself</span>
                  </>
                }
                body="Send the details of your consignment and we'll come back with available capacity, a temperature plan and a price — usually within one working day."
              />

              <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
                {[
                  {
                    icon: Phone,
                    label: "Intake line · 24/7",
                    value: site.phone,
                    href: site.phoneHref,
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp desk",
                    value: "Chat with operations",
                    href: site.whatsapp,
                  },
                  {
                    icon: Mail,
                    label: "Commercial",
                    value: site.email,
                    href: `mailto:${site.email}`,
                  },
                  {
                    icon: MapPin,
                    label: "Facility",
                    value: site.location,
                  },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                    className="card flex items-start gap-3.5 rounded-3xl p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-grad text-white shadow-glow">
                      <item.icon className="h-[17px] w-[17px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-300">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block truncate text-[13.5px] font-semibold text-ink-800 transition hover:text-ice-700"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-[13.5px] font-semibold text-ink-800">
                          {item.value}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div
                data-reveal
                className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border border-frost-300 bg-white/70 px-5 py-4 backdrop-blur"
              >
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-500">
                  <Clock className="h-4 w-4 text-ice-500" /> {site.hours}
                </span>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-500">
                  <CalendarClock className="h-4 w-4 text-ice-500" /> Tours daily, 09:00 & 15:00
                </span>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-500">
                  <Snowflake className="h-4 w-4 text-ice-500" /> Bring a jacket — we start in the
                  freezer
                </span>
              </div>
            </div>

            {/* ---- form ---- */}
            <div data-reveal="right" className="card relative overflow-hidden rounded-[32px] p-6 sm:p-8">
              {sent ? (
                <div className="enter flex min-h-[520px] flex-col items-center justify-center text-center">
                  <span className="relative grid h-20 w-20 place-items-center rounded-3xl bg-brand-grad text-white shadow-glow">
                    <CheckCircle2 className="h-9 w-9" />
                    <span className="animate-pulse-ring absolute inset-0 rounded-3xl border border-ice-400" />
                  </span>
                  <h3 className="mt-6 font-display text-[22px] font-extrabold text-ink-900">
                    Enquiry frozen in place
                  </h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-500">
                    Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — your request is with
                    the commercial desk. Expect a reply within one working day, and a same-day call
                    if the cargo is already in transit.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a href={site.phoneHref} className="btn-ghost">
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
                  className="grid gap-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[18px] font-bold text-ink-900">
                      Storage enquiry
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-frost-400/70 bg-frost-100/80 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-ice-700">
                      Reply within 1 working day
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-[12px] font-semibold text-ink-500">Full name *</span>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[12px] font-semibold text-ink-500">Company</span>
                      <input
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        placeholder="Company name"
                        className={inputClass}
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[12px] font-semibold text-ink-500">Email *</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[12px] font-semibold text-ink-500">Phone / WhatsApp</span>
                      <input
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+964 …"
                        className={inputClass}
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[12px] font-semibold text-ink-500">Cargo type</span>
                      <select
                        value={form.cargo}
                        onChange={(e) => update("cargo", e.target.value)}
                        className={inputClass}
                      >
                        {cargoTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[12px] font-semibold text-ink-500">
                        Temperature zone
                      </span>
                      <select
                        value={form.zone}
                        onChange={(e) => update("zone", e.target.value)}
                        className={inputClass}
                      >
                        {zoneOptions.map((zone) => (
                          <option key={zone}>{zone}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="grid gap-1.5">
                    <span className="text-[12px] font-semibold text-ink-500">
                      Expected volume (pallets / tonnes)
                    </span>
                    <input
                      value={form.pallets}
                      onChange={(e) => update("pallets", e.target.value)}
                      placeholder="e.g. 220 pallets, long-hold"
                      className={inputClass}
                    />
                  </label>

                  <label className="grid gap-1.5">
                    <span className="text-[12px] font-semibold text-ink-500">
                      Anything else we should know?
                    </span>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Timing, packaging, audit requirements, collection points…"
                      className={`${inputClass} resize-none`}
                    />
                  </label>

                  <button type="submit" className="btn-primary group mt-1 w-full !py-3.5">
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    Send enquiry
                  </button>
                  <p className="text-center text-[11px] text-ink-300">
                    We only use these details to answer your enquiry. No lists, no spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
