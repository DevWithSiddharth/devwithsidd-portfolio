import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "theme";

export const themeInitScript = `(function(){try{var t=localStorage.getItem('${KEY}');var d=t!=='light';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch {
        setTheme(next);
        return;
      }
      setTheme(next);
    };

    const viewTransitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    if (
      viewTransitionDocument.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      viewTransitionDocument.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  };
  return { theme, toggle };
}

export function isSafeUrl(url?: string | null): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}
