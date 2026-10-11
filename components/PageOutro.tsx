import { ArrowRight } from "lucide-react";
import { SectionTile } from "@/components/SectionTile";
import { otherPages, type SitePage } from "@/lib/pages";

/** Closing band on every section page: the other sections, plus a call to action. */
export function PageOutro({ current, cta = true }: { current: SitePage; cta?: boolean }) {
  const others = otherPages(current.slug).slice(0, 3);

  return (
    <section className="section border-t border-slate-200 bg-slate-50/70">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[22px] font-bold text-ink-900 sm:text-[26px]">
            Continue through the facility
          </h2>
          {cta ? (
            <a href="/contact" className="btn-secondary">
              Request a quotation
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {others.map((page, i) => (
            <div
              key={page.slug}
              data-reveal="scale"
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="aspect-[16/10]"
            >
              <SectionTile
                page={page}
                index={i + 1}
                alwaysLabel
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
