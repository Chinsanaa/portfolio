/* Icon set: hand-rolled inline SVGs that inherit currentColor.
   Line icons use a 1.5px stroke; the two Mongolian marks (Ulzii,
   Soyombo) at the bottom have their own rules in DESIGN_SYSTEM.md. */

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


const ULZII_PATH =
  "M-1 -3V3A1.58 1.58 0 1 1-3 1H3A1.58 1.58 0 1 1 1 3V-3A1.58 1.58 0 1 1 3-1H-3A1.58 1.58 0 1 1-1-3Z";

/**
 * Ölzii, the Mongolian endless knot (luck, long life). One closed strand:
 * two vertical and two horizontal runs joined by four corner loops,
 * turned 45°. At small sizes the over/under breaks are left out;
 * `interlaced` draws them with a page-colored gap behind each "over" run.
 */
export function Ulzii({ size = 20, className, interlaced = false }: IconProps & { interlaced?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="-5.6 -5.6 11.2 11.2" fill="none" aria-hidden className={className}>
      <g transform="rotate(45)" stroke="currentColor" strokeWidth={interlaced ? 0.7 : 0.9}>
        <path d={ULZII_PATH} strokeLinejoin="round" />
        {interlaced && (
          <>
            <path d="M-1-1.6V-.4M1.6-1H.4M1 .4V1.6M-.4 1H-1.6" stroke="var(--bg)" strokeWidth={1.5} />
            <path d="M-1-1.8V-.2M1.8-1H.2M1 .2V1.8M-.2 1H-1.8" />
          </>
        )}
      </g>
    </svg>
  );
}

/**
 * Soyombo, the national emblem as drawn on the flag. Paths are taken from
 * the public-domain "Flag of Mongolia.svg" on Wikimedia Commons (state
 * insignia, public domain under Article 7 of Mongolia's copyright law).
 * The emblem fills with currentColor; the flag's red cut-outs become the
 * page color. Keep it small and in gold; never use it as decoration.
 */
export function Soyombo({ size = 20, className }: IconProps) {
  return (
    <svg
      height={size}
      width={(size * 230) / 490}
      viewBox="85 55 230 490"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <circle cx="200" cy="205" r="55" />
      <circle cx="200" cy="180" r="60" fill="var(--bg)" />
      <circle cx="200" cy="190" r="40" />
      <path d="M204.2035 60c-4.97 2.255-6.827 6.321-7.227 10.371-.25 3.41 1.255 7.251 1.405 10.586 0 5.739-5.938 7.629-5.938 15.82 0 2.815 2.6 5.917 2.6 13.223-.45 3.835-2.59 4.7-5 5a5 5 0 0 1-5-5 5 5 0 0 1 1.385-3.44 5 5 0 0 1 .51-.5c1.14-1.15 2.705-1.595 2.695-4.63 0-1.56-1.01-2.98-1.975-5.742-.91-2.68-.25-7.16 1.915-9.805-3.5 1.35-5.657 4.705-6.757 7.715-1.16 3.7-.15 5.831-1.74 8.906-.97 1.99-2.125 2.815-3.22 4.475-1.295 1.81-2.815 6.043-2.815 8.008a25 25 0 0 0 50 0c0-1.965-1.5-6.198-2.795-8.008-1.095-1.66-2.27-2.485-3.24-4.475-1.57-3.075-.56-5.206-1.72-8.906-1.1-3.01-3.26-6.364-6.758-7.715 2.165 2.645 2.825 7.125 1.915 9.805-.97 2.76-1.99 4.18-1.99 5.742 0 3.035 1.555 3.48 2.695 4.63a5 5 0 0 1 .51.5 5 5 0 0 1 1.385 3.44 5 5 0 0 1-5 5c-2.765-.35-4.75-1.64-5-5 0-9.626 4.12-10.24 4.12-17.363 0-10.171-9.121-14.986-9.121-22.422 0-2.52.59-6.815 4.16-10.2275zM90 270h50v240H90zm170 0h50v240h-50zm-110 0h100l-50 30zm0 40h100v20H150zm0 140h100v20H150zm0 30h100l-50 30z" />
      <circle cx="200" cy="390" r="50" />
      <g fill="var(--bg)">
        <circle cx="200" cy="363.5" r="10" />
        <circle cx="200" cy="416.5" r="10" />
        <path d="M200 334a29.5 29.5 0 0 1 0 59 23.5 23.5 0 0 0 0 47v6a29.5 29.5 0 0 1 0-59 23.5 23.5 0 0 0 0-47z" />
      </g>
    </svg>
  );
}
