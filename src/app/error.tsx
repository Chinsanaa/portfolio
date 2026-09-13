"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
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
        background: "#0c0b0a",
        color: "#ededf2",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "1.5rem",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong</h1>
      <p style={{ color: "#9a9aa8" }}>Please try refreshing the page.</p>
      <button
        onClick={reset}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "#e2603a",
          color: "#0c0b0a",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
