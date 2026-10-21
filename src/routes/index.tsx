import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { allSkills } from "@/data/skills";
import { learning } from "@/data/learning";
import { Container, SectionLabel, StatusBadge, Tag } from "@/components/common/ui";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Terminal } from "@/components/terminal/Terminal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Student Developer", "Siddharth Yadav — student developer building with web tech, Python and APIs. Open to internships, freelance and collaboration."),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-grid">
        <div className="absolute inset-0 bg-glow" aria-hidden />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div className="fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-success" aria-hidden /> open to internships & freelance
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Hi, I'm {profile.name.split(" ")[0]}.<br />
              <span className="text-gradient">{profile.role}.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90">View projects <ArrowRight className="size-4" /></Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-medium hover:border-primary"><Mail className="size-4" /> Contact</Link>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-medium hover:border-primary"><Github className="size-4" /> GitHub</a>
            </div>
          </div>
          <Terminal className="fade-up [animation-delay:150ms]" />
        </Container>
      </section>

      <section aria-label="Technology stack" className="border-b border-border py-8">
        <Container className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-xs text-muted-foreground">stack.json →</span>
          {allSkills.map((s) => <Tag key={s}>{s}</Tag>)}
          <Link to="/skills" className="ml-1 font-mono text-xs text-primary hover:underline">see all</Link>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div><SectionLabel>featured work</SectionLabel><h2 className="mt-2 text-3xl font-bold">Things I've built</h2></div>
            <Link to="/projects" className="hidden text-sm text-primary hover:underline sm:inline">All projects →</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">{featured.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        </Container>
      </section>

      <section className="border-y border-border bg-card/40 py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>about</SectionLabel>
            <h2 className="mt-2 text-3xl font-bold">A curious builder</h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">{profile.bio.slice(0, 4).map((b) => <li key={b}>{b}</li>)}</ul>
            <Link to="/about" className="mt-6 inline-block text-sm text-primary hover:underline">More about me →</Link>
          </div>
          <div>
            <SectionLabel>currently learning</SectionLabel>
            <ol className="mt-6 space-y-3">
              {learning.map((l) => (
                <li key={l.topic} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3">
                  <span className="font-medium">{l.topic}</span><StatusBadge status={l.status} />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-terminal p-8 text-terminal-foreground sm:p-12">
            <div className="absolute inset-0 bg-glow" aria-hidden />
            <div className="relative">
              <p className="font-mono text-sm text-cyan">$ ./collaborate --with siddharth</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">Looking for an intern, a freelancer, or someone to build with?</h2>
              <p className="mt-4 max-w-xl opacity-75">I'm open to internships, freelance web work and collaborative projects. Let's talk.</p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90">Get in touch <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
