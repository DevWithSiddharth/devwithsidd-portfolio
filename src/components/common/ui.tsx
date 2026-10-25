import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isSafeUrl } from "@/lib/theme";

export function ExternalLink({ href, className, children, ...rest }: { href?: string | undefined; className?: string; children: ReactNode; "aria-label"?: string }) {
  if (!isSafeUrl(href)) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-primary">// {children}</p>;
}

export function PageHeader({ label, title, children }: { label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card/40">
      <div className="absolute inset-0 bg-grid opacity-80" aria-hidden />
      <div className="absolute inset-0 bg-glow" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </header>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground", className)}>
      {children}
    </span>
  );
}

const statusStyles: Record<string, string> = {
  Completed: "border-success/40 text-success",
  "In Progress": "border-primary/40 text-primary",
  Experiment: "border-warning/40 text-warning",
  Studying: "border-primary/40 text-primary",
  Exploring: "border-warning/40 text-warning",
  Learning: "border-warning/40 text-warning",
  Comfortable: "border-primary/40 text-primary",
  Proficient: "border-success/40 text-success",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs", statusStyles[status] ?? "border-border text-muted-foreground")}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}
