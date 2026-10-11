import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Client experience"
          title={
            <>
              Cold, quiet, <span className="gradient-text">predictable</span>
            </>
          }
          body="What clients tell us they value most is boredom: nothing surprising happens inside our rooms."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <figure
              key={item.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              className="card card-hover sheen group relative flex h-full flex-col overflow-hidden p-7"
            >
              <Quote
                aria-hidden
                className="absolute -right-4 -top-4 h-24 w-24 text-frost-200 transition-transform duration-700 group-hover:scale-110"
              />

              <div className="relative flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-ice-400 text-ice-400" />
                ))}
              </div>

              <blockquote className="relative mt-5 flex-1 text-[14.5px] leading-relaxed text-ink-600">
                “{item.quote}”
              </blockquote>

              <figcaption className="relative mt-6 flex items-center gap-3.5 border-t border-frost-300 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-grad font-display text-[15px] font-extrabold text-white shadow-glow">
                  {item.name.slice(0, 1)}
                </span>
                <span>
                  <span className="block text-[13.5px] font-bold text-ink-900">{item.name}</span>
                  <span className="block text-[12px] text-ink-400">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
