import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Pricing } from "@/components/Pricing";
import { Industries } from "@/components/Industries";
import { Testimonials } from "@/components/Testimonials";
import { PageOutro } from "@/components/PageOutro";
import { pageBySlug } from "@/lib/pages";

const page = pageBySlug("/commercial");

export const metadata: Metadata = {
  title: page.label,
  description: page.blurb,
};

export default function CommercialPage() {
  return (
    <main id="main">
      <PageHero page={page} />
      <Pricing />
      <Industries />
      <Testimonials />
      <PageOutro current={page} cta={false} />
    </main>
  );
}
