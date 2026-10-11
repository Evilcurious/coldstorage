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
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { useI18n } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

const channelIcons = [Phone, Mail, MessageCircle, MapPin];

/** Contact section: channel list with icons plus the storage enquiry form. */
export function Contact() {
  const { content } = useI18n();
  const copy = content.contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    cargoIndex: 0,
    regimeIndex: 0,
    volume: "",
    message: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const channelValues = [
    { href: site.phoneHref, value: site.phone, external: false },
    { href: `mailto:${site.email}`, value: site.email, external: false },
    { href: site.whatsapp, value: site.whatsappNumber, external: true },
    { href: site.maps, value: site.address, external: true },
  ];

  return (
    <section id="contact" className="on-dark relative overflow-hidden bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_30%_0%,black,transparent)]"
      />
      <PanelSmoke className="z-0" intensity={0.85} />
      <SmokeTexture className="top-auto h-[60%]" opacity={0.3} seed={31} />

      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* details */}
          <div className="min-w-0">
            <span className="label text-ice-300 before:bg-ice-400">{copy.eyebrow}</span>
            <h2 className="mt-4 text-balance font-display text-[26px] font-bold leading-tight text-white sm:text-[34px]">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">{copy.body}</p>

            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {copy.channels.map((channel, i) => {
                const Icon = channelIcons[i] ?? Phone;
                const meta = channelValues[i];
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-ice-300">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">
                        {channel.label}
                      </dt>
                      <dd className="numeric mt-1.5 break-words text-[14px] font-semibold text-white sm:text-[14.5px]">
                        {meta?.value ?? channel.value}
                      </dd>
                    </span>
                  </>
                );

                return meta?.href ? (
                  <a
                    key={channel.label}
                    href={meta.href}
                    target={meta.external ? "_blank" : undefined}
                    rel={meta.external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 py-5 transition hover:[&_dd]:text-ember-300"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={channel.label} className="flex items-start gap-4 py-5">
                    {inner}
                  </div>
                );
              })}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-ice-300" />
                {content.ui.open24}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarClock className="h-4 w-4 shrink-0 text-ice-300" />
                {content.ui.siteVisits}
              </span>
            </div>
          </div>

          {/* form */}
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white p-5 shadow-panel sm:p-8">
            {sent ? (
              <div className="enter flex min-h-[420px] flex-col items-center justify-center text-center sm:min-h-[520px]">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-ice-50 text-ice-600">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-balance font-display text-[20px] font-bold text-ink-900">
                  {copy.success.title}
                </h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-slate-600">
                  {copy.success.body}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a href={site.phoneHref} className="btn-secondary numeric">
                    <Phone className="h-4 w-4" /> {content.hero.phoneLabel}
                  </a>
                  <button type="button" onClick={() => setSent(false)} className="btn-primary">
                    {copy.success.again}
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
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-ink-900">
                      {copy.form.title}
                    </h3>
                    <p className="mt-1 text-[12.5px] text-slate-500">{copy.form.required}</p>
                  </div>
                  <span className="tag-ice w-fit shrink-0">{copy.form.reply}</span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="field-label">{copy.form.name}</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder={copy.form.placeholders.name}
                      className="field"
                    />
                  </label>
                  <label>
                    <span className="field-label">{copy.form.company}</span>
                    <input
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder={copy.form.placeholders.company}
                      className="field"
                    />
                  </label>
                  <label>
                    <span className="field-label">{copy.form.email}</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder={copy.form.placeholders.email}
                      className="field"
                    />
                  </label>
                  <label>
                    <span className="field-label">{copy.form.phone}</span>
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder={copy.form.placeholders.phone}
                      className="field numeric"
                    />
                  </label>
                  <label>
                    <span className="field-label">{copy.form.cargo}</span>
                    <select
                      value={form.cargoIndex}
                      onChange={(e) => update("cargoIndex", Number(e.target.value))}
                      className="field"
                    >
                      {copy.form.cargoOptions.map((option, i) => (
                        <option key={option} value={i}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="field-label">{copy.form.regime}</span>
                    <select
                      value={form.regimeIndex}
                      onChange={(e) => update("regimeIndex", Number(e.target.value))}
                      className="field numeric"
                    >
                      {copy.form.regimeOptions.map((option, i) => (
                        <option key={option} value={i}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="field-label">{copy.form.volume}</span>
                  <input
                    value={form.volume}
                    onChange={(e) => update("volume", e.target.value)}
                    placeholder={copy.form.placeholders.volume}
                    className="field"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="field-label">{copy.form.message}</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder={copy.form.placeholders.message}
                    className="field resize-none"
                  />
                </label>

                <button type="submit" className="btn-primary mt-6 w-full">
                  <Send className="h-4 w-4 rtl:rotate-180" />
                  {copy.form.submit}
                </button>
                <p className="mt-3 text-center text-[11.5px] text-slate-400">{copy.form.note}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
