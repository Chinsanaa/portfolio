import { skillCategories } from "./data";

export function Skills() {
  return (
    <section className="section" id="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skillCategories.map((category) => (
          <div key={category.title} className="skill-category scroll-reveal">
            <h3 className="skill-category-title">
              {category.emoji} {category.title}
            </h3>
            <div className="skill-list">
              {category.skills.map((skill) => (
                <span key={skill} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
