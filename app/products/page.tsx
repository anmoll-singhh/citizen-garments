import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ProductsGrid } from "@/components/products-grid";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Shop All Lingerie – Bras, Panties, Sets & Slips",
  description:
    "Browse Citizen Lingerie's full collection of women's innerwear — padded bras, cotton panties, lingerie sets, sports bras, slips and more. Premium quality, affordable prices. Shop online from India.",
  alternates: {
    canonical: "https://citizenslingerie.com/products",
  },
  openGraph: {
    title: "Shop All Lingerie – Bras, Panties, Sets & Slips | Citizen Lingerie",
    description:
      "Browse Citizen Lingerie's full collection of women's innerwear — padded bras, cotton panties, lingerie sets, sports bras, slips and more.",
    url: "https://citizenslingerie.com/products",
    type: "website",
    images: [
      {
        url: "https://citizenslingerie.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Citizen Lingerie Collection",
      },
    ],
  },
};

const productCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Citizen Lingerie – Full Collection",
  description:
    "Browse our full collection of premium women's innerwear including bras, panties, lingerie sets, slips and sports bras.",
  url: "https://citizenslingerie.com/products",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://citizenslingerie.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://citizenslingerie.com/products",
      },
    ],
  },
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCollectionSchema) }}
      />
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="text-lg md:text-xl font-bold tracking-[0.3em] text-muted-foreground uppercase mb-5">
              Our Collection
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground text-balance">
              Bras, Panties & Lingerie Sets
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium women's innerwear crafted for comfort and style. Shop padded bras, cotton panties, matching sets, slips and sports bras from Citizen Lingerie.
            </p>
          </div>
          <ProductsGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
}
