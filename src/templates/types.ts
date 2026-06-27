import type { ComponentType } from "react";

import type { Resume } from "@/lib/schema/resume";

export type TemplateId = "ats" | "modern" | "minimal" | "executive" | "harvard";

export interface TemplateProps {
  resume: Resume;
}

export interface ResumeTemplate {
  id: TemplateId;
  name: string;
  description: string;
  Component: ComponentType<TemplateProps>;
}
