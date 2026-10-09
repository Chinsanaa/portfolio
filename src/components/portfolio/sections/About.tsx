import { SectionHeader } from "@/components/ui/SectionHeader";
import { highlights } from "../content";

export function About() {
  return (
    <section className="section section-split about" id="about">
      <SectionHeader title="About" />

      <div className="section-body about-body">
        <div className="about-text">
          <p className="about-lede">
            I study Data Science with a concentration in Finance at NYU Shanghai, class of 2029.
          </p>
          <p>
            I have worked across four areas of business: finance, human resources, sales, and
            administration. Those internships made me sure I want to work where tech and finance
            meet. Outside of work I have built three full-stack projects, spanning machine
            learning, financial analytics, and a creator marketplace. I&rsquo;m looking for
            chances to apply what I learn, build useful products, and grow.
          </p>
        </div>

        <div className="about-highlights">
          <h3 className="about-highlights-title">Highlights</h3>
          <ul className="ruled-list">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
