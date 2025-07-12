import { useState, useMemo } from "react"
import ProjectSearchBar from "@/components/react/ProjectSearchBar"
import ProjectCard from "@/components/react/ProjectCard"

interface Project {
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    technologies?: string[];
    inProgress?: boolean;
    projectType?: string;
    projectCategory?: string | any[] | any; // Allow for Contentful reference fields
    institution?: string;
    featured?: boolean;
    githubUrl?: string;
    liveUrl?: string;
    hero_Image?: {
      fields: {
        image: {
          fields: {
            file: {
              url: string;
            };
            title?: string;
            description?: string;
          };
        };
        altName?: string;
      };
    };
  };
}

interface ProjectListingProps {
  projects: Project[];
}

export default function ProjectListing({ projects }: ProjectListingProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  // Get all unique technologies and categories for filters
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.fields.technologies?.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  // Predefined categories - hardcoded to avoid duplicates and ensure consistency
  const allCategories = [
    "Personal Utility",
    "AI/ML/Data Science", 
    "Web Application",
    "Mobile Application",
    "Academic/Research",
    "Cloud/DevOps",
    "Standalone / Educational"
  ];

  // Debug: Log actual categories from projects data
  const actualCategories = useMemo(() => {
    const categories = new Set<string>();
    projects.forEach(project => {
      if (project.fields.projectCategory) {
        const categoryType = typeof project.fields.projectCategory;
        console.log(`Project: ${project.fields.title}, Category:`, project.fields.projectCategory, `(type: ${categoryType})`);
        
        // Handle different types of category data from Contentful
        if (typeof project.fields.projectCategory === 'string') {
          categories.add(project.fields.projectCategory);
        } else if (Array.isArray(project.fields.projectCategory)) {
          // If it's an array of category objects
          project.fields.projectCategory.forEach(cat => {
            if (typeof cat === 'string') {
              categories.add(cat);
            } else if (cat && cat.fields && cat.fields.name) {
              categories.add(cat.fields.name);
            }
          });
        } else if (project.fields.projectCategory && typeof project.fields.projectCategory === 'object') {
          // If it's a single category object
          if (project.fields.projectCategory.fields && project.fields.projectCategory.fields.name) {
            categories.add(project.fields.projectCategory.fields.name);
          }
        }
      }
    });
    console.log('All actual categories:', Array.from(categories));
    return Array.from(categories);
  }, [projects]);

  // Filter projects based on search query, technologies, and category
  const filteredProjects = useMemo(() => {
    console.log('Filtering with selectedCategory:', selectedCategory);
    return projects.filter(project => {
      const matchesSearch = !searchQuery.trim() || 
        project.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.fields.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTechnologies = selectedTechnologies.length === 0 ||
        selectedTechnologies.every(tech => 
          project.fields.technologies?.includes(tech)
        );

      // Helper function to extract category names from Contentful data
      const getCategoryNames = (categoryField: any): string[] => {
        if (!categoryField) return [];
        
        if (typeof categoryField === 'string') {
          return categoryField.split(',').map(cat => cat.trim());
        } else if (Array.isArray(categoryField)) {
          const names: string[] = [];
          categoryField.forEach((cat: any) => {
            if (typeof cat === 'string') {
              names.push(cat);
            } else if (cat && cat.fields && cat.fields.name) {
              names.push(cat.fields.name);
            }
          });
          return names;
        } else if (categoryField && typeof categoryField === 'object' && categoryField.fields && categoryField.fields.name) {
          return [categoryField.fields.name];
        }
        
        return [];
      };

      const projectCategories = getCategoryNames(project.fields.projectCategory);
      const matchesCategory = !selectedCategory || projectCategories.includes(selectedCategory);

      console.log(`Project: ${project.fields.title}, Category:`, project.fields.projectCategory, `Categories: [${projectCategories.join(', ')}], Selected: "${selectedCategory}", Matches: ${matchesCategory}`);

      return matchesSearch && matchesTechnologies && matchesCategory;
    });
  }, [projects, searchQuery, selectedTechnologies, selectedCategory]);

  const hasActiveFilters = searchQuery.trim() || selectedTechnologies.length > 0 || selectedCategory;

  return (
    <div className="py-8">
      {/* Hero Section with Search */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          A collection of projects I've built, ranging from web applications to machine learning experiments.
        </p>
        
        {/* Search Bar */}
        <ProjectSearchBar 
          onSearch={setSearchQuery}
          onTechnologyFilter={setSelectedTechnologies}
          onCategoryFilter={setSelectedCategory}
          allTechnologies={allTechnologies}
          allCategories={allCategories}
        />
      </div>

      {/* Show results count when filtering */}
      {hasActiveFilters && (
        <div className="mb-8 bg-muted/30 border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <p className="text-sm font-medium text-foreground">
              {filteredProjects.length === 0 ? "No projects found" : 
               `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`}
              {searchQuery.trim() && (
                <span className="text-muted-foreground"> matching "<span className="font-semibold text-foreground">{searchQuery}</span>"</span>
              )}
              {selectedCategory && (
                <span className="text-muted-foreground"> in <span className="font-semibold text-foreground">{selectedCategory}</span></span>
              )}
              {selectedTechnologies.length > 0 && (
                <span className="text-muted-foreground"> using <span className="font-semibold text-foreground">{selectedTechnologies.join(", ")}</span></span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {!hasActiveFilters ? 'All Projects' : 'Search Results'}
        </h2>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {hasActiveFilters 
                  ? "No projects match your filters" 
                  : "No projects available"
                }
              </h3>
              <p className="text-muted-foreground mb-6">
                {hasActiveFilters 
                  ? "Try adjusting your search criteria or clear the filters to see all projects." 
                  : "Check back later for new projects."
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTechnologies([]);
                    setSelectedCategory("");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.fields.slug} project={project} variant="horizontal" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
