import { create } from "zustand";

import { defaultResume } from "@/data/defaultResume";
import { parseResume } from "@/lib/parser/yaml";
import { serializeResume } from "@/lib/resume/serialize";
import type { Resume } from "@/lib/schema/resume";

interface ResumeStore {
  yaml: string;
  resume: Resume | null;
  errors: string[];
  lastSavedAt: Date | null;
  updateResume: (resume: Resume) => void;
  updateYaml: (yaml: string) => void;
}

function createInitialState() {
  const result = parseResume(defaultResume);

  return {
    yaml: defaultResume,
    resume: result.success ? result.data : null,
    errors: result.success ? [] : result.errors,
    lastSavedAt: new Date(),
  };
}

export const useResumeStore = create<ResumeStore>((set) => ({
  ...createInitialState(),

  updateResume: (resume) => {
    set({
      yaml: serializeResume(resume),
      resume,
      errors: [],
      lastSavedAt: new Date(),
    });
  },

  updateYaml: (yaml) => {
    const result = parseResume(yaml);

    set({
      yaml,
      resume: result.success ? result.data : null,
      errors: result.success ? [] : result.errors,
      lastSavedAt: new Date(),
    });
  },
}));
