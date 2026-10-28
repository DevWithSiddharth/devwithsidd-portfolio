export type ProjectStatus = "Completed" | "In Progress" | "Experiment";
export type Project = {
  slug: string;
  name: string;
  description: string;
  /** Set to null or omit to use the card's abstract fallback instead. */
  image?: string | null;
  imageAlt?: string;
  /** Optional gallery images; use fit="cover" with position to crop around a focal point. */
  screenshots?: { src: string; alt: string; fit?: "cover" | "contain"; position?: string }[];
  category: "Web" | "Backend" | "Python" | "AI/ML" | "Tools";
  tech: string[];
  status: ProjectStatus;
  featured?: boolean;
  /** true = sample entry, shown with a clear "placeholder" label */
  placeholder?: boolean;
  github?: string;
  demo?: string;
};

// Add your real projects here. Remove the placeholder entry once you have real ones.
export const projects: Project[] = [
{
    slug: "developer-portfolio",
    name: "Developer Portfolio",
    image: "/projects/preview-placeholder.svg",
    description:
      "An interactive developer workspace and project showcase featuring an in-browser terminal simulation, case study reader, and modular design.",
    category: "Web",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    status: "In Progress",
    featured: true,
    github: "https://github.com/DevWithSiddharth/devwithsidd-portfolio",
    demo: "https://devwithsidd.vercel.app",
  },
  {
    slug: "python-snake-game",
    name: "Python Snake Game",
    image: "/projects/preview-placeholder.svg",
    description:
      "A classic, fast-paced Snake arcade game built using Python and Pygame featuring responsive controls, multiple maps, and dynamic speed scaling.",
    category: "Python",
    tech: ["Python", "Pygame"],
    status: "Completed",
    featured: true,
    github: "https://github.com/DevWithSiddharth/Python-Snake-Game",
  },
  {
    slug: "color-catcher",
    name: "Color Catcher",
    image: "/projects/preview-placeholder.svg",
    description:
      "A fast-paced neon arcade game built with Pygame featuring auto-detecting input modes, dynamic difficulty scaling, and rich visual juice effects.",
    category: "Python",
    tech: ["Python", "Pygame"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/Color-Catcher",
  },
  {
    slug: "fun-n-fairy-land",
    name: "Fun 'n' Fairy Land",
    image: "/projects/Fairyland/Dashboard.png",
    description:
      "An interactive and whimsical web experience designed to showcase enchanting narratives, vibrant illustrations, and creative storytelling.",
    category: "Web",
    screenshots: [
      { src: "/projects/Fairyland/Dashboard.png", alt: "Dashboard" },
      { src: "/projects/Fairyland/Expert.png", alt: "Expert" },
      { src: "/projects/Fairyland/Images.png", alt: "Images" },
      { src: "/projects/Fairyland/Map.png", alt: "Map" },
      { src: "/projects/Fairyland/Outlets.png", alt: "Outlets" },
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/Fairyland",
    demo: "https://DevWithSiddharth.github.io/Fairyland/",
  },
  {
    slug: "getmusic",
    name: "GetMusic",
    image: "/projects/preview-placeholder.svg",
    featured: true,
    description:
      "A sleek dark-themed music streaming platform with playlist creation, discovery features, and a comprehensive administrator dashboard.",
    category: "Backend",
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/GetMusic-Legacy",
  },
  {
    slug: "timereaper",
    name: "TimeReaper",
    image: "/projects/TimeReaper/Dashboard.png",
    imageAlt: "TimeReaper study tracking dashboard",
    description:
      "A local-first productivity and study time tracker with analytics, visual data plotting, dynamic date logging, and flexible JSON backup utilities.",
    category: "Web",
    screenshots: [
      { src: "/projects/TimeReaper/Dashboard.png", alt: "TimeReaper dashboard" },
      { src: "/projects/TimeReaper/Dashboard 2.png", alt: "TimeReaper dashboard insights", fit: "contain" },
      { src: "/projects/TimeReaper/Data.png", alt: "TimeReaper data log", fit: "contain" },
      { src: "/projects/TimeReaper/Graph.png", alt: "TimeReaper analytics graph", fit: "contain" },
      { src: "/projects/TimeReaper/Recent Days.png", alt: "TimeReaper recent days report", fit: "contain" },
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/TimeReaper",
    demo: "https://time-reaper.vercel.app",
  },
  {
    slug: "taskreaper",
    name: "TaskReaper",
    image: "/projects/TaskReaper/Dashboard.png",
    description:
      "A clean, responsive task planner application featuring persistent storage, flexible filtering, keyboard shortcuts, and full inline editing capabilities.",
    category: "Web",
    tech: ["React", "Vite", "Tailwind CSS"],
    status: "Completed",
    screenshots: [
      { src: "/projects/TaskReaper/Dashboard.png", alt: "TaskReaper dashboard" }
    ],
    github: "https://github.com/DevWithSiddharth/TaskReaper",
    demo: "https://task-reaper-ten.vercel.app",
  }
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
