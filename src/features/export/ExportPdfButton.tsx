"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resumeStore";
import { useTemplateStore } from "@/store/templateStore";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function ExportPdfButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { errors, resume } = useResumeStore();
  const { templateId } = useTemplateStore();
  const canExport = resume !== null && errors.length === 0 && !isExporting;

  async function exportPdf() {
    if (!resume || isExporting) {
      return;
    }

    setIsExporting(true);

    try {
      const response = await fetch("/api/export/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume, templateId }),
      });

      if (!response.ok) {
        throw new Error("PDF export failed.");
      }

      downloadBlob(await response.blob(), "resume.pdf");
    } finally {
      setIsExporting(false);
    }
  }

  const Icon = isExporting ? Loader2 : Download;

  return (
    <Button size="sm" onClick={exportPdf} disabled={!canExport}>
      <Icon
        className={isExporting ? "size-4 animate-spin" : "size-4"}
        aria-hidden="true"
      />
      {isExporting ? "Exporting" : "Export"}
    </Button>
  );
}
