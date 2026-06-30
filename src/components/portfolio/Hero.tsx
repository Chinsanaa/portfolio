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
            <span className="code-comment">{"// Data-driven decision making"}</span>
          </div>
          <div className="code-line">
            <span className="code-keyword">def</span>{" "}
            <span className="code-function">analyze_market</span>(data):
          </div>
          <div className="code-line">
            &nbsp;&nbsp;<span className="code-keyword">return</span> insights
          </div>
          <div className="code-line" />
          <div className="code-line">
            <span className="code-comment">{"// ML models for prediction"}</span>
          </div>
          <div className="code-line">
            model = <span className="code-function">train</span>(
          </div>
          <div className="code-line">
            &nbsp;&nbsp;data=<span className="code-string">&quot;financial_timeseries&quot;</span>,
          </div>
          <div className="code-line">
            &nbsp;&nbsp;algo=<span className="code-string">&quot;gradient_boost&quot;</span>
          </div>
          <div className="code-line">)</div>
        </div>
      </div>
    </section>
  );
}
