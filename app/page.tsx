import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Solutions } from "@/components/Solutions";
import { Calculator } from "@/components/Calculator";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Industries } from "@/components/Industries";
import { Facility } from "@/components/Facility";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { QuoteModal } from "@/components/QuoteModal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <Solutions />
        <Calculator />
        <WhyChooseUs />
        <Industries />
        <Facility />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
      <QuoteModal />
    </>
  );
}
