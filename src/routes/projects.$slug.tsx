import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { Container, ExternalLink, SectionLabel, StatusBadge, Tag } from "@/components/common/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) =>
    loaderData ? seo(loaderData.project.name, loaderData.project.description) : { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] },
  component: ProjectDetail,
});

const sections = [
  ["motivation", "Motivation"],
  ["solution", "Solution"],
  ["implementation", "Implementation"],
  ["challenges", "Challenges"],
  ["lessons", "Lessons learned"],
] as const;

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  return (
    <Container className="max-w-3xl py-16">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All projects</Link>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <StatusBadge status={p.status} />
        {p.placeholder && <span className="rounded border border-dashed border-warning px-2 py-0.5 font-mono text-xs text-warning">placeholder — not a real project</span>}
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">{p.name}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{p.description}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <div className="mt-6 flex gap-3">
        <ExternalLink href={p.github} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-primary"><Github className="size-4" /> Source</ExternalLink>
        <ExternalLink href={p.demo} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"><ArrowUpRight className="size-4" /> Live demo</ExternalLink>
      </div>
      {p.caseStudy && (
        <div className="mt-12 space-y-8 border-t border-border pt-10">
          {sections.map(([k, label]) => p.caseStudy?.[k] && (
            <section key={k}><SectionLabel>{label}</SectionLabel><p className="mt-2 leading-relaxed">{p.caseStudy[k]}</p></section>
          ))}
        </div>
      )}
    </Container>
  );
}
