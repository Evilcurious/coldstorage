import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Compliance } from "@/components/Compliance";
import { Chain } from "@/components/Chain";
import { Services } from "@/components/Services";
import { Zones } from "@/components/Zones";
import { Facility } from "@/components/Facility";
import { Monitoring } from "@/components/Monitoring";
import { Pricing } from "@/components/Pricing";
import { Industries } from "@/components/Industries";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { TapToChatWidget } from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Compliance />
        <Chain />
        <Services />
        <Zones />
        <Facility />
        <Monitoring />
        <Pricing />
        <Industries />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <TapToChatWidget />
    </>
  );
}
