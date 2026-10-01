import { Award, GraduationCap } from "lucide-react";
import { education, experience } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Where I have worked."
      lead="A little over a year across two software houses, as a MERN stack developer on client products."
    >
      <ol className="timeline relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-line sm:before:left-[9px]">
        {experience.map((job) => (
          <li key={job.company} className="relative pl-8 sm:pl-10">
            <span
              className="absolute top-2 left-0 size-[15px] rounded-full border-2 border-accent bg-bg sm:size-[19px]"
              aria-hidden
            />
            <Reveal>
              <article className="spot rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {job.title} <span className="text-muted">· {job.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-accent">{job.period}</p>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {education.map((item, i) => {
          const Icon = i === 0 ? GraduationCap : Award;
          return (
            <li key={item.title}>
              <Reveal className="h-full">
                <div className="spot flex h-full gap-4 rounded-2xl border border-line bg-surface p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.place}</p>
                    <p className="mt-1 font-mono text-xs text-subtle">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
