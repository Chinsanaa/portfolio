"use client";

import { HeroCanvas } from "./HeroCanvas";
import { FILES } from "@/config/resources";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero">
      <HeroCanvas />
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Chinsanaa
            <br />
            Chuluunbold
          </h1>
          <p className="hero-subtitle">
            Data Scientist + Finance major building data-driven solutions 
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={scrollToProjects}>
              View Projects
            </button>
            <a href={FILES.cvPdf} download className="btn btn-secondary">
              Download CV
            </a>
          </div>
        </div>
        <div className="hero-code">
          <div className="code-line">
            <span className="code-comment">{"// About me, as data"}</span>
          </div>
          <div className="code-line">student = {"{"}</div>
          <div className="code-line">
            &nbsp;&nbsp;<span className="code-string">&quot;school&quot;</span>:{" "}
            <span className="code-string">&quot;NYU Shanghai&quot;</span>,
          </div>
          <div className="code-line">
            &nbsp;&nbsp;<span className="code-string">&quot;focus&quot;</span>: [
            <span className="code-string">&quot;Data Science&quot;</span>,{" "}
            <span className="code-string">&quot;Finance&quot;</span>],
          </div>
          <div className="code-line">
            &nbsp;&nbsp;<span className="code-string">&quot;tools&quot;</span>: [
            <span className="code-string">&quot;SQL&quot;</span>,{" "}
            <span className="code-string">&quot;Excel&quot;</span>,{" "}
            <span className="code-string">&quot;Power BI&quot;</span>],
          </div>
          <div className="code-line">
            &nbsp;&nbsp;<span className="code-string">&quot;languages&quot;</span>: [
            <span className="code-string">&quot;English&quot;</span>,{" "}
            <span className="code-string">&quot;Mongolian&quot;</span>],
          </div>
          <div className="code-line">{"}"}</div>
          <div className="code-line" />
          <div className="code-line">
            <span className="code-function">print</span>(student[
            <span className="code-string">&quot;focus&quot;</span>])
          </div>
        </div>
      </div>
    </section>
  );
}
