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
    <section className="mt-6">
      <SectionHeading>Skills</SectionHeading>
      <div className="mt-3 space-y-2 text-sm">
        {skills.map((skill) => (
          <div key={skill.category}>
            <h3 className="font-semibold text-slate-800">{skill.category}</h3>
            <p className="text-slate-600">
              {skill.items.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
