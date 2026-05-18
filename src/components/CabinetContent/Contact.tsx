"use client";

import { motion } from "framer-motion";
import { SocialLink } from "@/components/SocialLink";
import { socialLinks } from "@/data/socials";

export function Contact() {
  return (
    <motion.div className="flex w-full flex-col items-center gap-6">
      <p className="text-center text-[8px] leading-6 text-soft-ink-muted sm:text-[10px]">
        Socials — tap an icon to visit 
      </p>
      <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {socialLinks.map((social) => (
          <SocialLink
            key={social.platform}
            platform={social.platform}
            url={social.url}
            color={social.color}
            label={social.label}
            comingSoon={social.comingSoon}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
