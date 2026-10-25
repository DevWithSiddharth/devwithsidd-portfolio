import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { skillGroups } from "@/data/skills";
import { Container, PageHeader, StatusBadge } from "@/components/common/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () => seo("Skills", "Languages, frameworks and tools Siddharth Yadav works with, labelled honestly.", "/skills"),
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
            <button
              key={c}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${cat === c ? "border-primary bg-primary text-primary-foreground shadow-button" : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {groups.map((g) => (
            <section key={g.category} className="soft-panel rounded-[1.5rem] p-6">
              <h2 className="font-mono text-sm text-primary">{g.category}</h2>
              <ul className="mt-4 divide-y divide-border/80">
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
