import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  Code2,
  ExternalLink as ExternalLinkIcon,
  Github,
  Layers3,
  Monitor,
} from "lucide-react";
import { projects } from "@/data/projects";
import { Container, ExternalLink, StatusBadge } from "@/components/common/ui";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(loaderData.project.name, loaderData.project.description, `/projects/${loaderData.project.slug}`)
      : {
          meta: [
            { title: "Project not found" },
            { name: "robots", content: "noindex" },
          ],
        },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const [zoomedScreenshot, setZoomedScreenshot] = useState<{
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    position?: string;
  } | null>(null);
  const screenshots = p.placeholder
    ? []
    : [
        ...(p.image &&
        p.image !== "/projects/preview-placeholder.svg" &&
        !p.screenshots?.some((screenshot) => screenshot.src === p.image)
          ? [{ src: p.image, alt: p.imageAlt ?? `${p.name} project screenshot` }]
          : []),
        ...(p.screenshots ?? []).filter((screenshot) => screenshot.src !== "/projects/preview-placeholder.svg"),
      ];

  return (
    <Container className="max-w-6xl py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/projects" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" />
          Projects
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate font-medium text-foreground">{p.name}</span>
      </nav>

      <main className="mt-7 overflow-hidden rounded-2xl border border-border/80 bg-card/75 shadow-card">
        <header className="flex flex-col gap-6 border-b border-border/70 p-5 sm:p-7 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Code2 className="size-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={p.status} />
                <span className="rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {p.category}
                </span>
                {p.placeholder && (
                  <span className="rounded-full border border-warning/30 bg-warning/10 px-2.5 py-0.5 font-mono text-[11px] text-warning">
                    Sample project
                  </span>
                )}
              </div>
              <h1 className="mt-3 truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {p.name}
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 md:pt-1">
            {p.demo && (
              <ExternalLink
                href={p.demo}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Visit site <ArrowUpRight className="size-4" />
              </ExternalLink>
            )}
            {p.github && (
              <ExternalLink
                href={p.github}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="size-4" /> Repository
              </ExternalLink>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="min-w-0 space-y-6 p-5 sm:p-7" aria-label="Project content">
            <section className="rounded-xl border border-border bg-background p-5 sm:p-6" aria-labelledby="project-description">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers3 className="size-4 text-primary" aria-hidden />
                <h2 id="project-description" className="text-sm font-semibold text-foreground">Description</h2>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{p.description}</p>
            </section>

            {screenshots.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Preview</h2>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(screenshots.length).padStart(2, "0")} {screenshots.length === 1 ? "image" : "images"}
                  </span>
                </div>
                <div
                  className={`gap-3 ${
                    screenshots.length === 1
                      ? "columns-1"
                      : screenshots.length <= 4
                        ? "columns-1 sm:columns-2"
                        : "columns-1 sm:columns-2 xl:columns-3"
                  }`}
                >
                  {screenshots.map((screenshot, index) => (
                    <ScrollReveal key={screenshot.src} className="mb-3 break-inside-avoid">
                      <button
                        type="button"
                        onClick={() => setZoomedScreenshot(screenshot)}
                        aria-label={`Zoom image: ${screenshot.alt}`}
                        className="group relative block w-full overflow-hidden rounded-xl border border-border bg-background p-1.5 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <img
                          src={screenshot.src}
                          alt={screenshot.alt}
                          style={{ objectPosition: screenshot.position }}
                          className={`w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.025] ${
                            screenshot.fit === "cover"
                              ? "aspect-[16/10] object-cover"
                              : "h-auto max-h-[70vh] object-contain"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/65 px-2.5 py-1 font-mono text-[10px] text-white/90 backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
                        </span>
                      </button>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="space-y-5 border-t border-border/70 bg-background/50 p-5 sm:p-7 lg:border-l lg:border-t-0">
            <section aria-labelledby="project-details">
              <div className="mb-3 flex items-center gap-2">
                <Monitor className="size-4 text-primary" aria-hidden />
                <h2 id="project-details" className="text-sm font-semibold text-foreground">Project details</h2>
              </div>
              <dl className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd><StatusBadge status={p.status} /></dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium text-foreground">{p.category}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">Links</dt>
                  <dd className="font-medium text-foreground">{[p.demo, p.github].filter(Boolean).length} available</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="project-stack">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Boxes className="size-4 text-primary" aria-hidden />
                  <h2 id="project-stack" className="text-sm font-semibold text-foreground">Technology stack</h2>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">{p.tech.length}</span>
              </div>
              <ul className="space-y-2">
                {p.tech.map((tech, index) => (
                  <li key={tech} className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
                    <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 font-mono text-[10px] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-foreground">{tech}</span>
                  </li>
                ))}
              </ul>
            </section>

            {(p.demo || p.github) && (
              <section className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs leading-5 text-muted-foreground">Want to explore the code or try the project?</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium">
                  {p.demo && (
                    <ExternalLink href={p.demo} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      Open live site <ExternalLinkIcon className="size-3" />
                    </ExternalLink>
                  )}
                  {p.github && (
                    <ExternalLink href={p.github} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                      Source code <Github className="size-3" />
                    </ExternalLink>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>
      </main>

      <Dialog
        open={zoomedScreenshot !== null}
        onOpenChange={(open) => {
          if (!open) setZoomedScreenshot(null);
        }}
      >
        <DialogContent className="w-[calc(100vw-2rem)] max-w-[1400px] border-0 bg-transparent p-2 text-white shadow-none">
          {zoomedScreenshot && (
            <>
              <DialogTitle className="sr-only">{zoomedScreenshot.alt}</DialogTitle>
              <DialogDescription className="sr-only">Enlarged project screenshot. Press Escape to close.</DialogDescription>
              <img
                src={zoomedScreenshot.src}
                alt={zoomedScreenshot.alt}
                style={{ objectPosition: zoomedScreenshot.position }}
                className="mx-auto max-h-[88vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}