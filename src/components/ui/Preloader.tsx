"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { markIntroDone } from "./intro";

const SEEN_KEY = "preloader-seen";
const EASE = [0.76, 0, 0.24, 1] as const;
const NAME = "Chinsanaa";

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/** Intro counter + name, then a curtain wipe. Once per tab session. */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || alreadySeen()) {
      const id = requestAnimationFrame(() => {
        setVisible(false);
        markIntroDone();
      });
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const duration = 1300;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        setTimeout(() => {
          setVisible(false);
          markIntroDone();
        }, 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="preloader"
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="preloader-name">
            {NAME.split("").map((ch, i) => (
              <span key={i} className="preloader-char-mask">
                <m.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.05 + i * 0.04 }}
                >
                  {ch}
                </m.span>
              </span>
            ))}
          </div>
          <div className="preloader-meta mono-label">
            <span>Portfolio · 2026</span>
            <span className="preloader-count">{String(count).padStart(3, "0")}</span>
          </div>
          <m.div
            className="preloader-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.1 }}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}
