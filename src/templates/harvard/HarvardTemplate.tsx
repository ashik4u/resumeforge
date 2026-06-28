import { ResumeAwards } from "@/features/resume/components/ResumeAwards";
import { ResumeCertifications } from "@/features/resume/components/ResumeCertifications";
import { ResumeCoreCompetencies } from "@/features/resume/components/ResumeCoreCompetencies";
import { ResumeEducation } from "@/features/resume/components/ResumeEducation";
import { ResumeExperience } from "@/features/resume/components/ResumeExperience";
import { ResumeLanguages } from "@/features/resume/components/ResumeLanguages";
import { ResumeMemberships } from "@/features/resume/components/ResumeMemberships";
import { ResumePersonalInformation } from "@/features/resume/components/ResumePersonalInformation";
import { ResumeProjects } from "@/features/resume/components/ResumeProjects";
import { ResumePublications } from "@/features/resume/components/ResumePublications";
import { ResumeReferences } from "@/features/resume/components/ResumeReferences";
import { ResumeSkills } from "@/features/resume/components/ResumeSkills";
import { ResumeSummary } from "@/features/resume/components/ResumeSummary";
import type { TemplateProps } from "@/templates/types";

export function HarvardTemplate({ resume }: TemplateProps) {
  const contactItems = [
    resume.basics.location.city && resume.basics.location.country
      ? `${resume.basics.location.city}, ${resume.basics.location.country}`
      : null,
    resume.basics.email,
    resume.basics.phone,
    resume.basics.website,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <article 
      className="mx-auto min-h-[11in] w-full max-w-[8.5in] bg-white p-12 font-serif shadow-sm"
      style={{
        fontFamily: resume.design.typography.font_family,
        lineHeight: resume.design.typography.line_spacing,
        textAlign: resume.design.typography.alignment,
        color: resume.design.colors.body,
      }}
    >
      <header className="text-center">
        <h1 
          className="text-3xl font-bold tracking-normal uppercase"
          style={{ color: resume.design.colors.name }}
        >
          {resume.basics.name}
        </h1>
        <p 
          className="mt-1 text-sm"
          style={{ color: resume.design.colors.headline }}
        >
          {resume.basics.headline}
        </p>
        <p 
          className="mt-1 text-xs"
          style={{ color: resume.design.colors.connections }}
        >
          {contactItems}
        </p>
      </header>

      <div className="mt-4 border-t-2 border-slate-300" />
      <ResumeSummary summary={resume.summary} />
      <ResumeEducation education={resume.education} />
      <ResumeExperience experience={resume.experience} />
      <ResumeProjects projects={resume.projects} />
      <ResumeSkills skills={resume.skills} />
      <ResumeCoreCompetencies competencies={resume.core_competencies} />
      <ResumeCertifications certifications={resume.certifications} />
      <ResumeAwards awards={resume.awards} />
      <ResumePublications publications={resume.publications} />
      <ResumeLanguages languages={resume.languages} />
      <ResumeMemberships memberships={resume.memberships} />
      <ResumeReferences references={resume.references} />
      <ResumePersonalInformation personalInformation={resume.personal_information} />
      
      {resume.design.page.show_footer && (
        <footer className="mt-8 border-t border-slate-300 pt-2 text-center text-xs" style={{ color: resume.design.colors.footer }}>
          CV of {resume.basics.name}
        </footer>
      )}
    </article>
  );
}
