interface Project {
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    technologies?: string[];
    projectType?: string;
    institution?: string;
    inProgress?: boolean;
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

interface ProjectCardProps {
  project: Project;
  variant?: 'square' | 'horizontal';
}

export default function ProjectCard({ project, variant = 'square' }: ProjectCardProps) {
  const { title, slug, excerpt, technologies, projectType, institution, inProgress, githubUrl, liveUrl, hero_Image } = project.fields;

  if (variant === 'horizontal') {
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
                        <span className="text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400">
                          {projectType}
                        </span>
                      )}
                      {institution && projectType?.toLowerCase().includes('academic') && (
                        <span className="text-xs font-medium px-2 py-1 bg-purple-500/20 text-purple-600 dark:text-purple-400">
                          {institution}
                        </span>
                      )}
                      {inProgress && (
                        <span className="text-xs font-medium px-2 py-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
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
                    {technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {technologies.length > 4 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-muted text-muted-foreground">
                        +{technologies.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {slug === 'thesis-mobilenet-signature' ? (
                        <>
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10,9 9,9 8,9"/>
                          </svg>
                          View Paper
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Live Demo
                        </>
                      )}
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
    )
  }

  // Square variant (default for featured projects)
  return (
    <a href={`/projects/${slug}`} className="block group">
      <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer">
        {/* Hero Image */}
        {hero_Image?.fields?.image?.fields?.file?.url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`https:${encodeURI(hero_Image.fields.image.fields.file.url)}`}
              alt={hero_Image.fields.altName || hero_Image.fields.image.fields.title || title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1">
                {title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {projectType && (
                  <span className="text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    {projectType}
                  </span>
                )}
                {institution && projectType?.toLowerCase().includes('academic') && (
                  <span className="text-xs font-medium px-2 py-1 bg-purple-500/20 text-purple-600 dark:text-purple-400">
                    {institution}
                  </span>
                )}
                {inProgress && (
                  <span className="text-xs font-medium px-2 py-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                    In Progress
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 5 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-muted text-muted-foreground">
                  +{technologies.length - 5} more
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-end">
            <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-200">
              View Details →
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}
