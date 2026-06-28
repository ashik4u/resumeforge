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
    <section className="mt-6">
      <SectionHeading>Education</SectionHeading>
      <div className="mt-3 space-y-3">
        {education.map((item) => (
          <article key={`${item.institution}-${item.degree}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-800">{item.institution}</h3>
                <p className="text-sm text-slate-600">
                  {item.degree}, {item.area}
                </p>
              </div>
              <p className="shrink-0 text-sm text-slate-600">
                {item.startDate} - {item.endDate}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
