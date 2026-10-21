import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHeader } from "@/components/common/ui";
import { Terminal } from "@/components/terminal/Terminal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terminal")({
  head: () => seo("Terminal", "A simulated developer terminal — explore Siddharth's portfolio with commands."),
  component: () => (
    <>
      <PageHeader label="terminal" title="Developer terminal">A simulation — type <code className="font-mono text-cyan">help</code>. Nothing you type is executed.</PageHeader>
      <Container className="max-w-3xl py-12"><Terminal /></Container>
    </>
  ),
});
