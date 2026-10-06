import { ExternalLink, FileText, Github } from "lucide-react";

// Shared by the homepage (ProjectSection) and /projects (ProjectListing) so the two can't drift.

export interface Project {
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    technologies?: string[];
    inProgress?: boolean;
    projectType?: string;
    projectCategory?: string | string[] | any;
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

const buttonBase =
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const buttonOutline = `${buttonBase} border-border bg-background hover:bg-accent hover:text-accent-foreground`;
export const buttonSolid = `${buttonBase} border-transparent bg-primary text-primary-foreground hover:bg-primary/90`;

const PAPER_SLUGS = new Set(["thesis-mobilenet-signature"]);

// Research projects label their liveUrl as "Paper" instead of "Live".
export function isResearch(project: Project) {
  return (
    PAPER_SLUGS.has(project.fields.slug) ||
    project.fields.projectType?.toLowerCase().includes("research") ||
    project.fields.projectType?.toLowerCase().includes("thesis") ||
    project.fields.title?.toLowerCase().includes("thesis") ||
    project.fields.title?.toLowerCase().includes("research") ||
    false
  );
}

interface ProjectRowProps {
  project: Project;
  // Small "Academic · Uppsala University" line under the title (used on /projects only).
  showMeta?: boolean;
}

export default function ProjectRow({ project, showMeta }: ProjectRowProps) {
  const { title, slug, excerpt, technologies, inProgress, projectType, institution, githubUrl, liveUrl, hero_Image } =
    project.fields;
  const imageUrl = hero_Image?.fields?.image?.fields?.file?.url;
  const detailHref = `/projects/${slug}`;
  const research = isResearch(project);
  const meta = showMeta
    ? [projectType?.replace(/\s*project$/i, ""), institution].filter(Boolean).join(" · ")
    : "";

  return (
    <article className="flex gap-4 items-start">
      <a href={detailHref} tabIndex={-1} aria-hidden="true" className="flex-shrink-0">
        {imageUrl ? (
          <img
            src={`https:${encodeURI(imageUrl)}`}
            alt=""
            loading="lazy"
            className="w-28 md:w-40 aspect-[4/3] object-cover rounded-md border border-border"
          />
        ) : (
          <div className="w-28 md:w-40 aspect-[4/3] rounded-md border border-border bg-muted" />
        )}
      </a>
      <div className="min-w-0 flex-1 space-y-2">
        <h3 className="font-semibold text-base leading-snug">
          <a href={detailHref} className="hover:underline">{title}</a>
          {inProgress && (
            <span className="ml-2 inline-block align-middle rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              In progress
            </span>
          )}
        </h3>
        {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
        {excerpt && <p className="text-sm text-muted-foreground leading-snug">{excerpt}</p>}
        {technologies && technologies.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {technologies.map((t) => (
              <li key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{t}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2 pt-1">
          <a href={detailHref} className={buttonSolid} aria-label={`Details: ${title}`}>Details</a>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={buttonOutline} aria-label={`GitHub: ${title} (opens in new tab)`}>
              <Github className="size-4" aria-hidden="true" />GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonOutline}
              aria-label={`${research ? "Paper" : "Live"}: ${title} (opens in new tab)`}
            >
              {research ? <FileText className="size-4" aria-hidden="true" /> : <ExternalLink className="size-4" aria-hidden="true" />}
              {research ? "Paper" : "Live"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
