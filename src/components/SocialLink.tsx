"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type SocialLinkProps = {
  platform: string;
  url: string;
  color: string;
  label: string;
  comingSoon?: boolean;
};

export function SocialLink({
  platform,
  url,
  color,
  label,
  comingSoon,
}: SocialLinkProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="pixel-card flex min-h-[72px] min-w-[72px] flex-col items-center justify-center gap-2 p-3 sm:min-h-[80px] sm:min-w-[80px]"
      style={{ borderColor: color }}
    >
      <Image
        src={`/icons/${platform}.svg`}
        alt={label}
        width={28}
        height={28}
        className="h-7 w-7"
      />
      <span className="text-[7px] leading-tight text-soft-ink sm:text-[8px]">
        {label}
      </span>
      {comingSoon && (
        <span className="text-[6px] text-soft-ink-muted sm:text-[7px]">
          soon
        </span>
      )}
    </motion.div>
  );

  if (comingSoon) {
    return (
      <motion.div className="cursor-not-allowed opacity-60" title="Coming soon">
        {content}
      </motion.div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="block"
    >
      {content}
    </a>
  );
}
