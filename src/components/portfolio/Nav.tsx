"use client";

import { useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { LinkedIn, Terminal } from "@/components/icons";
import { openPalette } from "@/components/demos/CommandPalette";
import { URLS } from "@/config/resources";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Lab", href: "#lab" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
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
    <m.header
      className="nav"
      animate={{ y: hidden ? "calc(-100% - 1rem)" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="nav-links" aria-label="Sections">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link mono-label">
            <span className="nav-link-label">{link.label}</span>
          </a>
        ))}
      </nav>
      <div className="nav-social">
        <button
          type="button"
          onClick={() => openPalette("palette")}
          className="nav-link nav-social-link nav-palette"
          aria-label="Open command palette"
        >
          <Terminal size={16} />
          <kbd className="nav-palette-kbd mono-label">⌘K</kbd>
        </button>
        <a
          href={URLS.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link nav-social-link"
          aria-label="Connect on LinkedIn"
        >
          <LinkedIn size={16} />
        </a>
      </div>
    </m.header>
  );
}
