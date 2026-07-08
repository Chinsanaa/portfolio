import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  /** "solid" paints the strip on --bg-2; "glass" is a translucent hairline strip. */
  tone?: "glass" | "solid";
  reverse?: boolean;
}

/**
 * Infinite horizontal ticker. Pure CSS animation (GPU-cheap) with a
 * duplicated aria-hidden track; pauses under prefers-reduced-motion
 * via the global kill-switch.
 */
export function Marquee({ children, duration = 24, tone = "glass", reverse = false }: MarqueeProps) {
  const style = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? ("reverse" as const) : ("normal" as const),
  };
  return (
    <div className={`marquee marquee-${tone}`}>
      <div className="marquee-track" style={style}>
        {children}
      </div>
      <div className="marquee-track" style={style} aria-hidden>
        {children}
      </div>
    </div>
  );
}
