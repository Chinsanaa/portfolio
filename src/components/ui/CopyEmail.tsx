"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className="copy-email mono-label" onClick={copy} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "done" : "idle"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? "Copied ✓" : "Copy email"}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
