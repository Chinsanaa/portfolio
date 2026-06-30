"use client";

import { useState } from "react";
import { certificates } from "../content";

function CertThumbnail({ title, emoji, image }: { title: string; emoji: string; image: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return <div className="cert-thumbnail">{emoji}</div>;
  }

  return (
    <div className="cert-thumbnail cert-thumbnail-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} onError={() => setImageFailed(true)} />
    </div>
  );
}

export function Certificates() {
  return (
    <section className="section" id="certificates">
      <h2 className="section-title">Certifications</h2>
      <div className="certificates-grid">
        {certificates.map((cert) => (
          <a
            key={cert.title}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="cert-card scroll-reveal"
          >
            <CertThumbnail title={cert.title} emoji={cert.emoji} image={cert.image} />
            <div className="cert-content">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-date">{cert.date}</p>
              <div className="cert-link">View Certificate →</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
