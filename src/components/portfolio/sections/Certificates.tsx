import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "@/components/icons";
import { certificates } from "../content";

export function Certificates() {
  return (
    <section className="section certificates" id="certificates">
      <SectionHeader title="Certificates" />

      <ul className="cert-grid">
        {certificates.map((cert) => (
          <li key={cert.title}>
            <a className="cert" href={cert.href} target="_blank" rel="noopener noreferrer">
              <span className="cert-mat">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  sizes="(max-width: 760px) 90vw, 30vw"
                  className="cert-img"
                />
              </span>
              <span className="cert-title">{cert.title}</span>
              <span className="cert-meta">
                {cert.issuer}, {cert.date}
              </span>
              <span className="cert-verify">
                Verify
                <ArrowUpRight size={14} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
