"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { navItems, profile, projects, socials } from "@/data/site";
import { toggleTheme } from "./ThemeToggle";

const OPEN_EVENT = "command-palette:open";

/** Lets any component (for example the header button) open the palette. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Command = { id: string; group: string; label: string; run: () => void };

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const external = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...navItems.map((item) => ({
        id: `nav-${item.id}`,
        group: "Go to",
        label: item.label,
        run: go(`/#${item.id}`),
      })),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        group: "Projects",
        label: `${project.name}: ${project.tagline}`,
        run: go(`/work/${project.slug}`),
      })),
      { id: "resume", group: "Actions", label: "Download résumé (PDF)", run: external(profile.resume) },
      {
        id: "copy-email",
        group: "Actions",
        label: `Copy email address (${profile.email})`,
        run: () => void navigator.clipboard?.writeText(profile.email),
      },
      { id: "theme", group: "Actions", label: "Switch theme", run: toggleTheme },
      { id: "github", group: "Links", label: "Open GitHub", run: external(socials.github) },
      { id: "linkedin", group: "Links", label: "Open LinkedIn", run: external(socials.linkedin) },
      { id: "whatsapp", group: "Links", label: "Message on WhatsApp", run: external(socials.whatsapp) },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const show = () => {
      lastFocused.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setIndex(0);
      setOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);
  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    close();
    command.run();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") close();
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommand(results[index]);
    } else if (event.key === "Tab") {
      // The input is the only focus stop, so keep focus inside the dialog.
      event.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onKeyDown={onKeyDown}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-subtle" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIndex(0);
            }}
            placeholder="Search sections, projects and actions"
            aria-label="Search sections, projects and actions"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-subtle"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-subtle">Esc</kbd>
        </div>

        <ul id="command-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted">Nothing matches &ldquo;{query}&rdquo;.</li>
          )}
          {results.map((command, i) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;
            const selected = i === index;
            return (
              <li key={command.id} role="presentation">
                {showGroup && (
                  <p className="px-3 pt-3 pb-1 font-mono text-[11px] uppercase tracking-widest text-subtle">
                    {command.group}
                  </p>
                )}
                <button
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={selected}
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => runCommand(command)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
                    selected ? "bg-accent-soft text-fg" : "text-muted"
                  }`}
                >
                  <span className="truncate">{command.label}</span>
                  {selected && <CornerDownLeft className="size-4 shrink-0 text-accent" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
