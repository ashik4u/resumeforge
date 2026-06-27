import { SectionHeading } from "@/features/resume/components/SectionHeading";

interface ResumeSummaryProps {
  summary: string;
}

export function ResumeSummary({ summary }: ResumeSummaryProps) {
  if (!summary.trim()) {
    return null;
  }

  return (
    <section className="mt-8">
      <SectionHeading>Summary</SectionHeading>
      <p className="mt-3 leading-7">{summary}</p>
    </section>
  );
}
