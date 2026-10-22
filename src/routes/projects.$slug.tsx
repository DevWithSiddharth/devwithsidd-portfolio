import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, AlertTriangle } from "lucide-react";
import { projects } from "@/data/projects";
import {
  Container,
  ExternalLink,
  SectionLabel,
  StatusBadge,
  Tag,
} from "@/components/common/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(loaderData.project.name, loaderData.project.description)
      : {
          meta: [
            { title: "Project not found" },
            { name: "robots", content: "noindex" },
          ],
        },
  component: ProjectDetail,
});

const sections = [
  ["motivation", "Motivation"],
  ["solution", "Solution"],
  ["implementation", "Implementation"],
  ["challenges", "Challenges"],
  ["lessons", "Lessons Learned"],
] as const;

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();

  return (
    <Container className="max-w-3xl py-12 md:py-16">
      {/* Back Navigation */}
      <Link
        to="/projects"
        className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back to projects
      </Link>

      {/* Header & Badges */}
      <header className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={p.status} />
          {p.placeholder && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-warning">
              <AlertTriangle className="size-3" />
              Placeholder — not a real project
            </span>
          )}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {p.name}
        </h1>

        <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
          {p.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {p.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          {p.github && (
            <ExternalLink
              href={p.github}
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-4 py-2 text-xs font-medium text-foreground shadow-xs transition-all hover:border-foreground/30 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Github className="size-4" />
              <span>Source Code</span>
            </ExternalLink>
          )}

          {p.demo && (
            <ExternalLink
              href={p.demo}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="size-4" />
            </ExternalLink>
          )}
        </div>
      </header>

      {/* Case Study Content */}
      {p.caseStudy && (
        <article className="mt-12 space-y-10 border-t border-border/60 pt-10">
          {sections.map(
            ([k, label]) =>
              p.caseStudy?.[k] && (
                <section
                  key={k}
                  className="group rounded-2xl border border-border/40 bg-card/30 p-5 sm:p-6 transition-colors hover:border-border/80"
                >
                  <SectionLabel>{label}</SectionLabel>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/90">
                    {p.caseStudy[k]}
                  </p>
                </section>
              )
          )}
        </article>
      )}
    </Container>
  );
}