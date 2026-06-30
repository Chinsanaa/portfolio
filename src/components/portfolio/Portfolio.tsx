"use client";

import "./portfolio.css";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Certificates } from "./sections/Certificates";
import { Skills } from "./sections/Skills";
import { Experience } from "./sections/Experience";
import { Contact } from "./sections/Contact";
import { useScrollReveal } from "./hooks/useScrollReveal";

export function Portfolio() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Skills />
      <Experience />
      <Contact />
      <footer className="footer">
        <p>© 2026 Chinsanaa Chuluunbold. Designed with attention to detail. All rights reserved.</p>
      </footer>
    </>
  );
}
