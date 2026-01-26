"use client"

import { useState } from "react"
import type { Product } from "@/lib/products-data"
import { categorySubcategories } from "@/lib/products-data"

interface ProductCardProps {
  product: Product
  onProductClick: (product: Product) => void
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getSubcategoryName = () => {
    const subs = categorySubcategories[product.category]
    const sub = subs?.find((s) => s.id === product.subcategory)
    return sub?.name || product.subcategory
  }

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProductClick(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-5">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-foreground/0 transition-all duration-500 ${
            isHovered ? "bg-foreground/40" : ""
          }`}
        />

        {/* View Details Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="px-6 py-3 bg-background text-foreground text-sm tracking-[0.15em] uppercase">
            View Details
          </span>
        </div>

        {/* Subcategory Badge */}
        {/* <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-background/90 text-foreground text-xs tracking-[0.1em] uppercase">
            {getSubcategoryName()}
          </span>
        </div> */}
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        {/* <p className="text-sm text-muted-foreground capitalize tracking-wide">{getSubcategoryName()}</p> */}
        <p className="text-sm text-muted-foreground capitalize tracking-wide">{product.fabric}</p>
      </div>
    </div>
  )
}
