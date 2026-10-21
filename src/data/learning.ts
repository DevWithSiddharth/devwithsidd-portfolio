export type LearningStatus = "Exploring" | "Studying" | "Completed";

export type LearningEntry = {
  readonly topic: string;
  readonly status: LearningStatus;
  readonly description?: string;
  readonly date?: string;
  readonly relatedProject?: string; // project slug
};

// Only add real milestones. Dates are optional.
export const learning: readonly LearningEntry[] = [
  {
    topic: "Web Development & React",
    status: "Completed",
    description: "HTML, CSS, JavaScript, and React — building responsive interfaces that actually work.",
    date: "2018",
    relatedProject: "developer-portfolio",
  },
  {
    topic: "Python & Data Handling",
    status: "Completed",
    description: "Scripting, data manipulation with Pandas, and writing cleaner code.",
    date: "2020",
  },
  {
    topic: "TypeScript & Advanced Frontend",
    status: "Studying",
    description: "Type safety, Next.js App Router, and scaling component architecture.",
    date: "2026",
  },
  {
    topic: "Backend, APIs & Databases",
    status: "Studying",
    description: "Flask, FastAPI, PostgreSQL, and Node.js — how requests, routes, and data fit together.",
    date: "2026",
  },
  {
    topic: "DevOps & Containerization",
    status: "Exploring",
    description: "Docker, Linux environments, and setting up automated CI/CD pipelines.",
  },
  {
    topic: "AI Agents & LLM Orchestration",
    status: "Exploring",
    description: "LangChain, PyTorch fundamentals, and occasionally wondering what I'm doing 😅.",
  },
];

// --- Helper Utilities ---

export const getLearningByStatus = (status: LearningStatus): readonly LearningEntry[] => {
  return learning.filter((entry) => entry.status === status);
};

export const activeStudiesCount: number = learning.filter(
  (entry) => entry.status === "Studying" || entry.status === "Exploring"
).length;