import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeCertificationsProps {
  certifications: Resume["certifications"];
}

export function ResumeCertifications({
  certifications,
}: ResumeCertificationsProps) {
  if (certifications.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Certifications</SectionHeading>
      <div className="mt-4 space-y-3 text-sm">
        {certifications.map((certification) => (
          <article key={`${certification.name}-${certification.issuer ?? ""}`}>
            <h3 className="font-semibold">{certification.name}</h3>
            <p className="text-slate-600">
              {[certification.issuer, certification.date]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
