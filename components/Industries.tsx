const INDUSTRIES = [
  { t: "Protein & QSR", d: "Frozen meat, poultry, and restaurant networks." },
  { t: "Pharma & Healthcare", d: "Vaccines, biologics, and GDP wholesale." },
  { t: "Fresh Produce", d: "Import fruit, vegetables, and floral cargo." },
  { t: "Dairy & Fats", d: "Milk solids, cheese, and temperature-sensitive fats." },
  { t: "Retail & E-commerce", d: "Dark-store replenishment and promo holds." },
  { t: "Import / Export", d: "Port-to-campus bonded cold chain." },
];

export function Industries() {
  return (
    <section className="border-y border-white/10 bg-navy-900/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Sectors</p>
            <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
              Built for the cargo that cannot fail.
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400">
            Dedicated SOPs per commodity class — from deep-freeze protein to 2–8°C pharmaceutical.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i) => (
            <div
              key={i.t}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-ice-400/30 hover:bg-ice-400/5"
            >
              <h3 className="font-display text-lg text-white">{i.t}</h3>
              <p className="mt-2 text-sm text-slate-400">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
