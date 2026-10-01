"use client";

import { Moon, Sun } from "lucide-react";

/** Flips the data-theme attribute that the CSS tokens key off, and remembers the choice. */
export function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked (private mode); the theme still changes for this visit.
  }
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-fg"
      aria-label="Switch between dark and light theme"
    >
      {/* Both icons render; CSS shows the one for the other theme, so there is no hydration mismatch. */}
      <Sun className="size-[18px] [[data-theme=light]_&]:hidden" aria-hidden />
      <Moon className="hidden size-[18px] [[data-theme=light]_&]:block" aria-hidden />
    </button>
  );
}
