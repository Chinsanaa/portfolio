"use client";

import { useEffect, useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { openPalette } from "@/components/demos/CommandPalette";
import { Ulzii } from "@/components/icons";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

/** Plain top bar: hides on scroll-down, returns on scroll-up. */
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160);
    setScrolled(latest > 8);
  });

  return (
    <m.header
      className="nav"
      data-scrolled={scrolled || undefined}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-inner">
        <a href="#top" className="nav-mark">
          <Ulzii size={18} className="nav-mark-knot" />
          Chinsanaa C.
        </a>
        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              data-active={active === link.href || undefined}
              aria-current={active === link.href ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" onClick={() => openPalette()} className="nav-search">
          <span className="nav-search-desktop">Search</span>
          <span className="nav-search-mobile">Menu</span>
          <kbd className="nav-kbd">⌘K</kbd>
        </button>
      </div>
    </m.header>
  );
}
