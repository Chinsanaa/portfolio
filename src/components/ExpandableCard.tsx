"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ExpandableCardProps = {
  title: string;
  preview: string;
  content: React.ReactNode;
  color: string;
};

export function ExpandableCard({
  title,
  preview,
  content,
  color,
}: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="pixel-card w-full cursor-pointer text-left"
      style={{ borderColor: color }}
      onClick={() => setExpanded((v) => !v)}
    >
      <motion.div className="p-3 sm:p-4">
        <motion.div className="flex items-start justify-between gap-2">
          <motion.div className="min-w-0 flex-1">
            <h3
              className="text-[10px] leading-relaxed sm:text-xs"
              style={{ color }}
            >
              {title}
            </h3>
            {!expanded && (
              <p className="mt-2 text-[8px] leading-5 text-soft-ink-muted sm:text-[10px]">
                {preview}
              </p>
            )}
          </motion.div>
          <span
            className="shrink-0 text-[10px] sm:text-xs"
            style={{ color }}
            aria-hidden
          >
            {expanded ? "▼" : "▶"}
          </span>
        </motion.div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 border-t border-soft-ink-muted/20 pt-3 text-[8px] leading-5 text-soft-ink sm:text-[10px]"
              >
                {content}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
