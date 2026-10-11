import { ShieldCheck } from "lucide-react";
import { certifications } from "@/lib/site";

/** Credentials strip beneath the hero. */
export function Compliance() {
  return (
    <section id="compliance" className="border-b border-slate-200 bg-white">
      <div className="shell py-8">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] lg:items-center">
          <div className="flex items-center gap-3" data-reveal>
            <ShieldCheck className="h-5 w-5 shrink-0 text-ice-600" />
            <p className="text-[13px] font-semibold leading-snug text-ink-800">
              Certified operations
            </p>
          </div>

          {certifications.map((item, i) => (
            <div
              key={item.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              className="lg:border-l lg:border-slate-200 lg:pl-6"
            >
              <p className="font-display text-[14.5px] font-bold text-ink-900">{item.name}</p>
              <p className="mt-0.5 text-[12px] text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
