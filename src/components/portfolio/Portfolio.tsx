"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./editorial.css";
import { Nav } from "./Nav";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CommandPalette } from "@/components/demos/CommandPalette";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Lab } from "./sections/Lab";
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
        <SmoothScroll />
        <CommandPalette />
        <Nav />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Lab />
          <Experience />
          <Certificates />
          <Contact />
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}
