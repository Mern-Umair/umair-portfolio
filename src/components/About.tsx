import { profile } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const workingStyle = [
  {
    title: "I ask before I build",
    body: "Who uses this screen, and what are they allowed to do? Answering that first saves a rewrite later.",
  },
  {
    title: "The server decides",
    body: "Every rule that matters is enforced in the API. The UI only reflects it.",
  },
  {
    title: "Finished means usable",
    body: "Loading, empty and error states are part of the feature, not polish for later.",
  },
] as const;

export function About() {
  return (
    <Section id="about" index="05" eyebrow="About" title="A bit about how I work.">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <ul className="space-y-4">
          {workingStyle.map((item, i) => (
            <li key={item.title}>
              <Reveal>
                <div data-tilt="5" className="spot rounded-2xl border border-line bg-surface p-6">
                  <p className="font-mono text-xs text-accent">0{i + 1}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
