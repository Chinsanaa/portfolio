"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TagChip } from "@/components/ui/TagChip";
import { ArtImage } from "@/components/ui/ArtImage";
import { ArrowUpRight } from "@/components/icons";
import { projects, type Project } from "../content";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="section projects" id="projects">
      <SectionHeader number="03" title="Projects" kicker="Selected work" />
      <div className="projects-stack" ref={ref}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.25]);

  return (
    <div className="project-slot" style={{ top: `calc(12vh + ${index * 28}px)` }}>
      <m.article className="project" style={{ scale }}>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="project-art-link"
          data-cursor="View"
        >
          <div className="project-art">
            <ArtImage src={project.art} variant={project.artVariant} alt={`${project.title} cover artwork`} />
          </div>
        </a>

        <div className="project-info">
          <span className="project-index mono-label" aria-hidden>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-impact">{project.impact}</p>
          <div className="project-tags">
            {project.tagLabels.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
          <div className="project-links">
            <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">
              <span className="mono-label">View on GitHub</span>
              <ArrowUpRight size={18} className="project-link-arrow" />
            </a>
            {project.demo && (
              <a className="project-link project-link-demo" href={project.demo}>
                <span className="mono-label">Try the live demo</span>
                <ArrowUpRight size={18} className="project-link-arrow" />
              </a>
            )}
          </div>
        </div>
        <m.div className="project-dim" style={{ opacity: dim }} aria-hidden />
      </m.article>
    </div>
  );
}
