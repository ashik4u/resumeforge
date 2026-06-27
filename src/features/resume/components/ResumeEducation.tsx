import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeEducationProps {
  education: Resume["education"];
}

export function ResumeEducation({ education }: ResumeEducationProps) {
  if (education.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Education</SectionHeading>
      <div className="mt-4 space-y-4">
        {education.map((item) => (
          <article key={`${item.institution}-${item.degree}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{item.institution}</h3>
                <p className="text-sm text-slate-600">
                  {item.degree}, {item.area}
                </p>
              </div>
              <p className="shrink-0 text-sm text-slate-500">
                {item.startDate} - {item.endDate}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
