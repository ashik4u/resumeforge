import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeSkillsProps {
  skills: Resume["skills"];
}

export function ResumeSkills({ skills }: ResumeSkillsProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Skills</SectionHeading>
      <div className="mt-4 space-y-3 text-sm">
        {skills.map((skill) => (
          <div key={skill.category}>
            <h3 className="font-semibold">{skill.category}</h3>
            <p className="mt-1 leading-6 text-slate-600">
              {skill.items.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
