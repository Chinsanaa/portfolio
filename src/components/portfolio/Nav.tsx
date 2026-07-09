"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const LINKS = [
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Skills", href: "#skills" },
  { number: "03", label: "Projects", href: "#projects" },
  { number: "04", label: "Experience", href: "#experience" },
  { number: "05", label: "Certificates", href: "#certificates" },
  { number: "06", label: "Contact", href: "#contact" },
];

/** Hairline top bar: hides on scroll-down, returns on scroll-up. */
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160);
  });

  return (
    <motion.header
      className="nav"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#top" className="nav-wordmark mono-label">
        CC — Portfolio
      </a>
      <nav className="nav-links" aria-label="Sections">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link mono-label">
            <span className="nav-link-number">{link.number}</span>
            <span className="nav-link-label">{link.label}</span>
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
