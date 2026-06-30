"use client";

import "./portfolio.css";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";
import { Certificates } from "./Certificates";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Contact } from "./Contact";
import { useScrollReveal } from "./useScrollReveal";

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
