import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeMembershipsProps {
  memberships: Resume["memberships"];
}

export function ResumeMemberships({ memberships }: ResumeMembershipsProps) {
  if (memberships.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>Memberships</SectionHeading>
      <div className="mt-4 space-y-3 text-sm">
        {memberships.map((membership) => (
          <article key={`${membership.organization}-${membership.role ?? ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{membership.organization}</h3>
                {membership.role ? (
                  <p className="text-slate-600">{membership.role}</p>
                ) : null}
              </div>
              <p className="shrink-0 text-slate-500">
                {[membership.startDate, membership.endDate]
                  .filter(Boolean)
                  .join(" - ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
