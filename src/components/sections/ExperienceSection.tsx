// src/components/sections/ExperienceSection.tsx

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { experienceData } from "@/data/experience-data";

/** Consistent colors for both light and dark themes */
const badgePalette = [
  { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
  { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-400" },
  { bg: "bg-purple-500/20", text: "text-purple-600 dark:text-purple-400" },
  { bg: "bg-pink-500/20", text: "text-pink-600 dark:text-pink-400" },
  { bg: "bg-teal-500/20", text: "text-teal-600 dark:text-teal-400" },
  { bg: "bg-orange-500/20", text: "text-orange-600 dark:text-orange-400" },
  { bg: "bg-rose-500/20", text: "text-rose-600 dark:text-rose-400" },
  { bg: "bg-amber-500/20", text: "text-amber-600 dark:text-amber-400" },
  { bg: "bg-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400" },
  { bg: "bg-cyan-500/20", text: "text-cyan-600 dark:text-cyan-400" },
  { bg: "bg-lime-500/20", text: "text-lime-600 dark:text-lime-400" },
  { bg: "bg-sky-500/20", text: "text-sky-600 dark:text-sky-400" },
];

export default function Experience() {
  return (
    <section className="w-full h-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 space-y-2 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Work Experience</h2>

        <Accordion type="single" collapsible className="w-full">
          {experienceData.map((job, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-border/80"
            >
              {/* ───── Trigger (always visible) ───── */}
              <AccordionTrigger className="py-4 sm:py-5 hover:no-underline transition-all text-left">
                <div className="w-full">
                  {/* top row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-contain bg-card/30 p-1"
                      />

                      <div className="flex flex-col">
                        <span className="font-semibold">{job.company}</span>
                        <span className="text-sm text-muted-foreground">
                          {job.title}
                        </span>
                        {/* Period/date - only visible on mobile */}
                        <span className="text-sm text-muted-foreground font-medium mt-0.5 sm:hidden">
                          {job.period}
                        </span>
                      </div>
                    </div>

                    {/* Period/date - only visible on desktop */}
                    <span className="hidden sm:inline-block text-sm text-muted-foreground font-medium sm:ml-auto">
                      {job.period}
                    </span>
                  </div>

                  {/* skill badges */}
                  {job.skills?.length ? (
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                      {job.skills.map((skill, i) => {
                        const colour = badgePalette[i % badgePalette.length];
                        return (
                          <Badge
                            key={i}
                            variant="outline"
                            className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 border-transparent whitespace-nowrap ${colour.bg} ${colour.text}`}
                          >
                            {skill}
                          </Badge>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </AccordionTrigger>

              {/* ───── Collapsible content ───── */}
              <AccordionContent className="px-0 sm:px-2">
                {job.points.length ? (
                  <ul className="mt-2 sm:mt-3 list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {job.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
                    Details coming soon.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
