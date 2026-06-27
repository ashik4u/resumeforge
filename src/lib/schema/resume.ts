import { z } from "zod";

const ResumeTextSchema = z.coerce.string();
const DefaultDesign = {
  page: {
    size: "a4" as const,
    top_margin: "0.7in",
    bottom_margin: "0.7in",
    left_margin: "0.7in",
    right_margin: "0.7in",
    show_footer: true,
    show_top_note: false,
  },
  colors: {
    body: "#0f172a",
    name: "#0f172a",
    headline: "#475569",
    connections: "#64748b",
    section_titles: "#475569",
    links: "#0f172a",
    footer: "#64748b",
    top_note: "#64748b",
  },
  typography: {
    line_spacing: "1.55",
    alignment: "left" as const,
    date_and_location_column_alignment: "right" as const,
    font_family: "Arial",
  },
};

export const DesignSchema = z.object({
  page: z
    .object({
      size: z.enum(["a4", "us-letter"]).default("a4"),
      top_margin: ResumeTextSchema.default("0.7in"),
      bottom_margin: ResumeTextSchema.default("0.7in"),
      left_margin: ResumeTextSchema.default("0.7in"),
      right_margin: ResumeTextSchema.default("0.7in"),
      show_footer: z.coerce.boolean().default(true),
      show_top_note: z.coerce.boolean().default(false),
    })
    .default(DefaultDesign.page),
  colors: z
    .object({
      body: ResumeTextSchema.default("#0f172a"),
      name: ResumeTextSchema.default("#0f172a"),
      headline: ResumeTextSchema.default("#475569"),
      connections: ResumeTextSchema.default("#64748b"),
      section_titles: ResumeTextSchema.default("#475569"),
      links: ResumeTextSchema.default("#0f172a"),
      footer: ResumeTextSchema.default("#64748b"),
      top_note: ResumeTextSchema.default("#64748b"),
    })
    .default(DefaultDesign.colors),
  typography: z
    .object({
      line_spacing: ResumeTextSchema.default("1.55"),
      alignment: z.enum(["left", "justified"]).default("left"),
      date_and_location_column_alignment: z
        .enum(["left", "right"])
        .default("right"),
      font_family: ResumeTextSchema.default("Arial"),
    })
    .default(DefaultDesign.typography),
});

export const BasicsSchema = z.object({
  name: ResumeTextSchema.default(""),
  headline: ResumeTextSchema.default(""),
  email: ResumeTextSchema.pipe(z.string().email().or(z.literal(""))).default(""),
  phone: ResumeTextSchema.default(""),
  website: ResumeTextSchema.pipe(z.string().url().or(z.literal(""))).default(""),
  location: z.object({
    city: ResumeTextSchema.default(""),
    country: ResumeTextSchema.default(""),
  }),
});

export const ExperienceSchema = z.object({
  company: ResumeTextSchema,
  position: ResumeTextSchema,
  location: ResumeTextSchema.optional(),
  startDate: ResumeTextSchema,
  endDate: ResumeTextSchema,
  highlights: z.array(ResumeTextSchema).default([]),
});

export const ProjectSchema = z.object({
  title: ResumeTextSchema,
  role: ResumeTextSchema,
  client: ResumeTextSchema.optional(),
  project_size: ResumeTextSchema.optional(),
  location: ResumeTextSchema.optional(),
  highlights: z.array(ResumeTextSchema).default([]),
});

export const EducationSchema = z.object({
  institution: ResumeTextSchema,
  degree: ResumeTextSchema,
  area: ResumeTextSchema,
  startDate: ResumeTextSchema,
  endDate: ResumeTextSchema,
});

export const SkillSchema = z.object({
  category: ResumeTextSchema,
  items: z.array(ResumeTextSchema),
});

export const LanguageSchema = z.object({
  name: ResumeTextSchema,
  proficiency: ResumeTextSchema.optional(),
});

export const CertificationSchema = z.object({
  name: ResumeTextSchema,
  issuer: ResumeTextSchema.optional(),
  date: ResumeTextSchema.optional(),
});

export const AwardSchema = z.object({
  title: ResumeTextSchema,
  issuer: ResumeTextSchema.optional(),
  date: ResumeTextSchema.optional(),
  summary: ResumeTextSchema.optional(),
});

export const PublicationSchema = z.object({
  title: ResumeTextSchema,
  publisher: ResumeTextSchema.optional(),
  date: ResumeTextSchema.optional(),
  url: ResumeTextSchema.pipe(z.string().url().or(z.literal(""))).optional(),
  summary: ResumeTextSchema.optional(),
});

export const ReferenceSchema = z.object({
  name: ResumeTextSchema,
  relationship: ResumeTextSchema.optional(),
  contact: ResumeTextSchema.optional(),
});

export const MembershipSchema = z.object({
  organization: ResumeTextSchema,
  role: ResumeTextSchema.optional(),
  startDate: ResumeTextSchema.optional(),
  endDate: ResumeTextSchema.optional(),
});

export const ResumeSchema = z.object({
  design: DesignSchema.default(DefaultDesign),
  basics: BasicsSchema,
  summary: ResumeTextSchema,
  experience: z.array(ExperienceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  languages: z.array(LanguageSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  awards: z.array(AwardSchema).default([]),
  publications: z.array(PublicationSchema).default([]),
  references: z.array(ReferenceSchema).default([]),
  core_competencies: z.array(ResumeTextSchema).default([]),
  memberships: z.array(MembershipSchema).default([]),
});

export type Resume = z.infer<typeof ResumeSchema>;
