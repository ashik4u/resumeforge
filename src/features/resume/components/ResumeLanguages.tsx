import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeLanguagesProps {
  languages: Resume["languages"];
}

export function ResumeLanguages({ languages }: ResumeLanguagesProps) {
  if (languages.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Languages</SectionHeading>
      <div className="mt-4 space-y-2 text-sm">
        {languages.map((language) => (
          <p key={language.name}>
            <span className="font-semibold">{language.name}</span>
            {language.proficiency ? (
              <span className="text-slate-600"> · {language.proficiency}</span>
            ) : null}
          </p>
        ))}
      </div>
    </section>
  );
}
