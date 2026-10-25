import { createFileRoute } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { experiments, type ExperimentId } from "@/data/experiments";
import { Container, PageHeader, Tag } from "@/components/common/ui";
import { SortingVisualizer } from "@/components/experiments/SortingVisualizer";
import { SnippetRunner } from "@/components/experiments/SnippetRunner";
import { seo } from "@/lib/seo";

const registry: Record<ExperimentId, ComponentType> = {
  "sorting-visualizer": SortingVisualizer,
  "snippet-runner": SnippetRunner,
};

export const Route = createFileRoute("/experiments")({
  head: () => seo("Coding Lab", "Browser-based coding experiments: a sorting visualiser and a safe snippet runner.", "/experiments"),
  component: Experiments,
});

function Experiments() {
  return (
    <>
      <PageHeader label="lab" title="Coding experiments">Small interactive demos that run entirely in your browser.</PageHeader>
      <Container className="grid gap-8 py-12">
        {experiments.map((e) => {
          const C = registry[e.id];
          return (
            <section key={e.id} className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
              <div className="flex flex-wrap items-center gap-2">{e.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
              <h2 className="mt-3 text-2xl font-semibold">{e.title}</h2>
              <p className="mt-1 text-muted-foreground">{e.description}</p>
              <div className="mt-6"><C /></div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
