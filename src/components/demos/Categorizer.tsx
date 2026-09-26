"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { AUTO_APPLY_THRESHOLD, classify, type Source } from "./categorizer";
import { KEYWORD_RULES, MERCHANT_RULES } from "./categorizer-data";

const PRESETS = [
  "Luckin Coffee ¥18",
  "盒马鲜生",
  "静安寺 station",
  "Mcdonalds",
  "CoCo tea",
  "Uber",
];

const STEPS: { source: Source; title: string; detail: string }[] = [
  { source: "rule", title: "Merchant rules", detail: `${MERCHANT_RULES.length} trusted patterns` },
  {
    source: "keyword",
    title: "Keyword rules",
    detail: `${KEYWORD_RULES.reduce((n, [, k]) => n + k.length, 0)} description keywords`,
  },
  { source: "model", title: "Model", detail: "TF-IDF char n-grams + kNN" },
];

const SOURCE_LABEL: Record<Source, string> = {
  rule: "Matched merchant rule",
  keyword: "Matched keyword rule",
  model: "Model prediction",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Categorizer() {
  const [input, setInput] = useState(PRESETS[0]);
  const result = useMemo(() => classify(input), [input]);
  const answered = result ? STEPS.findIndex((s) => s.source === result.source) : -1;
  const autoApplied = result && (result.source !== "model" || result.confidence >= AUTO_APPLY_THRESHOLD);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="mono-label">Transaction merchant or description</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 美团外卖 or Hilton hotel"
            spellCheck={false}
            className="w-full rounded-card border border-border-glass bg-surface px-5 py-4 font-mono text-lg text-text placeholder:text-text-dim focus:border-terracotta focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setInput(preset)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
                input === preset
                  ? "border-terracotta bg-terracotta-soft text-text"
                  : "border-border-glass text-text-soft hover:border-text-dim hover:text-text",
              )}
            >
              {preset}
            </button>
          ))}
        </div>

        <ol className="flex flex-col gap-2" aria-label="Classification pipeline">
          {STEPS.map((step, i) => {
            const state = answered === -1 ? "idle" : i < answered ? "skipped" : i === answered ? "hit" : "idle";
            return (
              <li
                key={step.source}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-[12px] border px-4 py-3 transition-colors duration-300",
                  state === "hit" ? "border-amber bg-amber-soft" : "border-border-glass",
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-text-dim">0{i + 1}</span>
                  <div>
                    <p className={cn("font-display font-semibold", state === "hit" ? "text-text" : "text-text-soft")}>
                      {step.title}
                    </p>
                    <p className="font-mono text-xs text-text-dim">{step.detail}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "font-mono text-[0.7rem] uppercase tracking-[0.09em]",
                    state === "hit" ? "text-amber" : "text-text-dim",
                  )}
                >
                  {state === "hit" ? "Answered" : state === "skipped" ? "No match" : "—"}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative flex min-h-[420px] flex-col gap-6 overflow-hidden rounded-card border border-border-glass bg-surface p-6 sm:p-8">
        {result ? (
          <>
            <div>
              <p className="mono-label mb-3">Predicted category</p>
              <AnimatePresence mode="wait">
                <m.p
                  key={result.category}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold leading-tight text-text"
                >
                  {result.category}
                </m.p>
              </AnimatePresence>
              <p className="mt-2 font-mono text-xs text-text-soft">
                {SOURCE_LABEL[result.source]}
                {result.match && (
                  <>
                    {" · "}
                    <span className="text-amber">&ldquo;{result.match}&rdquo;</span>
                  </>
                )}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="mono-label">Confidence</span>
                <span className="font-mono text-sm text-text">{Math.round(result.confidence * 100)}%</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-surface-2">
                <m.div
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-terracotta"
                  animate={{ scaleX: result.confidence }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
                <span
                  className="absolute inset-y-0 w-px bg-text"
                  style={{ left: `${AUTO_APPLY_THRESHOLD * 100}%` }}
                  aria-hidden
                />
              </div>
              <p className={cn("mt-2 font-mono text-xs", autoApplied ? "text-text-soft" : "text-terracotta")}>
                {autoApplied
                  ? "Auto-applied, no review needed"
                  : `Below the ${Math.round(AUTO_APPLY_THRESHOLD * 100)}% bar → sent to the review queue`}
              </p>
            </div>

            <div>
              <p className="mono-label mb-3">Model scores, top 3</p>
              <ul className="flex flex-col gap-2.5">
                {result.ranked.slice(0, 3).map((row) => (
                  <li key={row.category} className="grid grid-cols-[minmax(0,9rem)_1fr_3rem] items-center gap-3">
                    <span className="truncate text-sm text-text-soft">{row.category}</span>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <m.div
                        className="h-full w-full origin-left rounded-full bg-amber"
                        animate={{ scaleX: row.probability }}
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    </div>
                    <span className="text-right font-mono text-xs text-text-dim">
                      {Math.round(row.probability * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {result.nearest.length > 0 && (
              <div>
                <p className="mono-label mb-2">Closest known merchants</p>
                <div className="flex flex-wrap gap-2">
                  {result.nearest.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-border-glass px-2.5 py-1 font-mono text-xs text-text-soft"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="m-auto font-mono text-sm text-text-dim">Type a merchant to classify it.</p>
        )}
      </div>
    </div>
  );
}
