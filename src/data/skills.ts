export type Level = "Proficient" | "Comfortable" | "Learning";

export interface Skill {
  readonly name: string;
  readonly level: Level;
  readonly description?: string;
}

export interface SkillGroup {
  readonly category: string;
  readonly skills: readonly Skill[];
}

// Define the hierarchy order for sorting (index 0 comes first)
const levelOrder: Record<Level, number> = {
  Proficient: 0,
  Comfortable: 1,
  Learning: 2,
};

// Raw definitions (can be added in any order; they will auto-sort)
const rawSkillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", level: "Proficient" },
      { name: "JavaScript", level: "Proficient" },
      { name: "PHP", level: "Comfortable" },
      { name: "SQL", level: "Comfortable" },
      { name: "C", level: "Learning" },
    ],
  },
  {
    category: "Frontend & Design",
    skills: [
      { name: "HTML5", level: "Proficient" },
      { name: "CSS3", level: "Proficient" },
      { name: "JavaScript", level: "Proficient" },
      { name: "Tailwind CSS", level: "Comfortable" },
      { name: "Bootstrap", level: "Proficient" },
      { name: "Figma", level: "Proficient" },
      { name: "React", level: "Comfortable" },
      { name: "Next.js", level: "Learning" }
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      { name: "MySQL", level: "Proficient" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "MongoDB", level: "Comfortable" },
      { name: "Node.js", level: "Learning" },
      { name: "Express", level: "Learning" },
      { name: "FastAPI", level: "Learning" }
    ],
  },
  {
    category: "AI, Data & Hardware",
    skills: [
      { name: "Pandas", level: "Learning" },
      { name: "PyTorch", level: "Learning" },
      { name: "OpenCV", level: "Learning" },
      { name: "Qt", level: "Learning" },
      { name: "Arduino", level: "Learning" },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git", level: "Proficient" },
      { name: "GitHub", level: "Proficient" },
      { name: "Linux", level: "Comfortable" },
      { name: "Docker", level: "Learning" },
      { name: "Bash / Shell", level: "Proficient" }
    ],
  },
];

// Automatically sort skills within each group by level order (Proficient -> Comfortable -> Learning)
export const skillGroups: readonly SkillGroup[] = rawSkillGroups.map((group) => ({
  ...group,
  skills: [...group.skills].sort(
    (a, b) => levelOrder[a.level] - levelOrder[b.level]
  ),
}));

// Unique derived list of all skill names
export const allSkills: readonly string[] = Array.from(
  new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.name)))
);

// Helper utilities with deduplication
export const getSkillsByLevel = (level: Level): Skill[] => {
  const seen = new Set<string>();
  return skillGroups.flatMap((g) => g.skills).filter((s) => {
    if (s.level === level && !seen.has(s.name)) {
      seen.add(s.name);
      return true;
    }
    return false;
  });
};

export const totalSkillCount: number = allSkills.length;