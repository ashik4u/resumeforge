"use client";

import Editor from "@monaco-editor/react";

import { useResumeStore } from "@/store/resumeStore";

export default function MonacoEditor() {
  const { yaml, updateYaml } = useResumeStore();

  function onChange(value?: string) {
    updateYaml(value ?? "");
  }

  return (
    <Editor
      language="yaml"
      theme="vs-dark"
      value={yaml}
      onChange={onChange}
      options={{
        accessibilitySupport: "on",
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        fontFamily: "var(--font-geist-mono)",
        lineNumbers: "on",
        padding: {
          top: 16,
          bottom: 16,
        },
        renderLineHighlight: "line",
        tabSize: 2,
        wordWrap: "on",
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
