import type { IconType } from "react-icons";
import {
  SiCloudinary,
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSequelize,
  SiSocketdotio,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { skillGroups } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** Brand marks for the skills that have one; the rest render as plain text chips. */
const icons: Record<string, IconType> = {
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "JavaScript (ES6+)": SiJavascript,
  "Redux Toolkit": SiRedux,
  "Tailwind CSS": SiTailwindcss,
  HTML5: SiHtml5,
  CSS3: SiCss,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "JWT authentication": SiJsonwebtokens,
  "Socket.io": SiSocketdotio,
  MongoDB: SiMongodb,
  Mongoose: SiMongoose,
  MySQL: SiMysql,
  Sequelize: SiSequelize,
  Git: SiGit,
  GitHub: SiGithub,
  Swagger: SiSwagger,
  Cloudinary: SiCloudinary,
};

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Skills"
      title="The tools I work with."
      lead="Tools I have used in real projects, not a wish list."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <Reveal key={group.label} className="h-full">
            <div className="spot h-full rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const Icon = icons[skill];
                  return (
                    <li
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm"
                    >
                      {Icon && <Icon className="size-4 text-muted" aria-hidden />}
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
