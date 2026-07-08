"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/components/portfolio/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hand-rolled animated bar chart — one flat cyan series showing skill count
 * per category. Single series, so no legend (label + count is direct on
 * each bar). Bars draw in via scaleX on first view. Text stays in text
 * tokens; only the bar fill carries the accent color.
 */
export function SkillChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const max = Math.max(...skillCategories.map((c) => c.skills.length));

  return (
    <div className="skill-chart" ref={ref} role="img" aria-label="Skill categories by count">
      {skillCategories.map((category, i) => {
        const pct = (category.skills.length / max) * 100;
        return (
          <div className="skill-chart-row" key={category.title}>
            <div className="skill-chart-row-head">
              <span className="skill-chart-label">{category.title}</span>
              <span className="skill-chart-value mono-label">
                {String(category.skills.length).padStart(2, "0")}
              </span>
            </div>
            <div className="skill-chart-track">
              <motion.div
                className="skill-chart-bar"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: pct / 100 } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.08 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
