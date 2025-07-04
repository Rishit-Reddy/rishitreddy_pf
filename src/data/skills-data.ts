/* -------------------------------------------------------------------- */
/*  Skill catalog – importance now normalised to 1‒3                    */
/*      3 → hero 2×2  |  2 → 2×1 / 1×2  |  1 → 1×1                      */
/* -------------------------------------------------------------------- */

export type Skill = {
  name: string;
  icon?: string;                  // “si:” + icon-name from react-icons/si
  category: (typeof categoryOrder)[number];
  importance: 1 | 2 | 3;
  preferredSize?: "1x1" | "2x1" | "2x2";  //   optional hard override
  color: { bg: string; text: string };
};

export const categoryOrder = [
  "Frontend",
  "Backend",
  "DevOps",
  "Data",
  "ML",
  "Design",
  "Leadership",
] as const;

/* prettier-ignore */
export const skills: Skill[] = [
  /* ─────────────── Front-end ─────────────── */
  { name: "ReactJS",   icon: "si:SiReact",      category: "Frontend", importance: 3, preferredSize: "2x2",
    color: { bg: "bg-blue-100/80 dark:bg-blue-800/60",  text: "text-blue-900 dark:text-blue-200" } },
  { name: "Next.js",   icon: "si:SiNextdotjs",  category: "Frontend", importance: 2,
    color: { bg: "bg-blue-100/80 dark:bg-blue-800/60",  text: "text-blue-900 dark:text-blue-200" } },
  { name: "TailwindCSS", icon: "si:SiTailwindcss", category: "Frontend", importance: 1,
    color: { bg: "bg-blue-100/80 dark:bg-blue-800/60",  text: "text-blue-900 dark:text-blue-200" } },
  { name: "TypeScript", icon: "si:SiTypescript", category: "Frontend", importance: 1,
    color: { bg: "bg-blue-100/80 dark:bg-blue-800/60",  text: "text-blue-900 dark:text-blue-200" } },

  /* ─────────────── Back-end ─────────────── */
  { name: "Django",    icon: "si:SiDjango",     category: "Backend", importance: 3,
    color: { bg: "bg-orange-100/80 dark:bg-orange-800/60", text: "text-orange-900 dark:text-orange-200" } },
  { name: "FastAPI",   icon: "si:SiFastapi",    category: "Backend", importance: 2,
    color: { bg: "bg-orange-100/80 dark:bg-orange-800/60", text: "text-orange-900 dark:text-orange-200" } },
  { name: "ExpressJS", icon: "si:SiExpress",    category: "Backend", importance: 1,
    color: { bg: "bg-orange-100/80 dark:bg-orange-800/60", text: "text-orange-900 dark:text-orange-200" } },
  { name: "PostgreSQL",icon: "si:SiPostgresql", category: "Backend", importance: 1,
    color: { bg: "bg-rose-100/80 dark:bg-rose-800/60",   text: "text-rose-900 dark:text-rose-200" } },

  /* ─────────────── DevOps / Cloud ─────────────── */
  { name: "Docker",       icon: "si:SiDocker",       category: "DevOps", importance: 2,
    color: { bg: "bg-emerald-100/80 dark:bg-emerald-800/60", text: "text-emerald-900 dark:text-emerald-200" } },
  { name: "Kubernetes",   icon: "si:SiKubernetes",   category: "DevOps", importance: 2,
    color: { bg: "bg-emerald-100/80 dark:bg-emerald-800/60", text: "text-emerald-900 dark:text-emerald-200" } },
  { name: "AWS",          icon: "si:SiAmazonaws",    category: "DevOps", importance: 2,
    color: { bg: "bg-emerald-100/80 dark:bg-emerald-800/60", text: "text-emerald-900 dark:text-emerald-200" } },
  { name: "Terraform",    icon: "si:SiTerraform",    category: "DevOps", importance: 1,
    color: { bg: "bg-emerald-100/80 dark:bg-emerald-800/60", text: "text-emerald-900 dark:text-emerald-200" } },
  { name: "GitHub Actions",icon: "si:SiGithubactions",category: "DevOps", importance: 1,
    color: { bg: "bg-emerald-100/80 dark:bg-emerald-800/60", text: "text-emerald-900 dark:text-emerald-200" } },
  { name: "Google Cloud", icon: "si:SiGooglecloud", category: "DevOps", importance: 1,
    color: { bg: "bg-emerald-100/80 dark:bg-emerald-800/60", text: "text-emerald-900 dark:text-emerald-200" } },

  /* ─────────────── Data / Firebase ─────────────── */
  { name: "Firebase",    icon: "si:SiFirebase",   category: "Data", importance: 1,
    color: { bg: "bg-rose-100/80 dark:bg-rose-800/60",   text: "text-rose-900 dark:text-rose-200" } },

  /* ─────────────── ML / AI ─────────────── */
  { name: "TensorFlow",  icon: "si:SiTensorflow", category: "ML", importance: 2,
    color: { bg: "bg-purple-100/80 dark:bg-purple-800/60", text: "text-purple-900 dark:text-purple-200" } },
  { name: "LangChain",   /* no official icon */   category: "ML", importance: 1,
    color: { bg: "bg-purple-100/80 dark:bg-purple-800/60", text: "text-purple-900 dark:text-purple-200" } },

  /* ─────────────── Design ─────────────── */
  { name: "Figma",       icon: "si:SiFigma",      category: "Design", importance: 1,
    color: { bg: "bg-indigo-100/80 dark:bg-indigo-800/60", text: "text-indigo-900 dark:text-indigo-200" } },
];
