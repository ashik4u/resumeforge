import { ResumeAwards } from "@/features/resume/components/ResumeAwards";
import { ResumeCertifications } from "@/features/resume/components/ResumeCertifications";
import { ResumeCoreCompetencies } from "@/features/resume/components/ResumeCoreCompetencies";
import { ResumeEducation } from "@/features/resume/components/ResumeEducation";
import { ResumeExperience } from "@/features/resume/components/ResumeExperience";
import { ResumeHeader } from "@/features/resume/components/ResumeHeader";
import { ResumeLanguages } from "@/features/resume/components/ResumeLanguages";
import { ResumeMemberships } from "@/features/resume/components/ResumeMemberships";
import { ResumeProjects } from "@/features/resume/components/ResumeProjects";
import { ResumePublications } from "@/features/resume/components/ResumePublications";
import { ResumeReferences } from "@/features/resume/components/ResumeReferences";
import { ResumeSkills } from "@/features/resume/components/ResumeSkills";
import { ResumeSummary } from "@/features/resume/components/ResumeSummary";
import type { Resume } from "@/lib/schema/resume";

interface ResumeDocumentProps {
  resume: Resume;
}

export function ResumeDocument({ resume }: ResumeDocumentProps) {
  return (
    <article className="mx-auto min-h-[11in] w-full max-w-[8.5in] bg-white p-12 shadow-sm">
      <ResumeHeader basics={resume.basics} />
      <ResumeSummary summary={resume.summary} />
      <ResumeExperience experience={resume.experience} />

      <section className="mt-8 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
        <ResumeProjects projects={resume.projects} />
        <div className="space-y-8">
          <ResumeSkills skills={resume.skills} />
          <ResumeCoreCompetencies competencies={resume.core_competencies} />
          <ResumeLanguages languages={resume.languages} />
        </div>
      </section>

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <ResumeEducation education={resume.education} />
        <ResumeCertifications certifications={resume.certifications} />
        <ResumeAwards awards={resume.awards} />
        <ResumePublications publications={resume.publications} />
        <ResumeMemberships memberships={resume.memberships} />
        <ResumeReferences references={resume.references} />
      </section>
    </article>
  );
}
