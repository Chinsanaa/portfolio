"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ArtImage } from "@/components/ui/ArtImage";
import { TiltCard } from "@/components/ui/TiltCard";
import { SkillChart } from "@/components/ui/SkillChart";
import { IMAGES } from "@/config/resources";

const STATS = [
  { label: "GPA — Data Science + Finance", value: 3.58, decimals: 2 },
  { label: "Class of, NYU Shanghai", value: 2029 },
];

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

        <RevealItem className="about-card-stats">
          <TiltCard className="about-card">
            <span className="about-card-title mono-label">By the numbers</span>
            <div className="about-stats-grid">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span className="about-stat-value">
                    <AnimatedCounter value={stat.value} decimals={stat.decimals ?? 0} />
                  </span>
                  <span className="about-stat-label mono-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </TiltCard>
        </RevealItem>
      </Reveal>
    </section>
  );
}
