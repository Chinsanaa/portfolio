"use client";

import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LazyMount } from "@/components/ui/LazyMount";
import { experience } from "../content";

const globePlaceholder = <div className="route-globe route-globe-placeholder" aria-hidden />;
const RouteGlobe = dynamic(() => import("@/components/demos/RouteGlobe"), {
  ssr: false,
  loading: () => globePlaceholder,
});

export function Experience() {
  return (
    <section className="section section-split experience" id="experience">
      <SectionHeader title="Experience" />

      <ol className="section-body experience-list">
        {experience.map((item) => (
          <li key={`${item.role}-${item.date}`} className="experience-item">
            <p className="experience-date">{item.date}</p>
            <div className="experience-main">
              <h3 className="experience-role">{item.role}</h3>
              <p className="experience-company">{item.company}</p>
              <p className="experience-description">{item.description}</p>
              {item.role === "Sales Analyst" && (
                <div className="experience-route">
                  <LazyMount placeholder={globePlaceholder}>
                    <RouteGlobe />
                  </LazyMount>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
