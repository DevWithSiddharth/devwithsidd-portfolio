export type ProjectStatus = "Completed" | "In Progress" | "Experiment";
export type Project = {
  slug: string;
  name: string;
  description: string;
  category: "Web" | "Backend" | "Python" | "AI/ML" | "Tools";
  tech: string[];
  status: ProjectStatus;
  featured?: boolean;
  /** true = sample entry, shown with a clear "placeholder" label */
  placeholder?: boolean;
  github?: string;
  demo?: string;
  caseStudy?: {
    motivation?: string;
    solution?: string;
    implementation?: string;
    challenges?: string;
    lessons?: string;
  };
};

// Add your real projects here. Remove the placeholder entry once you have real ones.
export const projects: Project[] = [
  {
    slug: "developer-portfolio",
    name: "Developer Portfolio",
    description:
      "This site — a personal workspace with a simulated terminal, project showcase, and browser-based coding experiments.",
    category: "Web",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    status: "In Progress",
    featured: true,
    github: "https://github.com/DevWithSiddharth",
    caseStudy: {
      motivation: "I wanted one place to show my work, my learning and how I think about code.",
      solution:
        "A data-driven portfolio where every piece of content lives in editable data files, so adding a project is a one-file change.",
      implementation:
        "Content is separated from presentation. The terminal is a pure simulation that maps known commands to portfolio data — it never executes input.",
    },
  },
  {
    slug: "sample-project",
    name: "Your Next Project (placeholder)",
    description:
      "Placeholder entry showing how projects appear. Replace it in the projects data file with a real project.",
    category: "Python",
    tech: ["Python", "Flask"],
    status: "Experiment",
    placeholder: true,
  },
];

export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function filterProjects(list: Project[], query: string, category: string) {
  const q = query.trim().toLowerCase();
  return list.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (!q) return true;
    return [p.name, p.description, ...p.tech].some((s) => s.toLowerCase().includes(q));
  });
}
