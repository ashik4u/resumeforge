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
    <section>
      <SectionHeading>Projects</SectionHeading>
      <div className="mt-4 space-y-4">
        {projects.map((project) => (
          <article key={project.title}>
            <h3 className="font-semibold">{project.title}</h3>
            <p className="text-sm text-slate-600">
              {[project.role, project.client].filter(Boolean).join(" · ")}
            </p>
            {project.highlights.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
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
