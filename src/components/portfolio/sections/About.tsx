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
              I&rsquo;m a Data Science major with a concentration in Finance, Class of
              &rsquo;29 at NYU Shanghai.
            </p>
            <p className="about-body">
              I have a job experiences in 4 sectors of business: Finance, Human Resources, Sales, and Administration. Through these internship opportunities, I am confident in my future in the tech and finance industry. I have built 3 full stack projects outside my work involving Machine Learning, Financial Analytics, and Entrepreneurship. I’m looking for opportunities to apply what I learn, build useful products, and grow.
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
