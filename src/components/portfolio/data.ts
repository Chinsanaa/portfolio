export type ProjectTag = "ML" | "Finance" | "Data" | "Web";

export interface Project {
  title: string;
  impact: string;
  emoji: string;
  href: string;
  tags: ProjectTag[];
  tagLabels: string[];
}

export const projects: Project[] = [
  {
    title: "Earnio",
    impact:
      "Full-stack financial platform for income tracking, budgeting, and wealth analytics with real-time data visualization.",
    emoji: "\u{1F4B0}",
    href: "https://github.com/chinsanaa/Earnio",
    tags: ["Web", "Data"],
    tagLabels: ["Web Dev", "Python", "Finance"],
  },
  {
    title: "ChatSystem",
    impact:
      "Real-time messaging application with user authentication, database persistence, and interactive chat interface.",
    emoji: "\u{1F4AC}",
    href: "https://github.com/chinsanaa/ChatSystem",
    tags: ["Web"],
    tagLabels: ["Web Dev", "HTML/CSS", "Database"],
  },
  {
    title: "Trading",
    impact:
      "Algorithmic trading system with ML-based strategy optimization, backtesting framework, and live market analysis.",
    emoji: "\u{1F4C8}",
    href: "https://github.com/chinsanaa/Trading",
    tags: ["ML", "Finance"],
    tagLabels: ["Python", "Machine Learning", "Finance"],
  },
];

export const filterTags: { label: string; value: ProjectTag | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Machine Learning", value: "ML" },
  { label: "Finance", value: "Finance" },
  { label: "Data Analysis", value: "Data" },
  { label: "Web Dev", value: "Web" },
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
    href: "https://www.anthropic.com/claude",
    emoji: "\u{1F4DC}",
  },
  {
    title: "Bloomberg Finance Fundamentals",
    issuer: "Bloomberg for Education",
    date: "May 2026",
    href: "https://www.bloomberg.com/",
    emoji: "\u{1F4BC}",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google via Coursera",
    date: "June 2026",
    href: "https://www.coursera.org/learn/google-ai-essentials",
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
    title: "Programming Languages",
    emoji: "\u{1F4BB}",
    skills: ["Python", "SQL", "C++", "HTML/CSS"],
  },
  {
    title: "Tools & Platforms",
    emoji: "\u{1F6E0}\u{FE0F}",
    skills: ["Excel", "Power BI", "VS Code", "Claude Code"],
  },
  {
    title: "Data & Finance",
    emoji: "\u{1F4CA}",
    skills: [
      "Financial Modeling",
      "Machine Learning",
      "Data Analysis",
      "Statistical Analysis",
    ],
  },
  {
    title: "Soft Skills",
    emoji: "\u{1F91D}",
    skills: ["Leadership", "Communication", "Problem Solving", "AI Workflows"],
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
    role: "Administrative Assistant",
    company: "NYU Shanghai Operations",
    date: "2023 – 2024",
    description:
      "Coordinated multi-stakeholder initiatives, built data tracking systems for campus operations, and improved process efficiency through automation and documentation.",
  },
  {
    role: "HR Intern",
    company: "Corporate Finance Division",
    date: "2024 – 2025",
    description:
      "Optimized recruitment pipeline using data analysis, reducing hiring time by 35%, trained 200+ candidates on financial concepts, and managed stakeholder relations across departments.",
  },
  {
    role: "Data Analysis Intern",
    company: "Finance Research Lab",
    date: "Summer 2024",
    description:
      "Developed Python-based financial analysis tools, built predictive models for market trends, and automated data pipeline processing 50K+ daily market records.",
  },
  {
    role: "Research Assistant",
    company: "NYU Shanghai Data Science Lab",
    date: "2024 – Present",
    description:
      "Contributed to machine learning research projects, implemented data visualization dashboards in Power BI, and published findings on financial data analysis methodologies.",
  },
  {
    role: "President, Entrepreneur Club",
    company: "NYU Shanghai",
    date: "2025 – Present",
    description:
      "Led cross-functional team building startup culture, organized pitch competitions, and mentored 50+ student entrepreneurs on go-to-market strategy and fundraising.",
  },
];
