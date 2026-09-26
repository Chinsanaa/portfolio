"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Renders children only once the placeholder nears the viewport, so heavy
 *  next/dynamic chunks aren't downloaded on first load. */
export function LazyMount({
  children,
  placeholder,
  rootMargin = "800px 0px",
}: {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{mounted ? children : placeholder}</div>;
}
