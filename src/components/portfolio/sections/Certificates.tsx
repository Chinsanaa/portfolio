"use client";

import { useState, useSyncExternalStore, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { certificates } from "../content";

function subscribePointer(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function Certificates() {
  const [active, setActive] = useState<number | null>(null);
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 25 });
  const y = useSpring(my, { stiffness: 260, damping: 25 });

  const onMove = (e: MouseEvent) => {
    mx.set(e.clientX + 24);
    my.set(e.clientY - 90);
  };

  return (
    <section className="section certificates" id="certificates" onMouseMove={onMove}>
      <SectionHeader number="05" title="Certificates" kicker="Verified" />

      <Reveal stagger className="cert-ledger">
        {certificates.map((cert, index) => (
          <RevealItem key={cert.title}>
            <a
              className="cert-row"
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="cert-index mono-label">{String(index + 1).padStart(2, "0")}</span>
              <span className="cert-title">{cert.title}</span>
              <span className="cert-issuer mono-label">{cert.issuer}</span>
              <span className="cert-date mono-label">{cert.date}</span>
              <ArrowUpRight size={20} className="cert-arrow" />
              {/* static thumbnail for touch devices, hidden on fine pointers via CSS */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cert-thumb-static" src={cert.image} alt="" loading="lazy" />
            </a>
          </RevealItem>
        ))}
      </Reveal>

      {finePointer && (
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="cert-thumb-float"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={certificates[active].image} alt="" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
