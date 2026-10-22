import { Link } from "@tanstack/react-router";
import { Github, Mail } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-mono text-sm font-semibold"><span className="text-cyan">~/</span>DevWithSidd</p>
          <p className="mt-2 text-sm text-muted-foreground">{profile.role} · building in public.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {navigation.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground">{n.label}</Link>
          ))}
          <Link to="/terminal" className="text-muted-foreground hover:text-foreground">Terminal</Link>
          {profile.resumeUrl && <a href={profile.resumeUrl} download className="text-muted-foreground hover:text-foreground">Resume</a>}
        </nav>
        <div className="flex gap-2 md:justify-end">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-md border border-border hover:border-primary hover:text-primary"><Github className="size-4" /></a>
        </div>
      </div>
      <p className="border-t border-border py-4 text-center font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} {profile.name} — compiled with caffeine.</p>
    </footer>
  );
}
