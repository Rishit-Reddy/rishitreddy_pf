import { Badge } from "@/components/ui/badge";
import { experienceData } from "@/data/experience-data";

export default function Experience() {
  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-3">Experience</h2>

      <div className="space-y-5">
        {experienceData.map((job, index) => (
          <div key={index}>
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <span className="font-semibold text-base">{job.company} — {job.title}</span>
              <span className="text-sm text-muted-foreground whitespace-nowrap">{job.period}</span>
            </div>

            {job.skills?.length ? (
              <div className="mt-1 flex flex-wrap gap-1">
                {job.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="text-xs px-1.5 py-0 whitespace-nowrap">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : null}

            {job.narrative && (
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">{job.narrative}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
