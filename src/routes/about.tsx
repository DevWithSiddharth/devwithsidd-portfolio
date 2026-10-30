import { createFileRoute } from "@tanstack/react-router";
import {
  Download,
  GraduationCap,
  Briefcase,
  Quote,
  Target,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Container, PageHeader, SectionLabel, Tag } from "@/components/common/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo("About", "About Siddharth Yadav — interests, learning philosophy and goals.", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader label="about" title="About Me">
        {profile.tagline}
      </PageHeader>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-12">
          <section className="space-y-5">
            {profile.bio.map((paragraph, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-md"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
                <p className="relative z-10 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  {paragraph}
                </p>
              </div>
            ))}
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 via-card/40 to-primary/5 p-6 backdrop-blur-sm sm:p-8">
            <Quote className="absolute right-4 top-4 size-16 text-primary/10" />
            <SectionLabel>Learning Philosophy</SectionLabel>
            <blockquote className="relative z-10 mt-4 border-l-2 border-primary pl-4 text-base italic leading-7 text-foreground/90 sm:text-lg">
              "{profile.philosophy}"
            </blockquote>
          </section>

          {profile.experience.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <Briefcase className="size-4 text-primary" />
                <SectionLabel>Experience</SectionLabel>
              </div>

              <div className="relative border-l border-border/60 pl-6 space-y-8 ml-2">
                {profile.experience.map((e, idx) => (
                  <div key={e.org || idx} className="group relative">
                    <div className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-primary transition-transform duration-200 group-hover:scale-125" />

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-base font-bold text-foreground">
                        {e.role} <span className="text-primary font-medium">@ {e.org}</span>
                      </h3>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 bg-muted/40 px-2.5 py-1 rounded-md w-fit">
                        {e.period}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {e.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {profile.education.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-4 text-primary" />
                <SectionLabel>Education</SectionLabel>
              </div>

              <div className="relative border-l border-border/60 pl-6 space-y-6 ml-2">
                {profile.education.map((e) => (
                  <div key={e.school} className="group relative">
                    <div className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-muted-foreground/40 transition-colors group-hover:bg-primary" />

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-base font-bold text-foreground">{e.degree}</h3>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 bg-muted/40 px-2.5 py-1 rounded-md w-fit">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{e.school}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-4 text-amber-500" />
              <SectionLabel>Interests & Focus</SectionLabel>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <Tag key={i}>{i}</Tag>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Target className="size-4 text-primary" />
              <SectionLabel>Current Goals</SectionLabel>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {profile.goals.map((g) => (
                <li key={g} className="flex items-start gap-2.5">
                  <ArrowRight className="size-4 shrink-0 text-primary mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {profile.resumeUrl && (
            <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent p-6 text-center">
              <UserCheck className="mx-auto size-8 text-primary mb-2" />
              <h4 className="text-base font-bold text-foreground">
                Want to see full qualifications?
              </h4>
              <p className="mt-1 text-xs text-muted-foreground mb-5">
                Download my up-to-date resume in PDF format.
              </p>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
              >
                <Download className="size-4" />
                <span>Download Resume</span>
              </a>
            </div>
          )}
        </aside>
      </Container>
    </>
  );
}
