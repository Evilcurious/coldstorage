import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { Chain } from "@/components/Chain";
import { Testimonials } from "@/components/Testimonials";
import { PageOutro } from "@/components/PageOutro";
import { en } from "@/lib/i18n/en";

const copy = en.pages.capabilities;

export const metadata: Metadata = {
  title: copy.label,
  description: copy.blurb,
};

export default function CapabilitiesPage() {
  return (
    <main id="main">
      <PageHero slug="capabilities" />
      <Services />
      <Chain />
      <Testimonials />
      <PageOutro current="capabilities" />
    </main>
  );
}
