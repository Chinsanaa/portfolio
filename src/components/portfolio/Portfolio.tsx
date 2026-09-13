"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./editorial.css";
import { Nav } from "./Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Certificates } from "./sections/Certificates";
import { Contact } from "./sections/Contact";

export function Portfolio() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}
