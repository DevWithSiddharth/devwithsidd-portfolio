import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ExternalLink as LinkIcon,
  Github,
  Star,
  Search,
  GitFork,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Code2,
  Calendar,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Container, ExternalLink, PageHeader, Tag } from "@/components/common/ui";
import { seo } from "@/lib/seo";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count?: number;
  fork: boolean;
  updated_at: string;
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-amber-400",
  Python: "bg-emerald-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Rust: "bg-red-500",
  Go: "bg-cyan-500",
};

async function fetchRepos(): Promise<Repo[]> {
  const r = await fetch(
    `https://api.github.com/users/${profile.handle}/repos?sort=updated&per_page=30`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (r.status === 403 || r.status === 429) {
    throw new Error("GitHub public rate limit reached. Try again in a few minutes.");
  }
  if (!r.ok) throw new Error("Could not reach GitHub right now.");
  const data = (await r.json()) as Repo[];
  return data.filter((x) => !x.fork);
}

export const Route = createFileRoute("/github")({
  head: () =>
    seo(
      "GitHub Repositories",
      `Explore public open-source projects by ${profile.handle}.`,
      "/github",
    ),
  component: GitHubPage,
});

function GitHubPage() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
    retry: false,
    staleTime: 10 * 60_000,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const stats = useMemo(() => {
    if (!data) return { totalStars: 0, languages: [], latestUpdate: null };
    const totalStars = data.reduce((acc, r) => acc + r.stargazers_count, 0);
    const langs = Array.from(new Set(data.map((r) => r.language).filter(Boolean))) as string[];

    return {
      totalStars,
      languages: ["All", ...langs],
    };
  }, [data]);

  const filteredRepos = useMemo(() => {
    if (!data) return [];
    return data.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLang = selectedLanguage === "All" || r.language === selectedLanguage;
      return matchesSearch && matchesLang;
    });
  }, [data, searchQuery, selectedLanguage]);

  const handleCopyClone = (id: number, repoName: string) => {
    navigator.clipboard.writeText(`git clone https://github.com/${profile.handle}/${repoName}.git`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <PageHeader label="github" title={<>@{profile.handle}</>}>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
          >
            <Github className="size-4" />
            <span>Open GitHub Profile</span>
          </a>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh Repositories"
            className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card p-2.5 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>
        </div>
      </PageHeader>

      <Container className="py-12">
        {data && (
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Public Repos</span>
                <Code2 className="size-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-extrabold sm:text-3xl">{data.length}</p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Stars</span>
                <Star className="size-4 text-amber-500" />
              </div>
              <p className="mt-2 text-2xl font-extrabold sm:text-3xl">{stats.totalStars}</p>
            </div>

            <div className="col-span-2 rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm sm:col-span-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Languages</span>
                <Sparkles className="size-4 text-emerald-500" />
              </div>
              <p className="mt-2 text-2xl font-extrabold sm:text-3xl">
                {stats.languages.length - 1}
              </p>
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {stats.languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  selectedLanguage === lang
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-muted/30 py-1.5 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-44 flex-col justify-between rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm"
              >
                <div className="space-y-3">
                  <div className="h-5 w-2/3 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded-md bg-muted/60" />
                  <div className="h-4 w-4/5 animate-pulse rounded-md bg-muted/60" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center"
          >
            <p className="text-sm font-semibold text-destructive">{(error as Error).message}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <RefreshCw className="size-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {data && filteredRepos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            <Sparkles className="mx-auto size-8 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium">No matching repositories found.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLanguage("All");
              }}
              className="mt-3 text-xs font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {data && filteredRepos.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((r) => (
              <article
                key={r.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />

                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-mono text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      <span className="break-all">{r.name}</span>
                    </h2>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyClone(r.id, r.name)}
                        title="Copy Git Clone Command"
                        className="rounded-lg p-1.5 text-muted-foreground/60 opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
                      >
                        {copiedId === r.id ? (
                          <Check className="size-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                      <ExternalLink
                        href={r.html_url}
                        aria-label={`Open ${r.name} on GitHub`}
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                      >
                        <LinkIcon className="size-4" />
                      </ExternalLink>
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {r.description ?? "No description provided."}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-border/40 text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <span
                          className={`size-2 rounded-full ${
                            LANGUAGE_COLORS[r.language] || "bg-gray-400"
                          }`}
                        />
                        {r.language}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 text-muted-foreground/80 font-medium">
                      <Star className="size-3 text-amber-500/80" />
                      {r.stargazers_count}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/70">
                    <Calendar className="size-3" />
                    {new Date(r.updated_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
