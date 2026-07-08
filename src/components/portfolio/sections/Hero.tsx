"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Spotlight } from "@/components/ui/Spotlight";
import { GlowField } from "@/components/ui/GlowField";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowDown, Asterisk, Download } from "@/components/icons";
import { FILES } from "@/config/resources";

const EASE = [0.16, 1, 0.3, 1] as const;

const MARQUEE_ITEMS = [
  "Data Science",
  "Finance",
  "Coding",
  "AI",
  "Machine Learning",
  "Trading"
];

const lineReveal = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" id="top" ref={ref}>
      <GlowField />

      <motion.div
        className="hero-masthead mono-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span>Data Scientist × Finance</span>
        <span>NYU Shanghai &rsquo;29</span>
      </motion.div>

      <Spotlight className="hero-body">
        <motion.div className="hero-content" style={{ y: contentY }}>
          <h1 className="hero-name">
            <span className="hero-line">
              <motion.span custom={0} variants={lineReveal} initial="hidden" animate="visible">
                Chinsanaa
              </motion.span>
            </span>
            <span className="hero-line">
              <motion.span custom={1} variants={lineReveal} initial="hidden" animate="visible">
                <span className="hero-name-accent">Chuluunbold</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          >
            Data Scientist + Finance major building data-driven solutions.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            <Button variant="solid" onClick={scrollToProjects}>
              View Projects
              <ArrowDown size={16} />
            </Button>
            <Button variant="ghost" href={FILES.cvPdf} download>
              Download CV
              <Download size={16} />
            </Button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
          >
            {STATS.map((stat) => (
              <div className="hero-stat tilt-card" key={stat.label}>
                <span className="hero-stat-value">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} />
                </span>
                <span className="hero-stat-label mono-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Spotlight>

      <div className="hero-scroll-cue mono-label">
        <ArrowDown size={16} />
      </div>

      <div className="hero-marquee">
        <Marquee tone="glass" duration={26}>
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className="marquee-item">
              {item}
              <Asterisk size={14} className="marquee-star" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
