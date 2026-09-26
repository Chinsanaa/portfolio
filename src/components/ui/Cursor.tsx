"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, [data-cursor]";

/** Ring that trails the pointer, grows over interactive elements and shows a
 *  label from the nearest [data-cursor]. Fine pointers only; the native cursor
 *  stays visible. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setEnabled(true);
      setHidden(false);
      const target = e.target as Element | null;
      const interactive = target?.closest?.(INTERACTIVE);
      setHovering(!!interactive);
      setLabel(target?.closest?.("[data-cursor]")?.getAttribute("data-cursor") ?? "");
    };
    const onLeave = () => setHidden(true);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <m.div
      className="cursor"
      aria-hidden
      style={{ x: sx, y: sy }}
      data-hover={hovering || undefined}
      data-label={label ? true : undefined}
      data-hidden={hidden || undefined}
    >
      <span className="cursor-ring">{label && <span className="cursor-label mono-label">{label}</span>}</span>
    </m.div>
  );
}
