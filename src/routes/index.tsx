import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { allSkills } from "@/data/skills";
import { learning } from "@/data/learning";
import { Container, SectionLabel, StatusBadge, Tag } from "@/components/common/ui";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { Terminal } from "@/components/terminal/Terminal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Student Developer", "Siddharth Yadav — student developer building with web tech, Python and APIs. Open to internships, freelance and collaboration.", "/"),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
        <div className="absolute inset-0 bg-glow" aria-hidden />
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground shadow-card">
              <span className="size-2 rounded-full bg-success" aria-hidden /> open to internships & freelance
            </p>
            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[0.92] tracking-[-0.07em] sm:text-5xl lg:text-[4.4rem]">
              I build <span className="text-gradient">thoughtful</span>
              <br /> digital products.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{profile.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2.5 font-medium text-primary-foreground shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
                View projects <ArrowRight className="size-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-medium text-foreground shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                <Mail className="size-4" /> Contact
              </Link>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-medium text-foreground shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                <Github className="size-4" /> GitHub
              </a>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-left">
              <div className="rounded-2xl border border-border bg-card/80 p-3 shadow-card">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Focus</dt>
                <dd className="mt-2 text-sm font-semibold text-foreground">Web + backend</dd>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 p-3 shadow-card">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Stack</dt>
                <dd className="mt-2 text-sm font-semibold text-foreground">React / Python</dd>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 p-3 shadow-card">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Mode</dt>
                <dd className="mt-2 text-sm font-semibold text-foreground">Learning & building</dd>
              </div>
            </dl>
          </div>

          <div className="relative fade-up [animation-delay:150ms]">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/8 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card/75 p-3 shadow-card backdrop-blur-sm">
              <Terminal className="min-h-[440px] shadow-none" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Technology stack" className="border-b border-border py-6">
        <Container className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">stack.json →</span>
          {allSkills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          <Link to="/skills" className="ml-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary hover:underline">
            see all
          </Link>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <SectionLabel>how I work</SectionLabel>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">I like clean systems, usable products, and honest shipping.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { step: "01", title: "Think it through", text: "I start with the problem, the user, and the simplest valuable outcome before I write code." },
              { step: "02", title: "Build for clarity", text: "I prefer clean interfaces, clear flows, and maintainable architecture over visual noise." },
              { step: "03", title: "Ship and learn", text: "Each project teaches the next one — I iterate quickly, test what matters, and refine as I go." },
            ].map((item) => (
              <ScrollReveal key={item.title} className="h-full" delay={Number(item.step) * 60}>
                <div className="soft-panel h-full rounded-[1.5rem] p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-mono text-sm text-primary">{item.step}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionLabel>featured work</SectionLabel>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">Things I’ve built</h2>
            </div>
            <Link to="/projects" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
              All projects →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">{featured.map((p, index) => (
            <ScrollReveal key={p.slug} className="h-full" delay={index * 90}>
              <ProjectCard project={p} />
            </ScrollReveal>
          ))}</div>
        </Container>
      </section>

      <section className="border-y border-border bg-card/40 py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionLabel>about</SectionLabel>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">A curious builder with a bias for action</h2>
            <ul className="mt-6 space-y-3 text-base leading-7 text-muted-foreground">{profile.bio.slice(0, 4).map((b) => <li key={b}>{b}</li>)}</ul>
            <Link to="/about" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">
              More about me →
            </Link>
          </div>
          <div>
            <SectionLabel>currently learning</SectionLabel>
            <ol className="mt-6 space-y-3">
              {learning.map((l) => (
                <li key={l.topic} className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
                  <span className="font-medium">{l.topic}</span>
                  <StatusBadge status={l.status} />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-terminal p-8 text-terminal-foreground shadow-card sm:p-12">
            <div className="absolute inset-0 bg-glow" aria-hidden />
            <div className="relative">
              <p className="font-mono text-sm text-cyan">$ ./collaborate --with siddharth</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Looking for a teammate, an intern, or a freelance builder?</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-terminal-foreground/80">I’m open to internships, freelance web work, and collaborative product builds. Let’s make something useful.</p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                Get in touch <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
