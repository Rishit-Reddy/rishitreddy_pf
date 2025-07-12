import { useState } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from "@heroicons/react/24/outline";

interface ProjectSearchBarProps {
  onSearch: (query: string) => void;
  onTechnologyFilter?: (technologies: string[]) => void;
  onCategoryFilter?: (category: string) => void;
  allTechnologies?: string[];
  allCategories?: string[];
}

export default function ProjectSearchBar({ 
  onSearch, 
  onTechnologyFilter,
  onCategoryFilter,
  allTechnologies = [],
  allCategories = []
}: ProjectSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleTechnologyToggle = (technology: string) => {
    const newSelected = selectedTechnologies.includes(technology)
      ? selectedTechnologies.filter(t => t !== technology)
      : [...selectedTechnologies, technology];
    
    setSelectedTechnologies(newSelected);
    onTechnologyFilter?.(newSelected);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryFilter?.(category);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechnologies([]);
    setSelectedCategory("");
    onSearch("");
    onTechnologyFilter?.([]);
    onCategoryFilter?.("");
  };

  const activeFiltersCount = selectedTechnologies.length + (selectedCategory ? 1 : 0);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects by name or description..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-16 py-4 border border-border rounded-xl bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 text-lg shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                onSearch("");
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            showFilters || activeFiltersCount > 0
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <FunnelIcon className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Filters Section */}
      {showFilters && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg mb-6 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Filter */}
            {allCategories.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full appearance-none px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200 text-sm cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            )}

            {/* Technology Filter */}
            {allTechnologies.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  Technologies
                </label>
                <div className="max-h-40 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {allTechnologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => handleTechnologyToggle(tech)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          selectedTechnologies.includes(tech)
                            ? "bg-primary text-primary-foreground border-primary shadow-sm scale-95"
                            : "bg-background text-foreground border-border hover:bg-secondary hover:border-secondary-foreground/20 hover:scale-105"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filter Actions */}
          {(selectedTechnologies.length > 0 || selectedCategory) && (
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {selectedCategory && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {selectedCategory}
                  </span>
                )}
                {selectedTechnologies.length > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {selectedTechnologies.length} tech{selectedTechnologies.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors duration-200"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
