import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryPreview } from "@/components/category-preview"
import { FeaturedSection } from "@/components/featured-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryPreview />
      <FeaturedSection />
      <LocationSection />

      {/* ✅ SEO Text Block — visible to Google crawlers, styled naturally */}
      <section className="py-16 bg-background border-t border-border/30">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-6">
            Premium Women's Innerwear — Ulhasnagar, India
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Citizen Lingerie is a trusted innerwear brand based in Ulhasnagar, Maharashtra, offering a wide range of bras, panties, lingerie sets, slips, and sports bras for women across India. Our collection combines comfort, quality, and elegance to suit every woman's needs.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Whether you're looking for everyday padded bras, soft cotton panties, matching lingerie sets, night slips, or high-support sports bras — Citizen Lingerie has something for every occasion. We serve customers in Ulhasnagar, Thane, Mumbai and across Maharashtra.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Visit our store at Station Road, Ulhasnagar 421003, or browse our full collection online. Quality crafted in every stitch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground/60">
            {[
              "Padded Bras", "Cotton Bras", "Sports Bras", "Soft Cup Bras",
              "Everyday Panties", "Boyshort Panties", "Brief Panties",
              "Lingerie Sets", "Bra & Panty Sets", "Night Slips",
              "Full Slips", "Feeding Bras", "Net Lingerie", "Bridal Sets"
            ].map((tag) => (
              <span key={tag} className="px-3 py-1 border border-border/40 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
