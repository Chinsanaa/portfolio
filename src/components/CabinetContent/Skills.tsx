"use client";

import { motion } from "framer-motion";
import { skillCategories, skills } from "@/data/skills";

const badgeColors = [
  "#8fa4c4",
  "#c9b87a",
  "#9cb8a0",
  "#b8a8c4",
  "#c4a090",
];

export function Skills() {
  return (
    <motion.div className="flex w-full flex-col gap-8">
      {skillCategories.map((category, catIndex) => {
        const items = skills[category.key];
        return (
          <section key={category.key}>
            <h3
              className="mb-4 text-[10px] sm:text-xs"
              style={{ color: category.color }}
            >
              {category.label}
            </h3>
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: catIndex * 0.1,
                  },
                },
              }}
            >
              {items.map((skill, i) => (
                <motion.span
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  className="pixel-card px-2 py-2 text-[7px] sm:text-[8px]"
                  style={{
                    color: badgeColors[i % badgeColors.length],
                    borderColor: badgeColors[i % badgeColors.length],
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </section>
        );
      })}
    </motion.div>
  );
}
