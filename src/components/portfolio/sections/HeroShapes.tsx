"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Decorative flat shapes behind the hero. Outlines draw in on load;
 * each shape counter-moves at its own rate as the page scrolls.
 */
export function HeroShapes({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const ySlow = useTransform(scrollProgress, [0, 1], [0, -60]);
  const yFast = useTransform(scrollProgress, [0, 1], [0, -160]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, 90]);

  return (
    <div className="hero-shapes" aria-hidden>
      {/* rotating editorial asterisk */}
      <motion.svg
        viewBox="0 0 120 120"
        className="hero-shape hero-shape-asterisk"
        style={{ rotate, y: ySlow }}
      >
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <motion.line
            key={deg}
            x1="60"
            y1="8"
            x2="60"
            y2="112"
            stroke="var(--color-cobalt)"
            strokeWidth="7"
            strokeLinecap="round"
            transform={`rotate(${deg} 60 60)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 + deg / 600, ease: EASE }}
          />
        ))}
      </motion.svg>

      {/* half-circle arch, draws then drifts */}
      <motion.svg viewBox="0 0 160 90" className="hero-shape hero-shape-arch" style={{ y: yFast }}>
        <motion.path
          d="M10 85a70 70 0 0 1 140 0"
          fill="none"
          stroke="var(--color-persimmon)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
        />
      </motion.svg>

      {/* small solid dot */}
      <motion.div className="hero-shape hero-shape-dot" style={{ y: ySlow }} />
    </div>
  );
}
