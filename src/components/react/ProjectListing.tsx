import { useMemo, useState } from "react"
import ProjectSearchBar from "@/components/react/ProjectSearchBar"
import ProjectRow, { buttonOutline, type Project } from "@/components/react/ProjectRow"

interface ProjectListingProps {
  projects: Project[];
}

// projectCategory can be a comma string, an array of strings, or Contentful references.
function getCategoryNames(field: any): string[] {
  if (!field) return [];
  if (typeof field === "string") return field.split(",").map((c) => c.trim()).filter(Boolean);
  const items = Array.isArray(field) ? field : [field];
  return items
    .map((c: any) => (typeof c === "string" ? c : c?.fields?.name))
    .filter((c: unknown): c is string => typeof c === "string" && c.length > 0);
}

// Chip order; only categories that actually occur in the data are shown.
const CATEGORY_ORDER = [
  "Academic/Research",
  "AI/ML/Data Science",
  "Web Application",
  "Mobile Application",
  "Cloud/DevOps",
  "Standalone / Educational",
  "Personal Utility",
];

// Groups are checked in order; a project lands in the first one it matches.
const GROUPS: { id: string; heading: string; matches: (categories: string[], slug: string) => boolean }[] = [
  { id: "research", heading: "Research", matches: (_c, slug) => slug === "thesis-mobilenet-signature" }, // only the bachelor's thesis is research
  { id: "ml", heading: "Machine learning & image analysis", matches: (c) => c.includes("Academic/Research") || c.includes("AI/ML/Data Science") },
  { id: "software", heading: "Software", matches: () => true },
];

// Preferred order inside groups (strongest / most relevant first). Unlisted slugs follow
// in Contentful order, featured ones first.
const SLUG_ORDER = [
  "thesis-mobilenet-signature",
  "multimodal-cancer-classification",
  "noisy-captcha-digit-recognition",
  "edge-detection-python",
  "predictive-maintenance-turbofan",
  "kmeans-clustering-c",
  "covid-simulation-python",
  "cropneeds",
];

function rank(project: Project) {
  const i = SLUG_ORDER.indexOf(project.fields.slug);
  if (i !== -1) return i;
  return SLUG_ORDER.length + (project.fields.featured ? 0 : 1);
}

export default function ProjectListing({ projects }: ProjectListingProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const withCategories = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, index, categories: getCategoryNames(project.fields.projectCategory) }))
        .sort((a, b) => rank(a.project) - rank(b.project) || a.index - b.index),
    [projects]
  );

  const categories = useMemo(() => {
    const present = new Set(withCategories.flatMap((p) => p.categories));
    const known = CATEGORY_ORDER.filter((c) => present.has(c));
    const extra = [...present].filter((c) => !CATEGORY_ORDER.includes(c)).sort();
    return [...known, ...extra];
  }, [withCategories]);

  const q = query.trim().toLowerCase();
  const filtered = withCategories.filter(({ project, categories }) => {
    const { title, excerpt, technologies } = project.fields;
    const matchesQuery =
      !q ||
      title.toLowerCase().includes(q) ||
      excerpt?.toLowerCase().includes(q) ||
      technologies?.some((t) => t.toLowerCase().includes(q));
    const matchesCategory = !selectedCategory || categories.includes(selectedCategory);
    return matchesQuery && matchesCategory;
  });

  const groups = GROUPS.map((group) => ({
    ...group,
    items: [] as Project[],
  }));
  for (const { project, categories } of filtered) {
    groups.find((g) => g.matches(categories, project.fields.slug))!.items.push(project);
  }

  const isFiltering = Boolean(q || selectedCategory);
  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="pb-8">
      <header className="mb-5 space-y-2">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          My thesis first, then image analysis and machine learning projects, then the software I've built along the way.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-base text-muted-foreground">Projects are coming soon!</p>
      ) : (
        <>
          <ProjectSearchBar
            query={query}
            onQueryChange={setQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
            {isFiltering
              ? `${filtered.length} of ${projects.length} project${projects.length === 1 ? "" : "s"}`
              : `${projects.length} project${projects.length === 1 ? "" : "s"}`}
          </p>

          {filtered.length === 0 ? (
            <div className="py-8 space-y-3">
              <p className="text-base text-muted-foreground">No projects match your search.</p>
              <button type="button" onClick={resetFilters} className={buttonOutline}>
                Reset filters
              </button>
            </div>
          ) : (
            groups
              .filter((g) => g.items.length > 0)
              .map((group) => (
                <section
                  key={group.id}
                  aria-labelledby={`group-${group.id}`}
                  className="mt-6 border-t border-border pt-5"
                >
                  <h2 id={`group-${group.id}`} className="text-xl font-bold mb-3">
                    {group.heading}{" "}
                    <span className="text-sm font-normal text-muted-foreground">({group.items.length})</span>
                  </h2>
                  <div className="space-y-6">
                    {group.items.map((project) => (
                      <ProjectRow key={project.fields.slug} project={project} showMeta />
                    ))}
                  </div>
                </section>
              ))
          )}
        </>
      )}
    </div>
  );
}
