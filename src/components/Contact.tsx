import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { profile, socials } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const details = [
  { Icon: Mail, label: "Email", value: profile.email, href: socials.email },
  { Icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { Icon: MapPin, label: "Location", value: profile.location },
  { Icon: Clock, label: "Time zone", value: profile.timezone },
];

const links = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: socials.linkedin },
  { Icon: FaGithub, label: "GitHub", href: socials.github },
  { Icon: FaWhatsapp, label: "WhatsApp", href: socials.whatsapp },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Hiring, or have a project in mind?"
      lead="I am looking for a full stack role, and I take on freelance work. Write a few lines and I will get back to you."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
        <Reveal>
          <dl className="space-y-5">
            {details.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">{label}</dt>
                  <dd className="mt-0.5 font-medium">
                    {href ? (
                      <a href={href} className="underline decoration-line underline-offset-4 hover:decoration-subtle">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2">
            {links.map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-subtle"
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
