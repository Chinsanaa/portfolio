"use client";

import { motion } from "framer-motion";
import { FolderShortcut } from "@/components/FolderShortcut";
import {
  ENABLED_SECTIONS,
  SECTION_COLORS,
  SECTION_LABELS,
  type EnabledSectionId,
} from "@/app/globals";

type DesktopScreenProps = {
  onOpenFolder: (id: EnabledSectionId) => void;
  selectedFolder: EnabledSectionId | null;
  onReturnToMenu: () => void;
};

export function DesktopScreen({
  onOpenFolder,
  selectedFolder,
  onReturnToMenu,
}: DesktopScreenProps) {
  return (
    <motion.div
      className="desktop-screen relative flex min-h-0 flex-1 flex-col p-3 sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <p className="mb-3 text-[7px] text-soft-cream/50 sm:text-[8px]">
        SANAA — desktop
      </p>

      <motion.div
        className="grid flex-1 grid-cols-2 place-content-start gap-3 gap-y-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-4 md:place-content-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {ENABLED_SECTIONS.map((id) => (
          <motion.div
            key={id}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex justify-center"
          >
            <FolderShortcut
              label={SECTION_LABELS[id]}
              folderColor={SECTION_COLORS[id]}
              onClick={() => onOpenFolder(id)}
              selected={selectedFolder === id}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        type="button"
        onClick={onReturnToMenu}
        className="absolute bottom-3 right-3 flex min-h-[48px] min-w-[72px] flex-col items-center justify-center gap-1 rounded-sm p-2 outline-none focus-visible:ring-2 focus-visible:ring-soft-periwinkle sm:bottom-4 sm:right-4 sm:min-h-[56px] sm:min-w-[88px]"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Return to main menu"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 sm:h-9 sm:w-9"
          aria-hidden
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            fill="#8fa4c4"
            stroke="#2c3440"
            strokeWidth="2"
          />
          <path
            d="M14 7 L8 12 L14 17"
            fill="none"
            stroke="#2c3440"
            strokeWidth="2"
          />
          <rect x="8" y="11" width="10" height="2" fill="#2c3440" />
        </svg>
        <span className="text-[6px] text-soft-cream sm:text-[7px]">Return</span>
      </motion.button>
    </motion.div>
  );
}
