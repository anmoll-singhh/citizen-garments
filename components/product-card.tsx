
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import type { Product } from "@/lib/products-data";
import { categorySubcategories } from "@/lib/products-data";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Theme Placeholder
  const placeholder =
    mounted && resolvedTheme === "dark"
      ? "/placeholder-light.webp"
      : "/placeholder-light.webp";

  const getSubcategoryName = () => {
    const subs = categorySubcategories[product.category];
    const sub = subs?.find((s) => s.id === product.subcategory);
    return sub?.name || product.subcategory;
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProductClick(product)}
    >
      {/* ✅ Optimized Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-5">

        {/* ✅ Placeholder + Shimmer (only until loaded) */}
        {!loaded && (
          <div className="absolute inset-0">
            <Image
              src={placeholder}
              alt="Loading..."
              fill
              className="object-cover"
            />

            {/* ✅ Moving Premium Shimmer */}
            <div className="absolute inset-0 shimmer-effect" />
          </div>
        )}

        {/* ✅ Product Image */}
        <Image
          src={product.image || placeholder}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          quality={80}
          loading="lazy"
          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setLoaded(true)}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isHovered ? "bg-black/40" : "bg-black/0"
          }`}
        />

        {/* View Details Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="px-6 py-3 bg-background text-foreground text-sm tracking-[0.15em] uppercase">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-base text-muted-foreground capitalize tracking-wide">
          {product.fabric}
        </p>
      </div>
    </div>
  );
}
