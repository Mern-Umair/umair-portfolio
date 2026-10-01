import Image from "next/image";
import type { Project } from "@/data/site";

/**
 * The visual at the top of a project card or case study.
 * Projects with a real screenshot show it in a browser frame. Projects without one get a
 * diagram of their parts instead of a made-up screenshot.
 */
export function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.image) {
    return (
      <div className="flex aspect-[16/9] flex-col overflow-hidden rounded-xl border border-line bg-surface-2">
        <div className="flex shrink-0 items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </div>
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.name} screenshot`}
          priority={priority}
          placeholder="blur"
          sizes="(min-width: 1024px) 560px, 100vw"
          className="min-h-0 w-full flex-1 object-cover object-left-top"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-48 flex-col justify-between gap-4 overflow-hidden rounded-xl border border-line bg-surface-2 p-4 sm:p-5 lg:aspect-[16/9]">
      <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
        {project.kind === "fullstack" ? "Architecture" : "Structure"}
      </span>

      <ol className="space-y-2">
        {project.structure.map((row, i) => (
          <li key={row.layer} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent-soft font-mono text-[11px] text-accent">
              {i + 1}
            </span>
            {/* Stacked on phones so the detail is readable; one line from the sm breakpoint up. */}
            <span className="min-w-0 sm:flex sm:items-baseline sm:gap-3">
              <span className="block text-sm font-medium text-fg sm:w-24 sm:shrink-0">{row.layer}</span>
              <span className="block text-xs text-muted sm:truncate sm:text-sm">{row.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      {project.roles ? (
        <ul className="flex flex-wrap gap-1.5" aria-label="User roles">
          {project.roles.map((role) => (
            <li key={role} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
              {role}
            </li>
          ))}
        </ul>
      ) : (
        <span />
      )}
    </div>
  );
}
