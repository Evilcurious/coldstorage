import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { PageOutro } from "@/components/PageOutro";
import { pageBySlug } from "@/lib/pages";

const page = pageBySlug("/contact");

export const metadata: Metadata = {
  title: page.label,
  description: page.blurb,
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero page={page} />
      <Contact />
      <Faq />
      <PageOutro current={page} cta={false} />
    </main>
  );
}
