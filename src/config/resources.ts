export const FILES = {
  cvPdf: "/Chinsanaa_Chuluunbold_CV.pdf",
} as const;

export const IMAGES = {
  certificates: {
    claudeCodeInAction: "/images/certificates/claudecode_in_action.jfif",
    bloombergFinanceFundamentals: "/images/certificates/bloomberg_finance_fundamentals.jfif",
    googleAiEssentials: "/images/certificates/google_ai_essentials.jfif",
  },
  /* Generated editorial artwork. A null value renders the flat SVG
     fallback composition in ArtImage — the site never depends on these. */
  art: {
    hero: null,
    earnio: null,
    chat: null,
    about: null,
  } as { hero: string | null; earnio: string | null; chat: string | null; about: string | null },
} as const;

export const URLS = {
  socials: {
    email: "mailto:cc9287@nyu.edu",
    github: "https://github.com/Chinsanaa",
    linkedin: "https://www.linkedin.com/in/chinsanaa/",
  },
  projects: {
    earnio: "https://github.com/Chinsanaa/earnio",
    chatSystem: "https://github.com/Chinsanaa/chatsystem",
  },
  certificates: {
    claudeCodeInAction: "https://verify.skilljar.com/c/k6t2seqvaquz",
    bloombergFinanceFundamentals: "https://portal.bloombergforeducation.com/certificates/G5nAGjRned4SHRB5geGQURAR",
    googleAiEssentials: "https://www.coursera.org/account/accomplishments/specialization/DJV0EELAKXYN",
  },
} as const;

