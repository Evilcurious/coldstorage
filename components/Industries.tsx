import { SectionHeading } from "@/components/SectionHeading";
import { industries } from "@/lib/site";

export function Industries() {
  return (
    <section className="section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Sectors served"
            title="Storage for producers, importers and distributors"
            body="We work with food manufacturers, importers, retail distribution and regulated healthcare suppliers. Cargo is segregated by regime and, where required, by product family."
          />

          <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item, i) => (
              <li
                key={item}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
                className="flex items-center gap-3 border-b border-slate-200 py-3.5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ice-500" />
                <span className="text-[13.5px] font-medium text-ink-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
