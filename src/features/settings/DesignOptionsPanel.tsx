"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Resume } from "@/lib/schema/resume";
import { useResumeStore } from "@/store/resumeStore";

type Design = Resume["design"];
type PageField = keyof Design["page"];
type ColorField = keyof Design["colors"];
type TypographyField = keyof Design["typography"];

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ColorFieldControl({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <Field label={label}>
      <div className="flex gap-2">
        <Input
          className="w-12 p-1"
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </Field>
  );
}

export default function DesignOptionsPanel() {
  const { resume, updateResume } = useResumeStore();

  if (!resume) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Fix YAML validation before editing design options.
      </div>
    );
  }

  function updateDesign(nextDesign: Design) {
    if (!resume) {
      return;
    }

    updateResume({
      ...resume,
      design: nextDesign,
    });
  }

  function updatePage(field: PageField, value: Design["page"][PageField]) {
    if (!resume) {
      return;
    }

    updateDesign({
      ...resume.design,
      page: {
        ...resume.design.page,
        [field]: value,
      },
    });
  }

  function updateColor(field: ColorField, value: string) {
    if (!resume) {
      return;
    }

    updateDesign({
      ...resume.design,
      colors: {
        ...resume.design.colors,
        [field]: value,
      },
    });
  }

  function updateTypography(
    field: TypographyField,
    value: Design["typography"][TypographyField],
  ) {
    if (!resume) {
      return;
    }

    updateDesign({
      ...resume.design,
      typography: {
        ...resume.design.typography,
        [field]: value,
      },
    });
  }

  return (
    <div className="h-full overflow-auto bg-background">
      <section className="space-y-3 border-b px-4 py-4">
        <h2 className="text-sm font-semibold">Page</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Size">
            <Select
              value={resume.design.page.size}
              onValueChange={(value) =>
                updatePage("size", value as Design["page"]["size"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a4">A4</SelectItem>
                <SelectItem value="us-letter">US Letter</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Top margin">
            <Input
              value={resume.design.page.top_margin}
              onChange={(event) => updatePage("top_margin", event.target.value)}
            />
          </Field>
          <Field label="Bottom margin">
            <Input
              value={resume.design.page.bottom_margin}
              onChange={(event) => updatePage("bottom_margin", event.target.value)}
            />
          </Field>
          <Field label="Left margin">
            <Input
              value={resume.design.page.left_margin}
              onChange={(event) => updatePage("left_margin", event.target.value)}
            />
          </Field>
          <Field label="Right margin">
            <Input
              value={resume.design.page.right_margin}
              onChange={(event) => updatePage("right_margin", event.target.value)}
            />
          </Field>
        </div>
        <div className="flex flex-wrap gap-4 pt-1">
          <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Switch
              checked={resume.design.page.show_footer}
              onCheckedChange={(value) => updatePage("show_footer", value)}
            />
            Footer
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Switch
              checked={resume.design.page.show_top_note}
              onCheckedChange={(value) => updatePage("show_top_note", value)}
            />
            Top note
          </label>
        </div>
      </section>

      <section className="space-y-3 border-b px-4 py-4">
        <h2 className="text-sm font-semibold">Colors</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <ColorFieldControl
            label="Body"
            value={resume.design.colors.body}
            onChange={(value) => updateColor("body", value)}
          />
          <ColorFieldControl
            label="Name"
            value={resume.design.colors.name}
            onChange={(value) => updateColor("name", value)}
          />
          <ColorFieldControl
            label="Headline"
            value={resume.design.colors.headline}
            onChange={(value) => updateColor("headline", value)}
          />
          <ColorFieldControl
            label="Connections"
            value={resume.design.colors.connections}
            onChange={(value) => updateColor("connections", value)}
          />
          <ColorFieldControl
            label="Section titles"
            value={resume.design.colors.section_titles}
            onChange={(value) => updateColor("section_titles", value)}
          />
          <ColorFieldControl
            label="Links"
            value={resume.design.colors.links}
            onChange={(value) => updateColor("links", value)}
          />
        </div>
      </section>

      <section className="space-y-3 px-4 py-4">
        <h2 className="text-sm font-semibold">Typography</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Font family">
            <Input
              value={resume.design.typography.font_family}
              onChange={(event) =>
                updateTypography("font_family", event.target.value)
              }
            />
          </Field>
          <Field label="Line spacing">
            <Input
              value={resume.design.typography.line_spacing}
              onChange={(event) =>
                updateTypography("line_spacing", event.target.value)
              }
            />
          </Field>
          <Field label="Text alignment">
            <Select
              value={resume.design.typography.alignment}
              onValueChange={(value) =>
                updateTypography(
                  "alignment",
                  value as Design["typography"]["alignment"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="justified">Justified</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Date column">
            <Select
              value={resume.design.typography.date_and_location_column_alignment}
              onValueChange={(value) =>
                updateTypography(
                  "date_and_location_column_alignment",
                  value as Design["typography"]["date_and_location_column_alignment"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </section>
    </div>
  );
}
