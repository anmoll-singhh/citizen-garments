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

  return (
    <div
      className={cn(
        "relative flex items-center",
        variant === "navbar" && "w-full max-w-[200px] lg:max-w-[280px]",
        variant === "page" && "w-full max-w-md",
        className,
      )}
    >
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className={cn(
          "w-full pl-10 pr-10 bg-transparent border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300",
          variant === "navbar" && "py-2 text-sm",
          variant === "page" && "py-3 text-base tracking-wide",
        )}
      />
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
