import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumeProjectsProps {
  projects: Resume["projects"];
}

export function ResumeProjects({ projects }: ResumeProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">
      <SectionHeading>Projects</SectionHeading>
      <div className="mt-3 space-y-4">
        {projects.map((project) => (
          <article key={project.title}>
            <h3 className="font-semibold text-slate-800">{project.title}</h3>
            <p className="text-sm text-slate-600">
              {[project.role, project.client].filter(Boolean).join(" · ")}
            </p>
            {project.highlights.length > 0 ? (
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-5">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
