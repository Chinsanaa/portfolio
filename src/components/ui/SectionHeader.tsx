"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SectionHeaderProps {
  /** Editorial index, e.g. "01". Counts up from 00 when scrolled into view. */
  number: string;
  title: string;
  /** Optional mono kicker shown right-aligned on the rule line. */
  kicker?: string;
}

/** Numbered editorial section header: mono index, display title, hairline rule. */
export function SectionHeader({ number, title, kicker }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const target = parseInt(number, 10) || 0;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 700;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // expo-out easing on the counter
      const eased = 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <div className="section-header" ref={ref}>
      <div className="section-header-rule">
        <span className="mono-label section-header-number">
          №{String(display).padStart(2, "0")}
        </span>
        {kicker && <span className="mono-label section-header-kicker">{kicker}</span>}
      </div>
      <h2 className="section-header-title">
        <motion.span
          style={{ display: "inline-block" }}
          initial={{ y: "110%" }}
          animate={inView ? { y: "0%" } : undefined}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {title}
        </motion.span>
      </h2>
    </div>
  );
}
