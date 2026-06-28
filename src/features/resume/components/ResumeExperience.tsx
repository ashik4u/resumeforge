import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeExperienceProps {
  experience: Resume["experience"];
}

export function ResumeExperience({ experience }: ResumeExperienceProps) {
  if (experience.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">
      <SectionHeading>Experience</SectionHeading>
      <div className="mt-3 space-y-4">
        {experience.map((role) => (
          <article key={`${role.company}-${role.position}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-800">{role.position}</h3>
                <p className="text-sm text-slate-600">
                  {[role.company, role.location].filter(Boolean).join(" · ")}
                </p>
              </div>
              <p className="shrink-0 text-sm text-slate-600">
                {role.startDate} - {role.endDate}
              </p>
            </div>
            {role.highlights.length > 0 ? (
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-5">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
