"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";
import { useI18n } from "@/components/LanguageProvider";
import { pageTiles, type PageSlug } from "@/lib/media";

/**
 * Page banner: full-width photograph carrying the page title. Reused by every
 * section page so the site keeps one identity.
 */
export function PageHero({ slug }: { slug: PageSlug }) {
  const { content } = useI18n();
  const tile = pageTiles[slug];
  const copy = content.pages[slug];

  return (
    <section data-hero className="on-dark relative isolate overflow-hidden bg-ink-950">
      <div className="page-hero-box relative flex w-full flex-col">
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950/92 via-ink-950/55 to-ink-950/70"
        />
        <PanelSmoke variant="floor" intensity={0.85} className="z-[1]" />
        <SmokeTexture className="top-auto z-[1] h-[55%]" opacity={0.32} seed={90} />

        <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-12 pt-[124px]">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ice-100">
            <span className="h-[2px] w-8 rounded-full bg-ember-400" />
            {copy.eyebrow}
          </span>

          <h1 className="mt-4 max-w-3xl text-balance font-display text-[30px] font-bold leading-[1.12] text-white sm:text-[46px] lg:text-[52px]">
            {copy.title}
          </h1>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-200">
            {copy.blurb}
          </p>

          <span aria-hidden className="brand-rule mt-7" />

          <Link
            href="/"
            className="mt-5 inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-white/80 transition hover:text-ember-300"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            {content.ui.allSections}
          </Link>
        </div>
      </div>
    </section>
  );
}
