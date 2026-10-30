export type LearningStatus = "Exploring" | "Studying" | "Completed";

export type LearningCategory = "Frontend" | "Backend" | "Data & AI" | "DevOps & Cloud";

export type LearningEntry = {
  readonly id: string;
  readonly topic: string;
  readonly status: LearningStatus;
  readonly category: LearningCategory;
  readonly description: string;
  readonly tags: readonly string[];
  readonly date?: string;
  readonly relatedProject?: string;
};

export const learning: readonly LearningEntry[] = [
  {
    id: "web-dev-react",
    topic: "Web Development & React",
    status: "Completed",
    category: "Frontend",
    description:
      "HTML, CSS, JavaScript, and React — building responsive, accessible interfaces that actually work.",
    tags: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
    date: "2018",
    relatedProject: "developer-portfolio",
  },
  {
    id: "python-data",
    topic: "Python & Data Handling",
    status: "Completed",
    category: "Data & AI",
    description:
      "Scripting, data manipulation with Pandas, and writing clean, maintainable pythonic code.",
    tags: ["Python", "Pandas", "Automation", "Scripting"],
    date: "2020",
  },
  {
    id: "typescript-frontend",
    topic: "MERN Stack & Advanced Frontend",
    status: "Studying",
    category: "Frontend",
    description:
      "Strict type safety, Next.js App Router, TanStack ecosystem, and scaling component architecture.",
    tags: ["Next.js", "TanStack Router", "Tailwind CSS"],
    date: "2024",
  },
  {
    id: "backend-apis",
    topic: "Backend, APIs & Databases",
    status: "Studying",
    category: "Backend",
    description:
      "Flask, FastAPI, PostgreSQL, and Node.js — how requests, routes, ORMs, and data fit together.",
    tags: ["FastAPI", "PostgreSQL", "Node.js", "REST APIs"],
    date: "2026",
  },
  {
    id: "devops-containerization",
    topic: "DevOps & Containerization",
    status: "Exploring",
    category: "DevOps & Cloud",
    description: "Docker, Linux server management, and setting up automated CI/CD pipelines.",
    tags: ["Docker", "Linux", "CI/CD", "GitHub Actions"],
  },
  {
    id: "ai-llm-orchestration",
    topic: "AI Agents & LLM Orchestration",
    status: "Exploring",
    category: "Data & AI",
    description:
      "LangChain, PyTorch fundamentals, tool calling, and structured prompt engineering.",
    tags: ["LangChain", "PyTorch", "LLMs", "AI Agents"],
  },
];

export const getLearningByStatus = (status: LearningStatus): readonly LearningEntry[] => {
  return learning.filter((entry) => entry.status === status);
};

export const getLearningByCategory = (category: LearningCategory): readonly LearningEntry[] => {
  return learning.filter((entry) => entry.category === category);
};

export const searchLearning = (query: string): readonly LearningEntry[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return learning;

  return learning.filter(
    (entry) =>
      entry.topic.toLowerCase().includes(normalizedQuery) ||
      entry.description.toLowerCase().includes(normalizedQuery) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
  );
};

export const activeStudiesCount: number = learning.filter(
  (entry) => entry.status === "Studying" || entry.status === "Exploring",
).length;

export const getLearningStats = () => {
  const total = learning.length;
  const completed = learning.filter((item) => item.status === "Completed").length;
  const studying = learning.filter((item) => item.status === "Studying").length;
  const exploring = learning.filter((item) => item.status === "Exploring").length;

  return {
    total,
    completed,
    studying,
    exploring,
    completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};
