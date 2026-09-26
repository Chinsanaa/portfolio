"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+-/<>";

/** Cycles through phrases, decoding each one with a text-scramble effect. */
export function ScrambleText({
  phrases,
  interval = 3200,
  start = true,
  className,
}: {
  phrases: string[];
  interval?: number;
  start?: boolean;
  className?: string;
}) {
  const [text, setText] = useState(phrases[0]);
  const index = useRef(0);

  useEffect(() => {
    if (!start || phrases.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const decode = (target: string) => {
      const began = performance.now();
      const duration = 700;
      const step = (now: number) => {
        const t = Math.min(1, (now - began) / duration);
        const settled = Math.floor(t * target.length);
        let out = target.slice(0, settled);
        for (let i = settled; i < target.length; i++) {
          out += target[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const timer = setInterval(() => {
      index.current = (index.current + 1) % phrases.length;
      const next = phrases[index.current];
      if (reduced) setText(next);
      else decode(next);
    }, interval);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frame);
    };
  }, [phrases, interval, start]);

  return (
    <span className={className} aria-hidden>
      {text}
    </span>
  );
}
