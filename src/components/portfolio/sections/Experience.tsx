"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "../content";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  // the rail line draws as the section scrolls through the viewport
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section className="section experience" id="experience">
      <SectionHeader number="03" title="Experience" kicker="2023 — Present" />

      <div className="experience-timeline" ref={ref}>
        <svg className="experience-rail" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden>
          <line x1="1" y1="0" x2="1" y2="100" stroke="var(--color-line)" strokeWidth="2" />
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="var(--color-ink)"
            strokeWidth="2"
            style={{ pathLength: drawn }}
          />
        </svg>

        <ol className="experience-list">
          {experience.map((item) => (
            <li key={`${item.role}-${item.date}`} className="experience-item">
              <motion.span
                className="experience-node"
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              />
              <Reveal>
                <p className="experience-date mono-label">{item.date}</p>
                <h3 className="experience-role">{item.role}</h3>
                <p className="experience-company mono-label">{item.company}</p>
                <p className="experience-description">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
