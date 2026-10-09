import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillCategories } from "../content";

export function Skills() {
  return (
    <section className="section section-split skills" id="skills">
      <SectionHeader title="Skills" />

      <dl className="section-body skills-list">
        {skillCategories.map((category) => (
          <div key={category.title} className="skills-row">
            <dt>{category.title}</dt>
            <dd>{category.skills.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
