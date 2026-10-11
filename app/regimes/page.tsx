import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Zones } from "@/components/Zones";
import { Services } from "@/components/Services";
import { PageOutro } from "@/components/PageOutro";
import { pageBySlug } from "@/lib/pages";

const page = pageBySlug("/regimes");

export const metadata: Metadata = {
  title: page.label,
  description: page.blurb,
};

export default function RegimesPage() {
  return (
    <main id="main">
      <PageHero page={page} />
      <Zones />
      <Services />
      <PageOutro current={page} />
    </main>
  );
}
