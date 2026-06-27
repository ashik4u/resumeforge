import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumePublicationsProps {
  publications: Resume["publications"];
}

export function ResumePublications({ publications }: ResumePublicationsProps) {
  if (publications.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Publications</SectionHeading>
      <div className="mt-4 space-y-4">
        {publications.map((publication) => (
          <article key={`${publication.title}-${publication.publisher ?? ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{publication.title}</h3>
                <p className="text-sm text-slate-600">
                  {[publication.publisher, publication.url]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              {publication.date ? (
                <p className="shrink-0 text-sm text-slate-500">
                  {publication.date}
                </p>
              ) : null}
            </div>
            {publication.summary ? (
              <p className="mt-2 text-sm leading-6">{publication.summary}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
