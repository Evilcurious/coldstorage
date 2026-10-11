import { SectionTile } from "@/components/SectionTile";
import { pages } from "@/lib/pages";

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
  return (
    <section className="section">
      <div className="shell">
        <div className="grid auto-rows-[168px] grid-cols-2 gap-3 sm:auto-rows-[190px] lg:auto-rows-[204px] lg:grid-cols-6">
          {pages.map((page, i) => (
            <div
              key={page.slug}
              data-reveal="scale"
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
              className={layout[i]}
            >
              <SectionTile
                page={page}
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
