import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://tahseenjabercold.com"),
  title: {
    default: "Tahseen Jaber Cold Storage | Next-Generation Cold Chain",
    template: "%s | Tahseen Jaber Cold Storage",
  },
  description:
    "Premier cold storage and logistics infrastructure in Baghdad. Precision temperature control from -25°C to +15°C for food, pharmaceutical, and perishable cargo. 24/7 secure operations at Uuayrij Industrial Area.",
  keywords: [
    "cold storage Baghdad",
    "Iraq cold chain",
    "pharmaceutical warehousing",
    "blast freezing",
    "Tahseen Jaber",
    "temperature controlled logistics",
  ],
  openGraph: {
    title: "Tahseen Jaber Cold Storage",
    description:
      "Next-generation cold chain & logistics infrastructure. Precision from -25°C to +15°C.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/images/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ColdStorageFacility",
    name: "Tahseen Jaber Cold Storage",
    description:
      "Next-generation cold chain and logistics infrastructure with precision temperature control from -25°C to +15°C.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Uuayrij Industrial Area",
      addressLocality: "Baghdad",
      addressCountry: "IQ",
    },
    telephone: "+9647704502200",
    email: "commercial@tahseenjaber.com",
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <html lang="en">
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
