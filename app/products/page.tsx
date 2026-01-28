import { Header } from "@/components/header";
import { ProductsGrid } from "@/components/products-grid";
import { Footer } from "@/components/footer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            
            <p className="text-lg md:text-xl font-bold tracking-[0.3em] text-muted-foreground uppercase mb-5">

              Our Collection
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground text-balance">
              Exquisite Pieces
            </h1>
          </div>
          <ProductsGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
}
