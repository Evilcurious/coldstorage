import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SitePage } from "@/lib/pages";
import { SmokeTexture } from "@/components/Smoke";

type SectionTileProps = {
  page: SitePage;
  /** grid placement passed in by the parent */
  className?: string;
  index?: number;
  sizes?: string;
  /** show the label permanently (used in cross-link strips) */
  alwaysLabel?: boolean;
};

/**
 * Photograph-only tile. Nothing is written over the image until the pointer
 * arrives, at which point the label fades in in light blue.
 */
export function SectionTile({
  page,
  className = "",
  index = 0,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  alwaysLabel = false,
}: SectionTileProps) {
  return (
    <Link
      href={page.slug}
      className={`group relative block overflow-hidden rounded-xl border border-white/10 bg-ink-950 ${className}`}
    >
      <Image
        src={page.tile.src}
        alt={page.tile.alt}
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
        className={`tile-label absolute bottom-5 left-5 flex items-center gap-2 font-display text-[15px] font-bold text-white sm:text-[17px] ${
          alwaysLabel ? "!opacity-100 !translate-y-0" : ""
        }`}
      >
        {page.label}
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
