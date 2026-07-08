"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Decorative editorial glyphs behind the hero. Strokes draw in on load;
 * each glyph counter-moves at its own rate as the page scrolls.
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
            stroke="var(--color-ink)"
            strokeWidth="7"
            strokeLinecap="round"
            transform={`rotate(${deg} 60 60)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 + deg / 600, ease: EASE }}
          />
        ))}
      </motion.svg>

      {/* accent plus cluster, draws then drifts */}
      <motion.svg viewBox="0 0 120 90" className="hero-shape hero-shape-plus" style={{ y: yFast }}>
        {[
          { d: "M30 10v50M5 35h50", delay: 0.7 },
          { d: "M95 40v40M75 60h40", delay: 0.85 },
        ].map(({ d, delay }) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay, ease: EASE }}
          />
        ))}
      </motion.svg>

      {/* small solid dot */}
      <motion.div className="hero-shape hero-shape-dot" style={{ y: ySlow }} />
    </div>
  );
}
