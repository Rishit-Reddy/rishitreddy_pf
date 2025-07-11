import { useState, useEffect } from "react";
import ProjectCard from "@/components/react/ProjectCard";
import { PulsatingButton } from "@/components/magicui/pulsating-button";


// Horizontal Research Project Card Component for single thesis/research work
function ResearchProjectCardHorizontal({ project }: { project: Project }) {
  const { title, slug, excerpt, technologies, projectType, institution, inProgress, liveUrl, hero_Image } = project.fields;

  return (
    <a href={`/projects/${slug}`} className="block group">
      <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer">
        <div className="flex flex-col sm:flex-row h-auto sm:h-64">
          {/* Hero Image */}
          {hero_Image?.fields?.image?.fields?.file?.url && (
            <div className="sm:w-1/3 aspect-video sm:aspect-auto sm:h-64 overflow-hidden flex-shrink-0">
              <img
                src={`https:${encodeURI(hero_Image.fields.image.fields.file.url)}`}
                alt={hero_Image.fields.altName || hero_Image.fields.image.fields.title || title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1">
                    {title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {projectType && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        {projectType}
                      </span>
                    )}
                    {institution && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                        {institution}
                      </span>
                    )}
                    {inProgress && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {excerpt && (
                <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-sm">
                  {excerpt}
                </p>
              )}

              {/* Technologies */}
              {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {technologies.length > 6 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-muted text-muted-foreground">
                      +{technologies.length - 6} more
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    View Paper
                  </a>
                )}
              </div>
              
              <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-200">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}

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

interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get different types of projects
  const researchProjects = projects.filter(project => 
    project.fields.slug === 'thesis-mobilenet-signature' ||
    project.fields.projectType?.toLowerCase().includes('research') ||
    project.fields.projectType?.toLowerCase().includes('thesis') ||
    project.fields.title?.toLowerCase().includes('thesis') ||
    project.fields.title?.toLowerCase().includes('research')
  );
  const featuredProjects = projects.filter(project => 
    project.fields.featured && !researchProjects.includes(project)
  );
  const displayProjects = featuredProjects.length > 0 
    ? featuredProjects.slice(0, 3)
    : projects.filter(project => !researchProjects.includes(project)).slice(0, 3);

  return (
    <section className="w-full h-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Projects & Research
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Here are some of the projects I've been working on. From web applications to machine learning experiments, 
            each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Quick Stats */}
        {projects.length > 0 && (
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">
                {new Set(projects.flatMap(p => p.fields.technologies || [])).size}
              </div>
              <div className="text-sm text-muted-foreground">Technologies Used</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">
                {projects.filter(p => p.fields.githubUrl).length}
              </div>
              <div className="text-sm text-muted-foreground">Open Source</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">
                {projects.filter(p => p.fields.liveUrl).length}
              </div>
              <div className="text-sm text-muted-foreground">Live Demos</div>
            </div>
          </div>
        )}

        {/* Research Projects Section */}
        {researchProjects.length > 0 && (
          <div className={`space-y-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
              Research & Thesis Work
            </h3>
            <div className="w-full">
              {researchProjects.map((project, index) => (
                <div
                  key={project.fields.slug}
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  <ResearchProjectCardHorizontal project={project} />
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Featured Projects Section */}
        {displayProjects.length > 0 && (
          <div className={`space-y-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayProjects.map((project, index) => (
                <div
                  key={project.fields.slug}
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <ProjectCard project={project} variant="square" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <div className={`text-center py-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-muted-foreground text-lg mb-4">
              Projects are coming soon!
            </p>
            <p className="text-muted-foreground text-sm">
              I'm currently working on some exciting projects that will be showcased here.
            </p>
          </div>
        )}

        {/* View All Projects Button */}
        {projects.length > 0 && (
          <div className={`flex justify-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <PulsatingButton 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200"
              onClick={() => window.location.href = '/projects'}
            >
              View All Projects
            </PulsatingButton>
          </div>
        )}

        
      </div>
    </section>
  );
}