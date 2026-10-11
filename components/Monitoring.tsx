"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, FileCheck2, Radio, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { LiveConditions } from "@/components/LiveConditions";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { buildSeries } from "@/lib/rand";

type Room = {
  id: string;
  name: string;
  regime: string;
  base: number;
  spread: number;
  band: [number, number];
  accent: string;
};

const rooms: Room[] = [
  {
    id: "freezer",
    name: "Freezer 04",
    regime: "Deep frozen −25 °C",
    base: -25,
    spread: 0.6,
    band: [-27, -23],
    accent: "#1B3A63",
  },
  {
    id: "chiller",
    name: "Chiller 02",
    regime: "Chilled 0 °C",
    base: 0,
    spread: 0.9,
    band: [-2, 2],
    accent: "#35618F",
  },
  {
    id: "pharma",
    name: "Pharma 01",
    regime: "Validated 2–8 °C",
    base: 5,
    spread: 0.5,
    band: [4, 6],
    accent: "#6E8AA6",
  },
];

const W = 720;
const H = 250;
const PAD = { top: 24, right: 16, bottom: 30, left: 44 };

const yFor = (value: number, min: number, max: number) =>
  PAD.top + (H - PAD.top - PAD.bottom) - ((value - min) / (max - min)) * (H - PAD.top - PAD.bottom);

