
"use client"

import { Search, X } from "lucide-react"
import { useSearch } from "@/contexts/search-context"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  variant?: "navbar" | "page"
  className?: string
}

export function SearchBar({ variant = "navbar", className }: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useSearch()

  // ✅ Scroll to results with fixed-header offset
  const scrollToResults = () => {
    const resultsSection = document.getElementById("search-results")
    if (!resultsSection) return

    // ✅ Navbar height offset (mobile + desktop safe)
    const headerOffset = window.innerWidth < 768 ? 80 : 100

    const elementPosition =
      resultsSection.getBoundingClientRect().top + window.scrollY

    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={cn(
        "relative flex items-center",
        variant === "navbar" && "w-full max-w-[200px] lg:max-w-[280px]",
        variant === "page" && "w-full max-w-md",
        className,
      )}
    >
      {/* ✅ Search Icon */}
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />

      {/* ✅ Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."

        // ✅ Enter → Close keyboard + Smooth Scroll
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()

            // ✅ Close mobile keyboard
            e.currentTarget.blur()

            // ✅ Scroll only if query exists
            if (searchQuery.trim() !== "") {
              scrollToResults()
            }
          }
        }}
        className={cn(
          "w-full pl-10 pr-10 bg-transparent border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300",
          variant === "navbar" && "py-2 text-sm",
          variant === "page" && "py-3 text-base tracking-wide",
        )}
      />

      {/* ✅ Clear Button */}
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
// "use client"

// import { Search, X } from "lucide-react"
// import { useSearch } from "@/contexts/search-context"
// import { cn } from "@/lib/utils"
// import { products } from "@/lib/products-data"
// import { useMemo, useState, useRef, useEffect } from "react"

// interface SearchBarProps {
//   variant?: "navbar" | "page"
//   className?: string
// }

// export function SearchBar({ variant = "navbar", className }: SearchBarProps) {
//   const { searchQuery, setSearchQuery } = useSearch()

//   const [isOpen, setIsOpen] = useState(false)
//   const wrapperRef = useRef<HTMLDivElement>(null)

//   // ✅ Scroll to results with fixed-header offset
//   const scrollToResults = () => {
//     const resultsSection = document.getElementById("search-results")
//     if (!resultsSection) return

//     const headerOffset = window.innerWidth < 768 ? 80 : 100
//     const elementPosition =
//       resultsSection.getBoundingClientRect().top + window.scrollY

//     window.scrollTo({
//       top: elementPosition - headerOffset,
//       behavior: "smooth",
//     })
//   }

//   // ✅ Suggestions (Top 6 Matches)
//   const suggestions = useMemo(() => {
//     if (!searchQuery.trim()) return []

//     const q = searchQuery.toLowerCase()

//     return products
//       .filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.category.toLowerCase().includes(q) ||
//           p.subcategory.toLowerCase().includes(q),
//       )
//       .slice(0, 6)
//   }, [searchQuery])

//   // ✅ Close dropdown on outside click
//   useEffect(() => {
//     function handleOutsideClick(e: MouseEvent) {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
//         setIsOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleOutsideClick)
//     return () => document.removeEventListener("mousedown", handleOutsideClick)
//   }, [])

//   return (
//     <div
//       ref={wrapperRef}
//       className={cn(
//         "relative flex items-center",
//         variant === "navbar" && "w-full max-w-[200px] lg:max-w-[280px]",
//         variant === "page" && "w-full max-w-md",
//         className,
//       )}
//     >
//       {/* ✅ Search Icon */}
//       <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />

//       {/* ✅ Input */}
//       <input
//         type="text"
//         value={searchQuery}
//         placeholder="Search products..."
//         onChange={(e) => {
//           setSearchQuery(e.target.value)
//           setIsOpen(true)
//         }}
//         onFocus={() => setIsOpen(true)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             e.preventDefault()
//             e.currentTarget.blur()
//             setIsOpen(false)

//             if (searchQuery.trim() !== "") {
//               scrollToResults()
//             }
//           }

//           // ✅ Close dropdown on ESC
//           if (e.key === "Escape") {
//             setIsOpen(false)
//             e.currentTarget.blur()
//           }
//         }}
//         className={cn(
//           "w-full pl-10 pr-10 bg-transparent border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300",
//           variant === "navbar" && "py-2 text-sm",
//           variant === "page" && "py-3 text-base tracking-wide",
//         )}
//       />

//       {/* ✅ Clear Button */}
//       {searchQuery && (
//         <button
//           onClick={() => {
//             setSearchQuery("")
//             setIsOpen(false)
//           }}
//           className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
//           aria-label="Clear search"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       )}

//       {/* ✅ Suggestion Dropdown */}
//       {isOpen && suggestions.length > 0 && (
//         <div className="absolute top-full mt-2 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50">
//           {suggestions.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setSearchQuery(item.name)
//                 setIsOpen(false)
//                 scrollToResults()
//               }}
//               className="w-full text-left px-4 py-3 text-sm hover:bg-muted transition flex flex-col"
//             >
//               <span className="font-medium text-foreground">
//                 {item.name}
//               </span>
//               <span className="text-xs text-muted-foreground">
//                 {item.category} • {item.subcategory}
//               </span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
