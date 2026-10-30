export const experiments = [
  {
    id: "sorting-visualizer",
    title: "Sorting Visualiser",
    description: "Watch bubble, insertion and selection sort rearrange bars step by step.",
    tags: ["Algorithms", "JavaScript"],
  },
  {
    id: "snippet-runner",
    title: "Predefined Snippet Runner",
    description:
      "Run a few hand-written JavaScript functions with your own input. No arbitrary code is executed.",
    tags: ["JavaScript", "Safe by design"],
  },
  {
    id: "mini-arcade",
    title: "Mini Arcade",
    description:
      "Take a break with a memory match, reaction-time challenge, or number-guessing game.",
    tags: ["Games", "Interactive", "Keyboard friendly"],
  },
] as const;

export type ExperimentId = (typeof experiments)[number]["id"];
