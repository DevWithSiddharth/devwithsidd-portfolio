import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { filterProjects, projectCategories, projects } from "@/data/projects";
import { Container, PageHeader } from "@/components/common/ui";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects/")({
  head: () => seo("Projects", "Projects by Siddharth Yadav — completed work, works in progress and experiments."),
  component: Projects,
});

function Projects() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = useMemo(() => filterProjects(projects, q, cat), [q, cat]);
  const dirty = q !== "" || cat !== "All";
  return (
    <>
      <PageHeader label="projects" title="Projects">Real work, works in progress and experiments — each clearly labelled.</PageHeader>
      <Container className="py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="proj-search" className="sr-only">Search projects</label>
            <input id="proj-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, description or tech…" className="w-full rounded-md border border-input bg-card py-2.5 pl-9 pr-3 text-sm" />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {projectCategories.map((c) => (
              <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-md border px-3 py-2 text-sm ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
            {dirty && <button onClick={() => { setQ(""); setCat("All"); }} className="inline-flex items-center gap-1 px-2 text-sm text-muted-foreground hover:text-foreground"><X className="size-4" /> Clear</button>}
          </div>
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground" aria-live="polite">{list.length} result{list.length === 1 ? "" : "s"}</p>
        {list.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="font-mono text-sm text-muted-foreground">grep: no matches found</p>
            <button onClick={() => { setQ(""); setCat("All"); }} className="mt-4 text-sm text-primary hover:underline">Clear filters</button>
          </div>
        )}
      </Container>
    </>
  );
}
