import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Github,
  Mail,
  Sparkles,
  CheckCircle2,
  Flame,
  Compass,
  Code2,
} from "lucide-react";
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
  head: () =>
    seo(
      "Student Developer",
      "Siddharth Yadav — student developer building with web tech, Python and APIs. Open to internships, freelance and collaboration.",
      "/",
    ),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-glow opacity-60" aria-hidden />

        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-emerald-500 shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
              open to internships & freelance
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]">
              Student by Status, <span className="text-gradient">Engineer by Mindset.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {profile.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                <span>View Projects</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:text-primary"
              >
                <Mail className="size-4" />
                <span>Contact</span>
              </Link>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:text-primary"
              >
                <Github className="size-4" />
                <span>GitHub</span>
              </a>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-left">
              <div className="group rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
                <dt className="flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Focus</span>
                  <Code2 className="size-3.5 text-primary" />
                </dt>
                <dd className="mt-2 text-sm font-bold text-foreground">Web + Backend</dd>
              </div>

              <div className="group rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
                <dt className="flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Stack</span>
                  <Flame className="size-3.5 text-amber-500" />
                </dt>
                <dd className="mt-2 text-sm font-bold text-foreground">React / Python</dd>
              </div>

              <div className="group rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
                <dt className="flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Mode</span>
                  <Compass className="size-3.5 text-emerald-500" />
                </dt>
                <dd className="mt-2 text-sm font-bold text-foreground">Building & Scaling</dd>
              </div>
            </dl>
          </div>

          <div className="relative fade-up [animation-delay:150ms]">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/90 p-3 shadow-xl backdrop-blur-md">
              <Terminal className="min-h-[400px] shadow-none sm:min-h-[440px]" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Technology stack" className="border-b border-border/60 bg-card/20 py-5">
        <Container className="flex flex-wrap items-center gap-2">
          <span className="mr-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            stack.json →
          </span>
          {allSkills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          <Link
            to="/skills"
            className="ml-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            see all →
          </Link>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mb-12 max-w-2xl">
            <SectionLabel>how I work</SectionLabel>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              I like clean systems, usable products, and honest shipping.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Think It Through",
                text: "I start with the problem, the user, and the simplest valuable outcome before writing any code.",
              },
              {
                step: "02",
                title: "Build for Clarity",
                text: "I prefer clean interfaces, readable codebases, and maintainable architecture over visual noise.",
              },
              {
                step: "03",
                title: "Ship & Iterate",
                text: "Each project informs the next — I test what matters, gather feedback, and continuously refine.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} className="h-full" delay={index * 80}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg">
                  <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />

                  <div className="relative z-10">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 font-mono text-base font-bold text-primary transition-transform group-hover:scale-110">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 bg-card/30 py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionLabel>featured work</SectionLabel>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Things I’ve Built
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
            >
              All projects →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((p, index) => (
              <ScrollReveal key={p.slug} className="h-full" delay={index * 90}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <SectionLabel>about</SectionLabel>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              A curious builder with a bias for action
            </h2>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground pt-2">
              {profile.bio.slice(0, 4).map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="text-primary mt-1">▪</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <span>More about me</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel>currently learning</SectionLabel>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Active Focus & Roadmap
            </h2>
            <ul className="space-y-3 pt-2">
              {learning.slice(0, 4).map((l) => (
                <li
                  key={l.topic}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {l.topic}
                  </span>
                  <StatusBadge status={l.status} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-gradient-to-br from-card via-card/90 to-primary/10 p-8 shadow-2xl backdrop-blur-md sm:p-12">
            <div className="absolute inset-0 bg-glow opacity-50" aria-hidden />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-primary">
                $ ./collaborate --with siddharth
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Looking for a teammate, an intern, or a freelance builder?
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                I’m open to internships, freelance web work, and collaborative product builds. Let’s
                make something useful.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-background hover:text-primary"
                >
                  <Mail className="size-4" />
                  <span>Direct Email</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
