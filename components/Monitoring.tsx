"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AlarmClockCheck,
  BellRing,
  Cpu,
  FileCheck2,
  Radio,
  Snowflake,
  Wifi,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { TempGauge } from "@/components/TempGauge";
import { buildSeries } from "@/lib/rand";

type Room = {
  id: string;
  name: string;
  base: number;
  spread: number;
  accent: string;
  band: [number, number];
};

const rooms: Room[] = [
  { id: "freezer", name: "Freezer 04", base: -25, spread: 0.6, accent: "#1b7cc4", band: [-27, -23] },
  { id: "chiller", name: "Chiller 02", base: 0, spread: 0.9, accent: "#2e9be6", band: [-2, 2] },
  { id: "pharma", name: "Pharma 01", base: 5, spread: 0.5, accent: "#57b7ef", band: [4, 6] },
];

const W = 720;
const H = 250;
const PAD = { top: 26, right: 18, bottom: 30, left: 46 };

function buildPath(values: number[], min: number, max: number) {
  const span = max - min || 1;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  return values
    .map((v, i) => {
      const x = PAD.left + (i / (values.length - 1)) * innerW;
      const y = PAD.top + innerH - ((v - min) / span) * innerH;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function yFor(value: number, min: number, max: number) {
  const innerH = H - PAD.top - PAD.bottom;
  return PAD.top + innerH - ((value - min) / (max - min)) * innerH;
}

export function Monitoring() {
  const [roomId, setRoomId] = useState(rooms[0].id);
  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];

  const values = useMemo(
    () => buildSeries({ seed: room.id.length * 977 + 11, base: room.base, spread: room.spread, points: 48 }),
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
          eyebrow="ColdSense monitoring"
          title={
            <>
              We watch the temperature <span className="gradient-text">so you don&apos;t have to</span>
            </>
          }
          body="1,204 calibrated sensors report every 30 seconds. Our engineers see a door left ajar, a compressor short-cycling or a slow drift long before product is at risk."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* ---- chart ---- */}
          <div data-reveal className="card overflow-hidden rounded-[32px] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-[16px] font-bold text-ink-900">
                  Temperature trace · last 24 hours
                </p>
                <p className="mt-1 text-[12.5px] text-ink-400">
                  Shaded band = allowable deviation · sampling every 30 s
                </p>
              </div>
              <div className="flex gap-2">
                {rooms.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoomId(r.id)}
                    aria-pressed={r.id === roomId}
                    className={`rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-300 ${
                      r.id === roomId
                        ? "bg-ink-900 text-white shadow-lift"
                        : "border border-frost-400 bg-white/80 text-ink-600 hover:border-ice-400 hover:text-ice-700"
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            <div key={room.id} className="enter mt-6">
              <svg viewBox={`0 0 ${W} ${H}`} className="h-[230px] w-full overflow-visible">
                <defs>
                  <linearGradient id="traceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={room.accent} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={room.accent} stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* in-range band */}
                <rect
                  x={PAD.left}
                  y={bandTop}
                  width={W - PAD.left - PAD.right}
                  height={Math.max(bandBottom - bandTop, 2)}
                  rx="8"
                  fill="rgba(46,155,230,0.10)"
                  stroke="rgba(46,155,230,0.25)"
                  strokeDasharray="5 7"
                />

                {/* grid + y axis */}
                {ticks.map((t, i) => (
                  <g key={i}>
                    <line
                      x1={PAD.left}
                      x2={W - PAD.right}
                      y1={yFor(t, min, max)}
                      y2={yFor(t, min, max)}
                      stroke="rgba(46,155,230,0.14)"
                      strokeWidth="1"
                    />
                    <text
                      x={PAD.left - 10}
                      y={yFor(t, min, max) + 4}
                      textAnchor="end"
                      className="fill-ink-300 text-[10.5px] font-semibold tabular-nums"
                    >
                      {t.toFixed(0)}°
                    </text>
                  </g>
                ))}

                {/* x axis */}
                {["00:00", "06:00", "12:00", "18:00", "24:00"].map((label, i) => (
                  <text
                    key={label}
                    x={PAD.left + (i / 4) * (W - PAD.left - PAD.right)}
                    y={H - 8}
                    textAnchor="middle"
                    className="fill-ink-300 text-[10.5px] font-medium"
                  >
                    {label}
                  </text>
                ))}

                {/* area + line */}
                <path
                  d={`${path} L ${W - PAD.right} ${H - PAD.bottom} L ${PAD.left} ${H - PAD.bottom} Z`}
                  fill="url(#traceFill)"
                  stroke="none"
                />
                <path
                  d={path}
                  fill="none"
                  stroke={room.accent}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 1600,
                    strokeDashoffset: 1600,
                    animation: "frostCrawl 2.6s cubic-bezier(0.22,0.68,0.16,1) forwards",
                  }}
                />

                {/* travelling probe */}
                <circle r="6" fill="#ffffff" stroke={room.accent} strokeWidth="2.5">
                  <animateMotion dur="8s" repeatCount="indefinite" path={path} />
                </circle>
                <circle r="11" fill="none" stroke={room.accent} strokeOpacity="0.35" strokeWidth="1.5">
                  <animateMotion dur="8s" repeatCount="indefinite" path={path} />
                  <animate
                    attributeName="r"
                    values="8;15;8"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.45;0.05;0.45"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Now", value: `${latest.toFixed(1)} °C` },
                { label: "24h min", value: `${Math.min(...values).toFixed(1)} °C` },
                { label: "24h max", value: `${Math.max(...values).toFixed(1)} °C` },
                { label: "Samples", value: "2,880" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-frost-300 bg-frost-100/60 px-4 py-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-[16px] font-extrabold tabular-nums text-ink-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- side column ---- */}
          <div className="grid content-start gap-6">
            <TempGauge
              value={room.base}
              label={`${room.name} · live readout`}
              caption={`Set point ${room.base.toFixed(1)} °C · band ${room.band[0]}–${room.band[1]} °C`}
            />

            <div data-reveal="right" className="card overflow-hidden rounded-[32px] p-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-[15.5px] font-bold text-ink-900">
                  Today&apos;s events
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-frost-400/70 bg-white/80 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-ice-700">
                  <Radio className="h-3 w-3 animate-pulse" /> Streaming
                </span>
              </div>

              <ul className="mt-5 space-y-3.5">
                {[
                  {
                    icon: AlarmClockCheck,
                    tone: "ok",
                    title: "Defrost cycle complete",
                    meta: "Freezer 04 · 02:41 · back to set point in 6 min",
                  },
                  {
                    icon: BellRing,
                    tone: "warn",
                    title: "Dock door DO-03 open 96 s",
                    meta: "Reception · 07:12 · air curtain held room at −22.4 °C",
                  },
                  {
                    icon: Cpu,
                    tone: "ok",
                    title: "Standby compressor test",
                    meta: "Plant room · 09:00 · automatic changeover verified",
                  },
                  {
                    icon: FileCheck2,
                    tone: "info",
                    title: "Excursion report exported",
                    meta: "Pharma 01 · 11:20 · sent to quality contact",
                  },
                ].map((event, i) => (
                  <li
                    key={event.title}
                    data-reveal="right"
                    style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                    className="flex items-start gap-3.5 rounded-2xl border border-transparent px-3 py-2.5 transition-colors duration-300 hover:border-frost-300 hover:bg-frost-100/70"
                  >
                    <span
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                        event.tone === "warn"
                          ? "bg-amber-50 text-amber-500"
                          : event.tone === "info"
                            ? "bg-frost-100 text-ink-500"
                            : "bg-frost-100 text-ice-600"
                      }`}
                    >
                      <event.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-ink-800">{event.title}</p>
                      <p className="mt-0.5 text-[11.5px] text-ink-400">{event.meta}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-frost-300 bg-frost-100/60 px-4 py-3">
                <Wifi className="h-4 w-4 shrink-0 text-ice-600" />
                <p className="text-[12px] text-ink-500">
                  <span className="font-semibold text-ice-700">1,204 sensors online.</span> Alarm
                  escalation reaches an on-call engineer within 60 seconds.
                </p>
              </div>
            </div>

            <div
              data-reveal="scale"
              className="relative overflow-hidden rounded-[32px] bg-brand-grad p-6 text-white shadow-glow"
            >
              <Image
                src="/images/control-room.jpg"
                alt="Cold-chain monitoring control room with temperature displays"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover opacity-45"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-ice-600/90 via-ice-500/85 to-ice-700/90"
              />
              <Snowflake
                aria-hidden
                className="animate-spin-slow absolute -right-8 -top-8 h-40 w-40 text-white/20"
              />
              <p className="relative font-display text-[17px] font-bold">
                Want your own temperature feed?
              </p>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/85">
                Client accounts get read-only access to the live sensor stream for their rooms,
                plus one-click export of any date range.
              </p>
              <a
                href="#contact"
                className="btn relative mt-5 bg-white !px-5 !py-2.5 !text-[13px] text-ice-700 shadow-lift transition hover:-translate-y-0.5 hover:bg-frost-100"
              >
                Request access
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