function buildPath(values: number[], min: number, max: number) {
  const innerW = W - PAD.left - PAD.right;
  return values
    .map((v, i) => {
      const x = PAD.left + (i / (values.length - 1)) * innerW;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${yFor(v, min, max).toFixed(1)}`;
    })
    .join(" ");
}

const events = [
  {
    time: "02:41",
    room: "Freezer 04",
    event: "Scheduled defrost completed",
    detail: "Returned to set point in 6 minutes",
    status: "Closed",
  },
  {
    time: "07:12",
    room: "Dock DO-03",
    event: "Door open 96 seconds",
    detail: "Air curtain held room at −22.4 °C",
    status: "Closed",
  },
  {
    time: "09:00",
    room: "Plant room",
    event: "Standby compressor test",
    detail: "Automatic changeover verified",
    status: "Closed",
  },
  {
    time: "11:20",
    room: "Pharma 01",
    event: "Excursion report exported",
    detail: "Sent to nominated quality contact",
    status: "Logged",
  },
];

export function Monitoring() {
  const [roomId, setRoomId] = useState(rooms[0].id);
  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];

  const values = useMemo(
    () =>
      buildSeries({
        seed: room.id.length * 977 + 11,
        base: room.base,
        spread: room.spread,
        points: 48,
      }),
    [room],
  );

  const min = room.base - 4;
  const max = room.base + 4;
  const path = buildPath(values, min, max);
  const bandTop = yFor(room.band[1], min, max);
  const bandBottom = yFor(room.band[0], min, max);
  const latest = values[values.length - 1];
  const ticks = [max, max - (max - min) / 3, min + (max - min) / 3, min];

  return (
    <section id="monitoring" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Monitoring & compliance"
          title="Continuous monitoring with records you can hand to an auditor"
          body="1,204 calibrated sensors report every 30 seconds and deviations escalate to an on-call engineer within a minute."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* chart */}
          <div data-reveal className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <p className="font-display text-[15.5px] font-bold text-ink-900">
                  Temperature trace · last 24 hours
                </p>
                <p className="mt-1 text-[12.5px] text-slate-500">
                  {room.regime} · shaded band indicates permitted deviation
                </p>
              </div>
              <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-100/80 p-1">
                {rooms.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoomId(r.id)}
                    aria-pressed={r.id === roomId}
                    className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
                      r.id === roomId
                        ? "bg-white text-ink-900 shadow-card"
                        : "text-slate-500 hover:text-ink-800"
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            <div key={room.id} className="enter px-2 pb-2 pt-6 sm:px-4">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label={`Temperature trace for ${room.name}`}>
                <defs>
                  <linearGradient id="traceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={room.accent} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={room.accent} stopOpacity="0" />
                  </linearGradient>
                </defs>

                <rect
                  x={PAD.left}
                  y={bandTop}
                  width={W - PAD.left - PAD.right}
                  height={Math.max(bandBottom - bandTop, 2)}
                  rx="4"
                  fill="rgba(168,72,30,0.07)"
                  stroke="rgba(168,72,30,0.28)"
                  strokeDasharray="4 6"
                />

                {ticks.map((t, i) => (
                  <g key={i}>
                    <line
                      x1={PAD.left}
                      x2={W - PAD.right}
                      y1={yFor(t, min, max)}
                      y2={yFor(t, min, max)}
                      stroke="rgba(27,58,99,0.10)"
                      strokeWidth="1"
                    />
                    <text
                      x={PAD.left - 10}
                      y={yFor(t, min, max) + 4}
                      textAnchor="end"
                      className="fill-slate-400 text-[10.5px] font-medium tabular-nums numeric"
                    >
                      {t.toFixed(0)}°
                    </text>
                  </g>
                ))}

                {["00:00", "06:00", "12:00", "18:00", "24:00"].map((label, i) => (
                  <text
                    key={label}
                    x={PAD.left + (i / 4) * (W - PAD.left - PAD.right)}
                    y={H - 8}
                    textAnchor="middle"
                    className="fill-slate-400 text-[10.5px] font-medium"
                  >
                    {label}
                  </text>
                ))}

                <path
                  d={`${path} L ${W - PAD.right} ${H - PAD.bottom} L ${PAD.left} ${H - PAD.bottom} Z`}
                  fill="url(#traceFill)"
                />
                <path
                  d={path}
                  fill="none"
                  stroke={room.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 1600,
                    strokeDashoffset: 1600,
                    animation: "frostCrawl 2.4s cubic-bezier(0.22,0.68,0.16,1) forwards",
                  }}
                />
                <circle r="4.5" fill="#ffffff" stroke={room.accent} strokeWidth="2">
                  <animateMotion dur="9s" repeatCount="indefinite" path={path} />
                </circle>
              </svg>
            </div>

            <dl className="grid grid-cols-2 gap-px border-t border-slate-100 bg-slate-100 sm:grid-cols-4">
              {[
                { label: "Current", value: `${latest.toFixed(1)} °C` },
                { label: "24 h minimum", value: `${Math.min(...values).toFixed(1)} °C` },
                { label: "24 h maximum", value: `${Math.max(...values).toFixed(1)} °C` },
                { label: "Samples logged", value: "2,880" },
              ].map((item) => (
                <div key={item.label} className="bg-white px-5 py-4">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-[16px] font-bold tabular-nums text-ink-900 numeric">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* side column */}
          <div className="grid content-start gap-6">
            <div data-reveal="right">
              <LiveConditions room={`${room.name} · live readout`} setPoint={room.base} band={room.band} />
            </div>

            <div data-reveal="right" className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <p className="font-display text-[15px] font-bold text-ink-900">Event log · today</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ice-700">
                  <Radio className="h-3.5 w-3.5 animate-pulse" />
                  Streaming
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {events.map((event) => (
                  <li key={event.event} className="px-5 py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[13px] font-semibold text-ink-900">{event.event}</p>
                      <span className="shrink-0 text-[11.5px] font-medium tabular-nums text-slate-400 numeric">
                        {event.time}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] text-slate-500">
                      {event.room} · {event.detail}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-2.5 border-t border-slate-100 bg-slate-50 px-5 py-3.5">
                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-ice-600" />
                <p className="text-[12px] leading-relaxed text-slate-500">
                  Full event history and temperature exports are available on request for any
                  consignment or period.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* client access band */}
        <div
          data-reveal
          className="on-dark relative mt-6 overflow-hidden rounded-xl border border-slate-200 bg-ink-900 shadow-panel"
        >
          <Image
            src="/images/control-room.jpg"
            alt="Cold-chain monitoring station with temperature displays"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <SmokeTexture opacity={0.3} seed={17} />
          <PanelSmoke intensity={0.7} />
          <div className="relative flex flex-col gap-6 px-7 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.18em] text-ice-300">
                <ShieldCheck className="h-4 w-4" />
                Client access
              </span>
              <h3 className="mt-3 font-display text-[20px] font-bold text-white sm:text-[22px]">
                Read-only access to your own room data
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-300">
                Client accounts can view the live sensor stream for their rooms and export any
                date range in one click — no requests, no waiting for a report.
              </p>
            </div>
            <a
              href="/contact"
              className="btn shrink-0 bg-white text-ink-900 hover:bg-slate-100"
            >
              Request account access
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
