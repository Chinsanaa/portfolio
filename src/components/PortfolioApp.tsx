"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { About } from "@/components/CabinetContent/About";
import { Contact } from "@/components/CabinetContent/Contact";
import { Projects } from "@/components/CabinetContent/Projects";
import { Skills } from "@/components/CabinetContent/Skills";
import { DesktopScreen } from "@/components/DesktopScreen";
import { PixelWindow } from "@/components/PixelWindow";
import { TitleScreen } from "@/components/TitleScreen";
import { SECTION_LABELS, type EnabledSectionId } from "@/app/globals";
import { useRetroSound } from "@/hooks/useRetroSound";

type Screen = "title" | "desktop";

const sectionContent: Record<EnabledSectionId, React.ReactNode> = {
  about: <About />,
  projects: <Projects />,
  skills: <Skills />,
  socials: <Contact />,
};

export function PortfolioApp() {
  const [screen, setScreen] = useState<Screen>("title");
  const [openSection, setOpenSection] = useState<EnabledSectionId | null>(null);
  const { playStart, playSelect, playBack } = useRetroSound();

  const handleStart = useCallback(() => {
    playStart();
    setScreen("desktop");
  }, [playStart]);

  const handleOpenFolder = useCallback(
    (id: EnabledSectionId) => {
      playSelect();
      setOpenSection(id);
    },
    [playSelect],
  );

  const handleCloseWindow = useCallback(() => {
    playBack();
    setOpenSection(null);
  }, [playBack]);

  const handleReturnToMenu = useCallback(() => {
    playBack();
    setOpenSection(null);
    setScreen("title");
  }, [playBack]);

  useEffect(() => {
    if (!openSection) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseWindow();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSection, handleCloseWindow]);

  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center p-3 sm:p-6 md:p-8">
      <div className="device-frame flex h-[min(100dvh-1.5rem,820px)] w-full max-w-5xl flex-col overflow-hidden rounded-sm">
        <AnimatePresence mode="wait">
          {screen === "title" && (
            <TitleScreen key="title" onStart={handleStart} />
          )}
        </AnimatePresence>

        {screen === "desktop" && (
          <div className="relative flex min-h-0 flex-1 flex-col">
            <DesktopScreen
              onOpenFolder={handleOpenFolder}
              selectedFolder={openSection}
              onReturnToMenu={handleReturnToMenu}
            />

            <AnimatePresence>
              {openSection && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-3 sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseWindow}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <PixelWindow
                      title={`${SECTION_LABELS[openSection]} — Sanaa`}
                      onClose={handleCloseWindow}
                    >
                      {sectionContent[openSection]}
                    </PixelWindow>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Power indicator */}
        <motion.div
          className="flex shrink-0 justify-end border-t-4 border-soft-sage-dark px-3 py-2"
          style={{ background: "var(--soft-sage)" }}
          aria-hidden
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-sm border-2 border-soft-sage-dark bg-soft-navy text-[8px] text-soft-cream">
            ⏻
          </span>
        </motion.div>
      </div>
    </main>
  );
}
