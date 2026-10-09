"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProximityText } from "@/components/ui/ProximityText";
import { ArrowDown, Download } from "@/components/icons";
import { FILES, IMAGES } from "@/config/resources";

const EASE = [0.16, 1, 0.3, 1] as const;
const NAME_LINES = ["Chinsanaa", "Chuluunbold"];

/** Each name line rises out of its own mask once, then holds still. */
const rise = (delay: number) => ({
  initial: { y: "105%" },
  animate: { y: "0%" },
  transition: { duration: 1, ease: EASE, delay },
});

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1 className="hero-name">
          <span className="sr-only">{NAME_LINES.join(" ")}</span>
          {NAME_LINES.map((line, i) => (
            <span key={line} className="hero-line" aria-hidden>
              <m.span className="hero-line-inner" {...rise(0.08 + i * 0.1)}>
                <ProximityText text={line} />
              </m.span>
            </span>
          ))}
        </h1>

        <m.p className="hero-sub" {...fade(0.45)}>
          Data Science and Finance student at NYU Shanghai. I build software that turns messy
          financial data into clear decisions.
        </m.p>

        <m.div className="hero-actions" {...fade(0.55)}>
          <Button href="#projects">
            See projects
            <ArrowDown size={16} />
          </Button>
          <Button variant="link" href={FILES.cvPdf} download>
            Download CV
            <Download size={16} />
          </Button>
        </m.div>
      </div>

      {/* Static on purpose: it is the LCP element, so it paints with the HTML. */}
      <figure className="hero-portrait">
        <Image
          src={IMAGES.art.about ?? ""}
          alt="Chinsanaa smiling with a medal, a certificate, and basketball trophies"
          width={900}
          height={1073}
          priority
          sizes="(max-width: 860px) 70vw, 34vw"
        />
      </figure>
    </section>
  );
}
