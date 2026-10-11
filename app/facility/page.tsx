import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Gallery } from "@/components/Gallery";
import { Facility } from "@/components/Facility";
import { PageOutro } from "@/components/PageOutro";
import { pageBySlug } from "@/lib/pages";

const page = pageBySlug("/facility");

export const metadata: Metadata = {
  title: page.label,
  description: page.blurb,
};

export default function FacilityPage() {
  return (
    <main id="main">
      <PageHero page={page} />
      <Gallery />
      <Facility />
      <PageOutro current={page} />
    </main>
  );
}
