import {
  ClipboardList,
  Package,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
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
    <section id="services" className="section border-y border-slate-200 bg-slate-50/70">
      <div className="shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="Six services that cover the full cold chain"
          body="Engage a single stage or hand us the entire journey from intake to final delivery. Every service is delivered under one quality system and one set of temperature records."
          aside={
            <a href="#contact" className="btn-secondary">
              Discuss your requirement
            </a>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="card card-hover flex flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-ice-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="tag">{service.meta}</span>
                </div>

                <h3 className="mt-5 font-display text-[16.5px] font-bold text-ink-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">
                  {service.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
