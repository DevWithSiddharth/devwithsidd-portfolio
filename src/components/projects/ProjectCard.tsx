import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Star } from "lucide-react";
import type { Project } from "@/data/projects";
import { ExternalLink, StatusBadge, Tag } from "@/components/common/ui";

const previewStyles: Record<string, string> = {
  Web: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(34,197,94,0.12)), linear-gradient(135deg, #0f172a, #111827)",
  Backend:
    "linear-gradient(135deg, rgba(168,85,247,0.16), rgba(59,130,246,0.12)), linear-gradient(135deg, #191a2f, #111827)",
  Python:
    "linear-gradient(135deg, rgba(234,179,8,0.12), rgba(16,185,129,0.14)), linear-gradient(135deg, #1f2937, #111827)",
  "AI/ML":
    "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(14,165,233,0.14)), linear-gradient(135deg, #1d2433, #111827)",
  Tools:
    "linear-gradient(135deg, rgba(6,182,212,0.14), rgba(139,92,246,0.16)), linear-gradient(135deg, #1b2337, #111827)",
};

export function ProjectCard({ project }: { project: Project }) {
  const accent = previewStyles[project.category] ?? previewStyles["Web"];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift sm:p-1">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.35rem] border-b border-border/50 bg-[#090d18]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt ?? `Project preview for ${project.name}`}
            className="absolute inset-[2px] size-[calc(100%-4px)] object-contain transition-transform duration-500 group-hover:scale-[1.015]"
            loading="lazy"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-95"
              style={{ background: accent }}
              aria-hidden
            />
            <div className="absolute inset-x-4 top-4 flex h-8 items-center justify-between rounded-t-lg border border-white/10 bg-black/25 px-3">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-red-400/80" aria-hidden />
                <span className="size-2 rounded-full bg-yellow-400/80" aria-hidden />
                <span className="size-2 rounded-full bg-emerald-400/80" aria-hidden />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                {project.category}
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-5 top-12 rounded-b-xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                preview
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{project.name}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-16 rounded-md border border-white/8 bg-white/5" />
                ))}
              </div>
            </div>
          </>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/35 to-transparent"
          aria-hidden
        />
        <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          {project.featured && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan">
              <Star className="size-3" /> featured
            </span>
          )}
          {project.placeholder && (
            <span className="rounded border border-dashed border-warning px-2 py-0.5 font-mono text-[11px] text-warning">
              placeholder
            </span>
          )}
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-tight">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="relative z-10 after:absolute after:inset-0 hover:text-primary"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="relative z-10 mt-5 flex items-center gap-3 text-sm">
          <ExternalLink
            href={project.github}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground shadow-button transition-all hover:border-primary hover:text-foreground"
          >
            <Github className="size-4" /> Code
          </ExternalLink>
          <ExternalLink
            href={project.demo}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-accent px-3 py-1.5 text-primary-foreground shadow-button transition-all hover:-translate-y-0.5"
          >
            <ArrowUpRight className="size-4" /> Live
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}
