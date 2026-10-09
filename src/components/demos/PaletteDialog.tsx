"use client";

import { useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { scrollToSection } from "@/components/ui/SmoothScroll";
import { setTheme, type ThemeChoice } from "@/components/ui/theme";
import { projects } from "@/components/portfolio/content";
import { FILES, URLS } from "@/config/resources";

const EMAIL = URLS.socials.email.replace("mailto:", "");

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

const THEMES: { choice: ThemeChoice; label: string }[] = [
  { choice: "light", label: "Light theme" },
  { choice: "dark", label: "Dark theme" },
  { choice: "system", label: "System theme" },
];

function downloadCv() {
  const a = document.createElement("a");
  a.href = FILES.cvPdf;
  a.download = "";
  a.click();
}

const itemClass =
  "flex cursor-pointer items-center justify-between gap-3 rounded-ui px-3 py-2.5 text-[0.95rem] text-text-soft data-[selected=true]:bg-hover data-[selected=true]:text-text";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[0.8125rem] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-text-dim";

function Hint({ children }: { children: ReactNode }) {
  return <span className="text-[0.8125rem] text-text-dim">{children}</span>;
}

export default function PaletteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [copied, setCopied] = useState(false);
  const close = () => onOpenChange(false);
  const goTo = (id: string) => {
    close();
    setTimeout(() => scrollToSection(id), 60);
  };
  const external = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-[rgba(18,19,21,0.45)]" />
        <Dialog.Content
          className="fixed left-1/2 top-[12vh] z-[201] w-[min(600px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-ui border border-rule bg-bg shadow-[var(--shadow)] focus:outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Search and commands</Dialog.Title>
          <Command label="Search and commands" loop className="flex flex-col">
            <Command.Input
              autoFocus
              placeholder="Jump to a section, open a project, change theme"
              className="w-full border-b border-rule bg-transparent px-5 py-4 text-base text-text placeholder:text-text-dim focus:outline-none"
            />
            <Command.List data-lenis-prevent className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-6 text-center text-sm text-text-dim">
                Nothing matches that. Try a section name or a project.
              </Command.Empty>
              <Command.Group heading="Go to" className={groupClass}>
                {SECTIONS.map((s) => (
                  <Command.Item key={s.id} value={s.label} keywords={["go", "section"]} onSelect={() => goTo(s.id)} className={itemClass}>
                    {s.label}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Projects" className={groupClass}>
                {projects.map((p) => (
                  <Command.Item
                    key={p.title}
                    value={p.title}
                    keywords={["project", "github"]}
                    onSelect={() => external(p.href)}
                    className={itemClass}
                  >
                    {p.title}
                    <Hint>GitHub ↗</Hint>
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Actions" className={groupClass}>
                <Command.Item
                  value="Copy email" keywords={["address", "contact"]}
                  onSelect={() => {
                    navigator.clipboard?.writeText(EMAIL);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1400);
                  }}
                  className={itemClass}
                >
                  {copied ? "Email copied" : "Copy email"}
                  <Hint>{EMAIL}</Hint>
                </Command.Item>
                <Command.Item
                  value="Download CV" keywords={["resume", "pdf"]}
                  onSelect={() => {
                    downloadCv();
                    close();
                  }}
                  className={itemClass}
                >
                  Download CV
                  <Hint>PDF</Hint>
                </Command.Item>
                <Command.Item value="Open LinkedIn" onSelect={() => external(URLS.socials.linkedin)} className={itemClass}>
                  Open LinkedIn
                  <Hint>↗</Hint>
                </Command.Item>
                <Command.Item value="Open GitHub profile" onSelect={() => external(URLS.socials.github)} className={itemClass}>
                  Open GitHub profile
                  <Hint>↗</Hint>
                </Command.Item>
              </Command.Group>
              <Command.Group heading="Theme" className={groupClass}>
                {THEMES.map((t) => (
                  <Command.Item
                    key={t.choice}
                    value={t.label}
                    keywords={["theme", "mode", "appearance"]}
                    onSelect={() => setTheme(t.choice)}
                    className={itemClass}
                  >
                    {t.label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
