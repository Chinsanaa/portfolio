"use client";

import { useEffect, useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { LinkedIn, Moon, Sun, Terminal } from "@/components/icons";
import { setTheme, useTheme } from "@/components/ui/theme";
import { openPalette } from "@/components/demos/CommandPalette";
import { URLS } from "@/config/resources";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

/** Hairline top bar: hides on scroll-down, returns on scroll-up. */
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const theme = useTheme();

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
  });

  return (
    <m.header
      className="nav"
      animate={{ y: hidden ? "calc(-100% - 1rem)" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="nav-links" aria-label="Sections">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link mono-label"
            data-active={active === link.href || undefined}
            aria-current={active === link.href ? "location" : undefined}
          >
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
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="nav-link nav-social-link"
          aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
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
