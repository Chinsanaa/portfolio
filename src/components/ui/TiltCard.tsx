"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from "framer-motion";

const TILT = 8; // max rotation in degrees

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}

/**
 * Glass card with a subtle pointer-driven 3D tilt and a flat-color
 * accent border that fades in on hover. No gradients — the border and
 * glow are solid `--violet` at partial opacity. Reduced-motion collapses
 * to a static card (tilt disabled, hover border still works via CSS).
 */
export function TiltCard({ children, className, as = "div" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * TILT);
    rx.set(py * -TILT);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  // Always pass the same style shape (values stay 0deg when reduced-motion
  // is on, since onMove/onLeave never set them) — never toggle the style
  // attribute's presence itself, or SSR and the client's first paint diverge.
  const style = { rotateX, rotateY, transformPerspective: 900 };
  const cls = `tilt-card${className ? ` ${className}` : ""}`;
  const handlers = reduced ? {} : { onMouseMove: onMove, onMouseLeave: onLeave };

  if (as === "article") {
    return (
      <motion.article ref={ref} className={cls} style={style} {...handlers}>
        {children}
      </motion.article>
    );
  }

  return (
    <motion.div ref={ref} className={cls} style={style} {...handlers}>
      {children}
    </motion.div>
  );
}
