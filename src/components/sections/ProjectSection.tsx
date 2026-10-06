import ProjectRow, { buttonOutline, isResearch, type Project } from "@/components/react/ProjectRow";

interface ProjectSectionProps {
  projects: Project[];
}

// Explicit homepage order. Slugs missing from Contentful are skipped, so no dead links.
// Last entry is the one software project shown on the homepage.
const HOMEPAGE_SLUGS = [
  "multimodal-cancer-classification",
  "thesis-mobilenet-signature",
  "noisy-captcha-digit-recognition",
  "cropneeds",
];

// Old behaviour, used only if none of HOMEPAGE_SLUGS exist: research first, then up to 3 featured.
function fallbackProjects(projects: Project[]) {
  const research = projects.filter(isResearch);
  const rest = projects.filter((p) => !research.includes(p));
  const featured = rest.filter((p) => p.fields.featured);
  return [...research, ...(featured.length > 0 ? featured : rest).slice(0, 3)];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const bySlug = new Map(projects.map((p) => [p.fields.slug, p]));
  const selected = HOMEPAGE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is Project => Boolean(p)
  );
  const displayProjects = selected.length > 0 ? selected : fallbackProjects(projects);

  return (
    <section className="w-full">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-xl font-bold">Research &amp; Selected Projects</h2>
        {projects.length > 0 && (
          <a href="/projects" className={buttonOutline}>
            View all {projects.length} projects →
          </a>
        )}
      </div>

      {projects.length === 0 ? (
        <p className="text-base text-muted-foreground">Projects are coming soon!</p>
      ) : (
        <div className="space-y-6">
          {displayProjects.map((project) => (
            <ProjectRow key={project.fields.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
