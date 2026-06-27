import { ResumeDocument } from "@/features/resume/components/ResumeDocument";
import type { TemplateProps } from "@/templates/types";

export function ModernTemplate({ resume }: TemplateProps) {
  return <ResumeDocument resume={resume} />;
}
