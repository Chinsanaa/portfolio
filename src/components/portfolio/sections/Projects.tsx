"use client";

import { useState, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, m, useMotionValue, useSpring } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArtImage } from "@/components/ui/ArtImage";
import { ArrowUpRight } from "@/components/icons";
import { projects } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { stiffness: 260, damping: 28, mass: 0.6 };

/** Hover previews only make sense with a mouse and motion allowed. */
const canPreview = (e: PointerEvent) =>
  e.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Projects() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, SPRING);
  const py = useSpring(y, SPRING);

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const onMove = (e: PointerEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const preview = hovered !== null && !open.has(hovered) ? projects[hovered] : null;

  return (
    <section className="section projects" id="projects">
      <SectionHeader title="Projects" />

      <ul className="project-list" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
        {projects.map((project, index) => {
          const isOpen = open.has(index);
          const panelId = `project-panel-${index}`;
          return (
            <li key={project.title} className="project-row" data-open={isOpen || undefined}>
              <h3 className="project-heading">
                <button
                  type="button"
                  className="project-head"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  onPointerEnter={(e) => {
                    if (!canPreview(e)) return;
                    x.jump(e.clientX);
                    y.jump(e.clientY);
                    px.jump(e.clientX);
                    py.jump(e.clientY);
                    setHovered(index);
                  }}
                  onPointerLeave={() => setHovered(null)}
                >
                  <span className="project-title">{project.title}</span>
                  <span className="project-summary">{project.summary}</span>
                  <span className="project-toggle" aria-hidden />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    className="project-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="project-panel-inner">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-art"
                        tabIndex={-1}
                        aria-hidden
                      >
                        <ArtImage
                          src={project.art}
                          variant={project.artVariant}
                          alt={`${project.title} cover artwork`}
                        />
                      </a>
                      <div className="project-detail">
                        <p className="project-impact">{project.impact}</p>
                        <p className="project-stack">{project.tagLabels.join(", ")}</p>
                        <a
                          className="text-link"
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View code on GitHub
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {preview?.art && (
          <m.div
            key="preview"
            className="project-preview"
            style={{ left: px, top: py }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: EASE }}
            aria-hidden
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={preview.title}
                className="project-preview-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Image src={preview.art} alt="" width={360} height={240} sizes="360px" />
              </m.div>
            </AnimatePresence>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
