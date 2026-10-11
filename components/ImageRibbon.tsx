import Image from "next/image";
import Link from "next/link";
import { SmokeTexture } from "@/components/Smoke";

const strips = [
  { src: "/images/hero-facility.jpg", alt: "Racked pallet positions in a cold room", href: "/facility" },
  { src: "/images/forklift-cold.jpg", alt: "Forklift working a frozen aisle", href: "/capabilities" },
  { src: "/images/frost-macro.jpg", alt: "Ice crystals on chilled pipework", href: "/regimes" },
  { src: "/images/technician-panel.jpg", alt: "Technician at a control panel", href: "/monitoring" },
  { src: "/images/loading-dock.jpg", alt: "Refrigerated trailers at the docks", href: "/commercial" },
];

/** Full-bleed photograph ribbon — no copy, each frame links to its section. */
export function ImageRibbon() {
  return (
    <section aria-label="Facility photography" className="border-y border-slate-200 bg-white">
      <div className="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-5">
        {strips.map((strip, i) => (
          <Link
            key={strip.src}
            href={strip.href}
            className="group relative block aspect-[4/5] overflow-hidden bg-ink-950 sm:aspect-[3/4]"
            aria-label={`Open section ${strip.href.replace("/", "")}`}
          >
            <Image
              src={strip.src}
              alt={strip.alt}
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="tile-image object-cover"
            />
            {i % 2 === 0 ? <SmokeTexture opacity={0.24} seed={80 + i} /> : null}
            <span
              aria-hidden
              className="tile-scrim absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
