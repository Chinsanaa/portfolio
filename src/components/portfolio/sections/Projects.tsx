"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TagChip } from "@/components/ui/TagChip";
import { ArtImage } from "@/components/ui/ArtImage";
import { ArrowUpRight } from "@/components/icons";
import { projects, type Project } from "../content";

export function Projects() {
  return (
    <section className="section projects" id="projects">
      <SectionHeader number="02" title="Projects" kicker="Selected work" />
      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectFeature key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // inner image drifts inside its overflow-hidden frame as you scroll past
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const flipped = index % 2 === 1;

  return (
    <article className={`project${flipped ? " project-flipped" : ""}`} ref={ref}>
      <span className="project-ghost" aria-hidden>
        №{index + 1}
      </span>

      <Reveal className="project-art">
        <motion.a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="project-art-link"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div style={{ y: parallaxY }} className="project-art-inner">
            <ArtImage
              src={project.art}
              variant={project.artVariant}
              alt={`${project.title} cover artwork`}
            />
          </motion.div>
        </motion.a>
      </Reveal>

      <div className="project-info">
        <Reveal>
          <h3 className="project-title">{project.title}</h3>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="project-impact">{project.impact}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="project-tags">
            {project.tagLabels.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            className="project-link"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mono-label">View on GitHub</span>
            <ArrowUpRight size={18} className="project-link-arrow" />
          </a>
        </Reveal>
      </div>
    </article>
  );
}
