"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTile } from "@/components/SectionTile";
import { useI18n } from "@/components/LanguageProvider";
import { pageSlugs, type PageSlug } from "@/lib/media";

/** Closing band on every section page: the other sections, plus a call to action. */
export function PageOutro({ current, cta = true }: { current: PageSlug; cta?: boolean }) {
  const { content } = useI18n();
  const others = pageSlugs.filter((slug) => slug !== current).slice(0, 3);

  return (
    <section className="section border-t border-slate-200 bg-slate-50/70">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[22px] font-bold text-ink-900 sm:text-[26px]">
            {content.ui.continueHeading}
          </h2>
          {cta ? (
            <Link href="/contact" className="btn-secondary w-fit">
              {content.ui.requestQuote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          ) : null}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {others.map((slug, i) => (
            <div
              key={slug}
              data-reveal="scale"
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="aspect-[16/10]"
            >
              <SectionTile
                slug={slug}
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
