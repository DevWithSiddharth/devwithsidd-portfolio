export type Level = "Learning" | "Comfortable" | "Proficient";
export type Skill = { name: string; level: Level };

// Conservative defaults: everything starts at "Learning". Update honestly.
export const skillGroups: { category: string; skills: Skill[] }[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: "Learning" },
      { name: "C", level: "Learning" },
      { name: "JavaScript", level: "Learning" },
      { name: "SQL", level: "Learning" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML", level: "Learning" },
      { name: "CSS", level: "Learning" },
      { name: "React", level: "Learning" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: "Learning" },
      { name: "Flask", level: "Learning" },
      { name: "FastAPI", level: "Learning" },
    ],
  },
  { category: "Data and Automation", skills: [{ name: "Pandas", level: "Learning" }] },
  {
    category: "Developer Tools",
    skills: [
      { name: "Git", level: "Learning" },
      { name: "GitHub", level: "Learning" },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
