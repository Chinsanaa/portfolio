"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const PULL = 8; // max magnetic offset in px

interface ButtonProps {
  children: ReactNode;
  variant?: "solid" | "ghost" | "subtle";
  href?: string;
  download?: boolean;
  external?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Glass-era button with a magnetic hover pull.
 * variant "solid"  — flat terracotta fill, soft blurred glow behind it
 * variant "ghost"  — glass border, transparent fill
 * variant "subtle" — text-only, underline on hover
 */
export function Button({
  children,
  variant = "solid",
  href,
  download,
  external,
  onClick,
  className,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(dx * PULL);
    y.set(dy * PULL);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `btn btn-${variant}${className ? ` ${className}` : ""}`;
  const content = href ? (
    <a
      className={cls}
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ) : (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      className="btn-magnet"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {content}
    </motion.div>
  );
}
