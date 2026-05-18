"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

type TitleScreenProps = {
  onStart: () => void;
};

export function TitleScreen({ onStart }: TitleScreenProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") onStart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart]);

  return (
    <motion.div
      className="title-screen-bg relative flex min-h-0 flex-1 w-full flex-col items-center justify-center px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      {/* Decorative stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[
          { top: "12%", left: "18%", delay: 0 },
          { top: "22%", left: "72%", delay: 0.3 },
          { top: "8%", left: "55%", delay: 0.6 },
          { top: "35%", left: "85%", delay: 0.2 },
          { top: "18%", left: "40%", delay: 0.5 },
        ].map((star, i) => (
          <motion.span
            key={i}
            className="absolute text-soft-cream/70"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: star.delay,
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-lg flex-col items-start gap-8 sm:max-w-xl"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <div>
          <p className="text-[8px] tracking-wide text-soft-cream/80 sm:text-[10px]">
            portfolio
          </p>
          <h1 className="mt-2 text-lg leading-tight text-soft-cream sm:text-2xl md:text-3xl">
            CHINSANAA
          </h1>
          <h1 className="text-xl leading-tight text-soft-cream sm:text-3xl md:text-4xl">
            CHULUUNBOLD
          </h1>
        </div>

        <nav className="flex flex-col gap-3 text-[8px] text-soft-cream sm:text-[10px]">
          <p className="text-soft-cream/60">— menu —</p>
          <motion.button
            type="button"
            onClick={onStart}
            className="animate-soft-blink text-left hover:text-white"
          >
            — start —
          </motion.button>
          <span className="text-soft-cream/50">— explore folders —</span>
        </nav>

        <motion.p
          className="text-[7px] text-soft-cream/60 sm:text-[8px]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          click or press enter
        </motion.p>
      </motion.div>

      {/* Soft tree silhouette (right side on desktop) */}
      
    </motion.div>
  );
}
