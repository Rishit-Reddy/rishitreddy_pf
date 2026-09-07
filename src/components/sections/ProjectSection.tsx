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
            file: { url: string };
            title?: string;
          };
        };
        altName?: string;
      };
    };
  };
}

function ProjectRow({ project, isResearch }: { project: Project; isResearch?: boolean }) {
  const { title, slug, excerpt, technologies, githubUrl, liveUrl, hero_Image } = project.fields;
  const imageUrl = hero_Image?.fields?.image?.fields?.file?.url;
  const detailHref = `/projects/${slug}`;

  return (
    <div className="flex gap-4">
      {imageUrl && (
        <a href={detailHref} className="flex-shrink-0">
          <img
            src={`https:${encodeURI(imageUrl)}`}
            alt={hero_Image?.fields?.altName || hero_Image?.fields?.image?.fields?.title || title}
            className="w-28 h-20 md:w-36 md:h-24 object-cover rounded-md border border-border"
          />
        </a>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <a href={detailHref} className="font-semibold text-base hover:underline">
            {title}
          </a>
          <span className="flex gap-3 text-sm whitespace-nowrap">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                {isResearch ? "Paper" : "Live"}
              </a>
            )}
          </span>
        </div>
        {excerpt && <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{excerpt}</p>}
        {technologies && technologies.length > 0 && (
          <p className="text-sm text-muted-foreground mt-0.5">{technologies.join(" · ")}</p>
        )}
      </div>
    </div>
  );
}

interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
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
    <section className="w-full">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-xl font-bold">Projects & Research</h2>
        {projects.length > 0 && (
          <a href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all {projects.length} →
          </a>
        )}
      </div>

      {projects.length === 0 ? (
        <p className="text-base text-muted-foreground">Projects are coming soon!</p>
      ) : (
        <div className="space-y-4">
          {researchProjects.map((project) => (
            <ProjectRow key={project.fields.slug} project={project} isResearch />
          ))}
          {displayProjects.map((project) => (
            <ProjectRow key={project.fields.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
