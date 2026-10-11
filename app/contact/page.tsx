import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import { Industries } from "@/components/Industries";
import { Faq } from "@/components/Faq";
import { PageOutro } from "@/components/PageOutro";
import { en } from "@/lib/i18n/en";

const copy = en.pages.contact;

export const metadata: Metadata = {
  title: copy.label,
  description: copy.blurb,
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero slug="contact" />
      <Contact />
      <Industries />
      <Faq />
      <PageOutro current="contact" cta={false} />
    </main>
  );
}
