export const FILES = {
  cvPdf: "/Chinsanaa_Chuluunbold_CV.pdf",
} as const;

export const IMAGES = {
  certificates: {
    claudeCodeInAction: "/images/certificates/claudecode_in_action.jfif",
    bloombergFinanceFundamentals: "/images/certificates/bloomberg_finance_fundamentals.jfif",
    googleAiEssentials: "/images/certificates/google_ai_essentials.jfif",
  },
  /* Editorial artwork. Each path is a placeholder for a file to be
     uploaded later — drop matching PNGs into public/images/art/ with
     these exact filenames and the real photo takes over automatically.
     Until a file exists at that path, ArtImage falls back to its flat
     SVG composition (see the onError handler in ArtImage.tsx), so
     nothing breaks in the meantime. */
  art: {
    earnio: "/images/art/earnio.png",
    chat: "/images/art/chat.png",
    financing: "/images/art/financing.png",
    about: "/images/art/about.png",
  } as { earnio: string | null; chat: string | null; financing: string | null; about: string | null },
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
    financing: "https://github.com/Chinsanaa/financing",
  },
  certificates: {
    claudeCodeInAction: "https://verify.skilljar.com/c/k6t2seqvaquz",
    bloombergFinanceFundamentals: "https://portal.bloombergforeducation.com/certificates/G5nAGjRned4SHRB5geGQURAR",
    googleAiEssentials: "https://www.coursera.org/account/accomplishments/specialization/DJV0EELAKXYN",
  },
} as const;

