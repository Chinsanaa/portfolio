"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { skillCategories } from "../content";

export function Skills() {
  return (
    <section className="section skills" id="skills">
      <SectionHeader number="02" title="Skills" kicker="Spec sheet" />

      <Reveal stagger className="skills-grid">
        {skillCategories.map((category) => (
          <RevealItem key={category.title} className="skills-column">
            <h3 className="skills-category mono-label">{category.title}</h3>
            <ol className="skills-list">
              {category.skills.map((skill, i) => (
                <li key={skill} className="skills-item">
                  <span className="skills-item-index mono-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="skills-item-name">{skill}</span>
                </li>
              ))}
            </ol>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
