import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Monitoring } from "@/components/Monitoring";
import { Compliance } from "@/components/Compliance";
import { Faq } from "@/components/Faq";
import { PageOutro } from "@/components/PageOutro";
import { pageBySlug } from "@/lib/pages";

const page = pageBySlug("/monitoring");

export const metadata: Metadata = {
  title: page.label,
  description: page.blurb,
};

export default function MonitoringPage() {
  return (
    <main id="main">
      <PageHero page={page} />
      <Monitoring />
      <Compliance />
      <Faq />
      <PageOutro current={page} />
    </main>
  );
}
