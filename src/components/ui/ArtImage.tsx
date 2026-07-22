"use client";

import { useState } from "react";
import Image from "next/image";

export type ArtVariant = "earnio" | "chat" | "financing" | "about";

const ASPECT: Record<ArtVariant, string> = {
  earnio: "3 / 2",
  chat: "3 / 2",
  financing: "3 / 2",
  about: "1 / 1",
};

interface ArtImageProps {
  /** Path under /public, or null to render the flat SVG fallback composition. */
  src: string | null;
  variant: ArtVariant;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Image slot with a fixed editorial aspect ratio and hard ink border.
 * Renders the generated artwork when a path is set in IMAGES.art,
 * otherwise a flat-color geometric SVG composition — so the layout
 * never depends on image availability. A path that 404s (a placeholder
 * waiting on its real file to be uploaded) falls back to the same SVG
 * instead of showing a broken image.
 */
export function ArtImage({ src, variant, alt, priority, className }: ArtImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`art-frame${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: ASPECT[variant] }}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <ArtFallback variant={variant} />
      )}
    </div>
  );
}

/* Flat geometric compositions on a dark surface — one blurred glow circle
   (terracotta or amber, flat color + filter: blur, never a gradient) plus flat
   shapes in text-dim/border-glass tones. Decorative only. */
function ArtFallback({ variant }: { variant: ArtVariant }) {
  if (variant === "earnio") {
    return (
      <svg viewBox="0 0 600 400" className="art-fallback" role="img" aria-hidden>
        <rect width="600" height="400" fill="var(--bg-2)" />
        <circle cx="150" cy="270" r="90" fill="var(--amber)" opacity="0.25" style={{ filter: "blur(40px)" }} />
        <ellipse cx="180" cy="310" rx="110" ry="26" fill="var(--surface-2)" />
        <ellipse cx="180" cy="284" rx="110" ry="26" fill="var(--surface)" />
        <ellipse cx="180" cy="258" rx="110" ry="26" fill="var(--surface-2)" />
        <ellipse cx="180" cy="232" rx="110" ry="26" fill="var(--amber)" />
        <rect x="360" y="240" width="52" height="96" fill="var(--surface-2)" />
        <rect x="424" y="180" width="52" height="156" fill="var(--surface)" />
        <rect x="488" y="110" width="52" height="226" fill="var(--terracotta)" />
      </svg>
    );
  }
  if (variant === "chat") {
    return (
      <svg viewBox="0 0 600 400" className="art-fallback" role="img" aria-hidden>
        <rect width="600" height="400" fill="var(--bg-2)" />
        <circle cx="300" cy="200" r="80" fill="var(--terracotta)" opacity="0.28" style={{ filter: "blur(45px)" }} />
        <rect x="70" y="90" width="190" height="120" rx="24" fill="var(--surface-2)" />
        <path d="M110 210l0 44 44-44z" fill="var(--surface-2)" />
        <rect x="340" y="190" width="190" height="120" rx="24" fill="var(--surface)" />
        <path d="M490 310l0 44-44-44z" fill="var(--surface)" />
        <line x1="260" y1="150" x2="340" y2="250" stroke="var(--border-glass)" strokeWidth="3" />
        <circle cx="300" cy="200" r="12" fill="var(--amber)" />
      </svg>
    );
  }
  if (variant === "financing") {
    return (
      <svg viewBox="0 0 600 400" className="art-fallback" role="img" aria-hidden>
        <rect width="600" height="400" fill="var(--bg-2)" />
        <circle cx="406" cy="140" r="70" fill="var(--amber)" opacity="0.3" style={{ filter: "blur(35px)" }} />
        <ellipse cx="100" cy="320" rx="45" ry="14" fill="var(--surface-2)" />
        <ellipse cx="100" cy="300" rx="45" ry="14" fill="var(--surface)" />
        <ellipse cx="100" cy="280" rx="45" ry="14" fill="var(--surface-2)" />
        <ellipse cx="100" cy="260" rx="45" ry="14" fill="var(--surface)" />
        <rect x="220" y="300" width="48" height="50" fill="var(--surface-2)" />
        <rect x="282" y="240" width="48" height="110" fill="var(--surface)" />
        <rect x="344" y="160" width="48" height="190" fill="var(--surface-2)" />
        <rect x="406" y="80" width="48" height="270" fill="var(--amber)" />
        <polyline points="220,290 282,240 344,160 406,80" stroke="var(--terracotta)" strokeWidth="3" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 400" className="art-fallback" role="img" aria-hidden>
      <rect width="400" height="400" fill="var(--bg-2)" />
      <circle cx="300" cy="140" r="70" fill="var(--terracotta)" opacity="0.3" style={{ filter: "blur(32px)" }} />
      <circle cx="170" cy="200" r="95" fill="none" stroke="var(--border-glass)" strokeWidth="2" />
      <circle cx="170" cy="200" r="42" fill="var(--surface-2)" />
      <rect x="240" y="230" width="100" height="100" fill="var(--surface)" />
      <circle cx="300" cy="140" r="20" fill="var(--terracotta)" />
    </svg>
  );
}
