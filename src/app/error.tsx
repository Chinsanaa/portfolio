"use client";

import { useEffect } from "react";

const CHUNK_ERROR_RELOAD_KEY = "chunk-error-reloaded-at";
const CHUNK_ERROR_RELOAD_WINDOW_MS = 10_000;

function isChunkLoadError(error: Error) {
  return error.name === "ChunkLoadError" || /Failed to load chunk/i.test(error.message);
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    if (isChunkLoadError(error)) {
      const lastReloadedAt = Number(sessionStorage.getItem(CHUNK_ERROR_RELOAD_KEY) ?? 0);
      const recentlyReloaded = Date.now() - lastReloadedAt < CHUNK_ERROR_RELOAD_WINDOW_MS;
      if (!recentlyReloaded) {
        sessionStorage.setItem(CHUNK_ERROR_RELOAD_KEY, String(Date.now()));
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "#eceeed",
        color: "#17191c",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "1.5rem",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong</h1>
      <p style={{ color: "#43474d" }}>Please try refreshing the page.</p>
      <button
        onClick={reset}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "6px",
          border: "0",
          background: "#17191c",
          color: "#eceeed",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
