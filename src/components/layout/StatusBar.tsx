"use client";

import { AlertCircle, CheckCircle2, FileText, Save } from "lucide-react";

import { useResumeStore } from "@/store/resumeStore";

export default function StatusBar() {
  const { errors, resume } = useResumeStore();
  const isValid = errors.length === 0 && resume !== null;
  const ValidationIcon = isValid ? CheckCircle2 : AlertCircle;

  return (
    <footer className="flex h-8 items-center justify-between border-t bg-background px-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="size-3.5 text-emerald-600" aria-hidden="true" />
        <span>Ready</span>
      </div>
      <div className="flex items-center gap-1.5">
        <ValidationIcon
          className={
            isValid ? "size-3.5 text-emerald-600" : "size-3.5 text-destructive"
          }
          aria-hidden="true"
        />
        <span>{isValid ? "YAML valid" : `${errors.length} YAML issue(s)`}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Save className="size-3.5" aria-hidden="true" />
        <span>Auto saved</span>
      </div>
      <div className="flex items-center gap-1.5">
        <FileText className="size-3.5" aria-hidden="true" />
        <span>Page 1</span>
      </div>
    </footer>
  );
}
