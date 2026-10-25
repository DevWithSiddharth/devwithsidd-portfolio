import { createFileRoute, Link } from "@tanstack/react-router";
import { learning } from "@/data/learning";
import { projects } from "@/data/projects";
import { Container, PageHeader, StatusBadge } from "@/components/common/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/learning")({
  head: () => seo("Learning Journey", "What Siddharth Yadav is exploring, studying and has completed.", "/learning"),
  component: Learning,
});

function Learning() {
  return (
    <>
      <PageHeader label="learning" title="Learning journey">Topics I'm exploring and studying right now.</PageHeader>
      <Container className="max-w-3xl py-16">
        <ol className="relative border-l border-border">
          {learning.map((l) => {
            const rel = projects.find((p) => p.slug === l.relatedProject);
            return (
              <li key={l.topic} className="mb-10 ml-6">
                <span className="absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 border-primary bg-background shadow-button" aria-hidden />
                <div className="soft-panel rounded-[1.25rem] p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold">{l.topic}</h2><StatusBadge status={l.status} />
                    {l.date && <time className="font-mono text-xs text-muted-foreground">{l.date}</time>}
                  </div>
                  {l.description && <p className="mt-2 text-muted-foreground">{l.description}</p>}
                  {rel && <p className="mt-2 text-sm">Related: <Link to="/projects/$slug" params={{ slug: rel.slug }} className="text-primary hover:underline">{rel.name}</Link></p>}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
