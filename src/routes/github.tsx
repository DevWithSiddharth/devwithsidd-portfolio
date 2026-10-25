import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink as LinkIcon, Github, Star } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, ExternalLink, PageHeader, Tag } from "@/components/common/ui";
import { seo } from "@/lib/seo";

type Repo = { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; fork: boolean; updated_at: string };

async function fetchRepos(): Promise<Repo[]> {
  const r = await fetch(`https://api.github.com/users/${profile.handle}/repos?sort=updated&per_page=30`, { headers: { Accept: "application/vnd.github+json" } });
  if (r.status === 403 || r.status === 429) throw new Error("GitHub's public rate limit was reached. Try again in a bit.");
  if (!r.ok) throw new Error("Couldn't reach GitHub right now.");
  const data = (await r.json()) as Repo[];
  return data.filter((x) => !x.fork);
}

export const Route = createFileRoute("/github")({
  head: () => seo("GitHub", "Public repositories from Siddharth Yadav's GitHub — DevWithSiddharth.", "/github"),
  component: GitHubPage,
});

function GitHubPage() {
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["repos"], queryFn: fetchRepos, retry: false, staleTime: 10 * 60_000 });
  return (
    <>
      <PageHeader label="github" title={<>@{profile.handle}</>}>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-base font-medium text-primary-foreground shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"><Github className="size-4" /> Open GitHub profile</a>
      </PageHeader>
      <Container className="py-12">
        {isLoading && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-36 animate-pulse rounded-xl border border-border bg-card" />)}</div>}
        {error && (
          <div role="alert" className="rounded-xl border border-destructive/40 p-6">
            <p className="text-destructive">{(error as Error).message}</p>
            <button onClick={() => refetch()} className="mt-3 text-sm text-primary hover:underline">Retry</button>
          </div>
        )}
        {data && data.length === 0 && <p className="text-muted-foreground">No public repositories yet.</p>}
        {data && data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((r) => (
              <article key={r.id} className="flex flex-col rounded-[1.5rem] border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift">
                <h2 className="flex items-start justify-between gap-2 font-mono text-sm font-semibold">
                  <span className="break-all">{r.name}</span>
                  <ExternalLink href={r.html_url} aria-label={`Open ${r.name} on GitHub`} className="text-muted-foreground hover:text-primary"><LinkIcon className="size-4" /></ExternalLink>
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description ?? "No description."}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  {r.language && <Tag>{r.language}</Tag>}
                  <span className="inline-flex items-center gap-1"><Star className="size-3" />{r.stargazers_count}</span>
                  <span className="ml-auto">{new Date(r.updated_at).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
