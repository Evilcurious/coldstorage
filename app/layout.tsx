import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SiteSmoke } from "@/components/Smoke";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { TapToChatWidget } from "@/components/WhatsAppWidget";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://tahseenjabercold.com"),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cold storage",
    "cold chain",
    "blast freezing",
    "frozen warehousing",
    "pharmaceutical cold room",
    "temperature controlled logistics",
    "Baghdad cold storage",
  ],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/images/hero-facility.jpg", width: 1536, height: 1024, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/images/hero-facility.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ColdStorageFacility",
    name: site.name,
    description: site.description,
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
    <html lang="en">
      <body className="on-light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-5 focus:py-2.5 focus:text-[13px] focus:font-semibold focus:text-ice-700 focus:shadow-panel"
        >
          Skip to content
        </a>

        <SiteSmoke />
        <SiteHeader />
        <RevealOnScroll />
        {children}
        <Footer />
        <TapToChatWidget />
      </body>
    </html>
  );
}
