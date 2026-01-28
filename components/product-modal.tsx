// "use client";

// import { useEffect, useCallback } from "react";
// import { X } from "lucide-react";
// import type { Product } from "@/lib/products-data";
// import { categorySubcategories } from "@/lib/products-data";

// interface ProductModalProps {
//   product: Product | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
//   const handleEscape = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     },
//     [onClose],
//   );

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//       window.addEventListener("keydown", handleEscape);
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       window.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, handleEscape]);

//   if (!isOpen || !product) return null;

//   /** ✅ Get subcategory readable name */
//   const getSubcategoryName = () => {
//     const subs = categorySubcategories[product.category];
//     const sub = subs?.find((s) => s.id === product.subcategory);
//     return sub?.name || product.subcategory;
//   };

//   /** ✅ WhatsApp Enquiry */
//   const handleEnquire = () => {
//     const message = encodeURIComponent(
//       `Hi, I want to enquire about: ${product.name}. Please share price & availability.`,
//     );

//     window.open(`https://wa.me/+919137914629?text=${message}`, "_blank");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* ✅ Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
//         onClick={onClose}
//       />

//       {/* ✅ Modal Content */}
//       <div className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 bg-background overflow-hidden animate-in zoom-in-95 fade-in duration-300">
//         {/* ✅ Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 p-2 bg-background/80 hover:bg-background text-foreground transition-colors"
//           aria-label="Close modal"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
//           {/* ✅ Image Section */}
//           <div className="w-full md:w-1/2 aspect-[3/4] md:min-h-[500px] relative bg-muted flex-shrink-0">
//             <img
//               src={product.image || "/placeholder.svg"}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />

//             {/* Badge */}
//             <div className="absolute top-4 left-4">
//               <span className="px-4 py-2 bg-background/90 text-foreground text-sm tracking-[0.15em] uppercase">
//                 {getSubcategoryName()}
//               </span>
//             </div>
//           </div>

//           {/* ✅ Details Section */}
//           <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//             <div className="space-y-6">
//               {/* ✅ Title */}
//               <div>
//                 <p className="text-base tracking-[0.3em] text-muted-foreground uppercase mb-3">
//                   {product.category}
//                 </p>

//                 <h2 className="text-5xl md:text-6xl font-light text-foreground mb-4">
//                   {product.name}
//                 </h2>
//               </div>

//               {/* ✅ Product Details */}
//               <div className="space-y-3 text-lg">
//                 {/* Fabric */}
//                 <p>
//                   <b>Fabric:</b>{" "}
//                   <span className="capitalize">{product.fabric}</span>
//                 </p>

//                 {/* ✅ BRA → Style becomes Type */}
//                 {product.category === "bra" && (
//                   <p>
//                     <b>Type:</b> {getSubcategoryName()}
//                   </p>
//                 )}

//                 {/* ✅ Slips → Show Neck instead of Style */}
//                 {product.category === "slips" && product.neck && (
//                   <p>
//                     <b>Neck:</b> {product.neck}
//                   </p>
//                 )}

//                 {/* ✅ OTHER Categories → Keep Style */}
//                 {product.category !== "bra" &&
//                   product.category !== "panties" &&
//                   product.category !== "slips" && (
//                     <p>
//                       <b>Style:</b> {getSubcategoryName()}
//                     </p>
//                   )}

//                 {/* ✅ Bra / Sets Extra */}
//                 {product.cupSize && (
//                   <p>
//                     <b>Cup Size:</b> {product.cupSize}
//                   </p>
//                 )}

//                 {product.sizeRange && (
//                   <p>
//                     <b>Size Range:</b> {product.sizeRange}
//                   </p>
//                 )}

//                 {product.variety && (
//                   <p>
//                     <b>Variety:</b> {product.variety} Color Options
//                   </p>
//                 )}

//                 {/* ✅ Panty / Slip Extra */}
//                 {product.type && (
//                   <p>
//                     <b>Type:</b> {product.type}
//                   </p>
//                 )}

//                 {product.elasticType && (
//                   <p>
//                     <b>Elastic:</b> {product.elasticType}
//                   </p>
//                 )}

//                 {/* ✅ Colors Display Fix */}
//                 {product.colors && (
//                   <p>
//                     <b>Colors:</b>{" "}
//                     {Array.isArray(product.colors)
//                       ? product.colors.join(", ")
//                       : `${product.colors} Options`}
//                   </p>
//                 )}
//               </div>

//               {/* ✅ Description */}
//               <p className="text-xl text-muted-foreground leading-relaxed">
//                 Crafted with premium {product.fabric}, designed for comfort,
//                 elegance and perfect fit.
//               </p>

//               {/* ✅ Buttons */}
//               <div className="pt-6 space-y-4">
//                 <button
//                   onClick={handleEnquire}
//                   className="w-full px-10 py-4 bg-primary text-primary-foreground text-base tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-3"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     className="w-5 h-5 text-white"
//                     aria-hidden="true"
//                     focusable="false"
//                   >
//                     <path
//                       fill="currentColor"
//                       d="M20.52 3.48A11.92 11.92 0 0012 0C5.37 0 .12 5.25.12 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.43-1.67A11.88 11.88 0 0012 23.76c6.63 0 11.88-5.25 11.88-11.88 0-3.17-1.24-6.15-3.36-8.4zM12 21.6c-1.46 0-2.9-.38-4.15-1.1l-.3-.18-3.82.99.98-3.73-.2-.31A9.36 9.36 0 012.64 11.88c0-5.09 4.17-9.24 9.32-9.24 2.48 0 4.8.96 6.55 2.7a9.2 9.2 0 012.7 6.6c0 5.15-4.15 9.32-9.24 9.32z"
//                     />
//                     <path
//                       fill="#fff"
//                       d="M17.6 14.14c-.26-.13-1.53-.76-1.77-.84-.24-.08-.42-.13-.6.13-.17.26-.66.84-.8 1.01-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.3-.78-.7-1.3-1.56-1.45-1.82-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.05-.32-.02-.45-.08-.13-.6-1.42-.82-1.94-.22-.51-.45-.44-.6-.45-.15-.01-.33-.01-.51-.01s-.45.06-.69.32c-.24.26-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.74.13.17 1.85 2.82 4.49 3.95 1.98.87 2.85.95 3.08.89.23-.06 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.11-.23-.17-.49-.3z"
//                     />
//                   </svg>
//                   Enquire on WhatsApp
//                 </button>

//                 <button
//                   onClick={onClose}
//                   className="w-full px-10 py-4 border border-border text-foreground text-base tracking-[0.2em] uppercase hover:bg-muted transition-colors duration-300"
//                 >
//                   Continue Browsing
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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

