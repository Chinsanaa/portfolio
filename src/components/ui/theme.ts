"use client";

import { useSyncExternalStore } from "react";

/** What the visitor picked. "system" follows the OS setting. */
export type ThemeChoice = "light" | "dark" | "system";
/** What is actually on screen. */
export type Theme = "light" | "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const read = (): Theme => {
  const picked = document.documentElement.dataset.theme;
  if (picked === "light" || picked === "dark") return picked;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
};

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    query.removeEventListener("change", onChange);
  };
}

/** The resolved theme on screen; re-renders when the choice or the OS setting changes. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "light");
}

export function setTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
  try {
    if (choice === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", choice);
  } catch {}
}
