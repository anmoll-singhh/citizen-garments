"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Skeleton className="absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <Skeleton className="h-4 w-40 mx-auto mb-6" />
        <Skeleton className="h-16 md:h-24 w-full max-w-2xl mx-auto mb-8" />
        <Skeleton className="h-6 w-full max-w-lg mx-auto mb-12" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Skeleton className="h-14 w-44" />
          <Skeleton className="h-14 w-36" />
        </div>
      </div>
    </section>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="mt-6 text-center space-y-2">
        <Skeleton className="h-6 w-24 mx-auto" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
    </div>
  )
}

export function CategorySectionSkeleton() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-3 w-20 mx-auto mb-4" />
          <Skeleton className="h-10 md:h-14 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="aspect-[3/4] w-full mb-4" />
      <div className="text-center space-y-2">
        <Skeleton className="h-5 w-32 mx-auto" />
        <Skeleton className="h-3 w-20 mx-auto" />
      </div>
    </div>
  )
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
