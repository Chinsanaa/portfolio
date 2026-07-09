"use client";

import { MotionConfig } from "framer-motion";
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
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </MotionConfig>
  );
}
