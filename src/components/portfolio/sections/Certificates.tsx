"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowUpRight } from "@/components/icons";
import { certificates } from "../content";

export function Certificates() {
  return (
    <section className="section certificates" id="certificates">
      <SectionHeader number="05" title="Certificates" kicker="Verified" />

      <Reveal stagger className="cert-grid">
        {certificates.map((cert, index) => (
          <RevealItem key={cert.title}>
            <TiltCard as="article">
              <a
                className="cert-card"
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="cert-thumb">
                  {/* full-color certificate photo, always visible — no grayscale filter */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
                </div>
                <div className="cert-body">
                  <span className="cert-index mono-label">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="cert-title">{cert.title}</h3>
                  <div className="cert-meta">
                    <div>
                      <span className="cert-issuer mono-label">{cert.issuer}</span>
                      <br />
                      <span className="cert-date mono-label">{cert.date}</span>
                    </div>
                    <ArrowUpRight size={20} className="cert-arrow" />
                  </div>
                </div>
              </a>
            </TiltCard>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
