import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/source-serif-4/600.css";
import "@fontsource/source-serif-4/700.css";
import "./globals.css";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SiteSmoke } from "@/components/Smoke";
import { ScrollSnow } from "@/components/ScrollSnow";
import { WaveHands } from "@/components/WaveHands";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { TapToChatWidget } from "@/components/WhatsAppWidget";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SkipLink } from "@/components/SkipLink";
import { en } from "@/lib/i18n/en";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://tahseenjabercold.com"),
  title: {
    default: `${site.name} | ${en.meta.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: en.meta.description,
  keywords: [
    "cold storage",
    "cold chain",
    "blast freezing",
    "frozen warehousing",
    "pharmaceutical cold room",
    "temperature controlled logistics",
    "Baghdad cold storage",
    "تخزين مبرد",
    "سلسلة التبريد",
  ],
  openGraph: {
    title: `${site.name} | ${en.meta.tagline}`,
    description: en.meta.description,
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_IQ", "ur_PK"],
    siteName: site.name,
    images: [{ url: "/images/hero-facility.jpg", width: 1536, height: 1024, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${en.meta.tagline}`,
    description: en.meta.description,
    images: ["/images/hero-facility.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/** Restores the stored language before first paint so RTL never flashes. */
const localeBoot = `(function(){try{var k="tj-locale",v=localStorage.getItem(k)||"en",m={en:["en","ltr"],ur:["ur","rtl"],ar:["ar","rtl"]},s=m[v]||m.en;document.documentElement.lang=s[0];document.documentElement.dir=s[1];document.documentElement.dataset.locale=v;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ColdStorageFacility",
    name: site.name,
    description: en.meta.description,
    logo: new URL("/images/logo-tahseen-jaber.svg", "https://tahseenjabercold.com").href,
    telephone: site.phone,
    email: site.email,
    openingHours: "Mo-Su 00:00-23:59",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Uuayrij Industrial Area",
      addressLocality: "Baghdad",
      addressCountry: "IQ",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Blast freezing", value: "-25 °C" },
      {
        "@type": "LocationFeatureSpecification",
        name: "Validated pharmaceutical storage",
        value: "2-8 °C",
      },
      { "@type": "LocationFeatureSpecification", name: "Chilled storage", value: "0 °C" },
    ],
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBoot }} />
      </head>
      <body className="on-light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <SkipLink />
          <SiteSmoke />
          <ScrollSnow />
          <SiteHeader />
          <RevealOnScroll />
          {children}
          <Footer />
          <WaveHands />
          <TapToChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
