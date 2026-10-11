import { industries } from "@/lib/site";

/** Sectors served — a compact single strip, no prose. */
export function Industries() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="shell py-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <p
            className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
            data-reveal
          >
            Sectors served
          </p>
          <div className="flex flex-wrap gap-2">
            {industries.map((item, i) => (
              <span
                key={item}
                data-reveal="scale"
                style={{ "--reveal-delay": `${(i % 6) * 40}ms` } as React.CSSProperties}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[12.5px] font-medium text-slate-600 transition-colors duration-200 hover:border-ice-200 hover:bg-ice-50 hover:text-ice-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
