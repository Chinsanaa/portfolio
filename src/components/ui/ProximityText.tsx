"use client";

import { useEffect, useRef } from "react";

const MIN_WEIGHT = 380;
const MAX_WEIGHT = 800;
const RADIUS = 240; // px of pointer influence

/**
 * Letters thicken as the pointer nears them (after React Bits' "Variable
 * Proximity"), driven by the display face's variable weight axis.
 * Writes styles directly in a rAF loop, so React never re-renders; fine
 * pointers only, and fully static under reduced motion.
 */
export function ProximityText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const paint = () => {
      frame = 0;
      for (const el of letters) {
        let weight = MIN_WEIGHT;
        if (pointer) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          const t = Math.max(0, 1 - d / RADIUS);
          weight = MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * t * t;
        }
        el.style.fontVariationSettings = `"wght" ${Math.round(weight)}`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      {text.split("").map((ch, i) => (
        <span key={i} data-letter aria-hidden className="proximity-letter">
          {ch}
        </span>
      ))}
    </span>
  );
}
