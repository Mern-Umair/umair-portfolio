import { About } from "@/components/About";
import { AccessDemo } from "@/components/AccessDemo";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";
import { Strengths } from "@/components/Strengths";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Strengths />
      <Work />

      <Section
        id="access"
        index="02"
        eyebrow="Try it"
        title="Role-based access, the part I work on most."
        lead="Pick a role and send a request. The menu, the permission table and the API response all come from one rule set, which is how I structure access control in a real backend."
      >
        <div className="reveal-unfold">
          <AccessDemo />
          <p className="mt-4 text-sm text-subtle">
            A simplified demo with made-up rules for a rental platform. It runs entirely in your browser.
          </p>
        </div>
      </Section>

      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
