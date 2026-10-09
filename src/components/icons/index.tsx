/* Monograph icon set — hand-rolled inline SVGs.
   All icons inherit currentColor and use a 1.5px stroke to match
   the hairline aesthetic. See DESIGN_SYSTEM.md before adding more. */

interface IconProps {
  size?: number;
  className?: string;
}

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function ArrowUpRight({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 4v16" />
      <path d="M5 13l7 7 7-7" />
    </svg>
  );
}

export function Download({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3v12" />
      <path d="M6 10l6 6 6-6" />
      <path d="M4 20h16" />
    </svg>
  );
}

/* Editorial asterisk — the marquee separator and decorative mark. */

