export const skills = {
  technical: [
    "Video Editing",
    "Microsoft Office",
    "Data Organization",
    "Social Media Marketing",
    "Python Coding",
  ],
  programming: ["Python", "C++", "HTML", "CSS"],
  languages: [
    "English (Native)",
    "Mongolian (Native)",
    "Mandarin (Elementary)",
  ],
  interests: [
    "Basketball",
    "Volleyball",
    "Soccer",
    "Boxing",
    "Running",
    "Investing",
    "Movies",
  ],
} as const;

export const skillCategories = [
  { key: "technical" as const, label: "Technical Skills", color: "#8fa4c4" },
  { key: "programming" as const, label: "Programming", color: "#c9b87a" },
  { key: "languages" as const, label: "Spoken Languages", color: "#8fa88f" },
  { key: "interests" as const, label: "Interests", color: "#b8a8c4" },
];
