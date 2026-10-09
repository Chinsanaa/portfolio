import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "solid" | "link";
  href: string;
  download?: boolean;
  external?: boolean;
  className?: string;
}

/**
 * Two voices only:
 * "solid" is the single primary action per view (accent fill, 6px radius).
 * "link" is an underlined text action for everything else.
 */
export function Button({ children, variant = "solid", href, download, external, className }: ButtonProps) {
  return (
    <a
      className={`btn btn-${variant}${className ? ` ${className}` : ""}`}
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
