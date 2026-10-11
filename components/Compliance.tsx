import { ShieldCheck } from "lucide-react";
import { certifications } from "@/lib/site";

/** Credentials strip directly beneath the hero. */
export function Compliance() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70">
      <div className="shell section-sm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3" data-reveal>
            <ShieldCheck className="h-5 w-5 shrink-0 text-ice-600" />
            <p className="max-w-[220px] text-[13px] font-semibold leading-snug text-ink-800">
              Audited, certified and documented cold-chain operations
            </p>
          </div>

          <ul className="grid flex-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((item, i) => (
              <li
                key={item.name}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className={i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}
              >
                <p className="font-display text-[15px] font-bold text-ink-900">{item.name}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
