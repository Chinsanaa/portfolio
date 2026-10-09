interface SectionHeaderProps {
  title: string;
  id?: string;
}

/** Plain section title. The heading carries the section; no numbers or eyebrows. */
export function SectionHeader({ title, id }: SectionHeaderProps) {
  return (
    <h2 className="section-title" id={id}>
      {title}
    </h2>
  );
}
