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
  metadataBase: new URL("https://citizenslingerie.com"),

  title: {
    default: "Citizen Lingerie | Luxury Intimate Apparel",
    template: "%s | Citizen Lingerie",
  },

  description:
    "Citizen Lingerie is a luxury intimate apparel brand offering premium lingerie, bras, panties, slips and curated sets crafted with comfort, sophistication and modern elegance.",

  applicationName: "Citizen Lingerie",

  keywords: [
    "Citizen Lingerie",
    "Citizens Lingerie",
    "Citizen Garments",
    "luxury lingerie India",
    "luxury lingerie Ulhasnagar",
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

  authors: [{ name: "Citizen Lingerie" }],
  creator: "Citizen Lingerie",
  publisher: "Citizen Lingerie",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Fashion & Ecommerce",

  referrer: "strict-origin-when-cross-origin",

  openGraph: {
    title: "Citizen Lingerie | Luxury Intimate Apparel",
    description:
      "Discover luxury lingerie crafted with premium fabrics. Shop bras, panties, slips and curated sets from Citizen Lingerie.",
    siteName: "Citizen Lingerie",
    url: "https://citizenslingerie.com",
    type: "website",
    locale: "en_IN",

    /** ✅ OG IMAGE (JPG Supported) */
    images: [
      {
        url: "https://citizenslingerie.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Citizen Lingerie Luxury Lingerie",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Citizen Lingerie",
    description:
      "Shop premium lingerie, bras, panties, slips and sets from Citizen Lingerie.",

    /** ✅ Twitter Preview Image */
    images: ["https://citizenslingerie.com/og-image.jpg"],
  },

  alternates: {
    canonical: "https://citizenslingerie.com",
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
                name: "Citizen Lingerie",
                url: "https://citizenslingerie.com",
                description:
                  "Citizen Lingerie is a luxury intimate apparel brand offering premium lingerie, bras, panties, slips and curated sets.",
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
