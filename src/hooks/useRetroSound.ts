"use client";

import { useCallback, useRef } from "react";

export function useRetroSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const beep = useCallback(
    (frequency = 440, duration = 0.08) => {
      const ctx = getCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    },
    [getCtx],
  );

  const playStart = useCallback(() => beep(392, 0.12), [beep]);
  const playSelect = useCallback(() => beep(523, 0.06), [beep]);
  const playBack = useCallback(() => beep(294, 0.08), [beep]);

  return { playStart, playSelect, playBack };
}
