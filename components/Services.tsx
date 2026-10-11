import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/lib/site";

/** Capabilities as photographic cards — one line of copy each. */
export function Services() {
  return (
    <section id="services" className="section border-y border-slate-200 bg-slate-50/70">
      <div className="shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="Six services covering the full cold chain"
          aside={
            <a href="/contact" className="btn-secondary">
              Discuss your requirement
            </a>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
              className="card group overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent"
                />
                <span className="absolute left-4 top-4 rounded-md bg-white/92 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-800 backdrop-blur">
                  {service.meta}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-[16px] font-bold text-ink-900">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">
                    {service.body}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ice-600" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
