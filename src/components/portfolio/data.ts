import { URLS } from "@/config/resources";

export interface Project {
  title: string;
  impact: string;
  emoji: string;
  href: string;
  tagLabels: string[];
}

export const projects: Project[] = [
  {
    title: "Earnio",
    impact:
      "UGC monetization platform connecting Mongolian Gen Z creators with brand sponsorships. Full-stack system for earnings tracking, sponsorship applications, and MNT withdrawals, shipped as both a web app and a native iOS app.",
    emoji: "\u{1F4B0}",
    href: URLS.projects.earnio,
    tagLabels: ["Next.js", "Express", "Supabase", "SwiftUI (iOS)"],
  },
  {
    title: "ICDS Chat System",
    impact:
      "TCP socket-based distributed chat application with an LLM-powered chatbot and TextBlob sentiment analysis, plus built-in multiplayer games (Snake, Tic-Tac-Toe) and an emoji picker.",
    emoji: "\u{1F4AC}",
    href: URLS.projects.chatSystem,
    tagLabels: ["Python", "Tkinter", "Ollama", "TextBlob", "TCP Sockets"],
  },
];

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  href: string;
  emoji: string;
}

export const certificates: Certificate[] = [
  {
    title: "Claude Code in Action",
    issuer: "Anthropic Education",
    date: "June 2026",
    href: URLS.certificates.claudeCodeInAction,
    emoji: "\u{1F4DC}",
  },
  {
    title: "Bloomberg Finance Fundamentals",
    issuer: "Bloomberg for Education",
    date: "May 2026",
    href: URLS.certificates.bloombergFinanceFundamentals,
    emoji: "\u{1F4BC}",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google, via Coursera",
    date: "June 2026",
    href: URLS.certificates.googleAiEssentials,
    emoji: "\u{1F537}",
  },
];

export interface SkillCategory {
  title: string;
  emoji: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    emoji: "\u{1F4BB}",
    skills: ["Python", "SQL"],
  },
  {
    title: "Tools",
    emoji: "\u{1F6E0}\u{FE0F}",
    skills: ["Excel (Financial Modeling)", "Power BI"],
  },
  {
    title: "AI Workflows",
    emoji: "\u{1F4CA}",
    skills: ["AI Prompting", "Generative AI Workflows", "Claude Code"],
  },
  {
    title: "Soft Skills",
    emoji: "\u{1F91D}",
    skills: ["Leadership", "Communication", "Problem Solving"],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    role: "Financial Analyst",
    company: "Next Group — Ulaanbaatar, Mongolia",
    date: "May 2026 – Present",
    description: "Analyzing sales and COGS data using Excel, SQL, and Power BI.",
  },
  {
    role: "Administrative Assistant",
    company: "Next Group — “Maybee Pop & Joy” Launch, Ulaanbaatar, Mongolia",
    date: "June 2025 – Aug 2025",
    description:
      "Supported pricing, cashiering, and sales during the company's launch phase. Ran social media marketing and customer support for the new business, and configured operational systems while managing product stocking and inventory.",
  },
  {
    role: "Sales Analyst",
    company: "Next Group — Ulaanbaatar, Mongolia",
    date: "June 2024 – July 2024",
    description:
      "Traveled to multiple Chinese cities (Erenhot, Baoding, Tianjin, Beijing, Shanghai) to meet existing business partners. Visited factories to assess production processes and quality standards, attended exhibitions to evaluate potential new partners, and provided consumer-focused insights that contributed to team decisions on product selection and business strategy.",
  },
  {
    role: "Human Resources Intern",
    company: "Next Group — Ulaanbaatar, Mongolia",
    date: "June 2023 – Aug 2023",
    description:
      "Maintained and updated employee records across the HR database, ensuring data accuracy and confidentiality.",
  },
  {
    role: "President, Entrepreneur Club",
    company: "Orchlon International School — Ulaanbaatar, Mongolia",
    date: "Sept 2024 – June 2025",
    description:
      "Founded and led the school's Entrepreneur Club, organizing fundraisers to finance a charity event at a local orphanage. Facilitated weekly meetings on sales strategy and marketing tactics, allocated responsibilities across club members, and personally handled the majority of the club's planning, logistics, and execution.",
  },
];
