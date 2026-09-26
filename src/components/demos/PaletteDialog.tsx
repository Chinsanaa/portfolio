"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { m } from "framer-motion";
import { scrollToSection } from "@/components/ui/SmoothScroll";
import {
  certificates,
  experience,
  highlights,
  projects,
  skillCategories,
} from "@/components/portfolio/content";
import { FILES, URLS } from "@/config/resources";
import { cn } from "@/lib/utils";
import type { PaletteMode } from "./CommandPalette";

const EMAIL = URLS.socials.email.replace("mailto:", "");

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "lab", label: "Lab" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

function downloadCv() {
  const a = document.createElement("a");
  a.href = FILES.cvPdf;
  a.download = "";
  a.click();
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: PaletteMode;
  onModeChange: (mode: PaletteMode) => void;
}

export default function PaletteDialog({ open, onOpenChange, mode, onModeChange }: Props) {
  const goTo = (id: string) => {
    onOpenChange(false);
    setTimeout(() => scrollToSection(id), 60);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-[12vh] z-[201] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-card border border-border-glass bg-bg-2 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] focus:outline-none"
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">
            {mode === "palette" ? "Command palette" : "Terminal"}
          </Dialog.Title>
          <div className="flex items-center justify-between border-b border-border-glass px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-terracotta/80" />
              <span className="size-2.5 rounded-full bg-amber/70" />
              <span className="size-2.5 rounded-full bg-text-dim/60" />
            </div>
            <div className="flex gap-1 font-mono text-[0.7rem] uppercase tracking-[0.09em]">
              {(["palette", "terminal"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => onModeChange(tab)}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    mode === tab ? "bg-surface-2 text-text" : "text-text-dim hover:text-text-soft",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {mode === "palette" ? (
            <Palette
              goTo={goTo}
              openTerminal={() => onModeChange("terminal")}
              close={() => onOpenChange(false)}
            />
          ) : (
            <Terminal goTo={goTo} close={() => onOpenChange(false)} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ----- Palette ------------------------------------------------------ */

const itemClass =
  "flex cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-[0.95rem] text-text-soft data-[selected=true]:bg-surface-2 data-[selected=true]:text-text";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.09em] [&_[cmdk-group-heading]]:text-text-dim";

function Hint({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[0.7rem] uppercase text-text-dim">{children}</span>;
}

function Palette({
  goTo,
  openTerminal,
  close,
}: {
  goTo: (id: string) => void;
  openTerminal: () => void;
  close: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const external = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <Command label="Command palette" loop className="flex flex-col">
      <Command.Input
        autoFocus
        placeholder="Type a command or search…"
        className="w-full border-b border-border-glass bg-transparent px-5 py-4 text-base text-text placeholder:text-text-dim focus:outline-none"
      />
      <Command.List data-lenis-prevent className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-text-dim">
          No results. Try the terminal.
        </Command.Empty>
        <Command.Group heading="Navigate" className={groupClass}>
          {SECTIONS.map((s) => (
            <Command.Item key={s.id} value={`go ${s.label}`} onSelect={() => goTo(s.id)} className={itemClass}>
              {s.label}
              <Hint>Jump</Hint>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Actions" className={groupClass}>
          <Command.Item value="open terminal shell" onSelect={openTerminal} className={itemClass}>
            Open terminal
            <Hint>/</Hint>
          </Command.Item>
          <Command.Item
            value="download cv resume"
            onSelect={() => {
              downloadCv();
              close();
            }}
            className={itemClass}
          >
            Download CV
            <Hint>PDF</Hint>
          </Command.Item>
          <Command.Item
            value="copy email address"
            onSelect={() => {
              navigator.clipboard?.writeText(EMAIL);
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }}
            className={itemClass}
          >
            {copied ? "Copied to clipboard" : "Copy email"}
            <Hint>{EMAIL}</Hint>
          </Command.Item>
          <Command.Item value="linkedin" onSelect={() => external(URLS.socials.linkedin)} className={itemClass}>
            Open LinkedIn
            <Hint>↗</Hint>
          </Command.Item>
          <Command.Item value="github" onSelect={() => external(URLS.socials.github)} className={itemClass}>
            Open GitHub
            <Hint>↗</Hint>
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Projects" className={groupClass}>
          {projects.map((p) => (
            <Command.Item
              key={p.title}
              value={`project ${p.title} ${p.tagLabels.join(" ")}`}
              onSelect={() => external(p.href)}
              className={itemClass}
            >
              {p.title}
              <Hint>{p.tagLabels.slice(0, 2).join(" · ")}</Hint>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
}

/* ----- Terminal ----------------------------------------------------- */

type Line = ReactNode;
interface Entry {
  id: number;
  cmd: string | null;
  output: Line[];
}

const COMMANDS: Record<string, string> = {
  help: "list commands",
  whoami: "who is this?",
  projects: "things I've built",
  skills: "tools and languages",
  experience: "where I've worked",
  certs: "certificates",
  contact: "how to reach me",
  cv: "download my CV",
  "goto <section>": "jump to a section (try: goto lab)",
  ls: "list sections",
  clear: "clear the screen",
  exit: "close the terminal",
};

const Accent = ({ children }: { children: ReactNode }) => (
  <span className="text-amber">{children}</span>
);
const Dim = ({ children }: { children: ReactNode }) => (
  <span className="text-text-dim">{children}</span>
);
const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    className="text-terracotta underline-offset-4 hover:underline"
  >
    {children}
  </a>
);

const WELCOME: Line[] = [
  <span key="w1">
    Welcome to <Accent>chinsanaa.me</Accent> v2.0
  </span>,
  <Dim key="w2">Type &lsquo;help&rsquo; to see what you can do. Tab autocompletes.</Dim>,
];

function run(
  input: string,
  actions: { goTo: (id: string) => void; close: () => void },
): Line[] | "clear" {
  const [cmd, ...args] = input.trim().split(/\s+/);
  const name = cmd.toLowerCase();

  switch (name) {
    case "":
      return [];
    case "help":
      return Object.entries(COMMANDS).map(([c, d]) => (
        <span key={c}>
          <Accent>{c.padEnd(16, " ")}</Accent>
          <Dim>{d}</Dim>
        </span>
      ));
    case "whoami":
      return [
        <span key="n" className="text-text">
          Chinsanaa Chuluunbold
        </span>,
        "Data Science major, Finance concentration · NYU Shanghai '29",
        <Dim key="d">---</Dim>,
        ...highlights.map((h) => `• ${h}`),
      ];
    case "projects":
      return projects.flatMap((p, i) => [
        <span key={`${p.title}-t`}>
          <Accent>{String(i + 1).padStart(2, "0")}</Accent> <span className="text-text">{p.title}</span>{" "}
          <Dim>[{p.tagLabels.join(", ")}]</Dim>
        </span>,
        <span key={`${p.title}-l`}>
          {"   "}
          <Link href={p.href}>{p.href.replace("https://", "")}</Link>
        </span>,
      ]);
    case "skills":
      return skillCategories.map((c) => (
        <span key={c.title}>
          <Accent>{c.title.padEnd(12, " ")}</Accent> {c.skills.join(", ")}
        </span>
      ));
    case "experience":
      return experience.map((e) => (
        <span key={e.role + e.date}>
          <Dim>{e.date.padEnd(22, " ")}</Dim> <span className="text-text">{e.role}</span>
        </span>
      ));
    case "certs":
      return certificates.map((c) => (
        <span key={c.title}>
          <Accent>✓</Accent> {c.title} <Dim>· {c.issuer}</Dim>
        </span>
      ));
    case "contact":
      return [
        <span key="e">
          email{"    "}
          <Link href={URLS.socials.email}>{EMAIL}</Link>
        </span>,
        <span key="l">
          linkedin{" "}
          <Link href={URLS.socials.linkedin}>{URLS.socials.linkedin.replace("https://www.", "")}</Link>
        </span>,
        <span key="g">
          github{"   "}
          <Link href={URLS.socials.github}>{URLS.socials.github.replace("https://", "")}</Link>
        </span>,
      ];
    case "cv":
    case "resume":
      downloadCv();
      return ["Downloading Chinsanaa_Chuluunbold_CV.pdf…"];
    case "ls":
      return [SECTIONS.map((s) => s.id).join("  ")];
    case "cd":
    case "goto": {
      const target = SECTIONS.find(
        (s) => s.id === args[0]?.toLowerCase() || s.label.toLowerCase() === args[0]?.toLowerCase(),
      );
      if (!target) return [<Dim key="e">usage: goto &lt;{SECTIONS.map((s) => s.id).join("|")}&gt;</Dim>];
      actions.goTo(target.id);
      return [`→ ${target.label}`];
    }
    case "clear":
      return "clear";
    case "exit":
    case "quit":
      actions.close();
      return [];
    case "sudo":
      if (args.join(" ") === "hire-me")
        return [
          <Dim key="p">[sudo] password for guest: ••••••••</Dim>,
          <span key="g">
            <Accent>Access granted.</Accent> Let&rsquo;s talk: <Link href={URLS.socials.email}>{EMAIL}</Link>
          </span>,
        ];
      return [<Dim key="s">guest is not in the sudoers file. Try: sudo hire-me</Dim>];
    case "echo":
      return [args.join(" ")];
    default:
      return [
        <span key="nf">
          command not found: <span className="text-terracotta">{name}</span>. Try &lsquo;help&rsquo;.
        </span>,
      ];
  }
}

const COMPLETIONS = [
  ...Object.keys(COMMANDS).map((c) => c.split(" ")[0]),
  ...SECTIONS.map((s) => `goto ${s.id}`),
  "sudo hire-me",
];

function Terminal({ goTo, close }: { goTo: (id: string) => void; close: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, cmd: null, output: WELCOME }]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [entries]);

  const submit = () => {
    const cmd = value;
    setValue("");
    if (cmd.trim()) history.current.unshift(cmd);
    cursor.current = -1;
    const output = run(cmd, { goTo, close });
    if (output === "clear") setEntries([]);
    else setEntries((prev) => [...prev, { id: prev.length + Date.now(), cmd, output }]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, Math.min(history.current.length - 1, cursor.current + (e.key === "ArrowUp" ? 1 : -1)));
      cursor.current = next;
      setValue(next === -1 ? "" : history.current[next]);
    } else if (e.key === "Tab") {
      // Keep Radix's focus trap from moving focus off the input.
      e.preventDefault();
      e.stopPropagation();
      const match = COMPLETIONS.find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    }
  };

  return (
    <div
      ref={scroller}
      data-lenis-prevent
      onClick={() => inputRef.current?.focus()}
      className="h-[min(440px,62vh)] overflow-y-auto px-5 py-4 font-mono text-[0.82rem] leading-relaxed text-text-soft"
    >
      {entries.map((entry) => (
        <m.div
          key={entry.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-2"
        >
          {entry.cmd !== null && (
            <div>
              <Prompt /> <span className="text-text">{entry.cmd}</span>
            </div>
          )}
          {entry.output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line}
            </div>
          ))}
        </m.div>
      ))}
      <div className="flex items-center gap-2">
        <Prompt />
        <input
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal command"
          className="flex-1 bg-transparent text-text caret-terracotta focus:outline-none"
        />
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="shrink-0">
      <span className="text-terracotta">guest</span>
      <Dim>@</Dim>
      <span className="text-amber">chinsanaa</span>
      <Dim>:~$</Dim>
    </span>
  );
}
