"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SmokeTexture } from "@/components/Smoke";
import { useI18n } from "@/components/LanguageProvider";
import { pageTiles, type PageSlug } from "@/lib/media";

type SectionTileProps = {
  slug: PageSlug;
  /** grid placement passed in by the parent */
  className?: string;
  index?: number;
  sizes?: string;
  /** show the label permanently (used in cross-link strips) */
  alwaysLabel?: boolean;
};

/**
 * Photograph-only tile. Nothing is written over the image until the pointer
 * arrives, at which point the label fades in.
 */
export function SectionTile({
  slug,
  className = "",
  index = 0,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  alwaysLabel = false,
}: SectionTileProps) {
  const { content } = useI18n();
  const tile = pageTiles[slug];
  const label = content.pages[slug].label;

  return (
    <Link
      href={`/${slug}`}
      className={`group relative block overflow-hidden rounded-xl border border-white/10 bg-ink-950 ${className}`}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes={sizes}
        className="tile-image object-cover"
      />

      {index % 3 === 0 ? <SmokeTexture opacity={0.26} seed={60 + index} /> : null}

      <span
        aria-hidden
        className={`tile-scrim absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent ${
          alwaysLabel ? "opacity-100" : ""
        }`}
      />

      <span
        className={`tile-label absolute bottom-5 start-5 flex items-center gap-2 font-display text-[15px] font-bold text-white sm:text-[17px] ${
          alwaysLabel ? "!opacity-100 !translate-y-0" : ""
        }`}
      >
        {label}
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
