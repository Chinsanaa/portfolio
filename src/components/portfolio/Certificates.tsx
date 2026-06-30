import { certificates } from "./data";

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
            <div className="cert-thumbnail">{cert.emoji}</div>
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
