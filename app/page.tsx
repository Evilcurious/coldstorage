import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Compliance } from "@/components/Compliance";
import { Gallery } from "@/components/Gallery";
import { Chain } from "@/components/Chain";
import { Services } from "@/components/Services";
import { Zones } from "@/components/Zones";
import { Facility } from "@/components/Facility";
import { Monitoring } from "@/components/Monitoring";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SiteSmoke } from "@/components/Smoke";
import { TapToChatWidget } from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      <SiteSmoke />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Compliance />
        <Gallery />
        <Chain />
        <Services />
        <Zones />
        <Facility />
        <Monitoring />
        <Industries />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <TapToChatWidget />
    </>
  );
}
