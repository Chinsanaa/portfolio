"use client";

import { motion } from "framer-motion";
import { PixelFolder } from "@/components/icons/PixelFolder";

type FolderShortcutProps = {
  label: string;
  folderColor: string;
  onClick: () => void;
  selected?: boolean;
};

export function FolderShortcut({
  label,
  folderColor,
  onClick,
  selected,
}: FolderShortcutProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onDoubleClick={onClick}
      className={`group flex min-h-[88px] w-full max-w-[120px] flex-col items-center gap-2 rounded-sm p-2 outline-none focus-visible:ring-2 focus-visible:ring-soft-periwinkle sm:min-h-[100px] sm:max-w-[140px] ${
        selected ? "bg-white/10 ring-2 ring-white/30" : ""
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Open ${label} folder`}
    >
      <PixelFolder
        color={folderColor}
        className="h-12 w-14 drop-shadow-sm transition group-hover:brightness-110 sm:h-14 sm:w-16"
      />
      <span className="max-w-full truncate text-center text-[7px] leading-tight text-soft-cream sm:text-[8px]">
        {label}
      </span>
    </motion.button>
  );
}
