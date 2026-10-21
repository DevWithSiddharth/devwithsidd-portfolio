import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { skillGroups } from "@/data/skills";
import { Container, PageHeader, StatusBadge } from "@/components/common/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () => seo("Skills", "Languages, frameworks and tools Siddharth Yadav works with, labelled honestly."),
  component: Skills,
});

function Skills() {
  const [cat, setCat] = useState("All");
  const groups = cat === "All" ? skillGroups : skillGroups.filter((g) => g.category === cat);
  return (
    <>
      <PageHeader label="skills" title="Skills & tools">Labels are honest: <em>Learning</em>, <em>Comfortable</em> or <em>Proficient</em>. No made-up percentages.</PageHeader>
      <Container className="py-12">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills">
          {["All", ...skillGroups.map((g) => g.category)].map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-md border px-3 py-2 text-sm ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {groups.map((g) => (
            <section key={g.category} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-mono text-sm text-cyan">{g.category}</h2>
              <ul className="mt-4 divide-y divide-border">
                {g.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between py-3"><span className="font-medium">{s.name}</span><StatusBadge status={s.level} /></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
