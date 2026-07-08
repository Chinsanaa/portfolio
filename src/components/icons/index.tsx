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

export function Mail({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function GitHub({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 1.5A10.5 10.5 0 0 0 8.68 21.96c.53.1.72-.23.72-.5v-1.96c-2.92.63-3.54-1.24-3.54-1.24-.48-1.21-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.08 1.61 1.08 1.61 1.08.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.66-1.4-2.33-.27-4.79-1.17-4.79-5.2 0-1.14.41-2.08 1.08-2.81-.1-.27-.47-1.34.1-2.79 0 0 .89-.28 2.9 1.08a10.1 10.1 0 0 1 5.28 0c2-1.36 2.89-1.08 2.89-1.08.58 1.45.22 2.52.11 2.79.67.73 1.08 1.67 1.08 2.81 0 4.04-2.46 4.92-4.81 5.18.38.33.72.97.72 1.96v2.9c0 .28.19.6.73.5A10.5 10.5 0 0 0 12 1.5z" />
    </svg>
  );
}

export function LinkedIn({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M4.98 3.5A2.49 2.49 0 1 1 5 8.48a2.49 2.49 0 0 1-.02-4.98zM3 9.75h4v10.75H3zM9.5 9.75h3.83v1.47h.05c.53-1.01 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.13v5.22h-4v-4.63c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.77 1.2-1.77 2.44v4.71h-4z" />
    </svg>
  );
}

/* Editorial asterisk — the marquee separator and decorative mark. */
export function Asterisk({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3v18" />
      <path d="M4.2 7.5l15.6 9" />
      <path d="M19.8 7.5l-15.6 9" />
    </svg>
  );
}
