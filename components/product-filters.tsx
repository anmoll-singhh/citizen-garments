
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { X, ChevronRight } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { categories, categorySubcategories } from "@/lib/products-data";

// interface ProductFiltersProps {
//   selectedCategories: string[];
//   setSelectedCategories: (categories: string[]) => void;
//   selectedSubcategories: string[];
//   setSelectedSubcategories: (subcategories: string[]) => void;
// }

// export function ProductFilters({
//   selectedCategories,
//   setSelectedCategories,
//   selectedSubcategories,
//   setSelectedSubcategories,
// }: ProductFiltersProps) {
//   const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
//   const filterRef = useRef<HTMLDivElement>(null);

//   /* ✅ Close dropdown when clicking outside */
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         filterRef.current &&
//         !filterRef.current.contains(event.target as Node)
//       ) {
//         setExpandedCategory(null);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* ✅ Expand category */
//   const toggleCategory = (categoryId: string) => {
//     setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
//   };

//   /* ✅ Get subcategories for category */
//   const getSubcategoriesForCategory = (categoryId: string) => {
//     return selectedSubcategories
//       .filter((s) => s.startsWith(`${categoryId}:`))
//       .map((s) => s.split(":")[1]);
//   };

//   /* ✅ Show ALL category products */
//   const showAllInCategory = (categoryId: string) => {
//     // Select this category only
//     setSelectedCategories([categoryId]);

//     // Remove subcategory filters (means ALL)
//     setSelectedSubcategories([]);

//     // Auto close dropdown on mobile
//     if (typeof window !== "undefined" && window.innerWidth < 768) {
//       setExpandedCategory(null);
//     }
//   };

//   /* ✅ Toggle subcategory */
//   const toggleSubcategory = (categoryId: string, subcategoryId: string) => {
//     const fullId = `${categoryId}:${subcategoryId}`;

//     if (selectedSubcategories.includes(fullId)) {
//       // Remove subcategory
//       setSelectedSubcategories(
//         selectedSubcategories.filter((s) => s !== fullId)
//       );
//     } else {
//       // Switching category → clear previous subcategories
//       const currentCategory = selectedSubcategories[0]?.split(":")[0];

//       if (currentCategory && currentCategory !== categoryId) {
//         setSelectedSubcategories([fullId]);
//       } else {
//         setSelectedSubcategories([...selectedSubcategories, fullId]);
//       }
//     }

//     // Always keep category selected
//     setSelectedCategories([categoryId]);

//     // Mobile close dropdown
//     if (typeof window !== "undefined" && window.innerWidth < 768) {
//       setExpandedCategory(null);
//     }
//   };

//   /* ✅ Clear All Filters */
//   const clearAll = () => {
//     setSelectedCategories([]);
//     setSelectedSubcategories([]);
//     setExpandedCategory(null);
//   };

//   const hasFilters =
//     selectedCategories.length > 0 || selectedSubcategories.length > 0;

//   return (
//     <div className="space-y-8" ref={filterRef}>
//       {/* ✅ Category Buttons */}
//       <div className="flex flex-col gap-5">
//         <p className="text-sm md:text-lg tracking-[0.2em] text-muted-foreground uppercase">
//           Shop by Category
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {categories.map((category) => {
//             const isExpanded = expandedCategory === category.id;
//             const isSelected = selectedCategories.includes(category.id);
//             const selectedSubs = getSubcategoriesForCategory(category.id);

//             const subcategories =
//               categorySubcategories[category.id] || [];

//             return (
//               <div key={category.id} className="relative">
//                 {/* ✅ Category Button */}
//                 <button
//                   onClick={() => toggleCategory(category.id)}
//                   className={cn(
//                     "w-full px-4 py-5 border text-sm md:text-base tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-between group",
//                     isSelected || isExpanded
//                       ? "border-primary bg-primary/5 text-foreground"
//                       : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
//                   )}
//                 >
//                   <span className="font-bold">{category.name}</span>

//                   <ChevronRight
//                     className={cn(
//                       "w-4 h-4 transition-transform duration-300",
//                       isExpanded && "rotate-90"
//                     )}
//                   />
//                 </button>

//                 {/* ✅ Dropdown */}
//                 {isExpanded && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                     <div className="max-h-64 overflow-y-auto">

//                       {/* ✅ ALL CATEGORY OPTION */}
//                       <button
//                         onClick={() => showAllInCategory(category.id)}
//                         className={cn(
//                           "w-full text-left px-4 py-4 text-base font-semibold flex items-center justify-between transition-colors border-b border-border",
//                           isSelected && selectedSubs.length === 0
//                             ? "bg-primary/15 text-foreground"
//                             : "text-muted-foreground hover:bg-muted"
//                         )}
//                       >
//                         <span>All {category.name}</span>

//                         {isSelected && selectedSubs.length === 0 && (
//                           <span className="w-2 h-2 rounded-full bg-primary" />
//                         )}
//                       </button>

//                       {/* ✅ Subcategory Options */}
//                       {subcategories.map((sub) => {
//                         const isSubSelected =
//                           selectedSubs.includes(sub.id);

//                         return (
//                           <button
//                             key={sub.id}
//                             onClick={() =>
//                               toggleSubcategory(category.id, sub.id)
//                             }
//                             className={cn(
//                               "w-full text-left px-4 py-4 text-base flex items-center justify-between transition-colors",
//                               isSubSelected
//                                 ? "bg-primary/10 text-foreground"
//                                 : "text-muted-foreground hover:bg-muted"
//                             )}
//                           >
//                             <span>{sub.name}</span>

//                             {isSubSelected && (
//                               <span className="w-2 h-2 rounded-full bg-primary" />
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ✅ Active Filters Display */}
//       {hasFilters && (
//         <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
//           <span className="text-lg text-muted-foreground tracking-wide mr-2">
//             Active:
//           </span>

//           {/* ✅ Category Only Case */}
//           {selectedCategories.length > 0 &&
//             selectedSubcategories.length === 0 && (
//               <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-foreground text-sm tracking-wide">
//                 All {categories.find(c => c.id === selectedCategories[0])?.name}
//               </span>
//             )}

//           {/* ✅ Subcategory Pills */}
//           {selectedSubcategories.map((fullId) => {
//             const [categoryId, subId] = fullId.split(":");

//             const category = categories.find((c) => c.id === categoryId);
//             const subcategory =
//               categorySubcategories[categoryId]?.find(
//                 (s) => s.id === subId
//               );

//             return (
//               <span
//                 key={fullId}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-foreground text-sm tracking-wide"
//               >
//                 {category?.name} / {subcategory?.name}

//                 <button
//                   onClick={() => toggleSubcategory(categoryId, subId)}
//                   className="hover:text-primary transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </span>
//             );
//           })}

//           {/* ✅ Clear All */}
//           <button
//             onClick={clearAll}
//             className="ml-2 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
//           >
//             Clear all
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, categorySubcategories } from "@/lib/products-data";

interface ProductFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;

  selectedSubcategories: string[];
  setSelectedSubcategories: (subcategories: string[]) => void;

  /** ✅ NEW: priority subcategory setter */
  setPrioritySubcategory: (sub: string | null) => void;
}

