/** Mono uppercase chip with a hairline border — the only pill shape in the system. */
export function TagChip({ label }: { label: string }) {
  return <span className="tag-chip mono-label">{label}</span>;
}
