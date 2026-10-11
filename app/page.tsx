import { Hero } from "@/components/Hero";
import { ExploreGrid } from "@/components/ExploreGrid";

/**
 * Home page: photographs only. Every section has its own page, reached through
 * the tile mosaic — copy lives there, not here.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ExploreGrid />
    </main>
  );
}
