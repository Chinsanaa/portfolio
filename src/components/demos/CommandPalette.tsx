"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { setScrollLocked } from "@/components/ui/SmoothScroll";

const OPEN_EVENT = "palette:open";

export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const PaletteDialog = dynamic(() => import("./PaletteDialog"), { ssr: false });

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const show = () => {
      setLoaded(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.(
        "input, textarea, select, [contenteditable='true']",
      );
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        show();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  useEffect(() => setScrollLocked(open), [open]);

  if (!loaded) return null;
  return <PaletteDialog open={open} onOpenChange={setOpen} />;
}
