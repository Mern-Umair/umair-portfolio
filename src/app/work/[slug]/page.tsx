import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock } from "lucide-react";
import { ProjectCover } from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Only the slugs above exist; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name}: ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.name}: ${project.tagline}`, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const hasLive = project.links.some((link) => link.live);

  return (
    <article className="mx-auto max-w-4xl px-5 pt-10 pb-24 sm:px-8 sm:pt-14">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden />
        All work
      </Link>

      <Reveal>
        <header className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.kind === "fullstack" ? "Full stack project" : "Front-end build"} · {project.year}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 text-xl text-muted">{project.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors ${
                    link.live
                      ? "bg-accent-bg text-accent-fg hover:opacity-90"
                      : "border border-line bg-surface hover:border-subtle"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          {hasLive && (
            <p className="mt-3 flex items-center gap-2 text-sm text-subtle">
              <Clock className="size-4 shrink-0" aria-hidden />
              Hosted on a free plan, so the first load can take up to a minute while the server wakes up.
            </p>
          )}
        </header>
      </Reveal>

      {/* Only projects with a real screenshot get a cover here; the parts are listed further down. */}
      {project.image && (
        <div className="reveal-unfold mt-10">
          <ProjectCover project={project} priority />
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_15rem]">
        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Overview</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{project.summary}</p>
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight">What it does</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight">How it is put together</h2>
            <ol className="mt-4 overflow-hidden rounded-2xl border border-line">
              {project.structure.map((row, i) => (
                <li
                  key={row.layer}
                  className="flex flex-col gap-1 border-b border-line bg-surface px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-5"
                >
                  <span className="flex items-center gap-3 sm:w-40 sm:shrink-0">
                    <span className="grid size-6 place-items-center rounded-md bg-accent-soft font-mono text-[11px] text-accent">
                      {i + 1}
                    </span>
                    <span className="font-medium">{row.layer}</span>
                  </span>
                  <span className="text-sm text-muted">{row.detail}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <aside className="space-y-8">
          {project.roles && (
            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">User roles</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.roles.map((role) => (
                  <li key={role} className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-sm">
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">Tech stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-md bg-surface-2 px-2.5 py-1.5 text-sm text-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      <Link
        href={`/work/${next.slug}`}
        data-tilt="3"
        className="spot group mt-16 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 hover:border-subtle"
      >
        <span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">Next project</span>
          <span className="mt-1 block font-display text-xl font-semibold">{next.name}</span>
          <span className="text-sm text-muted">{next.tagline}</span>
        </span>
        <ArrowRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}
