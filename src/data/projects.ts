export type Project = {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  githubLink: string;
  status: string;
};

export const projects: Project[] = [
  {
    id: "icds-chat",
    name: "ICDS Chat System",
    shortDesc: "Distributed chat application with Python & Tkinter",
    fullDesc:
      "TCP socket-based distributed chat. Features LLM-powered chatbot with personality modes, sentiment analysis via TextBlob, multiplayer games (Snake, Tic-Tac-Toe), and an emoji picker. Final course project.",
    techStack: ["Python", "Tkinter", "Ollama", "TextBlob", "TCP Sockets"],
    githubLink: "https://github.com/Chinsanaa/chatsystem",
    status: "Complete",
  },
  {
    id: "creator-toolkit",
    name: "Creator Toolkit",
    shortDesc: "TypeScript toolkit for creative workflows",
    fullDesc:
      "A TypeScript-based creator toolkit with modular utilities for building and shipping creative projects faster.",
    techStack: ["TypeScript", "Node.js"],
    githubLink: "https://github.com/Chinsanaa/creator-toolkit",
    status: "In Progress",
  },
];
