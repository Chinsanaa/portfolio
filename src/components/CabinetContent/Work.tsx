"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { work } from "@/data/work";

export function Work() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <motion.div className="flex w-full flex-col gap-10">
      <section>
        <h3 className="mb-4 text-[10px] text-soft-sage-dark sm:text-xs">
          Photoshop Projects
        </h3>
        <p className="mb-4 text-[7px] leading-5 text-soft-ink-muted sm:text-[8px]">
          Add PNG/JPG to public/images/work/ and update src/data/work.ts
        </p>
        <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {work.photoshop.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              className="pixel-card group overflow-hidden text-left"
              onClick={() => setExpandedImage(item.image)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div className="relative aspect-square w-full overflow-hidden bg-soft-cream-dark">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition group-hover:brightness-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </motion.div>
              <motion.div className="p-3">
                <h4 className="text-[8px] sm:text-[10px]">{item.title}</h4>
                <p className="mt-1 text-[7px] leading-4 text-soft-ink-muted sm:text-[8px]">
                  {item.desc}
                </p>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <section>
        <h3 className="mb-4 text-[10px] text-soft-sage-dark sm:text-xs">
          Video Editing
        </h3>
        <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {work.videoEditing.map((item) => (
            <motion.div key={item.id} className="pixel-card overflow-hidden">
              <motion.div className="flex aspect-video items-center justify-center bg-soft-cream-dark">
                {item.video ? (
                  <video
                    src={item.video}
                    className="h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => void e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <motion.div className="p-4 text-center text-[7px] text-soft-ink-muted sm:text-[8px]">
                    <p>▶ Placeholder</p>
                    <p className="mt-2">Add MP4 to public/images/work/</p>
                  </motion.div>
                )}
              </motion.div>
              <motion.div className="p-3">
                <h4 className="text-[8px] sm:text-[10px]">{item.title}</h4>
                <p className="mt-1 text-[7px] leading-4 text-soft-ink-muted sm:text-[8px]">
                  {item.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-soft-ink/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
          >
            <motion.div
              className="pixel-window relative aspect-square max-h-[90vh] w-full max-w-4xl p-2"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImage}
                alt="Expanded work"
                fill
                className="object-contain p-2"
              />
              <button
                type="button"
                className="pixel-btn-soft absolute -bottom-12 left-1/2 -translate-x-1/2 px-6 py-2 text-[9px]"
                onClick={() => setExpandedImage(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
