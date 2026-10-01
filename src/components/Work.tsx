import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, socials, type Project } from "@/data/site";
import { ProjectCover } from "./ProjectCover";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const groups: { kind: Project["kind"]; title: string; note: string }[] = [
  { kind: "fullstack", title: "Full stack", note: "Front end, API and database" },
  { kind: "frontend", title: "Front end", note: "Responsive sites built in React" },
];

function ProjectCard({ project, priority }: { project: Project; priority: boolean }) {
  const hasLive = project.links.some((link) => link.live);
  return (
    <article
      data-tilt="4"
      className="spot group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-4 hover:border-subtle sm:p-5"
    >
      <div className="tilt-pop">
        <ProjectCover project={project} priority={priority} />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-subtle">
          {project.year}
          {hasLive && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-2 py-0.5 text-ok">
              <span className="size-1.5 rounded-full bg-ok" aria-hidden />
              Live
            </span>
          )}
        </p>
        <h4 className="mt-2 font-display text-xl font-semibold tracking-tight">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
            {project.name}
          </Link>
        </h4>
        <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.slice(0, 6).map((tech) => (
            <li key={tech} className="rounded-md bg-surface-2 px-2 py-1 text-xs text-muted">
              {tech}
            </li>
          ))}
          {project.stack.length > 6 && (
            <li className="rounded-md px-1 py-1 text-xs text-subtle">+{project.stack.length - 6} more</li>
          )}
        </ul>

        <p className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-fg">
          Read case study
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </p>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected work"
      title="Projects I have built."
      lead="Four full stack applications and four front-end builds. The source for every one is on my GitHub, and each card opens a short case study."
    >
      <div className="space-y-14">
        {groups.map((group, groupIndex) => (
          <div key={group.kind}>
            <Reveal>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-xl font-semibold tracking-tight">{group.title}</h3>
                <p className="text-sm text-muted">{group.note}</p>
                <span className="h-px flex-1 bg-line" aria-hidden />
              </div>
            </Reveal>
            <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects
                .filter((project) => project.kind === group.kind)
                .map((project, i) => (
                  <li key={project.slug}>
                    <Reveal className="h-full">
                      <ProjectCard project={project} priority={groupIndex === 0 && i < 2} />
                    </Reveal>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-display font-semibold">All of the code is public</p>
            <p className="mt-1 text-sm text-muted">Every project above has its repository on my GitHub profile.</p>
          </div>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold transition-colors hover:border-subtle"
          >
            <FaGithub className="size-4" aria-hidden />
            github.com/Mern-Umair
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
