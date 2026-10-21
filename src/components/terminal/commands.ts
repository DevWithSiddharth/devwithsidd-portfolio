import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { learning } from "@/data/learning";

// Pure simulation: maps known command names to text built from portfolio data.
// Input is never evaluated or executed.
export const commandHelp: Record<string, string> = {
  help: "list available commands",
  about: "who is Siddharth?",
  skills: "technologies by category",
  projects: "list of projects",
  learning: "what I'm currently exploring",
  contact: "how to reach me",
  github: "my GitHub profile",
  clear: "clear the screen",
};

export function runCommand(raw: string): string[] | "clear" {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return [];
    case "help":
      return ["Available commands:", ...Object.entries(commandHelp).map(([k, v]) => `  ${k.padEnd(10)} ${v}`)];
    case "about":
      return [`${profile.name} — ${profile.role}`, ...profile.bio];
    case "skills":
      return skillGroups.map((g) => `${g.category}: ${g.skills.map((s) => `${s.name} (${s.level})`).join(", ")}`);
    case "projects":
      return projects.map((p) => `• ${p.name} [${p.status}]${p.placeholder ? " (placeholder)" : ""} — ${p.tech.join(", ")}`);
    case "learning":
      return learning.map((l) => `• ${l.topic} — ${l.status}`);
    case "contact":
      return [
        `email: ${profile.email}${profile.emailIsPlaceholder ? " (placeholder)" : ""}`,
        "Or use the form at /contact. Open to internships, freelance and collaboration.",
      ];
    case "github":
      return [profile.github];
    case "clear":
      return "clear";
    default:
      return [`command not found: ${raw.trim().slice(0, 40)}`, "Type 'help' to see what I can do."];
  }
}
