import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeCoreCompetenciesProps {
  competencies: Resume["core_competencies"];
}

export function ResumeCoreCompetencies({
  competencies,
}: ResumeCoreCompetenciesProps) {
  if (competencies.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Core Competencies</SectionHeading>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {competencies.map((competency) => (
          <span
            key={competency}
            className="rounded-md border border-slate-200 px-2 py-1 text-slate-700"
          >
            {competency}
          </span>
        ))}
      </div>
    </section>
  );
}
