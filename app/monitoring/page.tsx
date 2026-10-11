import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Monitoring } from "@/components/Monitoring";
import { Compliance } from "@/components/Compliance";
import { Faq } from "@/components/Faq";
import { PageOutro } from "@/components/PageOutro";
import { en } from "@/lib/i18n/en";

const copy = en.pages.monitoring;

export const metadata: Metadata = {
  title: copy.label,
  description: copy.blurb,
};

export default function MonitoringPage() {
  return (
    <main id="main">
      <PageHero slug="monitoring" />
      <Monitoring />
      <Compliance />
      <Faq />
      <PageOutro current="monitoring" />
    </main>
  );
}
