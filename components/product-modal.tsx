
"use client";

import { useEffect, useCallback } from "react";
import { X, Share2 } from "lucide-react";
import type { Product } from "@/lib/products-data";
import { categorySubcategories } from "@/lib/products-data";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
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

  /** ✅ Get subcategory readable name */
  const getSubcategoryName = () => {
    const subs = categorySubcategories[product.category];
    const sub = subs?.find((s) => s.id === product.subcategory);
    return sub?.name || product.subcategory;
  };

  /** ✅ WhatsApp Enquiry */
  const handleEnquire = () => {
    const message = encodeURIComponent(
      `Hi, I want to enquire about: ${product.name}. Please share price & availability.`
    );

    window.open(`https://wa.me/919137914629?text=${message}`, "_blank");
  };

  /** ✅ Share Product Link */
   const handleShare = async () => {
    const shareUrl = `${window.location.origin}/products?product=${product.id}`;

    const shareText = `Check out this product:\n\n${product.name}\n\nLink: ${shareUrl}`;

    // ✅ Mobile Share Supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
      return;
    }

    // ✅ Clipboard Supported
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      alert("Product link copied!");
      return;
    }

    // ✅ Final Fallback (Works Everywhere)
    window.prompt("Copy this link:", shareUrl);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ✅ Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* ✅ Modal Content */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 bg-background overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* ✅ Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-16 z-20 p-2 bg-background/80 hover:bg-background text-foreground transition"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-background/80 hover:bg-background text-foreground transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          {/* ✅ Image Section */}
          <div className="w-full md:w-1/2 aspect-[3/4] md:min-h-[500px] relative bg-muted flex-shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-background/90 text-foreground text-sm tracking-[0.15em] uppercase">
                {getSubcategoryName()}
              </span>
            </div>
          </div>

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

              {/* ✅ Product Details Restored */}
              <div className="space-y-3 text-lg">
                <p>
                  <b>Fabric:</b>{" "}
                  <span className="capitalize">{product.fabric}</span>
                </p>

                {/* ✅ Bra */}
                {product.category === "bra" && (
                  <p>
                    <b>Type:</b> {getSubcategoryName()}
                  </p>
                )}

                {/* ✅ Slips */}
                {product.category === "slips" && product.neck && (
                  <p>
                    <b>Neck:</b> {product.neck}
                  </p>
                )}

                {/* ✅ Other */}
                {product.category !== "bra" &&
                  product.category !== "panties" &&
                  product.category !== "slips" && (
                    <p>
                      <b>Style:</b> {getSubcategoryName()}
                    </p>
                  )}

                {/* ✅ Extra Fields */}
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

                {product.type && (
                  <p>
                    <b>Type:</b> {product.type}
                  </p>
                )}

                {product.elasticType && (
                  <p>
                    <b>Elastic:</b> {product.elasticType}
                  </p>
                )}

                {product.colors && (
                  <p>
                    <b>Colors:</b>{" "}
                    {Array.isArray(product.colors)
                      ? product.colors.join(", ")
                      : `${product.colors} Options`}
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
                <button
                  onClick={handleEnquire}
                  className="w-full px-10 py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition flex items-center justify-center gap-3"
                >
                  Enquire on WhatsApp
                </button>

                <button
                  onClick={onClose}
                  className="w-full px-10 py-4 border border-border text-foreground text-sm tracking-[0.2em] uppercase hover:bg-muted transition"
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

