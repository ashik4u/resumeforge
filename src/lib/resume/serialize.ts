import YAML from "yaml";

import type { Resume } from "@/lib/schema/resume";

export function serializeResume(resume: Resume) {
  return YAML.stringify(resume, {
    lineWidth: 88,
    minContentWidth: 20,
  });
}
