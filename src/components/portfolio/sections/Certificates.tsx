"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { m } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowUpRight } from "@/components/icons";
import { certificates } from "../content";

export function Certificates() {
  return (
    <section className="section certificates" id="certificates">
      <SectionHeader number="06" title="Certificates" kicker="Verified" />

      <div className="cert-grid">
        {certificates.map((cert, index) => (
          <m.div
            key={cert.title}
            initial={{ opacity: 0, x: `${(1 - index) * 70}%`, y: 60, rotate: (index - 1) * 7 }}
            whileInView={{ opacity: 1, x: "0%", y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.1 + index * 0.08 }}
          >
            <TiltCard as="article">
              <a
                className="cert-card"
                href={cert.href}
                data-cursor="Verify"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="cert-thumb">
                  {/* full-color certificate photo, always visible — no grayscale filter */}
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
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
          </m.div>
        ))}
      </div>
    </section>
  );
}
