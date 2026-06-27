interface SectionHeadingProps {
  children: string;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-normal text-slate-500">
      {children}
    </h2>
  );
}
