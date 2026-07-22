"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Fixed decorative background: a faint dot-grid plus two or three blurred
 * solid-color orbs (terracotta/amber) that drift slowly on scroll via transform
 * only. No gradients — each orb is a flat-color circle rendered soft by
 * filter: blur(). Purely aria-hidden decoration; off under reduced motion.
 */
export function GlowField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orbAY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 160]);

  return (
    <div className="glow-field" ref={ref} aria-hidden>
      <div className="glow-field-grid" />
      <motion.div className="glow-orb glow-orb-terracotta" style={{ y: orbAY }} />
      <motion.div className="glow-orb glow-orb-amber" style={{ y: orbBY }} />
    </div>
  );
}
