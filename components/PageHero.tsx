import Image from "next/image";
import Link from "next/link";
import type { SitePage } from "@/lib/pages";
import { PanelSmoke, SmokeTexture } from "@/components/Smoke";

/**
 * Page banner: full-width photograph carrying the page title. Reused by every
 * section page so the site keeps one identity.
 */
export function PageHero({ page }: { page: SitePage }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink-950">
      <div className="relative h-[58svh] min-h-[400px] w-full">
        <Image
          src={page.tile.src}
          alt={page.tile.alt}
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

        <div className="shell relative z-10 flex h-full flex-col justify-end pb-12 pt-[140px]">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ice-200">
            <span className="h-px w-8 bg-ice-300/70" />
            {page.eyebrow}
          </span>

          <h1 className="mt-4 max-w-3xl font-display text-[32px] font-bold leading-[1.08] text-white sm:text-[46px] lg:text-[52px]">
            {page.title}
          </h1>

          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-200">
            {page.blurb}
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-white/80 transition hover:text-white"
          >
            ← All sections
          </Link>
        </div>
      </div>
    </section>
  );
}
