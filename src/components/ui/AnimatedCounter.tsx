"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  /** Decimal places to render (e.g. 2 for a GPA of 3.58). */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/** Number that counts up (expo-out) the first time it scrolls into view. */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1200,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
