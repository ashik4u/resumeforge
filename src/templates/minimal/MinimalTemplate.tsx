import { ResumeCertifications } from "@/features/resume/components/ResumeCertifications";
import { ResumeCoreCompetencies } from "@/features/resume/components/ResumeCoreCompetencies";
import { ResumeEducation } from "@/features/resume/components/ResumeEducation";
import { ResumeExperience } from "@/features/resume/components/ResumeExperience";
import { ResumeLanguages } from "@/features/resume/components/ResumeLanguages";
import { ResumeProjects } from "@/features/resume/components/ResumeProjects";
import { ResumeSkills } from "@/features/resume/components/ResumeSkills";
import { ResumeSummary } from "@/features/resume/components/ResumeSummary";
import type { TemplateProps } from "@/templates/types";

export function MinimalTemplate({ resume }: TemplateProps) {
  return (
    <article className="mx-auto min-h-[11in] w-full max-w-[8.5in] bg-white p-12 shadow-sm">
      <header>
        <h1 className="text-4xl font-semibold tracking-normal">
          {resume.basics.name}
        </h1>
        <p className="mt-2 text-slate-600">{resume.basics.headline}</p>
        <p className="mt-4 max-w-3xl text-sm text-slate-500">
          {[resume.basics.email, resume.basics.phone, resume.basics.website]
            .filter(Boolean)
            .join(" / ")}
        </p>
      </header>

      <ResumeSummary summary={resume.summary} />
      <ResumeExperience experience={resume.experience} />

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <ResumeProjects projects={resume.projects} />
        <div className="space-y-8">
          <ResumeSkills skills={resume.skills} />
          <ResumeCoreCompetencies competencies={resume.core_competencies} />
          <ResumeEducation education={resume.education} />
          <ResumeCertifications certifications={resume.certifications} />
          <ResumeLanguages languages={resume.languages} />
        </div>
      </section>
    </article>
  );
}
