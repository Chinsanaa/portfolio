"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme";

const SPACING = 28;
const RADIUS = 150;
const PUSH = 26;

/** Canvas dot grid whose dots are pushed away from the pointer and tinted. */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const base = styles.getPropertyValue("--text").trim() || "#ededf2";
    const accent = styles.getPropertyValue("--terracotta").trim() || "#e2603a";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number; ox: number; oy: number; heat: number }[] = [];
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < height; y += SPACING)
        for (let x = SPACING / 2; x < width; x += SPACING) dots.push({ x, y, ox: x, oy: y, heat: 0 });
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        ctx.globalAlpha = 0.09 + d.heat * 0.8;
        ctx.fillStyle = d.heat > 0.05 ? accent : base;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1 + d.heat * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      for (const d of dots) {
        const dx = d.ox - pointer.x;
        const dy = d.oy - pointer.y;
        const dist = Math.hypot(dx, dy);
        const force = Math.max(0, 1 - dist / RADIUS);
        const tx = d.ox + (dist > 0 ? (dx / dist) * force * PUSH : 0);
        const ty = d.oy + (dist > 0 ? (dy / dist) * force * PUSH : 0);
        d.x += (tx - d.x) * 0.15;
        d.y += (ty - d.y) * 0.15;
        d.heat += (force - d.heat) * 0.12;
      }
      draw();
      if (visible) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (reduced) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden />;
}
