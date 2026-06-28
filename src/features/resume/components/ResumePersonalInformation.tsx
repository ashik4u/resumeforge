import { SectionHeading } from "@/features/resume/components/SectionHeading";
import type { Resume } from "@/lib/schema/resume";

interface ResumePersonalInformationProps {
  personalInformation?: Resume["personal_information"];
}

export function ResumePersonalInformation({
  personalInformation,
}: ResumePersonalInformationProps) {
  if (!personalInformation) {
    return null;
  }

  const fields = [
    { label: "Legal Name", value: personalInformation.legal_name },
    { label: "Father's Name", value: personalInformation.fathers_name },
    { label: "Mother's Name", value: personalInformation.mothers_name },
    { label: "Date of Birth", value: personalInformation.date_of_birth },
    { label: "Gender", value: personalInformation.gender },
    { label: "Marital Status", value: personalInformation.marital_status },
    { label: "Nationality", value: personalInformation.nationality },
    { label: "Religion", value: personalInformation.religion },
    { label: "Blood Group", value: personalInformation.blood_group },
  ].filter((field) => field.value);

  if (fields.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">
      <SectionHeading>Personal Information</SectionHeading>
      <div className="mt-3 space-y-1 text-sm">
        {fields.map((field) => (
          <div key={field.label} className="flex gap-4">
            <span className="font-semibold text-slate-800">{field.label}:</span>
            <span className="text-slate-700">{field.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
