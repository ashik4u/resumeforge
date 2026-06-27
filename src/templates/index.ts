import { AtsTemplate } from "@/templates/ats/AtsTemplate";
import { ExecutiveTemplate } from "@/templates/executive/ExecutiveTemplate";
import { HarvardTemplate } from "@/templates/harvard/HarvardTemplate";
import { MinimalTemplate } from "@/templates/minimal/MinimalTemplate";
import { ModernTemplate } from "@/templates/modern/ModernTemplate";
import type { ResumeTemplate, TemplateId } from "@/templates/types";

export const resumeTemplates = {
  ats: {
    id: "ats",
    name: "ATS",
    description: "Dense, parser-friendly layout for applicant tracking systems.",
    Component: AtsTemplate,
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Balanced two-column resume with clean visual hierarchy.",
    Component: ModernTemplate,
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Quiet, spacious layout with restrained formatting.",
    Component: MinimalTemplate,
  },
  executive: {
    id: "executive",
    name: "Executive",
    description: "Leadership-oriented layout with a strong sidebar.",
    Component: ExecutiveTemplate,
  },
  harvard: {
    id: "harvard",
    name: "Harvard",
    description: "Academic-inspired serif layout with formal structure.",
    Component: HarvardTemplate,
  },
} satisfies Record<TemplateId, ResumeTemplate>;

export const templateOptions = Object.values(resumeTemplates);
