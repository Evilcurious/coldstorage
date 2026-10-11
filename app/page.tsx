import { Hero } from "@/components/Hero";
import { ExploreGrid } from "@/components/ExploreGrid";
import { ImageRibbon } from "@/components/ImageRibbon";

/**
 * Home page: photographs only. Every section has its own page, reached through
 * the tile mosaic — copy lives there, not here.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ExploreGrid />
      <ImageRibbon />
    </main>
  );
}
