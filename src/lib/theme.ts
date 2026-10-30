import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "theme";

export const themeInitScript = `(function(){try{var t=localStorage.getItem('${KEY}');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){}})();`;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(KEY, next);
    } catch {
      setTheme(next);
    }
    setTheme(next);
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
