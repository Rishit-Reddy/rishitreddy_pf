import { skills, categoryOrder } from "@/data/skills-data";

export default function SkillsSection() {
  const categories = categoryOrder.filter((cat) =>
    skills.some((s) => s.category === cat)
  );

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-3">Skills</h2>

      <dl className="space-y-3">
        {categories.map((cat) => (
          <div key={cat} className="grid gap-1.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold sm:pt-0.5">{cat}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {skills
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <li key={s.name} className="rounded-md bg-muted px-2 py-0.5 text-sm text-muted-foreground">
                      {s.name}
                    </li>
                  ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
