import { createFileRoute, Link } from "@tanstack/react-router";
import { learning } from "@/data/learning";
import { projects } from "@/data/projects";
import { Container, PageHeader, StatusBadge, Tag } from "@/components/common/ui";
import { seo } from "@/lib/seo";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Layers3,
  Sparkles,
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

const statusConfig = {
  Completed: {
    icon: CheckCircle2,
    colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  },
  Studying: {
    icon: Clock3,
    colorClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    badge: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  },
  Exploring: {
    icon: CircleDashed,
    colorClass: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    badge: "border-sky-500/30 text-sky-400 bg-sky-500/10",
  },
};

export function Learning() {
  return (
    <>
      <PageHeader label="learning path" title="My Learning Journey">
        A hands-on path through the technologies I use to turn ideas into working products.
      </PageHeader>

      <Container className="py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {learning.map((item, index) => {
            const relatedProject = projects.find((p) => p.slug === item.relatedProject);
            const status = statusConfig[item.status] || statusConfig.Exploring;
            const StatusIcon = status.icon;

            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Top Bar: Step Number & Status */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center size-8 rounded-full bg-zinc-900 text-xs font-mono font-medium text-zinc-400 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-200 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${status.colorClass}`}
                      >
                        <StatusIcon className="size-3.5" />
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Topic Header */}
                  <h2 className="text-xl font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
                    {item.topic}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footer Section: Tags & Related Project */}
                <div className="mt-auto pt-4 border-t border-zinc-800/60 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Tag key={tag} className="text-xs bg-zinc-900/80 text-zinc-400 border-zinc-800">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  {relatedProject && (
                    <Link
                      to="/projects/$slug"
                      params={{ slug: relatedProject.slug }}
                      className="inline-flex items-center justify-between w-full p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 hover:bg-indigo-500/5 text-xs font-medium text-zinc-400 hover:text-indigo-300 transition-all group/link"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Layers3 className="size-3.5 text-zinc-500 group-hover/link:text-indigo-400" />
                        <span className="truncate">Applied in <strong className="text-zinc-200 group-hover/link:text-indigo-200 font-medium">{relatedProject.name}</strong></span>
                      </div>
                      <ArrowUpRight className="size-3.5 shrink-0 text-zinc-500 group-hover/link:text-indigo-400 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </>
  );
}