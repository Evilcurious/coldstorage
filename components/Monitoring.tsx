"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, Radio, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { LiveConditions } from "@/components/LiveConditions";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { useI18n } from "@/components/LanguageProvider";
import { buildSeries } from "@/lib/rand";

type Room = {
  id: string;
  base: number;
  spread: number;
  band: [number, number];
  accent: string;
};

const roomConfig: Room[] = [
  { id: "freezer", base: -25, spread: 0.6, band: [-27, -23], accent: "#1B3A63" },
  { id: "chiller", base: 0, spread: 0.9, band: [-2, 2], accent: "#35618F" },
  { id: "pharma", base: 5, spread: 0.5, band: [4, 6], accent: "#6E8AA6" },
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

export function Monitoring() {
  const { content } = useI18n();
  const [roomId, setRoomId] = useState(roomConfig[0].id);
  const room = roomConfig.find((r) => r.id === roomId) ?? roomConfig[0];
  const roomIndex = roomConfig.indexOf(room);
  const roomCopy = content.monitoring.rooms[roomIndex] ?? content.monitoring.rooms[0];

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

  const stats = [
    { label: content.ui.current, value: `${latest.toFixed(1)} °C` },
    { label: content.ui.min24, value: `${Math.min(...values).toFixed(1)} °C` },
    { label: content.ui.max24, value: `${Math.max(...values).toFixed(1)} °C` },
    { label: content.ui.samples, value: "2,880" },
  ];

  return (
    <section id="monitoring" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={content.monitoring.eyebrow}
          title={content.monitoring.title}
          body={content.monitoring.body}
        />

        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[1.4fr_1fr]">
          {/* chart */}
          <div data-reveal className="card min-w-0 overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="font-display text-[15.5px] font-bold text-ink-900">
                  {content.monitoring.chartTitle}
                </p>
                <p className="mt-1 text-[12.5px] text-slate-500">
                  {roomCopy.regime} · {content.monitoring.chartHint}
                </p>
              </div>
              <div className="-mx-1 flex gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-100/80 p-1">
                {roomConfig.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoomId(r.id)}
                    aria-pressed={r.id === roomId}
                    className={`shrink-0 rounded-md px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
                      r.id === roomId
                        ? "bg-white text-ink-900 shadow-card"
                        : "text-slate-500 hover:text-ember-700"
                    }`}
                  >
                    {content.monitoring.rooms[i]?.name ?? r.id}
                  </button>
                ))}
              </div>
            </div>

            <div key={room.id} className="enter w-full overflow-x-auto px-2 pb-2 pt-6 sm:px-4">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full min-w-[520px] overflow-visible sm:min-w-0"
                role="img"
                aria-label={`${content.monitoring.chartTitle} — ${roomCopy.name}`}
              >
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
                      className="numeric fill-slate-400 text-[10.5px] font-medium"
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
                    className="numeric fill-slate-400 text-[10.5px] font-medium"
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
              {stats.map((item) => (
                <div key={item.label} className="bg-white px-4 py-4 sm:px-5">
                  <dt className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {item.label}
                  </dt>
                  <dd className="numeric mt-1.5 font-display text-[16px] font-bold text-ink-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* side column */}
          <div className="grid min-w-0 content-start gap-6">
            <div data-reveal="right">
              <LiveConditions
                room={`${roomCopy.name} · ${content.monitoring.readout}`}
                setPoint={room.base}
                band={room.band}
              />
            </div>

            <div data-reveal="right" className="card overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                <p className="font-display text-[15px] font-bold text-ink-900">
                  {content.monitoring.eventsTitle}
                </p>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-700">
                  <Radio className="h-3.5 w-3.5 animate-pulse" />
                  {content.monitoring.streaming}
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {content.monitoring.events.map((event, i) => (
                  <li key={`${event.time}-${i}`} className="px-5 py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[13px] font-semibold text-ink-900">{event.event}</p>
                      <span className="numeric shrink-0 text-[11.5px] font-medium text-slate-400">
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
                  {content.monitoring.logNote}
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
            alt={content.pages.monitoring.title}
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <SmokeTexture opacity={0.3} seed={17} />
          <PanelSmoke intensity={0.7} />
          <div className="relative flex flex-col gap-6 px-6 py-8 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ice-300">
                <ShieldCheck className="h-4 w-4" />
                {content.monitoring.accessEyebrow}
              </span>
              <h3 className="mt-3 text-balance font-display text-[20px] font-bold text-white sm:text-[22px]">
                {content.monitoring.accessTitle}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-300">
                {content.monitoring.accessBody}
              </p>
            </div>
            <Link
              href="/contact"
              className="btn w-fit shrink-0 bg-white text-ink-900 hover:bg-slate-100"
            >
              {content.monitoring.accessCta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
