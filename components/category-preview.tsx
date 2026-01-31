
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CategorySectionSkeleton } from "./skeletons";

const categories = [
  {
    name: "Bras",
    description: "Sculpted support meets effortless beauty",
    images: [
      "/glory-padded.webp",
      "/tipsy-padded.webp",
      "/clovia-everyday.webp",
      "/sinq-padded.webp",
    ],
    href: "/products?category=bra",
  },
  {
    name: "Panties",
    description: "Delicate designs for everyday luxury",
    images: [
      "/modal-print-panty.webp",
      "/comfortx-period-panty.webp",
      "/preview-pic-3.webp",
      "/hify-boyshorts-panty.webp",
    ],
    href: "/products?category=panties",
  },
  {
    name: "Slips",
    description: "Luxurious slips for effortless beauty",
    images: [
      "/gouri-top-slip.webp",
      "/kashish-top-slip.webp",
      "/dolphin-top-slip.webp",
      "/comfy-top-slip.webp",
    ],
    href: "/products?category=slips",
  },
  {
    name: "Sets",
    description: "Curated ensembles of timeless elegance",
    images: [
      "/zoya-padded-set.webp",
      "/trendy-net-set.webp",
      "/gypsy-net-set.webp",
      "/avni-padded-set.webp",
    ],
    href: "/products?category=sets",
  },
];

function CategoryCard({
  category,
  index,
  isVisible,
}: {
  category: (typeof categories)[0];
  index: number;
  isVisible: boolean;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % category.images.length,
      );
    }, 5000 + index * 500);

    return () => clearInterval(interval);
  }, [category.images.length, index]);

  return (
    <Link
      href={category.href}
      className={`group block transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* IMAGE */}
      <div className="relative aspect-[9/14] sm:aspect-[3/4] overflow-hidden bg-muted">
        {/* Luxury shimmer placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted animate-pulse" />

        {category.images.map((image, imgIndex) => (
          <Image
            key={image}
            src={image}
            alt={`${category.name} ${imgIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            priority={index === 0}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2QxZDFkMSIvPjwvc3ZnPg=="
            className={`absolute inset-0 object-cover transition-all duration-1000 ease-in-out ${
              imgIndex === currentImageIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            } group-hover:scale-110`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {category.images.map((_, imgIndex) => (
            <span
              key={imgIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                imgIndex === currentImageIndex
                  ? "bg-white w-4"
                  : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TEXT */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-light tracking-wide text-foreground mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed opacity-80">
          {category.description}
        </p>
      </div>
    </Link>
  );
}

export function CategoryPreview() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-index"),
            );
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index],
            );
          }
        });
      },
      { threshold: 0.2 },
    );

    const items = containerRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) return <CategorySectionSkeleton />;

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <p className="text-xs md:text-lg tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Explore
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-foreground">
            Our Categories
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category, index) => (
            <div key={category.name} data-index={index}>
              <CategoryCard
                category={category}
                index={index}
                isVisible={visibleItems.includes(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

