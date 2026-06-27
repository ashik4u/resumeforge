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

export function AtsTemplate({ resume }: TemplateProps) {
  return (
    <article className="mx-auto min-h-[11in] w-full max-w-[8.5in] bg-white p-10 text-[13px] leading-6 shadow-sm">
      <header className="border-b border-slate-300 pb-4 text-center">
        <h1 className="text-3xl font-bold tracking-normal">
          {resume.basics.name}
        </h1>
        <p className="mt-1 text-base text-slate-700">{resume.basics.headline}</p>
        <p className="mt-2 text-sm text-slate-600">
          {[
            resume.basics.email,
            resume.basics.phone,
            resume.basics.website,
            resume.basics.location.city,
            resume.basics.location.country,
          ]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </header>

      <ResumeSummary summary={resume.summary} />
      <ResumeCoreCompetencies competencies={resume.core_competencies} />
      <ResumeExperience experience={resume.experience} />
      <ResumeProjects projects={resume.projects} />

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <ResumeSkills skills={resume.skills} />
        <ResumeEducation education={resume.education} />
        <ResumeCertifications certifications={resume.certifications} />
        <ResumeLanguages languages={resume.languages} />
        <ResumeAwards awards={resume.awards} />
        <ResumePublications publications={resume.publications} />
        <ResumeMemberships memberships={resume.memberships} />
        <ResumeReferences references={resume.references} />
      </section>
    </article>
  );
}
