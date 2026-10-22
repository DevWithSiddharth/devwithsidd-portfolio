import { createFileRoute } from "@tanstack/react-router";
import { Search, X, SlidersHorizontal, FolderKanban } from "lucide-react";
import { useMemo, useState } from "react";
import { filterProjects, projectCategories, projects } from "@/data/projects";
import { Container, PageHeader } from "@/components/common/ui";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects/")({
  head: () =>
    seo(
      "Projects",
      "Projects by Siddharth Yadav — completed work, works in progress and experiments."
    ),
  component: Projects,
});

function Projects() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const list = useMemo(() => filterProjects(projects, q, cat), [q, cat]);
  const isFiltered = q !== "" || cat !== "All";

  const handleReset = () => {
    setQ("");
    setCat("All");
  };

  return (
    <>
      <PageHeader
        label="projects"
        title="Projects"
      >
        Real work, works in progress and experiments — each clearly labelled.
      </PageHeader>

      <Container className="py-10 md:py-14">
        {/* Filter Controls Container */}
        <div className="space-y-4 rounded-2xl border border-border/60 bg-card/40 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground"
                aria-hidden
              />
              <label htmlFor="proj-search" className="sr-only">
                Search projects
              </label>
              <input
                id="proj-search"
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, description or tech..."
                className="w-full rounded-xl border border-input/80 bg-background/80 py-2.5 pl-10 pr-9 text-sm text-foreground transition-all placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Clear search input"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label="Filter by category"
            >
              {projectCategories.map((c) => {
                const isActive = cat === c;
                return (
                  <button
                    key={c}
                    aria-pressed={isActive}
                    onClick={() => setCat(c)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "border border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="ml-auto inline-flex items-center gap-1 rounded-lg border border-dashed border-border/80 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border hover:bg-destructive/10 hover:text-destructive sm:ml-1"
                >
                  <X className="size-3" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
            <p className="font-mono" aria-live="polite">
              Showing <span className="font-semibold text-foreground">{list.length}</span> {list.length === 1 ? "project" : "projects"}
            </p>
            {isFiltered && (
              <p className="hidden font-mono text-[11px] text-muted-foreground/70 sm:block">
                Filters active
              </p>
            )}
          </div>
        </div>

        {/* Project Grid / Empty State */}
        {list.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/20 p-8 text-center backdrop-blur-xs">
            <div className="flex size-12 items-center justify-center rounded-full bg-accent/60 text-muted-foreground">
              <FolderKanban className="size-6" />
            </div>
            <h3 className="mt-4 font-mono text-sm font-medium text-foreground">
              grep: no matches found
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:bg-accent"
            >
              <SlidersHorizontal className="size-3.5" /> Reset all filters
            </button>
          </div>
        )}
      </Container>
    </>
  );
}