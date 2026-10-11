import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { gallery } from "@/lib/site";

type Span = "2x2" | "1x2" | "2x1" | "1x1";

const spanClasses: Record<Span, string> = {
  "2x2": "col-span-2 row-span-2",
  "1x2": "col-span-1 row-span-2",
  "2x1": "col-span-2 row-span-1",
  "1x1": "col-span-1 row-span-1",
};

/** Image-led mosaic of the facility — minimal captions, no paragraphs. */
export function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-reveal>
          <div>
            <span className="label">Inside the facility</span>
            <h2 className="mt-4 font-display text-[27px] font-bold leading-tight text-ink-900 sm:text-[34px]">
              Twelve cold rooms, one uninterrupted cold chain
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-ice-700 transition hover:gap-3 hover:text-ice-800"
          >
            Arrange a site visit
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid auto-rows-[132px] grid-cols-2 gap-3 sm:auto-rows-[168px] lg:grid-cols-4">
          {gallery.map((item, i) => (
            <figure
              key={item.src + i}
              data-reveal="scale"
              style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
              className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-ink-950 ${spanClasses[item.span as Span]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent"
              />

              {i === 0 || i === 4 ? <SmokeTexture opacity={0.32} seed={20 + i} /> : null}

              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[13.5px] font-semibold text-white">{item.caption}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
