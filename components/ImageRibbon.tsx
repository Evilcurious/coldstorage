"use client";

import Image from "next/image";
import Link from "next/link";
import { SmokeTexture } from "@/components/Smoke";
import { useI18n } from "@/components/LanguageProvider";
import { pageTiles, ribbonMedia } from "@/lib/media";

/** Full-bleed photograph ribbon — no copy, each frame links to its section. */
export function ImageRibbon() {
  const { content } = useI18n();

  return (
    <section aria-label={content.brand.legalName} className="border-y border-slate-200 bg-white">
      <div className="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-5">
        {ribbonMedia.map((strip, i) => (
          <Link
            key={strip.src}
            href={`/${strip.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden bg-ink-950 sm:aspect-[3/4]"
            aria-label={content.pages[strip.slug].label}
          >
            <Image
              src={strip.src}
              alt={pageTiles[strip.slug].alt}
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
