import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Gallery } from "@/components/Gallery";
import { Facility } from "@/components/Facility";
import { PageOutro } from "@/components/PageOutro";
import { en } from "@/lib/i18n/en";

const copy = en.pages.facility;

export const metadata: Metadata = {
  title: copy.label,
  description: copy.blurb,
};

export default function FacilityPage() {
  return (
    <main id="main">
      <PageHero slug="facility" />
      <Gallery />
      <Facility />
      <PageOutro current="facility" />
    </main>
  );
}
