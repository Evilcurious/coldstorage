import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./globals.css";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://tahseenjabercold.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cold storage",
    "cold chain",
    "blast freezing",
    "frozen warehousing",
    "pharma cold room",
    "temperature controlled logistics",
    "Baghdad cold storage",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/images/hero-facility.jpg", width: 1536, height: 1024, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/hero-facility.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2e9be6",
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
      { "@type": "LocationFeatureSpecification", name: "Validated pharma cold rooms", value: "2-8 °C" },
    ],
  };

  return (
    <html lang="en">
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ice-700 focus:shadow-lift"
        >
          Skip to content
        </a>

        {/* ambient cold-storage atmosphere: drifting mist + slow snow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="mist-layer animate-mist absolute inset-x-[-10%] bottom-[-15%] h-[60vh]" />
          <div className="animate-drift absolute -left-24 top-24 h-72 w-72 rounded-full bg-ice-300/25 blur-3xl" />
          <div className="animate-drift absolute -right-20 top-[55%] h-80 w-80 rounded-full bg-frost-400/30 blur-3xl [animation-delay:-8s]" />
        </div>

        <RevealOnScroll />
        {children}
      </body>
    </html>
  );
}
