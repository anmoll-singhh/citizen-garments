
// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { ProductCard } from "./product-card";
// import { ProductFilters } from "./product-filters";
// import { ProductModal } from "./product-modal";
// import { ProductsGridSkeleton } from "./skeletons";
// import { SearchBar } from "./search-bar";
// import { useSearch } from "@/contexts/search-context";
// import { products, type Product } from "@/lib/products-data";
// import { cn } from "@/lib/utils";

// export function ProductsGrid() {
//   const searchParams = useSearchParams();
//   const initialCategory = searchParams.get("category");
//   const { searchQuery } = useSearch();

//   const [selectedCategories, setSelectedCategories] = useState<string[]>(
//     initialCategory ? [initialCategory] : []
//   );
//   const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
//     []
//   );

//   /** ✅ Priority Subcategory */
//   const [prioritySubcategory, setPrioritySubcategory] = useState<string | null>(
//     null
//   );

//   /** ✅ Pagination */
//   const [currentPage, setCurrentPage] = useState(1);
//   const PRODUCTS_PER_PAGE = 12;

//   const [isVisible, setIsVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   /* ✅ Initial loading */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       setIsVisible(true);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   /* ✅ Filtering */
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       if (searchQuery) {
//         const q = searchQuery.toLowerCase();
//         const matches =
//           product.name.toLowerCase().includes(q) ||
//           product.category.toLowerCase().includes(q) ||
//           product.subcategory.toLowerCase().includes(q) ||
//           product.fabric.toLowerCase().includes(q);

//         if (!matches) return false;
//       }

//       if (
//         selectedCategories.length === 0 &&
//         selectedSubcategories.length === 0
//       ) {
//         return true;
//       }

//       const categorySelected = selectedCategories.includes(product.category);

//       const relevantSubs = selectedSubcategories.filter((s) =>
//         s.startsWith(`${product.category}:`)
//       );

//       if (relevantSubs.length > 0) {
//         return relevantSubs.some(
//           (s) => s === `${product.category}:${product.subcategory}`
//         );
//       }

//       return categorySelected;
//     });
//   }, [selectedCategories, selectedSubcategories, searchQuery]);

//   /* ✅ Priority Sorting */
//   const sortedProducts = useMemo(() => {
//     if (!prioritySubcategory) return filteredProducts;

//     const [cat, sub] = prioritySubcategory.split(":");

//     return [...filteredProducts].sort((a, b) => {
//       const aMatch = a.category === cat && a.subcategory === sub;
//       const bMatch = b.category === cat && b.subcategory === sub;

//       if (aMatch && !bMatch) return -1;
//       if (!aMatch && bMatch) return 1;
//       return 0;
//     });
//   }, [filteredProducts, prioritySubcategory]);

//   /* ✅ Pagination Logic */
//   const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

//   const paginatedProducts = useMemo(() => {
//     const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
//     return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
//   }, [sortedProducts, currentPage]);

//   /* ✅ Reset page on filter/search */
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedCategories, selectedSubcategories, searchQuery]);

//   /* ✅ Animation on page change */
//   useEffect(() => {
//     setIsVisible(false);
//     const t = setTimeout(() => setIsVisible(true), 50);
//     return () => clearTimeout(t);
//   }, [currentPage]);

//   /* ✅ Pagination UI (FIXED) */
//   const visiblePages = 5;
//   const startPage = Math.max(
//     1,
//     currentPage - Math.floor(visiblePages / 2)
//   );
//   const endPage = Math.min(totalPages, startPage + visiblePages - 1);

//   /* ✅ Modal */
//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//     setIsModalOpen(false);
//   };

//   /* ✅ Loader */
//   if (isLoading) {
//     return (
//       <div className="space-y-10">
//         <div className="h-40 bg-muted animate-pulse" />
//         <ProductsGridSkeleton />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10">
//       <div className="flex justify-center">
//         <SearchBar variant="page" />
//       </div>

//       <ProductFilters
//         selectedCategories={selectedCategories}
//         setSelectedCategories={setSelectedCategories}
//         selectedSubcategories={selectedSubcategories}
//         setSelectedSubcategories={setSelectedSubcategories}
//         setPrioritySubcategory={setPrioritySubcategory}
//       />

//       <div className="flex items-center justify-between border-b border-border pb-4">
//         <p className="text-base text-muted-foreground">
//           Showing{" "}
//           <span className="text-foreground font-medium">
//             {sortedProducts.length}
//           </span>{" "}
//           pieces
//         </p>
//         <p className="text-sm text-muted-foreground">
//           Page {currentPage} of {totalPages}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
//         {paginatedProducts.map((product, index) => (
//           <div
//             key={product.id}
//             className={`transition-all duration-500 ${
//               isVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-6"
//             }`}
//             style={{ transitionDelay: `${index * 40}ms` }}
//           >
//             <ProductCard
//               product={product}
//               onProductClick={handleProductClick}
//             />
//           </div>
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-3 pt-10">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className="px-4 py-2 border border-border text-sm disabled:opacity-40 hover:bg-muted transition"
//           >
//             Prev
//           </button>

//           {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
//             const pageNum = startPage + i;
//             return (
//               <button
//                 key={pageNum}
//                 onClick={() => setCurrentPage(pageNum)}
//                 className={cn(
//                   "px-4 py-2 border text-sm transition",
//                   currentPage === pageNum
//                     ? "bg-primary text-white border-primary"
//                     : "border-border hover:bg-muted"
//                 )}
//               >
//                 {pageNum}
//               </button>
//             );
//           })}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className="px-4 py-2 border border-border text-sm disabled:opacity-40 hover:bg-muted transition"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {sortedProducts.length === 0 && (
//         <div className="text-center py-20">
//           <p className="text-lg text-muted-foreground mb-4">
//             No pieces match your selection.
//           </p>
//           <button
//             onClick={() => {
//               setSelectedCategories([]);
//               setSelectedSubcategories([]);
//               setPrioritySubcategory(null);
//             }}
//             className="text-base text-primary hover:underline underline-offset-4"
//           >
//             View all pieces
//           </button>
//         </div>
//       )}

//       <ProductModal
//         product={selectedProduct}
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// }
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import { ProductModal } from "./product-modal";
import { ProductsGridSkeleton } from "./skeletons";
import { SearchBar } from "./search-bar";
import { useSearch } from "@/contexts/search-context";
import { products, type Product } from "@/lib/products-data";

export function ProductsGrid() {
  const searchParams = useSearchParams();
  const productFromUrl = searchParams.get("product");

  const { searchQuery } = useSearch();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ✅ Auto Open Modal from Shared Link */
  useEffect(() => {
    if (productFromUrl) {
      const found = products.find((p) => p.id === productFromUrl);

      if (found) {
        setSelectedProduct(found);
        setIsModalOpen(true);
      }
    }
  }, [productFromUrl]);

  /* ✅ Back Button closes modal */
  useEffect(() => {
    const onPopState = () => {
      setSelectedProduct(null);
      setIsModalOpen(false);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  /* ✅ Click Product */
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    window.history.pushState(null, "", `/products?product=${product.id}`);
  };

  /* ✅ Close Modal */
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);

    window.history.pushState(null, "", "/products");
  };

  /* ✅ Filtering */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!searchQuery) return true;
      return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  if (!filteredProducts.length) return null;

  return (
    <>
      <div className="flex justify-center mb-10">
        <SearchBar variant="page" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

