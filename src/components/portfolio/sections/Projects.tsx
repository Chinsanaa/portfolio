"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { TagChip } from "@/components/ui/TagChip";
import { ArtImage } from "@/components/ui/ArtImage";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowUpRight } from "@/components/icons";
import { projects, type Project } from "../content";

export function Projects() {
  return (
    <section className="section projects" id="projects">
      <SectionHeader number="03" title="Projects" kicker="Selected work" />
      <Reveal stagger className="projects-grid">
        {projects.map((project, index) => (
          <RevealItem key={project.title}>
            <ProjectFeature project={project} index={index} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  return (
    <TiltCard as="article" className="project">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} on GitHub`}
        className="project-art-link"
      >
        <div className="project-art">
          <ArtImage
            src={project.art}
            variant={project.artVariant}
            alt={`${project.title} cover artwork`}
          />
        </div>
      </a>

      <div className="project-info">
        <span className="project-index mono-label" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-impact">{project.impact}</p>
        <div className="project-tags">
          {project.tagLabels.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
        <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">
          <span className="mono-label">View on GitHub</span>
          <ArrowUpRight size={18} className="project-link-arrow" />
        </a>
      </div>
    </TiltCard>
  );
}
