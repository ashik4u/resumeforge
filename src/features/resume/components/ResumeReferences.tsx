import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeReferencesProps {
  references: Resume["references"];
}

export function ResumeReferences({ references }: ResumeReferencesProps) {
  if (references.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>References</SectionHeading>
      <div className="mt-4 space-y-3 text-sm">
        {references.map((reference) => (
          <article key={`${reference.name}-${reference.contact ?? ""}`}>
            <h3 className="font-semibold">{reference.name}</h3>
            <p className="text-slate-600">
              {[reference.relationship, reference.contact]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
