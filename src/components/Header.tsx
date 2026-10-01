"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Menu, Search, X } from "lucide-react";
import { navItems, profile } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { openCommandPalette } from "./CommandPalette";

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: highlight the section currently in the upper part of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
          aria-label="Umair Tahir, home"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent-bg font-mono text-sm font-bold text-accent-fg">
            UT
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {navItems.map((item) => {
              const isActive = onHome && active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-md px-3 py-2 transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors hover:text-fg sm:flex"
            aria-label="Open quick navigation"
          >
            <Search className="size-4" aria-hidden />
            <span>Search</span>
            <kbd className="rounded border border-line px-1.5 font-mono text-[11px]">Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <a
            href={profile.resume}
            download
            className="hidden h-10 items-center gap-2 rounded-lg bg-accent-bg px-4 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 md:flex"
          >
            <Download className="size-4" aria-hidden />
            Résumé
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-line bg-surface lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <span className="scroll-progress" aria-hidden />

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base text-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-3">
              <a
                href={profile.resume}
                download
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-accent-bg text-sm font-semibold text-accent-fg"
              >
                <Download className="size-4" aria-hidden />
                Download résumé
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
