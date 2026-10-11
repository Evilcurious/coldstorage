"use client";

import { SectionTile } from "@/components/SectionTile";
import { useI18n } from "@/components/LanguageProvider";

/* grid placement per tile, filling a 6-column / 3-row mosaic */
const layout = [
  "col-span-2 row-span-2 lg:col-span-4",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-2",
  "col-span-2 lg:col-span-2",
];

/** Home page index: the whole site as photographs, labelled only on hover. */
export function ExploreGrid() {
  const { content } = useI18n();
  const items = content.nav;

  return (
    <section className="section">
      <div className="shell">
        <div className="grid auto-rows-[132px] grid-cols-2 gap-3 sm:auto-rows-[176px] lg:auto-rows-[204px] lg:grid-cols-6">
          {items.map((item, i) => (
            <div
              key={item.slug}
              data-reveal="scale"
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
              className={`${layout[i] ?? ""} min-w-0`}
            >
              <SectionTile
                slug={item.slug}
                index={i}
                className="h-full w-full"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
