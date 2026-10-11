import {
  ArrowUpRight,
  ClipboardList,
  Package,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FrostCrystal } from "@/components/Icons";
import { services } from "@/lib/site";

const icons = {
  snowflake: Snowflake,
  package: Package,
  thermometer: ThermometerSnowflake,
  clipboard: ClipboardList,
  truck: Truck,
  shield: ShieldCheck,
} as const;

export function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="What we do"
            title={
              <>
                Everything cold, <span className="gradient-text">under one roof</span>
              </>
            }
            body="Six services that plug into whatever part of the cold chain you need us to carry — or the whole journey, intake to delivery."
          />
          <a
            data-reveal="right"
            href="#contact"
            className="btn-ghost group shrink-0"
          >
            Talk to a cold-chain planner
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 110}ms` } as React.CSSProperties}
                className="card card-hover sheen group overflow-hidden p-6 sm:p-7"
              >
                <FrostCrystal
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 text-ice-300/35 transition-transform duration-[1200ms] group-hover:rotate-45"
                />

                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-frost-300 bg-gradient-to-br from-white to-frost-200 text-ice-600 shadow-inner transition-all duration-500 group-hover:border-ice-400 group-hover:text-ice-700">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <span className="rounded-full bg-frost-100/90 px-3 py-1 text-[11px] font-semibold text-ice-700">
                    {service.tag}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-[19px] font-bold text-ink-900">
                  {service.title}
                </h3>
                <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-ink-500">
                  {service.body}
                </p>

                <span className="relative mt-6 inline-flex h-[2px] w-10 rounded-full bg-brand-grad transition-all duration-500 group-hover:w-20" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
