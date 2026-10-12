import { About } from "@/components/About";
import { CommandPalette } from "@/components/CommandPalette";
import { Contact } from "@/components/Contact";
import { ExperienceLog } from "@/components/ExperienceLog";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { StatusBar } from "@/components/StatusBar";
import { profile } from "@/content/portfolio";

const section = "mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32";

export default function Home() {
  return (
    <>
      <StatusBar />
      <main>
        <Hero />

        <section id="about" className={section}>
          <SectionLabel
            index="01"
            label="README.md"
            title={
              <>
                The parts users never see <span className="text-muted">are the parts I like building.</span>
              </>
            }
          />
          <About />
        </section>

        <section id="work" className={section}>
          <SectionLabel
            index="02"
            label="projects/"
            title={
              <>
                Selected work. <span className="text-muted">Real-time, geospatial, offline, on-chain.</span>
              </>
            }
          />
          <Projects />
        </section>

        <section id="experience" className={section}>
          <SectionLabel
            index="03"
            label="experience.log"
            title={
              <>
                Leading tech <span className="text-muted">where the software runs real events.</span>
              </>
            }
          />
          <ExperienceLog />
        </section>

        <section id="contact" className={section}>
          <SectionLabel
            index="04"
            label="contact.sh"
            title={
              <>
                Got a hard backend problem? <span className="text-muted">Let&apos;s talk.</span>
              </>
            }
          />
          <Reveal>
            <Contact />
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 font-mono text-xs text-dim sm:flex-row sm:justify-between sm:px-6">
          <span>© 2026 {profile.name} · built with Next.js</span>
          <span className="flex gap-4">
            <span>
              press <kbd className="text-muted">/</kbd> to navigate
            </span>
            <a href="/llms.txt" className="text-muted hover:text-accent">llms.txt</a>
            <a href="/LLM.md" className="text-muted hover:text-accent">LLM.md</a>
          </span>
        </div>
      </footer>

      <CommandPalette />
    </>
  );
}
