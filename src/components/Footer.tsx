import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { navItems, profile, socials } from "@/data/site";

const links = [
  { Icon: FaGithub, label: "GitHub", href: socials.github },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: socials.linkedin },
  { Icon: FaWhatsapp, label: "WhatsApp", href: socials.whatsapp },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className="hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2">
          {links.map(({ Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-subtle hover:text-fg"
              >
                <Icon className="size-[18px]" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-line px-5 py-5 text-center font-mono text-xs text-subtle">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript and Tailwind CSS.
      </p>
    </footer>
  );
}
