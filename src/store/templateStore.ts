import { create } from "zustand";

import type { TemplateId } from "@/templates/types";

interface TemplateStore {
  templateId: TemplateId;
  setTemplateId: (templateId: TemplateId) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templateId: "modern",
  setTemplateId: (templateId) => set({ templateId }),
}));
