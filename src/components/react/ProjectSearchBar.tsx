import { Search, X } from "lucide-react";
import { buttonOutline, buttonSolid } from "@/components/react/ProjectRow";

interface ProjectSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// Compact search box + category chips. State lives in ProjectListing.
export default function ProjectSearchBar({
  query,
  onQueryChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: ProjectSearchBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <label htmlFor="project-search" className="sr-only">Search projects</label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by title, description or technology"
          className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <div role="group" aria-label="Filter by category" className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&>button]:shrink-0 [&>button]:whitespace-nowrap">
          {["", ...categories].map((category) => {
            const selected = selectedCategory === category;
            return (
              <button
                key={category || "all"}
                type="button"
                aria-pressed={selected}
                onClick={() => onCategoryChange(category)}
                className={selected ? buttonSolid : buttonOutline}
              >
                {category || "All"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
