import { z } from "zod";

import { ResumeSchema } from "@/lib/schema/resume";

export const PdfExportRequestSchema = z.object({
  resume: ResumeSchema,
  templateId: z.enum(["ats", "modern", "minimal", "executive", "harvard"]),
});
