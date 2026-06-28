import { create } from "zustand";

export type EditingMode = "yaml" | "visual" | "design" | "ai";

interface WorkspaceStore {
  editingMode: EditingMode;
  setEditingMode: (editingMode: EditingMode) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  editingMode: "visual",
  setEditingMode: (editingMode) => set({ editingMode }),
}));
