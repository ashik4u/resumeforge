"use client";

import type { ReactNode } from "react";
import { AlertCircle, ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Resume } from "@/lib/schema/resume";
import { useResumeStore } from "@/store/resumeStore";

type BasicsField = keyof Resume["basics"];
type LocationField = keyof Resume["basics"]["location"];
type Experience = Resume["experience"][number];
type Project = Resume["projects"][number];
type Education = Resume["education"][number];
type Skill = Resume["skills"][number];
type Language = Resume["languages"][number];
type Certification = Resume["certifications"][number];
type Award = Resume["awards"][number];
type Publication = Resume["publications"][number];
type Reference = Resume["references"][number];
type Membership = Resume["memberships"][number];

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(values: string[]) {
  return values.join("\n");
}

function replaceAt<T>(items: T[], index: number, nextItem: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function moveAt<T>(items: T[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction;

  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const current = nextItems[index];
  const target = nextItems[nextIndex];

  nextItems[index] = target;
  nextItems[nextIndex] = current;

  return nextItems;
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
      {children}
    </label>
  );
}

function FieldText({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <FieldLabel>
      <span>{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </FieldLabel>
  );
}

function FieldTextarea({
  className,
  label,
  onChange,
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <FieldLabel>
      <span>{label}</span>
      <Textarea
        className={className}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldLabel>
  );
}

function Section({
  children,
  onAdd,
  title,
}: {
  children: ReactNode;
  onAdd?: () => void;
  title: string;
}) {
  return (
    <section className="space-y-3 border-b px-4 py-4 last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {onAdd ? (
          <Button size="xs" variant="outline" onClick={onAdd}>
            <Plus className="size-3" aria-hidden="true" />
            Add
          </Button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function EntryCard({
  children,
  index,
  onMoveDown,
  onMoveUp,
  onRemove,
  title,
}: {
  children: ReactNode;
  index: number;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onRemove: () => void;
  title: string;
}) {
  return (
    <article className="space-y-3 rounded-md border bg-background p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-muted-foreground">
          {title} {index + 1}
        </h3>
        <div className="flex items-center gap-1">
          <Button size="icon-xs" variant="ghost" onClick={onMoveUp}>
            <ArrowUp className="size-3" aria-hidden="true" />
          </Button>
          <Button size="icon-xs" variant="ghost" onClick={onMoveDown}>
            <ArrowDown className="size-3" aria-hidden="true" />
          </Button>
          <Button size="icon-xs" variant="destructive" onClick={onRemove}>
            <Trash2 className="size-3" aria-hidden="true" />
          </Button>
        </div>
      </div>
      {children}
    </article>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
      No {label} yet.
    </p>
  );
}

const emptyExperience: Experience = {
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  highlights: [],
};

const emptyProject: Project = {
  title: "",
  role: "",
  client: "",
  project_size: "",
  location: "",
  highlights: [],
};

const emptyEducation: Education = {
  institution: "",
  degree: "",
  area: "",
  startDate: "",
  endDate: "",
};

const emptySkill: Skill = {
  category: "",
  items: [],
};

const emptyLanguage: Language = {
  name: "",
  proficiency: "",
};

const emptyCertification: Certification = {
  name: "",
  issuer: "",
  date: "",
};

const emptyAward: Award = {
  title: "",
  issuer: "",
  date: "",
  summary: "",
};

const emptyPublication: Publication = {
  title: "",
  publisher: "",
  date: "",
  url: "",
  summary: "",
};

const emptyReference: Reference = {
  name: "",
  relationship: "",
  contact: "",
};

const emptyMembership: Membership = {
  organization: "",
  role: "",
  startDate: "",
  endDate: "",
};

export default function VisualResumeEditor() {
  const { errors, resume, updateResume } = useResumeStore();

  if (!resume) {
    return (
      <div className="flex h-full items-start gap-3 p-4 text-sm text-destructive">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-medium">Fix YAML validation before using the form.</p>
          <ul className="mt-2 space-y-1">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function updateBasics(field: BasicsField, value: string) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      basics: {
        ...resume.basics,
        [field]: value,
      },
    });
  }

  function updateLocation(field: LocationField, value: string) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      basics: {
        ...resume.basics,
        location: {
          ...resume.basics.location,
          [field]: value,
        },
      },
    });
  }

  function updateExperience(index: number, patch: Partial<Experience>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      experience: replaceAt(resume.experience, index, {
        ...resume.experience[index],
        ...patch,
      }),
    });
  }

  function updateProject(index: number, patch: Partial<Project>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      projects: replaceAt(resume.projects, index, {
        ...resume.projects[index],
        ...patch,
      }),
    });
  }

  function updateEducation(index: number, patch: Partial<Education>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      education: replaceAt(resume.education, index, {
        ...resume.education[index],
        ...patch,
      }),
    });
  }

  function updateSkill(index: number, patch: Partial<Skill>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      skills: replaceAt(resume.skills, index, {
        ...resume.skills[index],
        ...patch,
      }),
    });
  }

  function updateLanguage(index: number, patch: Partial<Language>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      languages: replaceAt(resume.languages, index, {
        ...resume.languages[index],
        ...patch,
      }),
    });
  }

  function updateCertification(index: number, patch: Partial<Certification>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      certifications: replaceAt(resume.certifications, index, {
        ...resume.certifications[index],
        ...patch,
      }),
    });
  }

  function updateAward(index: number, patch: Partial<Award>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      awards: replaceAt(resume.awards, index, {
        ...resume.awards[index],
        ...patch,
      }),
    });
  }

  function updatePublication(index: number, patch: Partial<Publication>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      publications: replaceAt(resume.publications, index, {
        ...resume.publications[index],
        ...patch,
      }),
    });
  }

  function updateReference(index: number, patch: Partial<Reference>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      references: replaceAt(resume.references, index, {
        ...resume.references[index],
        ...patch,
      }),
    });
  }

  function updateMembership(index: number, patch: Partial<Membership>) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      memberships: replaceAt(resume.memberships, index, {
        ...resume.memberships[index],
        ...patch,
      }),
    });
  }

  return (
    <div className="h-full overflow-auto bg-background">
      <Section title="Basics">
        <div className="grid gap-3 md:grid-cols-2">
          <FieldText
            label="Name"
            value={resume.basics.name}
            onChange={(value) => updateBasics("name", value)}
          />
          <FieldText
            label="Headline"
            value={resume.basics.headline}
            onChange={(value) => updateBasics("headline", value)}
          />
          <FieldText
            label="Email"
            value={resume.basics.email}
            onChange={(value) => updateBasics("email", value)}
          />
          <FieldText
            label="Phone"
            value={resume.basics.phone}
            onChange={(value) => updateBasics("phone", value)}
          />
          <FieldText
            label="Website"
            value={resume.basics.website}
            onChange={(value) => updateBasics("website", value)}
          />
          <FieldText
            label="City"
            value={resume.basics.location.city}
            onChange={(value) => updateLocation("city", value)}
          />
          <FieldText
            label="Country"
            value={resume.basics.location.country}
            onChange={(value) => updateLocation("country", value)}
          />
        </div>
      </Section>

      <Section title="Summary">
        <FieldTextarea
          className="min-h-28"
          label="Professional summary"
          value={resume.summary}
          onChange={(value) => updateResume({ ...resume, summary: value })}
        />
      </Section>

      <Section
        title="Experience"
        onAdd={() =>
          updateResume({
            ...resume,
            experience: [...resume.experience, emptyExperience],
          })
        }
      >
        {resume.experience.length === 0 ? <EmptyState label="experience" /> : null}
        <div className="space-y-3">
          {resume.experience.map((item, index) => (
            <EntryCard
              key={`${item.company}-${item.position}-${index}`}
              index={index}
              title="Experience"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  experience: moveAt(resume.experience, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  experience: moveAt(resume.experience, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  experience: removeAt(resume.experience, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Position"
                  value={item.position}
                  onChange={(value) => updateExperience(index, { position: value })}
                />
                <FieldText
                  label="Company"
                  value={item.company}
                  onChange={(value) => updateExperience(index, { company: value })}
                />
                <FieldText
                  label="Location"
                  value={item.location ?? ""}
                  onChange={(value) => updateExperience(index, { location: value })}
                />
                <FieldText
                  label="Start"
                  value={item.startDate}
                  onChange={(value) => updateExperience(index, { startDate: value })}
                />
                <FieldText
                  label="End"
                  value={item.endDate}
                  onChange={(value) => updateExperience(index, { endDate: value })}
                />
              </div>
              <FieldTextarea
                label="Highlights"
                value={arrayToLines(item.highlights)}
                onChange={(value) =>
                  updateExperience(index, { highlights: linesToArray(value) })
                }
              />
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Projects"
        onAdd={() =>
          updateResume({ ...resume, projects: [...resume.projects, emptyProject] })
        }
      >
        {resume.projects.length === 0 ? <EmptyState label="projects" /> : null}
        <div className="space-y-3">
          {resume.projects.map((item, index) => (
            <EntryCard
              key={`${item.title}-${index}`}
              index={index}
              title="Project"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  projects: moveAt(resume.projects, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  projects: moveAt(resume.projects, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  projects: removeAt(resume.projects, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Title"
                  value={item.title}
                  onChange={(value) => updateProject(index, { title: value })}
                />
                <FieldText
                  label="Role"
                  value={item.role}
                  onChange={(value) => updateProject(index, { role: value })}
                />
                <FieldText
                  label="Client"
                  value={item.client ?? ""}
                  onChange={(value) => updateProject(index, { client: value })}
                />
                <FieldText
                  label="Size"
                  value={item.project_size ?? ""}
                  onChange={(value) => updateProject(index, { project_size: value })}
                />
              </div>
              <FieldTextarea
                label="Highlights"
                value={arrayToLines(item.highlights)}
                onChange={(value) =>
                  updateProject(index, { highlights: linesToArray(value) })
                }
              />
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Education"
        onAdd={() =>
          updateResume({
            ...resume,
            education: [...resume.education, emptyEducation],
          })
        }
      >
        {resume.education.length === 0 ? <EmptyState label="education" /> : null}
        <div className="space-y-3">
          {resume.education.map((item, index) => (
            <EntryCard
              key={`${item.institution}-${index}`}
              index={index}
              title="Education"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  education: moveAt(resume.education, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  education: moveAt(resume.education, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  education: removeAt(resume.education, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Institution"
                  value={item.institution}
                  onChange={(value) =>
                    updateEducation(index, { institution: value })
                  }
                />
                <FieldText
                  label="Degree"
                  value={item.degree}
                  onChange={(value) => updateEducation(index, { degree: value })}
                />
                <FieldText
                  label="Area"
                  value={item.area}
                  onChange={(value) => updateEducation(index, { area: value })}
                />
                <FieldText
                  label="Start"
                  value={item.startDate}
                  onChange={(value) => updateEducation(index, { startDate: value })}
                />
                <FieldText
                  label="End"
                  value={item.endDate}
                  onChange={(value) => updateEducation(index, { endDate: value })}
                />
              </div>
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Skills"
        onAdd={() =>
          updateResume({ ...resume, skills: [...resume.skills, emptySkill] })
        }
      >
        {resume.skills.length === 0 ? <EmptyState label="skills" /> : null}
        <div className="space-y-3">
          {resume.skills.map((item, index) => (
            <EntryCard
              key={`${item.category}-${index}`}
              index={index}
              title="Skill Group"
              onMoveUp={() =>
                updateResume({ ...resume, skills: moveAt(resume.skills, index, -1) })
              }
              onMoveDown={() =>
                updateResume({ ...resume, skills: moveAt(resume.skills, index, 1) })
              }
              onRemove={() =>
                updateResume({ ...resume, skills: removeAt(resume.skills, index) })
              }
            >
              <FieldText
                label="Category"
                value={item.category}
                onChange={(value) => updateSkill(index, { category: value })}
              />
              <FieldTextarea
                label="Items"
                value={arrayToLines(item.items)}
                onChange={(value) => updateSkill(index, { items: linesToArray(value) })}
              />
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Languages"
        onAdd={() =>
          updateResume({
            ...resume,
            languages: [...resume.languages, emptyLanguage],
          })
        }
      >
        {resume.languages.length === 0 ? <EmptyState label="languages" /> : null}
        <div className="space-y-3">
          {resume.languages.map((item, index) => (
            <EntryCard
              key={`${item.name}-${index}`}
              index={index}
              title="Language"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  languages: moveAt(resume.languages, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  languages: moveAt(resume.languages, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  languages: removeAt(resume.languages, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Name"
                  value={item.name}
                  onChange={(value) => updateLanguage(index, { name: value })}
                />
                <FieldText
                  label="Proficiency"
                  value={item.proficiency ?? ""}
                  onChange={(value) =>
                    updateLanguage(index, { proficiency: value })
                  }
                />
              </div>
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Certifications"
        onAdd={() =>
          updateResume({
            ...resume,
            certifications: [...resume.certifications, emptyCertification],
          })
        }
      >
        {resume.certifications.length === 0 ? (
          <EmptyState label="certifications" />
        ) : null}
        <div className="space-y-3">
          {resume.certifications.map((item, index) => (
            <EntryCard
              key={`${item.name}-${index}`}
              index={index}
              title="Certification"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  certifications: moveAt(resume.certifications, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  certifications: moveAt(resume.certifications, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  certifications: removeAt(resume.certifications, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Name"
                  value={item.name}
                  onChange={(value) => updateCertification(index, { name: value })}
                />
                <FieldText
                  label="Issuer"
                  value={item.issuer ?? ""}
                  onChange={(value) =>
                    updateCertification(index, { issuer: value })
                  }
                />
                <FieldText
                  label="Date"
                  value={item.date ?? ""}
                  onChange={(value) => updateCertification(index, { date: value })}
                />
              </div>
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Awards"
        onAdd={() =>
          updateResume({ ...resume, awards: [...resume.awards, emptyAward] })
        }
      >
        {resume.awards.length === 0 ? <EmptyState label="awards" /> : null}
        <div className="space-y-3">
          {resume.awards.map((item, index) => (
            <EntryCard
              key={`${item.title}-${index}`}
              index={index}
              title="Award"
              onMoveUp={() =>
                updateResume({ ...resume, awards: moveAt(resume.awards, index, -1) })
              }
              onMoveDown={() =>
                updateResume({ ...resume, awards: moveAt(resume.awards, index, 1) })
              }
              onRemove={() =>
                updateResume({ ...resume, awards: removeAt(resume.awards, index) })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Title"
                  value={item.title}
                  onChange={(value) => updateAward(index, { title: value })}
                />
                <FieldText
                  label="Issuer"
                  value={item.issuer ?? ""}
                  onChange={(value) => updateAward(index, { issuer: value })}
                />
                <FieldText
                  label="Date"
                  value={item.date ?? ""}
                  onChange={(value) => updateAward(index, { date: value })}
                />
              </div>
              <FieldTextarea
                label="Summary"
                value={item.summary ?? ""}
                onChange={(value) => updateAward(index, { summary: value })}
              />
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Publications"
        onAdd={() =>
          updateResume({
            ...resume,
            publications: [...resume.publications, emptyPublication],
          })
        }
      >
        {resume.publications.length === 0 ? (
          <EmptyState label="publications" />
        ) : null}
        <div className="space-y-3">
          {resume.publications.map((item, index) => (
            <EntryCard
              key={`${item.title}-${index}`}
              index={index}
              title="Publication"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  publications: moveAt(resume.publications, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  publications: moveAt(resume.publications, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  publications: removeAt(resume.publications, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Title"
                  value={item.title}
                  onChange={(value) => updatePublication(index, { title: value })}
                />
                <FieldText
                  label="Publisher"
                  value={item.publisher ?? ""}
                  onChange={(value) =>
                    updatePublication(index, { publisher: value })
                  }
                />
                <FieldText
                  label="Date"
                  value={item.date ?? ""}
                  onChange={(value) => updatePublication(index, { date: value })}
                />
                <FieldText
                  label="URL"
                  value={item.url ?? ""}
                  onChange={(value) => updatePublication(index, { url: value })}
                />
              </div>
              <FieldTextarea
                label="Summary"
                value={item.summary ?? ""}
                onChange={(value) => updatePublication(index, { summary: value })}
              />
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="References"
        onAdd={() =>
          updateResume({
            ...resume,
            references: [...resume.references, emptyReference],
          })
        }
      >
        {resume.references.length === 0 ? <EmptyState label="references" /> : null}
        <div className="space-y-3">
          {resume.references.map((item, index) => (
            <EntryCard
              key={`${item.name}-${index}`}
              index={index}
              title="Reference"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  references: moveAt(resume.references, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  references: moveAt(resume.references, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  references: removeAt(resume.references, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Name"
                  value={item.name}
                  onChange={(value) => updateReference(index, { name: value })}
                />
                <FieldText
                  label="Relationship"
                  value={item.relationship ?? ""}
                  onChange={(value) =>
                    updateReference(index, { relationship: value })
                  }
                />
                <FieldText
                  label="Contact"
                  value={item.contact ?? ""}
                  onChange={(value) => updateReference(index, { contact: value })}
                />
              </div>
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Core Competencies"
        onAdd={() =>
          updateResume({
            ...resume,
            core_competencies: [...resume.core_competencies, ""],
          })
        }
      >
        {resume.core_competencies.length === 0 ? (
          <EmptyState label="core competencies" />
        ) : null}
        <div className="space-y-3">
          {resume.core_competencies.map((item, index) => (
            <EntryCard
              key={`${item}-${index}`}
              index={index}
              title="Competency"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  core_competencies: moveAt(resume.core_competencies, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  core_competencies: moveAt(resume.core_competencies, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  core_competencies: removeAt(resume.core_competencies, index),
                })
              }
            >
              <FieldText
                label="Name"
                value={item}
                onChange={(value) =>
                  updateResume({
                    ...resume,
                    core_competencies: replaceAt(
                      resume.core_competencies,
                      index,
                      value,
                    ),
                  })
                }
              />
            </EntryCard>
          ))}
        </div>
      </Section>

      <Section
        title="Memberships"
        onAdd={() =>
          updateResume({
            ...resume,
            memberships: [...resume.memberships, emptyMembership],
          })
        }
      >
        {resume.memberships.length === 0 ? <EmptyState label="memberships" /> : null}
        <div className="space-y-3">
          {resume.memberships.map((item, index) => (
            <EntryCard
              key={`${item.organization}-${index}`}
              index={index}
              title="Membership"
              onMoveUp={() =>
                updateResume({
                  ...resume,
                  memberships: moveAt(resume.memberships, index, -1),
                })
              }
              onMoveDown={() =>
                updateResume({
                  ...resume,
                  memberships: moveAt(resume.memberships, index, 1),
                })
              }
              onRemove={() =>
                updateResume({
                  ...resume,
                  memberships: removeAt(resume.memberships, index),
                })
              }
            >
              <div className="grid gap-3 md:grid-cols-2">
                <FieldText
                  label="Organization"
                  value={item.organization}
                  onChange={(value) =>
                    updateMembership(index, { organization: value })
                  }
                />
                <FieldText
                  label="Role"
                  value={item.role ?? ""}
                  onChange={(value) => updateMembership(index, { role: value })}
                />
                <FieldText
                  label="Start"
                  value={item.startDate ?? ""}
                  onChange={(value) =>
                    updateMembership(index, { startDate: value })
                  }
                />
                <FieldText
                  label="End"
                  value={item.endDate ?? ""}
                  onChange={(value) => updateMembership(index, { endDate: value })}
                />
              </div>
            </EntryCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
