import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Zones } from "@/components/Zones";
import { Services } from "@/components/Services";
import { PageOutro } from "@/components/PageOutro";
import { en } from "@/lib/i18n/en";

const copy = en.pages.regimes;

export const metadata: Metadata = {
  title: copy.label,
  description: copy.blurb,
};

export default function RegimesPage() {
  return (
    <main id="main">
      <PageHero slug="regimes" />
      <Zones />
      <Services />
      <PageOutro current="regimes" />
    </main>
  );
}
