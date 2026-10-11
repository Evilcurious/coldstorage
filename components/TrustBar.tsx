const BADGES = [
  { k: "ISO 22000", v: "Food Safety" },
  { k: "HACCP", v: "Critical Control" },
  { k: "GDP", v: "Pharma Distribution" },
  { k: "ISO 9001", v: "Quality Systems" },
  { k: "Halal", v: "Certified Handling" },
  { k: "24/7", v: "Secure Operations" },
];

export function TrustBar() {
  return (
    <section aria-label="Compliance credentials" className="border-y border-white/10 bg-navy-900/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
        {BADGES.map((b) => (
          <div
            key={b.k}
            className="flex flex-col items-center justify-center px-4 py-6 text-center"
          >
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-ice-200">
              {b.k}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">
              {b.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
