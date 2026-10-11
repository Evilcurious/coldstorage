"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const PINS = [
  {
    id: "hq",
    label: "Headquarters Campus",
    x: "62%",
    y: "46%",
    detail: "Uuayrij Industrial Area — 24 chambers, blast tunnels, GDP suite.",
  },
  {
    id: "docks",
    label: "Reefer Dock Complex",
    x: "54%",
    y: "58%",
    detail: "12 temperature-segregated docks · calibrated trailer checks.",
  },
  {
    id: "gate",
    label: "Secure Gatehouse",
    x: "44%",
    y: "38%",
    detail: "Biometric mantrap · 24/7 security command.",
  },
];

export function Facility() {
  const [active, setActive] = useState(PINS[0].id);
  const pin = PINS.find((p) => p.id === active) ?? PINS[0];

  return (
    <section id="facilities" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-kicker">Global Facility Map</p>
          <h2 className="heading-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Uuayrij Industrial Area, Baghdad.
          </h2>
          <p className="mt-4 text-slate-400">
            A purpose-built cold chain campus positioned on Baghdad&apos;s southern industrial corridor — minutes from national highway access, engineered for 24/7 inbound and export flows.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 lg:col-span-7">
            <Image
              src="/images/map-baghdad.jpg"
              alt="Stylized operational map of Baghdad highlighting the Uuayrij industrial campus"
              width={1600}
              height={1000}
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/20" />
            {PINS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                style={{ left: p.x, top: p.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={p.label}
                aria-pressed={active === p.id}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  {active === p.id && (
                    <span className="absolute h-10 w-10 rounded-full border border-ice-400/50 animate-pulseRing" />
                  )}
                  <span
                    className={`h-3.5 w-3.5 rounded-full border-2 border-navy-950 ${
                      active === p.id ? "bg-ice-300 shadow-glow" : "bg-ice-500"
                    }`}
                  />
                </span>
              </button>
            ))}
            <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ice-400">
                Selected pin
              </p>
              <p className="mt-1 font-display text-lg text-white">{pin.label}</p>
              <p className="mt-1 text-sm text-slate-300">{pin.detail}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/facility-exterior.jpg"
                alt="Tahseen Jaber Cold Storage campus exterior at dusk"
                width={1200}
                height={800}
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="glass-strong flex-1 rounded-3xl p-6">
              <h3 className="font-display text-xl text-white">Campus coordinates</h3>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-ice-400" />
                  {COMPANY.address}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-ice-400" />
                  <a href={`tel:${COMPANY.phoneTel}`} className="hover:text-ice-200">
                    {COMPANY.phoneDisplay}
                  </a>
                  <span className="text-slate-600">·</span>
                  <a href={`tel:${COMPANY.landlineTel}`} className="hover:text-ice-200">
                    {COMPANY.landlineDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-ice-400" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-ice-200">
                    {COMPANY.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-ice-400" />
                  {COMPANY.hours}
                </li>
              </ul>
              <a
                href="https://maps.google.com/?q=Uwairij+Industrial+Area+Baghdad"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-6 w-full"
              >
                <Navigation className="h-4 w-4" />
                Open in maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
