import Link from "next/link";
import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { profile, quickFacts, socials } from "@/data/site";
import { DotField } from "./DotField";
import { HeroPortrait } from "./HeroPortrait";
import { Reveal } from "./Reveal";

const socialLinks = [
  { href: socials.github, label: "GitHub", Icon: FaGithub },
  { href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: socials.whatsapp, label: "WhatsApp", Icon: FaWhatsapp },
];

// The headline is split into words so each one can swing up in turn (see `.word` in globals.css).
// U+2011 is a non-breaking hyphen, so the line never splits inside "role-based".
const headline: { text: string; accent?: boolean }[] = [
  { text: "Full" },
  { text: "stack" },
  { text: "developer" },
  { text: "who" },
  { text: "builds" },
  { text: "role‑based", accent: true },
  { text: "web", accent: true },
  { text: "platforms,", accent: true },
  { text: "end" },
  { text: "to" },
  { text: "end." },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <DotField />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent-soft blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 pt-14 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20 lg:pt-20 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            {profile.availability}
          </p>

          <h1
            aria-label={profile.headline}
            className="words mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {headline.map((word, i) => (
              <span key={i} aria-hidden>
                <span
                  className={word.accent ? "word text-accent" : "word"}
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                >
                  {word.text}
                </span>{" "}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-accent-bg px-5 font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              See my work
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <a
              href={profile.resume}
              download
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-line bg-surface px-5 font-semibold transition-colors hover:border-subtle"
            >
              <Download className="size-4" aria-hidden />
              Download résumé
            </a>
            <a
              href={socials.email}
              className="inline-flex h-12 items-center gap-2 rounded-lg px-3 font-medium text-muted transition-colors hover:text-fg"
            >
              <Mail className="size-4" aria-hidden />
              {profile.email}
            </a>
          </div>

          <ul className="mt-8 flex items-center gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-subtle hover:text-fg"
                >
                  <Icon className="size-[18px]" aria-hidden />
                </a>
              </li>
            ))}
            <li className="ml-2 flex items-center gap-1.5 text-sm text-subtle">
              <MapPin className="size-4" aria-hidden />
              {profile.location}
            </li>
          </ul>
        </div>

        <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
          <HeroPortrait />
        </div>
      </div>

      <Reveal>
        <dl className="relative mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden border-y border-line bg-line md:grid-cols-5">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="bg-bg px-5 py-5 last:col-span-2 sm:px-6 md:last:col-span-1">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">{fact.label}</dt>
              <dd className="mt-1.5 text-sm font-medium text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
