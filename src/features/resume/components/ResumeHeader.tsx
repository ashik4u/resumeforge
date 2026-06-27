import type { Resume } from "@/lib/schema/resume";

interface ResumeHeaderProps {
  basics: Resume["basics"];
}

export function ResumeHeader({ basics }: ResumeHeaderProps) {
  const contactItems = [
    basics.email,
    basics.phone,
    basics.website,
    [basics.location.city, basics.location.country].filter(Boolean).join(", "),
  ].filter(Boolean);

  return (
    <header className="border-b border-slate-200 pb-6">
      <h1 className="text-4xl font-bold tracking-normal">{basics.name}</h1>
      {basics.headline ? (
        <p className="mt-2 text-lg text-slate-600">{basics.headline}</p>
      ) : null}
      {contactItems.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          {contactItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
