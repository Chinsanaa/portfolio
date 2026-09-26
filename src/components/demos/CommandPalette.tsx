"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { setScrollLocked } from "@/components/ui/SmoothScroll";

export type PaletteMode = "palette" | "terminal";

const OPEN_EVENT = "palette:open";

export function openPalette(mode: PaletteMode = "palette") {
  window.dispatchEvent(new CustomEvent<PaletteMode>(OPEN_EVENT, { detail: mode }));
}

const PaletteDialog = dynamic(() => import("./PaletteDialog"), { ssr: false });

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PaletteMode>("palette");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const show = (next: PaletteMode) => {
      setMode(next);
      setLoaded(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.(
        "input, textarea, select, [contenteditable='true']",
      );
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        show("palette");
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        show("terminal");
      }
    };
    const onOpen = (e: Event) => show((e as CustomEvent<PaletteMode>).detail);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => setScrollLocked(open), [open]);

  if (!loaded) return null;
  return <PaletteDialog open={open} onOpenChange={setOpen} mode={mode} onModeChange={setMode} />;
}
