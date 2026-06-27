import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeAwardsProps {
  awards: Resume["awards"];
}

export function ResumeAwards({ awards }: ResumeAwardsProps) {
  if (awards.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Awards</SectionHeading>
      <div className="mt-4 space-y-4">
        {awards.map((award) => (
          <article key={`${award.title}-${award.issuer ?? ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{award.title}</h3>
                {award.issuer ? (
                  <p className="text-sm text-slate-600">{award.issuer}</p>
                ) : null}
              </div>
              {award.date ? (
                <p className="shrink-0 text-sm text-slate-500">{award.date}</p>
              ) : null}
            </div>
            {award.summary ? (
              <p className="mt-2 text-sm leading-6">{award.summary}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
