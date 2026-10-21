// Single source of truth for personal info. Edit here only.
export const profile = {
  name: "Siddharth Yadav",
  handle: "DevWithSiddharth",
  role: "Student Developer",
  tagline: "Breaking things in frontend and backend — then somehow making them work.",
  intro:
    "I'm a 19-year-old student developer exploring web development, Python, backend engineering, AI and machine learning. I learn by building, debugging and shipping.",
  bio: [
    "🧑‍💻 19-year-old student, navigating life one code snippet at a time.",
    "💻 I love breaking things in frontend and backend and then somehow making them work.",
    "🌱 Exploring Python, AI and Machine Learning (and occasionally wondering what I'm doing 😅).",
    "🧠 Learning by doing, debugging like a mad scientist, surviving on caffeine.",
    "📂 Peek at my 'oops… it works somehow' projects on GitHub.",
    "💬 Chat with me about Web Development, Python, APIs, AI, or literally anything nerdy.",
  ],
  philosophy:
    "Learn by doing. Read the error message twice, change one thing at a time, and write down what worked. Small projects shipped beat big projects imagined.",
  goals: [
    "Land a software engineering internship",
    "Take on freelance web projects",
    "Go deeper into backend engineering and ML",
    "Build a public body of work on GitHub",
  ],
  interests: ["Web Development", "Python", "Backend & APIs", "AI", "Machine Learning"],
  // PLACEHOLDER: replace with your real email address.
  email: "your.email@example.com",
  emailIsPlaceholder: true,
  // Set to e.g. "/documents/resume.pdf" after adding the PDF to public/documents/.
  resumeUrl: null as string | null,
  // Optional — leave empty arrays to hide the sections.
  education: [] as { school: string; degree: string; period: string }[],
  experience: [] as { org: string; role: string; period: string; summary: string }[],
  socials: [{ label: "GitHub", url: "https://github.com/DevWithSiddharth" }],
  github: "https://github.com/DevWithSiddharth",
  // Set to a free form service endpoint (e.g. Formspree) to enable form delivery.
  contactFormEndpoint: null as string | null,
};