export function ProductFilters({
  selectedCategories,
  setSelectedCategories,
  selectedSubcategories,
  setSelectedSubcategories,
  setPrioritySubcategory,
}: ProductFiltersProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  /* ✅ Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setExpandedCategory(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ✅ Expand category */
  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  /* ✅ Get selected subcategories for category */
  const getSubcategoriesForCategory = (categoryId: string) => {
    return selectedSubcategories
      .filter((s) => s.startsWith(`${categoryId}:`))
      .map((s) => s.split(":")[1]);
  };

  /* ✅ Show ALL in category */
  const showAllInCategory = (categoryId: string) => {
    setSelectedCategories([categoryId]);
    setSelectedSubcategories([]);

    /** ✅ Reset priority */
    setPrioritySubcategory(null);

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setExpandedCategory(null);
    }
  };

  /* ✅ Toggle subcategory */
  const toggleSubcategory = (categoryId: string, subcategoryId: string) => {
    const fullId = `${categoryId}:${subcategoryId}`;

    /** ✅ Save last clicked subcategory */
    setPrioritySubcategory(fullId);

    if (selectedSubcategories.includes(fullId)) {
      // Remove it
      setSelectedSubcategories(
        selectedSubcategories.filter((s) => s !== fullId)
      );

      /** ✅ Clear priority if removed */
      setPrioritySubcategory(null);
    } else {
      // Allow only ONE category’s subcategories at once
      const currentCategory = selectedSubcategories[0]?.split(":")[0];

      if (currentCategory && currentCategory !== categoryId) {
        setSelectedSubcategories([fullId]);
      } else {
        setSelectedSubcategories([...selectedSubcategories, fullId]);
      }
    }

    // Always keep category selected
    setSelectedCategories([categoryId]);

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setExpandedCategory(null);
    }
  };

  /* ✅ Clear all filters */
  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setExpandedCategory(null);

    /** ✅ Reset priority */
    setPrioritySubcategory(null);
  };

  const hasFilters =
    selectedCategories.length > 0 || selectedSubcategories.length > 0;

  return (
    <div className="space-y-8" ref={filterRef}>
      {/* ✅ Category Buttons */}
      <div className="flex flex-col gap-5">
        <p className="text-sm md:text-lg tracking-[0.2em] text-muted-foreground uppercase">
          Shop by Category
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const isSelected = selectedCategories.includes(category.id);
            const selectedSubs = getSubcategoriesForCategory(category.id);

            const subcategories = categorySubcategories[category.id] || [];

            return (
              <div key={category.id} className="relative">
                {/* ✅ Category Button */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "w-full px-4 py-5 border text-sm md:text-base tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-between",
                    isSelected || isExpanded
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  <span className="font-bold">{category.name}</span>

                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isExpanded && "rotate-90"
                    )}
                  />
                </button>

                {/* ✅ Dropdown */}
                {isExpanded && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-64 overflow-y-auto">
                      {/* ✅ ALL OPTION */}
                      <button
                        onClick={() => showAllInCategory(category.id)}
                        className={cn(
                          "w-full text-left px-4 py-4 font-semibold border-b border-border",
                          isSelected && selectedSubs.length === 0
                            ? "bg-primary/15 text-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        All {category.name}
                      </button>

                      {/* ✅ Subcategories */}
                      {subcategories.map((sub) => {
                        const isSubSelected = selectedSubs.includes(sub.id);

                        return (
                          <button
                            key={sub.id}
                            onClick={() =>
                              toggleSubcategory(category.id, sub.id)
                            }
                            className={cn(
                              "w-full text-left px-4 py-4 flex items-center justify-between",
                              isSubSelected
                                ? "bg-primary/10 text-foreground"
                                : "text-muted-foreground hover:bg-muted"
                            )}
                          >
                            {sub.name}

                            {isSubSelected && (
                              <span className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
          <span className="text-lg text-muted-foreground mr-2">Active:</span>

          {selectedSubcategories.map((fullId) => (
            <span
              key={fullId}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-sm"
            >
              {fullId.replace(":", " / ")}

              <button
                onClick={() => {
                  const [catId, subId] = fullId.split(":");
                  toggleSubcategory(catId, subId);
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}

          <button
            onClick={clearAll}
            className="ml-2 text-sm underline text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
