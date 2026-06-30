"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: "#3b82f6" | "#8b5cf6";
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const heroSection = canvas.parentElement;
    const particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 2 + Math.random() * 2,
        color: Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6",
      });
    };

    const isMouseInHero = (x: number, y: number) => {
      if (!heroSection) return false;
      const heroRect = heroSection.getBoundingClientRect();
      return (
        x >= heroRect.left &&
        x <= heroRect.right &&
        y >= heroRect.top &&
        y <= heroRect.bottom
      );
    };

    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(15, 20, 25, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${p.color === "#3b82f6" ? "59, 130, 246" : "139, 92, 246"}, ${p.life * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      if (!isMouseInHero(e.clientX, e.clientY)) return;

      if (now - lastTime > 30) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const count = Math.min(3, Math.floor(distance / 50) + 1);
        for (let i = 0; i < count; i++) {
          createParticle(e.clientX, e.clientY);
        }

        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="heroCanvas" ref={canvasRef} />;
}
