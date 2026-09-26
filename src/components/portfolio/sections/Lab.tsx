"use client";

import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { URLS } from "@/config/resources";
import { LazyMount } from "@/components/ui/LazyMount";

const labPlaceholder = <div className="min-h-[420px]" aria-hidden />;
const Categorizer = dynamic(() => import("@/components/demos/Categorizer"), {
  ssr: false,
  loading: () => labPlaceholder,
});

export function Lab() {
  return (
    <section className="section lab" id="lab">
      <SectionHeader number="04" title="Lab" kicker="Try it live" />
      <Reveal>
        <p className="mb-10 max-w-[60ch] text-text-soft">
          The transaction classifier from{" "}
          <a
            href={URLS.projects.financing}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta underline-offset-4 hover:underline"
          >
            Financing
          </a>
          , running in your browser. Type any merchant from an Alipay or WeChat statement and watch
          it go through the same layers: trusted merchant rules first, then keyword rules, then a
          model trained on those rules. This demo model is a lightweight stand-in for the real
          scikit-learn pipeline.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <LazyMount placeholder={labPlaceholder}>
          <Categorizer />
        </LazyMount>
      </Reveal>
    </section>
  );
}
