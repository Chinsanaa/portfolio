"use client";

import { MotionConfig } from "framer-motion";
import "./editorial.css";
import { Nav } from "./Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Skills } from "./sections/Skills";
import { Certificates } from "./sections/Certificates";
import { Contact } from "./sections/Contact";

export function Portfolio() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certificates />
        <Contact />
      </main>
    </MotionConfig>
  );
}
