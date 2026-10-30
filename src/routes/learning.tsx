import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { learning, type LearningStatus } from "@/data/learning";
import { projects } from "@/data/projects";
import { Container, PageHeader, StatusBadge } from "@/components/common/ui";
import { seo } from "@/lib/seo";
import {
  BookOpen,
  CheckCircle2,
  Flame,
  ArrowUpRight,
  Sparkles,
  Compass,
  Search,
  Calendar,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/learning")({
  head: () =>
    seo(
      "Learning Journey",
      "What Siddharth Yadav is exploring, studying, and has completed.",
      "/learning",
    ),
  component: Learning,
});

type FilterTab = "All" | LearningStatus;

export function Learning() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => {
    const total = learning.length;
    const completed = learning.filter((i) => i.status === "Completed").length;
    const studying = learning.filter((i) => i.status === "Studying").length;
    const exploring = learning.filter((i) => i.status === "Exploring").length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, studying, exploring, completionRate };
  }, []);

  const filteredLearning = useMemo(() => {
    return learning.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.status === activeFilter;
      const matchesSearch =
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      <PageHeader label="learning" title="Learning Journey">
        Topics I'm exploring, studying, and building with right now.
      </PageHeader>

      <Container className="max-w-4xl py-12">
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-5 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                Active Focus
              </span>
              <div className="rounded-xl bg-amber-500/10 p-2 text-amber-500">
                <Flame className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-3xl font-extrabold tracking-tight">{stats.studying}</p>
              <span className="text-xs font-medium text-amber-500/90">Studying</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{
                  width: `${(stats.studying / stats.total) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-5 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                Milestones Met
              </span>
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
                <CheckCircle2 className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-3xl font-extrabold tracking-tight">{stats.completed}</p>
              <span className="text-xs font-medium text-emerald-500/90">
                {stats.completionRate}% Done
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                Radar
              </span>
              <div className="rounded-xl bg-primary/10 p-2 text-primary">
                <Compass className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-3xl font-extrabold tracking-tight">{stats.exploring}</p>
              <span className="text-xs font-medium text-primary">Exploring</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{
                  width: `${(stats.exploring / stats.total) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
          <div className="flex flex-wrap items-center gap-1.5">
            {(["All", "Studying", "Exploring", "Completed"] as const).map((tab) => {
              const count =
                tab === "All" ? learning.length : learning.filter((i) => i.status === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeFilter === tab
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                      activeFilter === tab
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-muted/30 py-1.5 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredLearning.map((item) => {
            const relatedProject = projects.find((p) => p.slug === item.relatedProject);

            return (
              <div
                key={item.topic}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-md"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />

                <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {item.topic}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>

                  {item.date && (
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground/80 bg-muted/40 px-2.5 py-1 rounded-md w-fit">
                      <Calendar className="size-3" />
                      <span>{item.date}</span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="relative z-10 mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}

                {relatedProject && (
                  <div className="relative z-10 mt-4 flex items-center pt-3 border-t border-border/40">
                    <span className="text-xs text-muted-foreground mr-2.5 font-medium flex items-center gap-1">
                      <Layers className="size-3 text-primary" /> Applied in:
                    </span>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: relatedProject.slug }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                    >
                      <span>{relatedProject.name}</span>
                      <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {filteredLearning.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              <Sparkles className="mx-auto size-8 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium">No learning topics match your criteria.</p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-semibold text-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
