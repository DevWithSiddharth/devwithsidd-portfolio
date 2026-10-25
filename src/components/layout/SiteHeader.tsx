import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/data/navigation";
import { useTheme } from "@/lib/theme";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-mono text-sm font-semibold tracking-[0.08em] text-foreground" onClick={() => setOpen(false)}>
          <span className="text-cyan">~/</span>DevWithSidd<span className="caret-blink text-primary">_</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1.5 rounded-full border border-border bg-card/70 px-1.5 py-1 shadow-card lg:flex">
          {navigation.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary shadow-sm" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {navigation.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
