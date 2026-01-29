
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import { ProductModal } from "./product-modal";
import { ProductsGridSkeleton } from "./skeletons";
import { SearchBar } from "./search-bar";

import { useSearch } from "@/contexts/search-context";
import { products, type Product } from "@/lib/products-data";
import { cn } from "@/lib/utils";

export function ProductsGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ✅ URL Params */
  const initialCategory = searchParams.get("category");
  const productFromUrl = searchParams.get("product");
  const pageFromUrl = Number(searchParams.get("page") || 1);

  const { searchQuery } = useSearch();

  /* ✅ Filters */
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );

  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  /* ✅ Priority Subcategory */
  const [prioritySubcategory, setPrioritySubcategory] = useState<string | null>(
    null
  );

  /* ✅ Pagination */
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const PRODUCTS_PER_PAGE = 12;

  /* ✅ Animation */
  const [isVisible, setIsVisible] = useState(false);

  /* ✅ Loader */
  const [isLoading, setIsLoading] = useState(true);

  /* ✅ Modal */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ✅ Initial loading */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  /* ✅ Auto Open Modal From Shared Link */
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

  /* ✅ Filtering */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      /* Search */
      if (searchQuery) {
        const q = searchQuery.toLowerCase();

        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q);

        if (!matches) return false;
      }

      /* No filters selected */
      if (
        selectedCategories.length === 0 &&
        selectedSubcategories.length === 0
      ) {
        return true;
      }

      /* Category match */
      const categorySelected = selectedCategories.includes(product.category);

      /* ✅ Subcategory match */
      const relevantSubs = selectedSubcategories.filter((s) =>
        s.startsWith(`${product.category}:`)
      );

      if (relevantSubs.length > 0) {
        return relevantSubs.some(
          (s) => s === `${product.category}:${product.subcategory}`
        );
      }

      return categorySelected;
    });
  }, [selectedCategories, selectedSubcategories, searchQuery]);

  /* ✅ Priority Sorting */
  const sortedProducts = useMemo(() => {
    if (!prioritySubcategory) return filteredProducts;

    const [cat, sub] = prioritySubcategory.split(":");

    return [...filteredProducts].sort((a, b) => {
      const aMatch = a.category === cat && a.subcategory === sub;
      const bMatch = b.category === cat && b.subcategory === sub;

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [filteredProducts, prioritySubcategory]);

  /* ✅ Pagination Logic */
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  /* ✅ Reset page when filters/search change */
  useEffect(() => {
    setCurrentPage(1);
    router.push(`/products?page=1`);
  }, [selectedCategories, selectedSubcategories, searchQuery]);

  /* ✅ Update URL when page changes */
  useEffect(() => {
    router.push(`/products?page=${currentPage}`);
  }, [currentPage]);

  /* ✅ Smooth animation */
  useEffect(() => {
    setIsVisible(false);
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, [currentPage]);

  /* ✅ Visible Pagination Pages */
  const visiblePages = 5;

  const startPage = Math.max(
    1,
    currentPage - Math.floor(visiblePages / 2)
  );

  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  /* ✅ Click Product */
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    router.push(`/products?product=${product.id}&page=${currentPage}`);
  };

  /* ✅ Close Modal */
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);

    router.push(`/products?page=${currentPage}`);
  };

  /* ✅ Loader */
  if (isLoading) {
    return (
      <div className="space-y-10">
        <div className="h-40 bg-muted animate-pulse rounded-xl" />
        <ProductsGridSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* ✅ Search */}
      <div className="flex justify-center">
        <SearchBar variant="page" />
      </div>

      {/* ✅ Filters */}
      <ProductFilters
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedSubcategories={selectedSubcategories}
        setSelectedSubcategories={setSelectedSubcategories}
        setPrioritySubcategory={(val) => {
          setPrioritySubcategory(val);

          /* ✅ FIX: All Bra like filters must activate properly */
          if (val) {
            const [cat] = val.split(":");
            if (!selectedCategories.includes(cat)) {
              setSelectedCategories([cat]);
            }

            setSelectedSubcategories([val]);
          }
        }}
      />

      {/* ✅ Info */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <p className="text-base text-muted-foreground">
          Showing{" "}
          <span className="text-foreground font-medium">
            {sortedProducts.length}
          </span>{" "}
          pieces
        </p>

        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* ✅ Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {paginatedProducts.map((product, index) => (
          <div
            key={product.id}
            className={`transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <ProductCard
              product={product}
              onProductClick={handleProductClick}
            />
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border border-border text-sm disabled:opacity-40 hover:bg-muted transition"
          >
            Prev
          </button>

          {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
            const pageNum = startPage + i;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  "px-4 py-2 border text-sm transition",
                  currentPage === pageNum
                    ? "bg-primary text-white border-primary"
                    : "border-border hover:bg-muted"
                )}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border border-border text-sm disabled:opacity-40 hover:bg-muted transition"
          >
            Next
          </button>
        </div>
      )}

      {/* ✅ Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
