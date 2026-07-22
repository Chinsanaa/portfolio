"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { TiltCard } from "@/components/ui/TiltCard";
import { IMAGES } from "@/config/resources";
import { highlights } from "../content";

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
              I&rsquo;m a Data Science student at NYU Shanghai (Finance concentration, Class of
              &rsquo;29) focused on the analytics side of finance.
            </p>
            <p className="about-body">
              As a Financial Analyst at Next Group, I turn sales and COGS data into decisions
              using Excel, SQL, and Power BI. I also build and deploy full-stack ML products,
              including a spending classifier that auto-categorizes transactions with a trained
              model and a live budgeting dashboard. Four roles at one company (Finance, Sales,
              Operations, HR) taught me how a business runs, not just how to analyze it.
            </p>
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
