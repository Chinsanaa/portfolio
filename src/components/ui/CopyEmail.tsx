"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";

/** Text button that swaps "Copy" for "Copied" in place. */
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
    <button type="button" className="copy-email" onClick={copy} aria-label={`Copy ${email}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={copied ? "done" : "idle"}
          className="copy-email-label"
          data-done={copied || undefined}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {copied ? "Copied" : "Copy"}
        </m.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
