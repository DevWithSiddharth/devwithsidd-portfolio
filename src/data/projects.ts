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
      "An interactive developer workspace and project showcase featuring an in-browser terminal simulation, case study reader, and modular design.",
    category: "Web",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    status: "In Progress",
    featured: true,
    github: "https://github.com/DevWithSiddharth/devwithsidd-portfolio",
    demo: "https://devwithsidd.vercel.agpp",
    caseStudy: {
      motivation: "To build a centralized, interactive space that showcases my projects, engineering thinking, and technical growth through a cohesive developer experience.",
      solution:
        "Engineered a fully data-driven architecture where content and presentation are decoupled, allowing new projects and updates to be added via simple schema objects.",
      implementation:
        "Built a pure-simulation terminal engine mapping custom commands to portfolio state, alongside dynamic modal routing for deep-dive case studies.",
      challenges: "Designing an extensible command-line interpreter that handles virtual directory navigation without compromising performance or security.",
      lessons: "Mastered data-driven UI design patterns, clean component architecture, and building accessible interactive terminal simulations in React."
    },
  },
  {
    slug: "python-snake-game",
    name: "Python Snake Game",
    description:
      "A classic, fast-paced Snake arcade game built using Python and Pygame featuring responsive controls, multiple maps, and dynamic speed scaling.",
    category: "Python",
    tech: ["Python", "Pygame"],
    status: "Completed",
    featured: true,
    github: "https://github.com/DevWithSiddharth/Python-Snake-Game",
    caseStudy: {
      motivation: "To build a feature-rich, polished version of the classic arcade game with clean, beginner-friendly code.",
      solution:
        "Implemented a modular Pygame structure supporting dynamic speed progression, multiple maps, and local high score tracking.",
      implementation:
        "Utilized Pygame for event handling and rendering, with speed scaling triggered every 5 points and high scores persisted locally via text files.",
      challenges: "Balancing smooth frame rates and responsive WASD/Arrow key inputs while scaling snake speed dynamically.",
      lessons: "Gained deeper insights into game loop architecture, state management (menus, gameplay, pause), and collision detection in Python."
    },
  },
  {
    slug: "color-catcher",
    name: "Color Catcher",
    description:
      "A fast-paced neon arcade game built with Pygame featuring auto-detecting input modes, dynamic difficulty scaling, and rich visual juice effects.",
    category: "Python",
    tech: ["Python", "Pygame"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/Color-Catcher",
    caseStudy: {
      motivation: "To build a highly responsive and visually engaging arcade game focused on game feel, juice effects, and smooth controls.",
      solution:
        "Designed an arcade survival loop with particle systems, screen shake, and seamless automatic switching between mouse and keyboard controls.",
      implementation:
        "Engineered visual feedback mechanisms like particle explosions, scaling impacts, and screen shakes in Pygame alongside adaptive difficulty scaling as scores increase.",
      challenges: "Ensuring fluid performance while managing multiple dynamic particle effects, animated starfields, and real-time input auto-detection.",
      lessons: "Mastered game polish techniques ('juice'), state management, particle physics, and responsive input switching mechanics."
    },
  },
  {
    slug: "fun-n-fairy-land",
    name: "Fun 'n' Fairy Land",
    description:
      "An interactive and whimsical web experience designed to showcase enchanting narratives, vibrant illustrations, and creative storytelling.",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/Fairyland",
    demo: "https://DevWithSiddharth.github.io/Fairyland/",
    caseStudy: {
      motivation: "To create an immersive and colorful web destination celebrating imagination, creativity, and interactive storytelling.",
      solution:
        "Built a responsive, lightweight web application combining charming illustrations and interactive story elements.",
      implementation:
        "Utilized clean HTML5 structure, custom CSS styling for whimsical layouts and animations, and JavaScript for interactive adventure progression.",
      challenges: "Balancing vibrant visual aesthetics and animations while maintaining crisp performance and clean UI responsiveness across screens.",
      lessons: "Enhanced core frontend skills in DOM manipulation, CSS animation effects, and user-centric interactive storytelling."
    },
  },
  {
    slug: "getmusic",
    name: "GetMusic",
    featured: true,
    description:
      "A sleek dark-themed music streaming platform with playlist creation, discovery features, and a comprehensive administrator dashboard.",
    category: "Backend",
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/GetMusic-Legacy",
    caseStudy: {
      motivation: "To build a full-featured music streaming web app with end-to-end user management and administration controls using core PHP/MySQL backend architecture.",
      solution:
        "Designed a relational database schema supporting user playlists, media cataloging, and administrative content control within a responsive dark UI.",
      implementation:
        "Engineered PHP scripts for session-based authentication, CRUD database operations, file upload handling, and full admin dashboard management.",
      challenges: "Managing relational data constraints between songs, albums, artists, and playlists while enforcing secure authentication and role-based access control.",
      lessons: "Gained hands-on experience in backend API architecture, database normalization in MySQL, relational schema design, and server-side state management."
    },
  },
  {
    slug: "timereaper",
    name: "TimeReaper",
    description:
      "A local-first productivity and study time tracker with analytics, visual data plotting, dynamic date logging, and flexible JSON backup utilities.",
    category: "Web",
    tech: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/TimeReaper",
    demo: "https://time-reaper.vercel.app",
    caseStudy: {
      motivation: "To build a privacy-focused, zero-friction study tracker with intuitive progress visualizations without requiring user accounts or external databases.",
      solution:
        "Engineered a browser-first application that handles date-based time logging, statistical aggregations, interactive line charts, and undoable actions in localStorage.",
      implementation:
        "Utilized React state hooks, custom datepicker integration, Recharts for trend visualization, and smart JSON data merging to prevent log duplication on imports.",
      challenges: "Accurately converting and parsing `HH:MM:SS` duration formats into continuous chart metrics while managing local data synchronization seamlessly.",
      lessons: "Deepened expertise in React state management, localized browser persistence patterns, temporal data handling, and interactive data visualization."
    },
  },
  {
    slug: "taskreaper",
    name: "TaskReaper",
    description:
      "A clean, responsive task planner application featuring persistent storage, flexible filtering, keyboard shortcuts, and full inline editing capabilities.",
    category: "Web",
    tech: ["React", "Vite", "Tailwind CSS"],
    status: "Completed",
    github: "https://github.com/DevWithSiddharth/TaskReaper",
    demo: "https://task-reaper-ten.vercel.app",
    caseStudy: {
      motivation: "To build a fast, minimalist task management tool optimized for speed, accessible keyboard interactions, and persistent workflow organization.",
      solution:
        "Developed a component-driven todo application with Vite, Tailwind CSS, and local state persistence for instantaneous task manipulation.",
      implementation:
        "Structured modular React components using functional hooks to handle task status filtering, inline title editing, deletion confirmations, and persistent local storage sync.",
      challenges: "Maintaining crisp, responsive UI interaction states while ensuring smooth synchronized updates to browser local storage.",
      lessons: "Strengthened core React architecture skills, client-side state persistence strategies, and utility-first styling with Tailwind CSS."
    },
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
