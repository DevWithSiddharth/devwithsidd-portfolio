import { createFileRoute } from "@tanstack/react-router";
import { Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, PageHeader } from "@/components/common/ui";
import { ContactForm } from "@/components/contact/ContactForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Get in touch with Siddharth Yadav for internships, freelance work or collaboration.", "/contact"),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader label="contact" title="Let's build something">Internships, freelance projects, collaborations — or just a nerdy chat.</PageHeader>
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-[1.4rem] border border-border bg-card p-5 shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:border-primary">
            <Mail className="size-5 text-cyan" />
            <span className="min-w-0"><span className="block break-all font-mono text-sm">{profile.email}</span>{profile.emailIsPlaceholder && <span className="text-xs text-warning">placeholder — real address coming soon</span>}</span>
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[1.4rem] border border-border bg-card p-5 shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:border-primary">
            <Github className="size-5 text-cyan" /><span className="font-mono text-sm">github.com/{profile.handle}</span>
          </a>
        </div>
        <ContactForm />
      </Container>
    </>
  );
}
