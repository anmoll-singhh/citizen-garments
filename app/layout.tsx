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

export const metadata: Metadata = {
  metadataBase: new URL("https://citizenslingerie.com"),

  title: {
    default: "Citizen Lingerie | Premium Bras, Panties & Lingerie Sets – Ulhasnagar",
    template: "%s | Citizen Lingerie",
  },

  description:
    "Shop Citizen Lingerie — premium bras, panties, lingerie sets, slips & sports bras for women. Comfortable, affordable & stylish innerwear. Based in Ulhasnagar, Maharashtra. Order online or visit us today.",

  applicationName: "Citizen Lingerie",

  keywords: [
    "Citizen Lingerie",
    "Citizens Lingerie",
    "Citizen Garments",
    "citizenslingerie.com",
    "lingerie shop Ulhasnagar",
    "bra shop Ulhasnagar",
    "ladies innerwear Ulhasnagar",
    "women lingerie online India",
    "buy bra online India",
    "padded bra India",
    "cotton bra women",
    "sports bra women India",
    "panties for women India",
    "boyshort panties",
    "lingerie sets India",
    "bra panty set online",
    "bridal lingerie India",
    "innerwear brand India",
    "night slip for women",
    "affordable lingerie India",
    "premium lingerie Maharashtra",
    "luxury innerwear India",
    "soft cup bra India",
    "everyday bra women",
    "feeding bra India",
  ],

  authors: [{ name: "Citizen Lingerie", url: "https://citizenslingerie.com" }],
  creator: "Citizen Lingerie",
  publisher: "Citizen Lingerie",

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
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

  category: "Fashion & Lingerie",
  referrer: "strict-origin-when-cross-origin",

  openGraph: {
    title: "Citizen Lingerie | Premium Bras, Panties & Lingerie Sets",
    description:
      "Shop Citizen Lingerie — premium bras, panties, lingerie sets, slips & sports bras for women. Comfortable, affordable & stylish innerwear. Based in Ulhasnagar, Maharashtra.",
    siteName: "Citizen Lingerie",
    url: "https://citizenslingerie.com",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://citizenslingerie.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Citizen Lingerie – Premium Women's Innerwear India",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@citizenslingerie",
    creator: "@citizenslingerie",
    title: "Citizen Lingerie | Premium Bras, Panties & Lingerie Sets",
    description:
      "Shop premium bras, panties, lingerie sets & slips from Citizen Lingerie. Based in Ulhasnagar, India.",
    images: ["https://citizenslingerie.com/og-image.jpg"],
  },

  alternates: {
    canonical: "https://citizenslingerie.com",
    languages: {
      "en-IN": "https://citizenslingerie.com",
    },
  },

  // ✅ verification tag moved here — proper Next.js way, no raw <meta> tag needed
  verification: {
    google: "CoMJbPpynfe0pLoHt3C62jfLZc4w3Yj9xnS31of3TJg",
  },

  other: {
    "theme-color": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Citizen Lingerie",
    "mobile-web-app-capable": "yes",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    rating: "general",
    revisit: "7 days",
    language: "English",
    distribution: "global",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://citizenslingerie.com/#organization",
  name: "Citizen Lingerie",
  alternateName: ["Citizens Lingerie", "Citizen Garments"],
  url: "https://citizenslingerie.com",
  // ✅ Fixed: logo now points to actual square-ish brand logo, not og-image
  logo: {
    "@type": "ImageObject",
    url: "https://citizenslingerie.com/logos/Citizens.png",
    width: 660,
    height: 378,
  },
  description:
    "Citizen Lingerie is a premium women's innerwear brand offering bras, panties, lingerie sets, slips and sports bras. Based in Ulhasnagar, Maharashtra, India.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9860266177",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-9137914629",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bk no. 974, Sukhmani Niwas, Station Road",
    addressLocality: "Ulhasnagar",
    addressRegion: "Maharashtra",
    postalCode: "421003",
    addressCountry: "IN",
  },
  sameAs: [
    "https://instagram.com/citizenslingerie",
    "https://wa.me/919137914629",
  ],
  email: "citizenslingerie@gmail.com",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "@id": "https://citizenslingerie.com/#localbusiness",
  name: "Citizen Lingerie",
  alternateName: "Citizen Garments",
  description:
    "Premium women's innerwear store in Ulhasnagar offering bras, panties, lingerie sets, slips and sports bras. Visit us in person or shop online.",
  url: "https://citizenslingerie.com",
  telephone: "+91-9860266177",
  email: "citizenslingerie@gmail.com",
  image: "https://citizenslingerie.com/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bk no. 974, Sukhmani Niwas, Station Road",
    addressLocality: "Ulhasnagar",
    addressRegion: "Maharashtra",
    postalCode: "421003",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.220028,
    longitude: 73.162244,
  },
  hasMap: "https://maps.app.goo.gl/16jqSC2VrFCWtFBW7",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
  areaServed: ["Ulhasnagar", "Thane", "Mumbai", "Maharashtra", "India"],
  parentOrganization: {
    "@id": "https://citizenslingerie.com/#organization",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://citizenslingerie.com/#website",
  name: "Citizen Lingerie",
  url: "https://citizenslingerie.com",
  description:
    "Shop premium bras, panties, lingerie sets and slips from Citizen Lingerie. Based in Ulhasnagar, India.",
  inLanguage: "en-IN",
  publisher: {
    "@id": "https://citizenslingerie.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://citizenslingerie.com/products?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* ✅ Geo tags — kept here as Next.js metadata doesn't support these natively */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Ulhasnagar, Maharashtra, India" />
        <meta name="geo.position" content="19.220028;73.162244" />
        <meta name="ICBM" content="19.220028, 73.162244" />
        {/* ✅ Removed raw google-site-verification meta tag — now handled via metadata.verification above */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${cormorant.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense fallback={<div />}>
            <SearchProvider>{children}</SearchProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}