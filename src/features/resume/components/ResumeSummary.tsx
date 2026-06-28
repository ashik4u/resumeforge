import { SectionHeading } from "@/features/resume/components/SectionHeading";

interface ResumeSummaryProps {
  summary: string;
}

export function ResumeSummary({ summary }: ResumeSummaryProps) {
  if (!summary.trim()) {
    return null;
  }

  return (
    <section className="mt-6">
      <SectionHeading>Career Summary</SectionHeading>
      <p className="mt-2 leading-6 text-justify">{summary}</p>
    </section>
  );
}
