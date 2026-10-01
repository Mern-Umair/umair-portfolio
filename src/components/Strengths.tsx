import { Bot, LayoutDashboard, Layers, ShieldCheck } from "lucide-react";
import { strengths } from "@/data/site";
import { Reveal } from "./Reveal";

const icons = {
  layers: Layers,
  shield: ShieldCheck,
  dashboard: LayoutDashboard,
  bot: Bot,
} as const;

export function Strengths() {
  return (
    <section aria-label="What I bring" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {strengths.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title}>
              <Reveal className="h-full">
                <div data-tilt="7" className="spot h-full rounded-2xl border border-line bg-surface p-6">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
