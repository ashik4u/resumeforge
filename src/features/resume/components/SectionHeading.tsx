interface SectionHeadingProps {
  children: string;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="border-b border-slate-300 pb-1 text-base font-bold tracking-normal text-slate-800">
      {children}
    </h2>
  );
}
