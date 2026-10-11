import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const SOLUTIONS = [
  {
    title: "Temperature-Controlled Storage",
    copy: "Multi-chamber high-bay warehousing with dedicated deep-freeze, chilled, and cool-ambient zones. Continuous telemetry to ±0.3°C.",
    image: "/images/hero-warehouse.jpg",
    alt: "High-bay temperature-controlled racking",
    meta: "−25°C to +15°C",
  },
  {
    title: "Blast Freezing",
    copy: "Rapid pull-down tunnels for meat, poultry, and prepared foods. Preserve cellular integrity, shelf life, and export specification.",
    image: "/images/blast-freezer.jpg",
    alt: "Industrial blast freezer tunnel",
    meta: "Down to −40°C",
  },
  {
    title: "Inventory Management",
    copy: "RFID and barcode lot tracking, FEFO/FIFO enforcement, and real-time WMS visibility for every pallet, carton, and serial.",
    image: null,
    alt: "",
    meta: "RFID / Barcode WMS",
  },
  {
    title: "Secure Logistics",
    copy: "Refrigerated inbound/outbound, bonded handling, and last-mile coordination with GPS-sealed trailers and calibrated recorders.",
    image: null,
    alt: "",
    meta: "Dock-to-destination",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-kicker">Our Core Solutions</p>
          <h2 className="heading-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Infrastructure built for uncompromising cold chain integrity.
          </h2>
          <p className="mt-4 text-slate-400">
            Four tightly integrated capabilities — engineered as one campus, operated as one control tower.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SOLUTIONS.map((s) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900"
            >
              {s.image ? (
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-110"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-ice-400/30 bg-navy-950/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ice-200 backdrop-blur">
                    {s.meta}
                  </span>
                </div>
              ) : (
                <div className="relative h-24 overflow-hidden bg-gradient-to-br from-ice-500/20 via-navy-900 to-navy-950 sm:h-28">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <span className="absolute left-5 top-5 rounded-full border border-ice-400/30 bg-navy-950/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ice-200 backdrop-blur">
                    {s.meta}
                  </span>
                </div>
              )}
              <div className={`relative px-6 pb-7 ${s.image ? "-mt-10" : "pt-6"}`}>
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-white">{s.title}</h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ice-400/20 text-ice-300 transition group-hover:bg-ice-400 group-hover:text-navy-950">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
