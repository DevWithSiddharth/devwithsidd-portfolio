export type LearningStatus = "Exploring" | "Studying" | "Completed";
export type LearningEntry = {
  topic: string;
  status: LearningStatus;
  description?: string;
  date?: string;
  relatedProject?: string; // project slug
};

// Only add real milestones. Dates are optional.
export const learning: LearningEntry[] = [
  { topic: "Web Development", status: "Studying", description: "HTML, CSS, JavaScript and React — building interfaces that actually work.", relatedProject: "developer-portfolio" },
  { topic: "Python", status: "Studying", description: "Scripting, data handling with Pandas, and writing cleaner code." },
  { topic: "Backend & APIs", status: "Exploring", description: "Flask, FastAPI and Node.js — how requests, routes and databases fit together." },
  { topic: "AI & Machine Learning", status: "Exploring", description: "The fundamentals, and occasionally wondering what I'm doing 😅." },
];
