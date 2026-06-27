"use client";

import { FileText } from "lucide-react";

import { ThemeSelector } from "@/components/layout/ThemeSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportPdfButton } from "@/features/export/ExportPdfButton";
import { useTemplateStore } from "@/store/templateStore";
import { useWorkspaceStore, type EditingMode } from "@/store/workspaceStore";
import { templateOptions } from "@/templates";
import type { TemplateId } from "@/templates/types";

export default function Navbar() {
  const { setTemplateId, templateId } = useTemplateStore();
  const { editingMode, setEditingMode } = useWorkspaceStore();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted">
            <FileText className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold">ResumeForge</h1>
            <p className="truncate text-xs text-muted-foreground">
              YAML resume workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={editingMode}
            onValueChange={(value) => setEditingMode(value as EditingMode)}
          >
            <SelectTrigger aria-label="Editing mode" className="w-28" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="yaml">YAML</SelectItem>
              <SelectItem value="visual">Visual</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="ai" disabled>
                AI Chat
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={templateId}
            onValueChange={(value) => setTemplateId(value as TemplateId)}
          >
            <SelectTrigger aria-label="Template" className="w-32" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {templateOptions.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ThemeSelector />

          <ExportPdfButton />
        </div>
      </div>
    </header>
  );
}
