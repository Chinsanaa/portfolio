"use client";

import { ExpandableCard } from "@/components/ExpandableCard";
import { SOFT_COLORS } from "@/app/globals";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-center text-[8px] leading-5 text-soft-ink-muted sm:text-[10px]">
        Tap a project to read more
      </p>
      {projects.map((project) => (
        <ExpandableCard
          key={project.id}
          title={project.name}
          preview={project.shortDesc}
          color={SOFT_COLORS.mustard}
          content={
            <div className="space-y-3">
              <p>{project.fullDesc}</p>
              <p>
                <span className="font-bold text-soft-ink">Status:</span>{" "}
                {project.status}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-soft-ink-muted/40 bg-soft-cream-dark px-2 py-1 text-[7px] sm:text-[8px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn-soft inline-block px-4 py-2 text-[8px] sm:text-[10px]"
                onClick={(e) => e.stopPropagation()}
              >
                View on GitHub →
              </a>
            </div>
          }
        />
      ))}
    </div>
  );
}
