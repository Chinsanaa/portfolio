import { useId } from "react";

/**
 * Alkhan khee, the traditional Mongolian "hammer" border, as a thin band:
 * red rules above and below a blue hammer row, echoing the flag's
 * red | blue | red. Used in exactly two places (under the hero, above the
 * colophon). Static on purpose; it is a border, not an animation.
 */
export function KheeBand({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg className={`khee-band${className ? ` ${className}` : ""}`} height="24" width="100%" aria-hidden>
      <defs>
        <pattern id={id} width="16" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 19H5V11H2V5H14V11H11V19H16" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="1.5" fill="var(--red)" />
      <rect width="100%" height="24" fill={`url(#${id})`} />
      <rect y="22.5" width="100%" height="1.5" fill="var(--red)" />
    </svg>
  );
}
