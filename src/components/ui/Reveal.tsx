"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

interface RevealProps {
  children: ReactNode;
  /** Extra delay in seconds before the reveal starts. */
  delay?: number;
  /** Stagger direct children instead of revealing as one block. */
  stagger?: boolean;
  className?: string;
}

/** Scroll-triggered reveal. Fires once, when ~10% before entering view. */
export function Reveal({ children, delay = 0, stagger = false, className }: RevealProps) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: 0.08, delayChildren: delay }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside <Reveal stagger>. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
