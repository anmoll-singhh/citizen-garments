
import type React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SearchProvider } from "@/contexts/search-context";
import { Suspense } from "react";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* ✅ FULL SEO OPTIMIZED METADATA */
export const metadata: Metadata = {
  metadataBase: new URL("https://citizengarments.com"),

  title: {
    default: "Citizen Garments | Luxury Intimate Apparel",
    template: "%s | Citizen Garments",
  },

  description:
    "Citizen Garments is a luxury intimate apparel brand offering premium lingerie, bras, panties, slips and curated sets crafted with comfort, sophistication and modern elegance.",

  applicationName: "Citizen Garments",

  keywords: [
    "Citizen Garments",
    "luxury lingerie India",
    "lingerie shop online",
    "bras for women",
    "padded bra",
    "cotton bra",
    "lace bra",
    "panties for women",
    "comfortable panties",
    "ladies slips",
    "night slips for women",
    "lingerie sets",
    "bra panty set",
    "bridal lingerie sets",
    "premium innerwear brand",
    "buy lingerie online India",
  ],

  authors: [{ name: "Citizen Garments" }],
  creator: "Citizen Garments",
  publisher: "Citizen Garments",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Fashion & Ecommerce",

  openGraph: {
    title: "Citizen Garments | Luxury Intimate Apparel",
    description:
      "Discover luxury lingerie crafted with premium fabrics. Shop bras, panties, slips and curated sets from Citizen Garments.",
    siteName: "Citizen Garments",
    url: "https://citizengarments.com",
    type: "website",
    locale: "en_IN",

    /** ✅ OG IMAGE (PNG Supported) */
    images: [
      {
        url: "https://citizengarments.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Citizen Garments Luxury Lingerie",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Citizen Garments",
    description:
      "Shop premium lingerie, bras, panties, slips and sets from Citizen Garments.",

    /** ✅ Twitter Preview Image */
    images: ["https://citizengarments.com/og-image.png"],
  },

  alternates: {
    canonical: "https://citizengarments.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* ✅ Business Schema (Google Trust Boost) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Citizen Garments",
                url: "https://citizengarments.com",
                description:
                  "Citizen Garments is a luxury intimate apparel brand offering premium lingerie, bras, panties, slips and curated sets.",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-9860266177",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
                sameAs: [
                  "https://instagram.com/citizenslingerie",
                  "https://wa.me/919137914629",
                ],
              }),
            }}
          />

          {/* ✅ App Content */}
          <Suspense fallback={<div />}>
            <SearchProvider>{children}</SearchProvider>
          </Suspense>
        </ThemeProvider>

        {/* ✅ Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
