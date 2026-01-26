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
      <Footer />
    </main>
  )
}
