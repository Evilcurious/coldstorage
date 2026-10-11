import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { Chain } from "@/components/Chain";
import { PageOutro } from "@/components/PageOutro";
import { pageBySlug } from "@/lib/pages";

const page = pageBySlug("/capabilities");

export const metadata: Metadata = {
  title: page.label,
  description: page.blurb,
};

export default function CapabilitiesPage() {
  return (
    <main id="main">
      <PageHero page={page} />
      <Services />
      <Chain />
      <PageOutro current={page} />
    </main>
  );
}
