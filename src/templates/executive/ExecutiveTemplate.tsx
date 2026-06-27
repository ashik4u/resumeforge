import { ResumeAwards } from "@/features/resume/components/ResumeAwards";
import { ResumeCertifications } from "@/features/resume/components/ResumeCertifications";
import { ResumeCoreCompetencies } from "@/features/resume/components/ResumeCoreCompetencies";
import { ResumeEducation } from "@/features/resume/components/ResumeEducation";
import { ResumeExperience } from "@/features/resume/components/ResumeExperience";
import { ResumeLanguages } from "@/features/resume/components/ResumeLanguages";
import { ResumeMemberships } from "@/features/resume/components/ResumeMemberships";
import { ResumeProjects } from "@/features/resume/components/ResumeProjects";
import { ResumePublications } from "@/features/resume/components/ResumePublications";
import { ResumeReferences } from "@/features/resume/components/ResumeReferences";
import { ResumeSkills } from "@/features/resume/components/ResumeSkills";
import { ResumeSummary } from "@/features/resume/components/ResumeSummary";
import type { TemplateProps } from "@/templates/types";

export function ExecutiveTemplate({ resume }: TemplateProps) {
  return (
    <article className="mx-auto grid min-h-[11in] w-full max-w-[8.5in] grid-cols-[2fr_0.9fr] bg-white shadow-sm">
      <main className="p-12">
        <header className="border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Executive Profile
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal">
            {resume.basics.name}
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            {resume.basics.headline}
          </p>
        </header>

        <ResumeSummary summary={resume.summary} />
        <ResumeExperience experience={resume.experience} />
        <ResumeProjects projects={resume.projects} />
        <ResumeAwards awards={resume.awards} />
        <ResumePublications publications={resume.publications} />
      </main>

      <aside className="space-y-8 bg-slate-100 p-8 text-slate-950">
        <section className="text-sm leading-6 text-slate-600">
          <h2 className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Contact
          </h2>
          <div className="mt-4 space-y-1">
            <p>{resume.basics.email}</p>
            <p>{resume.basics.phone}</p>
            <p>{resume.basics.website}</p>
            <p>
              {resume.basics.location.city}, {resume.basics.location.country}
            </p>
          </div>
        </section>
        <ResumeCoreCompetencies competencies={resume.core_competencies} />
        <ResumeSkills skills={resume.skills} />
        <ResumeEducation education={resume.education} />
        <ResumeCertifications certifications={resume.certifications} />
        <ResumeLanguages languages={resume.languages} />
        <ResumeMemberships memberships={resume.memberships} />
        <ResumeReferences references={resume.references} />
      </aside>
    </article>
  );
}
