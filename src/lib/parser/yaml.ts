import YAML from "yaml";
import { ResumeSchema } from "@/lib/schema/resume";
import type { Resume } from "@/lib/schema/resume";

type ParseResumeResult =
  | {
      success: true;
      data: Resume;
    }
  | {
      success: false;
      errors: string[];
    };

export function parseResume(text: string): ParseResumeResult {
  try {
    const parsed = YAML.parse(text);

    const validated = ResumeSchema.safeParse(parsed);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.issues.map(
          (i) => `${i.path.join(".")}: ${i.message}`
        ),
      };
    }

    return {
      success: true,
      data: validated.data,
    };
  } catch (e) {
    return {
      success: false,
      errors: [(e as Error).message],
    };
  }
}
