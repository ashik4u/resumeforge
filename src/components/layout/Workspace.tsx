"use client";

import {
  Group,
  Panel,
  Separator,
} from "react-resizable-panels";

import MonacoEditor from "@/features/editor/MonacoEditor";
import VisualResumeEditor from "@/features/editor/visual/VisualResumeEditor";
import ResumePreview from "@/features/preview/ResumePreview";
import DesignOptionsPanel from "@/features/settings/DesignOptionsPanel";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function Workspace() {
  const { editingMode } = useWorkspaceStore();
  const editorTitle =
    editingMode === "visual"
      ? "Visual editor"
      : editingMode === "design"
        ? "Design options"
        : "resume.yaml";

  return (
    <Group className="h-full" orientation="horizontal">
      <Panel defaultSize={45} minSize={30}>
        <section className="flex h-full flex-col border-r bg-card">
          <div className="flex h-9 items-center border-b px-3 text-xs font-medium text-muted-foreground">
            {editorTitle}
          </div>
          <div className="min-h-0 flex-1">
            {editingMode === "visual" ? (
              <VisualResumeEditor />
            ) : editingMode === "design" ? (
              <DesignOptionsPanel />
            ) : (
              <MonacoEditor />
            )}
          </div>
        </section>
      </Panel>

      <Separator className="w-1 bg-border transition-colors hover:bg-ring" />

      <Panel defaultSize={55} minSize={35}>
        <section className="flex h-full flex-col bg-muted/40">
          <div className="flex h-9 items-center justify-between border-b bg-background px-3 text-xs font-medium text-muted-foreground">
            <span>Live preview</span>
            <span>100%</span>
          </div>
          <div className="min-h-0 flex-1">
            <ResumePreview />
          </div>
        </section>
      </Panel>
    </Group>
  );
}
