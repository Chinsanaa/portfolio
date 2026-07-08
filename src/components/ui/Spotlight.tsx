"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface SpotlightProps {
  children?: ReactNode;
  className?: string;
}

/**
 * A blurred, flat-color radial glow that follows the cursor inside its
 * container. Pure motion-value transform (no re-render per frame), off
 * entirely under prefers-reduced-motion. The glow color is a solid
 * radial-alpha shape rendered via filter: blur() — not a gradient fill.
 */
export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 25 });
  const sy = useSpring(y, { stiffness: 120, damping: 25 });

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-field${className ? ` ${className}` : ""}`}
      onMouseMove={reduced ? undefined : onMove}
    >
      {/* always rendered (reduced-motion never toggles DOM presence, only whether
          it tracks the pointer) so hydration never mismatches the SSR markup;
          the global reduced-motion kill-switch keeps it static in place */}
      <motion.div className="spotlight-glow" style={{ left: sx, top: sy }} aria-hidden />
      {children}
    </div>
  );
}
