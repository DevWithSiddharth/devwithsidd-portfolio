import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Star } from "lucide-react";
import type { Project } from "@/data/projects";
import { ExternalLink, StatusBadge, Tag } from "@/components/common/ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col rounded-[1.5rem] border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_26px_60px_-35px_rgba(15,23,42,0.45)] sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        {project.featured && <span className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan"><Star className="size-3" /> featured</span>}
        {project.placeholder && <span className="rounded border border-dashed border-warning px-2 py-0.5 font-mono text-[11px] text-warning">placeholder</span>}
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-tight">
        <Link to="/projects/$slug" params={{ slug: project.slug }} className="relative z-10 after:absolute after:inset-0 hover:text-primary">
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">{project.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <div className="relative z-10 mt-5 flex items-center gap-3 text-sm">
        <ExternalLink href={project.github} className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"><Github className="size-4" /> Code</ExternalLink>
        <ExternalLink href={project.demo} className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"><ArrowUpRight className="size-4" /> Live</ExternalLink>
      </div>
    </article>
  );
}
