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

  // Get all unique technologies for filters
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.fields.technologies?.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  // Filter projects based on search query and technologies
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = !searchQuery.trim() || 
        project.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.fields.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTechnologies = selectedTechnologies.length === 0 ||
        selectedTechnologies.every(tech => 
          project.fields.technologies?.includes(tech)
        );

      return matchesSearch && matchesTechnologies;
    });
  }, [projects, searchQuery, selectedTechnologies]);

  const hasActiveFilters = searchQuery.trim() || selectedTechnologies.length > 0;

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
          allTechnologies={allTechnologies}
        />
      </div>

      {/* Show results count when filtering */}
      {hasActiveFilters && (
        <div className="mb-8">
          <p className="text-muted-foreground">
            Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {searchQuery.trim() && ` matching "${searchQuery}"`}
            {selectedTechnologies.length > 0 && ` with ${selectedTechnologies.join(", ")}`}
          </p>
        </div>
      )}

      {/* All Projects Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {!hasActiveFilters ? 'All Projects' : 'Search Results'}
        </h2>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              {hasActiveFilters 
                ? "No projects found matching your criteria." 
                : "No projects available at the moment."
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTechnologies([]);
                }}
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Clear filters to see all projects
              </button>
            )}
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
