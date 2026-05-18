"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PixelWindowProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function PixelWindow({ title, children, onClose }: PixelWindowProps) {
  return (
    <motion.div
      className="pixel-window flex max-h-[min(85vh,640px)] w-full max-w-2xl flex-col"
      initial={{ scale: 0.92, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 8 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="window-title"
    >
      <div className="pixel-window-title flex shrink-0 items-center justify-between gap-2 px-2 py-2 sm:px-3">
        <span
          id="window-title"
          className="truncate text-[8px] sm:text-[10px]"
        >
          {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-soft-cream bg-soft-navy-light text-[10px] leading-none text-soft-cream hover:bg-soft-ink-muted sm:h-7 sm:w-7"
          aria-label="Close window"
        >
          ✕
        </button>
      </div>

      <div className="scroll-soft min-h-0 flex-1 overflow-y-auto p-4 text-soft-ink sm:p-5">
        {children}
      </div>
    </motion.div>
  );
}
