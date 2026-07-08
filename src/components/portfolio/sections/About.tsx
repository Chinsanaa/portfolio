"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ArtImage } from "@/components/ui/ArtImage";
import { IMAGES } from "@/config/resources";

const STATS = [
  { label: "GPA — Data Science + Finance", value: 3.58, decimals: 2 },
  { label: "Class of, NYU Shanghai", value: 2029 },
  { label: "Shipped projects", value: 3, prefix: "0" },
  { label: "Certificates", value: 3, prefix: "0" },
];

export function About() {
  return (
    <section className="section about" id="about">
      <SectionHeader number="01" title="About" kicker="Shanghai, China" />

      <div className="about-grid">
        <div className="about-aside">
          <Reveal>
            <ArtImage
              src={IMAGES.art.about}
              variant="about"
              alt="Small geometric still life in ink and paper tones"
            />
            <p className="about-aside-caption mono-label">
              English / Mongolian / 中文 (elementary)
            </p>
          </Reveal>
        </div>

        <div className="about-copy">
          <Reveal>
            <p className="about-lede">
              I&rsquo;m a Data Science student at NYU Shanghai (Finance Concentration, Class of
              2029) building toward a career that combines data analytics and finance. I&rsquo;m
              currently a Financial Analyst at Next Group, working with Excel, SQL, and Power BI to
              analyze sales and COGS data, alongside prior roles there in sales analysis,
              operations, and HR.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-body">
              Outside coursework, I build full-stack projects: Earnio, a UGC monetization platform
              for Mongolian creators with 208+ commits and a live web and iOS app, alongside a TCP
              socket-based chat system and a personal portfolio site. I&rsquo;m fluent in English
              and Mongolian, with elementary Chinese, and I prioritize precision over polish, both
              in my work and in how I represent it.
            </p>
          </Reveal>

          <Reveal stagger className="about-stats">
            {STATS.map((stat) => (
              <RevealItem key={stat.label} className="about-stat">
                <span className="about-stat-value">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    prefix={stat.prefix ?? ""}
                  />
                </span>
                <span className="about-stat-label mono-label">{stat.label}</span>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
