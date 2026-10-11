import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="section border-y border-slate-200 bg-slate-50/70">
      <div className="shell">
        <SectionHeading
          eyebrow="Client experience"
          title="What clients report after their first season"
          body="Long-hold storage is judged on what did not happen: no soft product, no unexplained deviation, no missing paperwork."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <figure
              key={item.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="card card-hover flex h-full flex-col p-6 sm:p-7"
            >
              <span
                aria-hidden
                className="font-display text-[40px] font-bold leading-none text-ice-200"
              >
                “
              </span>
              <blockquote className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-[13.5px] font-bold text-ink-900">{item.name}</p>
                <p className="mt-0.5 text-[12.5px] text-slate-500">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
