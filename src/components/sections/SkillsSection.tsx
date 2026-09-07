import { skills, categoryOrder } from "@/data/skills-data";

export default function SkillsSection() {
  const categories = categoryOrder.filter((cat) =>
    skills.some((s) => s.category === cat)
  );

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-3">Skills</h2>

      <div className="space-y-1.5 text-base">
        {categories.map((cat) => (
          <div key={cat} className="flex flex-wrap gap-x-1.5 leading-snug">
            <span className="font-semibold whitespace-nowrap">{cat}:</span>
            <span className="text-muted-foreground">
              {skills.filter((s) => s.category === cat).map((s) => s.name).join(", ")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
