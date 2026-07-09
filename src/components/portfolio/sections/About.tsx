"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { TiltCard } from "@/components/ui/TiltCard";
import { TagChip } from "@/components/ui/TagChip";
import { IMAGES } from "@/config/resources";
import { skillCategories, highlights } from "../content";

export function About() {
  return (
    <section className="section about" id="about">
      <SectionHeader number="01" title="About" kicker="Shanghai, China" />

      <Reveal stagger className="about-bento">
        <RevealItem className="about-card-art">
          <ArtImage
            src={IMAGES.art.about}
            variant="about"
            alt="Small geometric still life on a dark studio backdrop"
          />
        </RevealItem>

        <RevealItem className="about-card-lede">
          <TiltCard className="about-card">
            <p className="about-lede">
              I&rsquo;m a Data Science student at NYU Shanghai (Finance Concentration, Class of
              2029) building toward a career that combines data analytics and finance.
            </p>
            <p className="about-body">
              Currently a Financial Analyst at Next Group, working with Excel, SQL, and Power BI
              to analyze sales and COGS data, alongside prior roles there in sales analysis,
              operations, and HR. I build full-stack projects outside coursework and I&rsquo;m
              fluent in English and Mongolian, with elementary Chinese.
            </p>
          </TiltCard>
        </RevealItem>

        <RevealItem className="about-card-skills">
          <TiltCard className="about-card">
            <span className="about-card-title mono-label">Skills by category</span>
            <div className="about-skills-groups">
              {skillCategories.map((category) => (
                <div className="about-skills-group" key={category.title}>
                  <span className="about-skills-group-label mono-label">{category.title}</span>
                  <div className="about-skills-chips">
                    {category.skills.map((skill) => (
                      <TagChip key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </RevealItem>

        <RevealItem className="about-card-highlights">
          <TiltCard className="about-card">
            <span className="about-card-title mono-label">Why hire me</span>
            <ul className="about-highlights-list">
              {highlights.map((highlight) => (
                <li key={highlight} className="about-highlights-item">
                  {highlight}
                </li>
              ))}
            </ul>
          </TiltCard>
        </RevealItem>
      </Reveal>
    </section>
  );
}
