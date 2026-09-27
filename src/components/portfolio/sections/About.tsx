import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { TiltCard } from "@/components/ui/TiltCard";
import { IMAGES } from "@/config/resources";
import { highlights } from "../content";
import { ScrollWords } from "@/components/ui/ScrollWords";

const ABOUT_BODY =
  "I have work experience in 4 areas of business: Finance, Human Resources, Sales, and Administration. These internships have made me confident about my future in tech and finance. I have built 3 full-stack projects outside of work, spanning machine learning, financial analytics, and entrepreneurship. I’m looking for opportunities to apply what I learn, build useful products, and grow.";

export function About() {
  return (
    <section className="section about" id="about">
      <SectionHeader number="01" title="About" kicker="Shanghai, China" />

      <Reveal stagger className="about-bento">
        <RevealItem className="about-card-art">
          <ArtImage
            src={IMAGES.art.about}
            variant="about"
            alt="Chinsanaa smiling with a medal, a certificate, and basketball trophies"
          />
        </RevealItem>

        <RevealItem className="about-card-lede">
          <TiltCard className="about-card">
            <p className="about-lede">
              I&rsquo;m a Data Science major with a concentration in Finance, Class of
              &rsquo;29 at NYU Shanghai.
            </p>
            <ScrollWords className="about-body" text={ABOUT_BODY} />
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
