import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, PageHeader, SectionLabel, Tag } from "@/components/common/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About", "About Siddharth Yadav — interests, learning philosophy and goals."),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader label="about" title="About me">{profile.tagline}</PageHeader>
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <ul className="space-y-4 text-lg">{profile.bio.map((b) => <li key={b}>{b}</li>)}</ul>
          <div className="mt-12">
            <SectionLabel>learning philosophy</SectionLabel>
            <blockquote className="mt-3 border-l-2 border-primary pl-4 text-muted-foreground">{profile.philosophy}</blockquote>
          </div>
          {profile.education.length > 0 && (
            <div className="mt-12"><SectionLabel>education</SectionLabel>
              {profile.education.map((e) => <p key={e.school} className="mt-3"><strong>{e.degree}</strong> — {e.school} <span className="text-muted-foreground">({e.period})</span></p>)}
            </div>
          )}
          {profile.experience.length > 0 && (
            <div className="mt-12"><SectionLabel>experience</SectionLabel>
              {profile.experience.map((e) => <div key={e.org} className="mt-3"><p><strong>{e.role}</strong> — {e.org} <span className="text-muted-foreground">({e.period})</span></p><p className="text-muted-foreground">{e.summary}</p></div>)}
            </div>
          )}
        </div>
        <aside className="space-y-8">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <SectionLabel>interests</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">{profile.interests.map((i) => <Tag key={i}>{i}</Tag>)}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <SectionLabel>goals</SectionLabel>
            <ul className="mt-4 space-y-2 text-sm">{profile.goals.map((g) => <li key={g} className="flex gap-2"><span className="text-cyan">→</span>{g}</li>)}</ul>
          </div>
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} download className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground"><Download className="size-4" /> Download resume</a>
          )}
        </aside>
      </Container>
    </>
  );
}
