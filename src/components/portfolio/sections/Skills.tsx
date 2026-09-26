"use client";

import { m } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { skillCategories } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;
const LAYOUT = ["skills-card-a", "skills-card-b", "skills-card-c", "skills-card-d"];

const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 22, delay: 0.15 + i * 0.05 },
  }),
};

export function Skills() {
  return (
    <section className="section skills" id="skills">
      <SectionHeader number="02" title="Skills" kicker="Spec sheet" />

      <div className="skills-bento">
        {skillCategories.map((category, index) => (
          <m.div
            key={category.title}
            className={LAYOUT[index % LAYOUT.length]}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: index * 0.08 }}
          >
            <TiltCard className="skills-card">
              <span className="skills-card-count" aria-hidden>
                {String(category.skills.length).padStart(2, "0")}
              </span>
              <h3 className="skills-category mono-label">{category.title}</h3>
              <m.ul
                className="skills-chips"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px" }}
              >
                {category.skills.map((skill, i) => (
                  <m.li key={skill} custom={i} variants={chip} className="skills-chip">
                    {skill}
                  </m.li>
                ))}
              </m.ul>
            </TiltCard>
          </m.div>
        ))}
      </div>
    </section>
  );
}
