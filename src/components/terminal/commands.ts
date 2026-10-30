import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { allSkills, skillGroups } from "@/data/skills";
import { learning } from "@/data/learning";

export const commandHelp: Record<string, string> = {
  help: "list available commands",
  about: "who is Siddharth?",
  skills: "technologies by category",
  stack: "quick list of technologies",
  "projects [search]": "list projects, optionally filtered by text",
  learning: "what I'm currently exploring",
  contact: "how to reach me",
  github: "my GitHub profile",
  socials: "social profile links",
  repo: "this portfolio's source code",
  clear: "clear the screen",
};

export function runCommand(raw: string): string[] | "clear" {
  const cmd = raw.trim().toLowerCase();
  const [name, ...args] = cmd.split(/\s+/);
  switch (name) {
    case "":
      return [];
    case "help":
      return [
        "Available commands:",
        ...Object.entries(commandHelp).map(([k, v]) => `  ${k.padEnd(10)} ${v}`),
      ];
    case "about":
      return [`${profile.name} — ${profile.role}`, ...profile.bio];
    case "skills":
      return skillGroups.map(
        (g) => `${g.category}: ${g.skills.map((s) => `${s.name} (${s.level})`).join(", ")}`,
      );
    case "stack":
      return [allSkills.join(" · ")];
    case "projects": {
      const query = args.join(" ");
      const matches = projects.filter((p) =>
        [p.name, p.description, ...p.tech].some((value) => value.toLowerCase().includes(query)),
      );
      return matches.length
        ? matches.map(
            (p) =>
              `• ${p.name} [${p.status}]${p.placeholder ? " (placeholder)" : ""} — ${p.tech.join(", ")}`,
          )
        : [`No projects matched "${query}".`];
    }
    case "learning":
      return learning.map((l) => `• ${l.topic} — ${l.status}`);
    case "contact":
      return [
        `email: ${profile.email}${profile.emailIsPlaceholder ? " (placeholder)" : ""}`,
        "Or use the form at /contact. Open to internships, freelance and collaboration.",
      ];
    case "github":
      return [profile.github];
    case "socials":
      return profile.socials.map((social) => `${social.label}: ${social.url}`);
    case "repo":
      return ["https://github.com/DevWithSiddharth/devwithsidd-portfolio"];
    case "clear":
      return "clear";
    default:
      return [`command not found: ${raw.trim().slice(0, 40)}`, "Type 'help' to see what I can do."];
  }
}
