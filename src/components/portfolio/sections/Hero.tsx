"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArtImage } from "@/components/ui/ArtImage";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowDown, Asterisk, Download } from "@/components/icons";
import { FILES, IMAGES } from "@/config/resources";
import { HeroShapes } from "./HeroShapes";

const EASE = [0.16, 1, 0.3, 1] as const;

const MARQUEE_ITEMS = [
  "Data Science",
  "Finance",
  "NYU Shanghai",
  "SQL",
  "Power BI",
  "Python",
  "Excel Modeling",
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
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" id="top" ref={ref}>
      <HeroShapes scrollProgress={scrollYProgress} />

      <motion.div
        className="hero-masthead mono-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span>Portfolio — Issue 01</span>
        <span className="hero-masthead-mid">NYU Shanghai &rsquo;29</span>
        <span>Data × Finance</span>
      </motion.div>

      <div className="hero-body">
        <motion.h1 className="hero-name" style={{ y: headlineY }}>
          <span className="hero-line">
            <motion.span custom={0} variants={lineReveal} initial="hidden" animate="visible">
              Chinsanaa
            </motion.span>
          </span>
          <span className="hero-line hero-line-indent">
            <motion.span custom={1} variants={lineReveal} initial="hidden" animate="visible">
              Chuluunbold
            </motion.span>
          </span>
        </motion.h1>

        <div className="hero-row">
          <div className="hero-intro">
            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            >
              Data Scientist + Finance major building data-driven solutions
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
              <Button variant="outline" href={FILES.cvPdf} download>
                Download CV
                <Download size={16} />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            style={{ y: artY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          >
            <ArtImage
              src={IMAGES.art.hero}
              variant="hero"
              alt="Abstract geometric composition in ink and paper tones"
              priority
            />
            <span className="hero-art-caption mono-label">Fig. 01 — Data × Finance</span>
          </motion.div>
        </div>
      </div>

      <div className="hero-marquee">
        <Marquee tone="ink" duration={26}>
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
