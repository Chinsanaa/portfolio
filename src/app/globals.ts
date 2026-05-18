export const SOFT_COLORS = {
  navy: "#1e2a3a",
  navyLight: "#2d3f54",
  sage: "#a8bda8",
  sageDark: "#8fa88f",
  cream: "#ebe6dc",
  creamDark: "#d8d2c6",
  mustard: "#c9b87a",
  periwinkle: "#8fa4c4",
  lavender: "#b8a8c4",
  terracotta: "#c4a090",
  ink: "#2c3440",
  inkMuted: "#5a6570",
  skyTop: "#3d5a73",
  skyBottom: "#6b8fa8",
} as const;

export const SECTION_COLORS = {
  about: SOFT_COLORS.periwinkle,
  projects: SOFT_COLORS.mustard,
  skills: SOFT_COLORS.sageDark,
  work: SOFT_COLORS.lavender,
  socials: SOFT_COLORS.terracotta,
} as const;

export type SectionId = keyof typeof SECTION_COLORS;

export const SECTION_LABELS: Record<SectionId, string> = {
  about: "About",
  projects: "Projects",
  skills: "Skills",
  work: "Work",
  socials: "Socials",
};

/** Sections shown on the desktop. Add "work" when ready to publish. */
export const ENABLED_SECTIONS = [
  "about",
  "projects",
  "skills",
  "socials",
] as const satisfies readonly SectionId[];

export type EnabledSectionId = (typeof ENABLED_SECTIONS)[number];
