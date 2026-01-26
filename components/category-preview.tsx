"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CategorySectionSkeleton } from "./skeletons";

const categories = [
  {
    name: "Bras",
    description: "Sculpted support meets effortless beauty",
    images: [
      "/glory-padded.jpeg",
      "/tipsy-padded.png",
      "/clovia-everyday.png",
      "sinq-padded.png",
    ],
    href: "/products?category=bra",
  },
  {
    name: "Panties",
    description: "Delicate designs for everyday luxury",
    images: [
      "/modal-print-panty.png",
      "/comfortx-period-panty.png",
      "/preview-pic-3.jpeg",
      "/hify-boyshorts-panty.jpeg",
    ],
    href: "/products?category=panties",
  },
  {
    name: "Slips",
    description: "Luxurious slips for effortless beauty",
    images: [
      "/gouri-top-slip.jpeg",
      "/kashish-top-slip.jpeg",
      "/dolphin-top-slip.jpeg",
      "/comfy-top-slip.jpeg",
    ],
    href: "/products?category=slips",
  },
  {
    name: "Sets",
    description: "Curated ensembles of timeless elegance",
    images: [
      "/zoya-padded-set.png",
      "/trendy-net-set.png",
      "/gypsy-net-set.png",
      "/avni-padded-set.png",
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
    // Auto-slide images every 5-7 seconds (randomized per card)
    const interval = setInterval(
      () => {
        setCurrentImageIndex((prev) => (prev + 1) % category.images.length);
      },
      5000 + index * 500,
    ); // Stagger the intervals slightly

    return () => clearInterval(interval);
  }, [category.images.length, index]);

  return (
    <Link
      href={category.href}
      className={`group relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        {category.images.map((image, imgIndex) => (
          <img
            key={image}
            src={image || "/placeholder.svg"}
            alt={`${category.name} ${imgIndex + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              imgIndex === currentImageIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            } group-hover:scale-110`}
          />
        ))}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {category.images.map((_, imgIndex) => (
            <span
              key={imgIndex}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                imgIndex === currentImageIndex ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl md:text-2xl font-base text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
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
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 },
    );

    const items = containerRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <CategorySectionSkeleton />;
  }

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-xs md:text-lg tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Explore
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-foreground text-balance">
            Our Categories
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
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
