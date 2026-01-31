// 
"use client";

import { useEffect, useCallback, useState } from "react";
import { X, Share2 } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

import type { Product } from "@/lib/products-data";
import { categorySubcategories } from "@/lib/products-data";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { resolvedTheme } = useTheme();

  // ✅ Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !product) return null;

  /** ✅ Theme Placeholder Safe */
  const placeholder =
    mounted && resolvedTheme === "dark"
      ? "/placeholder-light.webp"
      : "/placeholder-light.webp";

  /** ✅ Get subcategory readable name */
  const getSubcategoryName = () => {
    const subs = categorySubcategories[product.category];
    const sub = subs?.find((s) => s.id === product.subcategory);
    return sub?.name || product.subcategory;
  };

  /** ✅ WhatsApp Enquiry */
  const handleEnquire = () => {
    const shareUrl = `${window.location.origin}/products?product=${product.id}`;

    const message = encodeURIComponent(
      `Hi Citizen Lingerie 👋\n\n` +
        `I am interested in this product:\n` +
        `*${product.name}*\n\n` +
        `Fabric: ${product.fabric}\n\n` +
        `Could you please share the price, available sizes & color options?\n\n` +
        `Product Link: ${shareUrl}\n` +
        `Thank you! 😊`,
    );

    window.open(`https://wa.me/919137914629?text=${message}`, "_blank");
  };

  /** ✅ Share */
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/products?product=${product.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product:\n\n${product.name}`,
          url: shareUrl,
        });
      } catch {
        console.log("Share cancelled");
      }
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      alert("Product link copied!");
      return;
    }

    window.prompt("Copy this link:", shareUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ✅ Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* ✅ Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 bg-background overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Share */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-16 z-20 p-2 bg-background/80 hover:bg-background transition cursor-pointer"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-background/80 hover:bg-background transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          {/* ✅ Image Section */}
          <div className="w-full md:w-1/2 aspect-[3/4] md:min-h-[500px] relative bg-muted flex-shrink-0 overflow-hidden">
            {/* ✅ Placeholder + Shimmer */}
            <div className="absolute inset-0">
              <Image
                src={placeholder}
                alt="Loading..."
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 shimmer-effect" />
            </div>

            {/* ✅ Product Image */}
            <Image
              src={product.image || placeholder}
              alt={product.name}
              fill
              priority
              className="object-cover transition-opacity duration-700 opacity-0"
              onLoadingComplete={(img) => {
                img.classList.remove("opacity-0");
                img.classList.add("opacity-100");
              }}
            />

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-4 py-2 bg-background/90 text-foreground text-sm tracking-[0.15em] uppercase">
                {getSubcategoryName()}
              </span>
            </div>
          </div>

          {/* ✅ Details */}
           {/* ✅ Details Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              {/* ✅ Title */}
              <div>
                <p className="text-base tracking-[0.3em] text-muted-foreground uppercase mb-3">
                  {product.category}
                </p>

                <h2 className="text-5xl md:text-6xl font-light text-foreground mb-4">
                  {product.name}
                </h2>
              </div>

              {/* ✅ Product Details */}
              <div className="space-y-3 text-lg">
                <p>
                  <b>Fabric:</b>{" "}
                  <span className="capitalize">{product.fabric}</span>
                </p>

                {product.category === "bra" && (
                  <p>
                    <b>Type:</b> {getSubcategoryName()}
                  </p>
                )}

                {product.category === "slips" && product.neck && (
                  <p>
                    <b>Neck:</b> {product.neck}
                  </p>
                )}

                {product.category !== "bra" &&
                  product.category !== "panties" &&
                  product.category !== "slips" && (
                    <p>
                      <b>Style:</b> {getSubcategoryName()}
                    </p>
                  )}

                {product.cupSize && (
                  <p>
                    <b>Cup Size:</b> {product.cupSize}
                  </p>
                )}

                {product.sizeRange && (
                  <p>
                    <b>Size Range:</b> {product.sizeRange}
                  </p>
                )}

                {product.variety && (
                  <p>
                    <b>Variety:</b> {product.variety} Color Options
                  </p>
                )}

                {product.elasticType && (
                  <p>
                    <b>Elastic:</b> {product.elasticType}
                  </p>
                )}
              </div>

              {/* ✅ Description */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                Crafted with premium {product.fabric}, designed for comfort,
                elegance and perfect fit.
              </p>

              {/* ✅ Buttons */}
              <div className="pt-6 space-y-4">
                {/* ✅ Cursor Pointer Added */}
                <button
                  onClick={handleEnquire}
                  className="w-full px-10 py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition flex items-center justify-center gap-3 cursor-pointer"
                >
                  Enquire on WhatsApp
                </button>

                {/* ✅ Cursor Pointer Added */}
                <button
                  onClick={onClose}
                  className="w-full px-10 py-4 border border-border text-foreground text-sm tracking-[0.2em] uppercase hover:bg-muted transition cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
