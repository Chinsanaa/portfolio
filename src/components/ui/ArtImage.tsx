import Image from "next/image";

export type ArtVariant = "hero" | "earnio" | "chat" | "about";

const ASPECT: Record<ArtVariant, string> = {
  hero: "4 / 5",
  earnio: "3 / 2",
  chat: "3 / 2",
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
 * never depends on image availability.
 */
export function ArtImage({ src, variant, alt, priority, className }: ArtImageProps) {
  return (
    <div
      className={`art-frame${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: ASPECT[variant] }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <ArtFallback variant={variant} />
      )}
    </div>
  );
}

/* Flat geometric compositions in the system palette. Decorative only. */
function ArtFallback({ variant }: { variant: ArtVariant }) {
  if (variant === "hero") {
    return (
      <svg viewBox="0 0 400 500" className="art-fallback" role="img" aria-hidden>
        <rect width="400" height="500" fill="var(--color-paper-2)" />
        <path d="M60 500V300a140 140 0 0 1 280 0v200z" fill="var(--color-cobalt)" />
        <circle cx="200" cy="180" r="88" fill="var(--color-ink)" />
        <circle cx="316" cy="96" r="34" fill="var(--color-persimmon)" />
        <rect x="60" y="428" width="280" height="10" fill="var(--color-paper)" />
      </svg>
    );
  }
  if (variant === "earnio") {
    return (
      <svg viewBox="0 0 600 400" className="art-fallback" role="img" aria-hidden>
        <rect width="600" height="400" fill="var(--color-paper-2)" />
        <ellipse cx="180" cy="310" rx="110" ry="26" fill="var(--color-ink)" />
        <ellipse cx="180" cy="284" rx="110" ry="26" fill="var(--color-cobalt)" />
        <ellipse cx="180" cy="258" rx="110" ry="26" fill="var(--color-ink)" />
        <ellipse cx="180" cy="232" rx="110" ry="26" fill="var(--color-persimmon)" />
        <rect x="360" y="240" width="52" height="96" fill="var(--color-cobalt)" />
        <rect x="424" y="180" width="52" height="156" fill="var(--color-ink)" />
        <rect x="488" y="110" width="52" height="226" fill="var(--color-cobalt)" />
      </svg>
    );
  }
  if (variant === "chat") {
    return (
      <svg viewBox="0 0 600 400" className="art-fallback" role="img" aria-hidden>
        <rect width="600" height="400" fill="var(--color-paper-2)" />
        <rect x="70" y="90" width="190" height="120" rx="24" fill="var(--color-cobalt)" />
        <path d="M110 210l0 44 44-44z" fill="var(--color-cobalt)" />
        <rect x="340" y="190" width="190" height="120" rx="24" fill="var(--color-ink)" />
        <path d="M490 310l0 44-44-44z" fill="var(--color-ink)" />
        <line x1="260" y1="150" x2="340" y2="250" stroke="var(--color-ink)" strokeWidth="3" />
        <circle cx="300" cy="200" r="12" fill="var(--color-persimmon)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 400" className="art-fallback" role="img" aria-hidden>
      <rect width="400" height="400" fill="var(--color-paper-2)" />
      <circle cx="170" cy="200" r="95" fill="var(--color-cobalt)" />
      <circle cx="170" cy="200" r="42" fill="var(--color-paper-2)" />
      <rect x="240" y="230" width="100" height="100" fill="var(--color-ink)" />
      <circle cx="300" cy="140" r="20" fill="var(--color-persimmon)" />
    </svg>
  );
}
