"use client";

import { useState } from "react";
import { filterTags, projects, type ProjectTag } from "./data";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag | "all">("all");

  return (
    <section className="section" id="projects">
      <div className="projects-header">
        <h2 className="section-title" style={{ margin: 0 }}>
          Projects
        </h2>
        <div className="filter-tags">
          {filterTags.map((tag) => (
            <span
              key={tag.value}
              className={`filter-tag${activeFilter === tag.value ? " active" : ""}`}
              onClick={() => setActiveFilter(tag.value)}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {projects
          .filter((p) => activeFilter === "all" || p.tags.includes(activeFilter))
          .map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="project-card scroll-reveal visible"
            >
              <div className="project-thumbnail">{project.emoji}</div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-impact">{project.impact}</p>
                <div className="project-tags">
                  {project.tagLabels.map((label) => (
                    <span key={label} className="tag">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
      </div>
    </section>
  );
}
