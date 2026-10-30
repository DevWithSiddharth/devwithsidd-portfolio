import { createFileRoute } from "@tanstack/react-router";
import { Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, PageHeader } from "@/components/common/ui";
import { ContactForm } from "@/components/contact/ContactForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact",
      "Get in touch with Siddharth Yadav for internships, freelance work or collaboration.",
      "/contact",
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader label="contact" title="Let's Build Something">
        Internships, freelance projects, collaborations — or just a nerdy chat.
      </PageHeader>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-500">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Internships & Projects
          </div>

          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-md"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                  Direct Email
                </span>
                <span className="block break-all font-mono text-sm font-bold text-foreground">
                  {profile.email}
                </span>
                {profile.emailIsPlaceholder && (
                  <span className="text-[11px] text-amber-500 font-medium">
                    placeholder — real address coming soon
                  </span>
                )}
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-md"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Github className="size-5" />
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                  GitHub Profile
                </span>
                <span className="block font-mono text-sm font-bold text-foreground">
                  github.com/{profile.handle}
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Send a Message</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
