import { experience } from "./data";

export function Experience() {
  return (
    <section className="section" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="experience-timeline">
        {experience.map((item) => (
          <div key={`${item.role}-${item.company}`} className="experience-item scroll-reveal">
            <div className="experience-content">
              <div className="experience-role">{item.role}</div>
              <div className="experience-company">{item.company}</div>
              <div className="experience-date">{item.date}</div>
              <div className="experience-description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
