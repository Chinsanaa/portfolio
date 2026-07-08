"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowUpRight, Asterisk, Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { FILES, URLS } from "@/config/resources";

const TICKER = ["Open to internships", "Data Science", "Finance", "Let's build"];

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-cta">
          <div className="contact-cta-glow" aria-hidden />
          <Reveal>
            <p className="contact-kicker mono-label">№06 — Get in touch</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="contact-headline">Let&rsquo;s talk.</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="contact-copy">
              Always interested in discussing data science, finance, or building the next big
              thing. Reach out via email or connect on LinkedIn.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a className="contact-email" href={URLS.socials.email}>
              cc9287@nyu.edu
            </a>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="contact-actions">
              <Button variant="solid" href={URLS.socials.email}>
                <Mail size={16} />
                Email
              </Button>
              <Button variant="ghost" href={URLS.socials.github} external>
                <GitHub size={16} />
                GitHub
              </Button>
              <Button variant="ghost" href={URLS.socials.linkedin} external>
                <LinkedIn size={16} />
                LinkedIn
              </Button>
              <Button variant="ghost" href={FILES.cvPdf} download>
                <Download size={16} />
                CV
                <ArrowUpRight size={14} />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="contact-marquee">
        <Marquee tone="solid" duration={30} reverse>
          {TICKER.map((item) => (
            <span key={item} className="marquee-item">
              {item}
              <Asterisk size={14} className="marquee-star" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="contact-colophon">
        <p>© 2026 Chinsanaa Chuluunbold. Designed with attention to detail. All rights reserved.</p>
        <p className="mono-label">Shanghai, China / Ulaanbaatar, Mongolia</p>
        <p className="mono-label">Feel free to reach out!</p>
      </div>
    </section>
  );
}
