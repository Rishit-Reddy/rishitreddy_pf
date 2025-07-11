import { useState } from "react";

interface ProjectSearchBarProps {
  onSearch: (query: string) => void;
  onTechnologyFilter?: (technologies: string[]) => void;
  allTechnologies?: string[];
}

export default function ProjectSearchBar({ 
  onSearch, 
  onTechnologyFilter,
  allTechnologies = []
}: ProjectSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechnologies([]);
    onSearch("");
    onTechnologyFilter?.([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 pr-12 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filters */}
      {allTechnologies.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Technology Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {allTechnologies.slice(0, 12).map((tech) => (
                <button
                    key={tech}
                    onClick={() => handleTechnologyToggle(tech)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      selectedTechnologies.includes(tech)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
        </div>
      )}

      {/* Active Filters & Clear */}
      {(searchQuery || selectedTechnologies.length > 0) && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <span className="text-sm text-muted-foreground">
                Searching for: <span className="font-medium">"{searchQuery}"</span>
              </span>
            )}
            {selectedTechnologies.length > 0 && (
              <span className="text-sm text-muted-foreground">
                Tech: <span className="font-medium">{selectedTechnologies.join(", ")}</span>
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
