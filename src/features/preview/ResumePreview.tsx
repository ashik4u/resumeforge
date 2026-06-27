"use client";

import type { CSSProperties } from "react";

import { useResumeStore } from "@/store/resumeStore";
import { useTemplateStore } from "@/store/templateStore";
import { resumeTemplates } from "@/templates";

export default function ResumePreview() {
  const { errors, resume } = useResumeStore();
  const { templateId } = useTemplateStore();

  if (!resume) {
    return (
      <div className="h-full overflow-auto p-6">
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Invalid resume YAML</p>
          <ul className="mt-3 space-y-1">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const Template = resumeTemplates[templateId].Component;
  const pageWidth = resume.design.page.size === "us-letter" ? "8.5in" : "8.27in";

  return (
    <div className="h-full overflow-auto bg-slate-200 p-8 text-slate-950 dark:bg-neutral-950">
      <div
        className="resume-design-scope"
        style={
          {
            "--rf-page-width": pageWidth,
            "--rf-page-padding-top": resume.design.page.top_margin,
            "--rf-page-padding-right": resume.design.page.right_margin,
            "--rf-page-padding-bottom": resume.design.page.bottom_margin,
            "--rf-page-padding-left": resume.design.page.left_margin,
            "--rf-body-color": resume.design.colors.body,
            "--rf-name-color": resume.design.colors.name,
            "--rf-headline-color": resume.design.colors.headline,
            "--rf-connections-color": resume.design.colors.connections,
            "--rf-section-color": resume.design.colors.section_titles,
            "--rf-link-color": resume.design.colors.links,
            "--rf-line-height": resume.design.typography.line_spacing,
            "--rf-font-family": resume.design.typography.font_family,
            "--rf-text-align":
              resume.design.typography.alignment === "justified"
                ? "justify"
                : "left",
            "--rf-date-align":
              resume.design.typography.date_and_location_column_alignment,
          } as CSSProperties
        }
      >
        {resume.design.page.show_top_note ? (
          <p className="mx-auto mb-2 max-w-[var(--rf-page-width)] text-xs text-slate-500">
            Resume generated with ResumeForge
          </p>
        ) : null}
        <Template resume={resume} />
        {resume.design.page.show_footer ? (
          <p className="mx-auto mt-2 max-w-[var(--rf-page-width)] text-center text-xs text-slate-500">
            Last updated in ResumeForge
          </p>
        ) : null}
      </div>
    </div>
  );
}
