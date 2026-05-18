"use client";

import { motion } from "framer-motion";

const facts = [
  { icon: "🎓", text: "Graduating June 2029" },
  { icon: "💰", text: "Finance concentration" },
  { icon: "🌏", text: "Shanghai, China" },
  { icon: "🗣️", text: "English, Mongolian, Mandarin (elementary)" },
];

const interests = ["🏀", "💻", "🎬", "📈"];

export function About() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-[10px] leading-relaxed text-soft-periwinkle sm:text-xs">
        Sanaa Chuluunbold
      </h2>
      <p className="max-w-lg text-[8px] leading-6 text-soft-ink sm:text-[10px] sm:leading-7">
        Data Science student at NYU Shanghai. Full-stack
        learner exploring AI, design, and entrepreneurship.
      </p>
      <ul className="flex w-full max-w-md flex-col gap-3 text-left">
        {facts.map((fact) => (
          <li
            key={fact.text}
            className="pixel-card flex items-center gap-3 p-3 text-[8px] sm:text-[10px]"
          >
            <span className="text-base" aria-hidden>
              {fact.icon}
            </span>
            <span className="text-soft-ink">{fact.text}</span>
          </li>
        ))}
      </ul>
      <motion.div
        className="flex gap-4 text-2xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {interests.map((icon) => (
          <motion.span
            key={icon}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            aria-hidden
          >
            {icon}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
