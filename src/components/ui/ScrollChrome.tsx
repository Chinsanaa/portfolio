"use client";

import { useState } from "react";
import { m, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowDown } from "@/components/icons";
import { scrollToSection } from "./SmoothScroll";

/** Top reading-progress bar + a back-to-top button after the first screen. */
export function ScrollChrome() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setShowTop(v > window.innerHeight * 1.2));

  return (
    <>
      <m.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden />
      <m.button
        type="button"
        className="back-to-top"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() => scrollToSection("top")}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 16 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showTop ? "auto" : "none" }}
      >
        <ArrowDown size={18} className="back-to-top-icon" />
      </m.button>
    </>
  );
}
