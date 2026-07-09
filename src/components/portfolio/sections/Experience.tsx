"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { RouteMap } from "@/components/ui/RouteMap";
import { experience, travelCities } from "../content";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  // the rail line draws as the section scrolls through the viewport
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section className="section experience" id="experience">
      <SectionHeader number="03" title="Experience" kicker="2023 — Present" />

      <div className="experience-timeline" ref={ref}>
        <div className="experience-rail" aria-hidden>
          <motion.div className="experience-rail-fill" style={{ scaleY: drawn }} />
        </div>

        <ol className="experience-list">
          {experience.map((item) => (
            <li key={`${item.role}-${item.date}`} className="experience-item">
              <motion.span
                className="experience-node"
                aria-hidden
                initial={{ scale: 0, x: "-50%" }}
                whileInView={{ scale: 1, x: "-50%" }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              />
              <Reveal>
                <p className="experience-date mono-label">{item.date}</p>
                <h3 className="experience-role">{item.role}</h3>
                <p className="experience-company mono-label">{item.company}</p>
                <p className="experience-description">{item.description}</p>
                {item.role === "Sales Analyst" && (
                  <div className="experience-route">
                    <RouteMap cities={travelCities} />
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
