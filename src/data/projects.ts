export const projects = [
  {
    slug: "devflow",
    title: "DevFlow",
    description: "A developer productivity dashboard that aggregates tasks, commits, and CI status into a unified workflow.",
    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    content: "DevFlow helps teams track progress across tools like GitHub and Jira with a fast, unified interface."
  },
  {
    slug: "insightgrid",
    title: "InsightGrid",
    description: "Interactive data visualization platform for exploring large datasets in real time.",
    techStack: ["TypeScript", "D3", "Next.js", "Vercel"],
    content: "InsightGrid enables analysts to build dynamic dashboards with real-time filtering and custom charts."
  },
  {
    slug: "syncspace",
    title: "SyncSpace",
    description: "Real-time collaboration tool for teams with shared editing and presence indicators.",
    techStack: ["WebSockets", "Redis", "Express", "React"],
    content: "SyncSpace provides low-latency collaboration using WebSockets and conflict-free syncing."
  },
  {
    slug: "ai-student-predictor",
    title: "AI Student Predictor",
    description: "Machine learning web app that predicts final exam marks based on study habits and previous performance.",
    techStack: ["Python", "FastAPI", "scikit-learn", "pandas"],
    content: "A linear regression model trained on student data predicts final marks from hours studied, attendance percentage, and previous exam scores. Try it live below."
  },
  {
    slug: "database-management",
    title: "Healthcare Database Management System",
    description: "Full-stack healthcare management system with PHP, MySQL, and Bootstrap featuring appointment booking, queue management, and medical records.",
    techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    content: "A web-based healthcare management system with patient/doctor/admin portals. Features include token-based queue management, appointment booking with conflict detection, medical history tracking, and role-based dashboards. Built with prepared statements for SQL injection prevention and bcrypt password hashing. View on GitHub at github.com/Salmankabir12/Database-Management."
  },
  {
    slug: "autodiff",
    title: "Autodiff",
    description: "A minimal autograd engine built from scratch in Python to understand automatic differentiation under the hood.",
    techStack: ["Python", "Autograd", "NumPy"],
    content: "A minimal automatic differentiation engine for scalar computations implemented from scratch in Python. Every arithmetic operation builds a directed acyclic graph (DAG) of Value nodes that stores gradients and supports backpropagation through the chain rule. Includes neural network building blocks (Neuron, Layer, MLP), an SGD optimizer, and computational graph visualization with Graphviz. Built to understand what's really happening when you call .backward() in PyTorch. View on GitHub at github.com/Salmankabir12/autodiff."
  },
  {
    slug: "kansmode",
    title: "KANSMODE",
    description: "A premium garments buying house website with animated hero particles, 3D globe visualization, and GPU-adaptive Three.js effects — deployed on Cloudflare Pages.",
    techStack: ["Astro", "Svelte", "React", "Three.js", "Framer Motion", "Tailwind", "Sanity", "Cloudflare"],
    content: "A full-featured corporate website for Kans Mode International, a garments buying house. Features include a ParticleScene animated hero, 3D SVG globe visualization with scroll-driven rotation, FloatingLines WebGL shader background, GPU-tier-adaptive Three.js rendering, Framer Motion bento grid, Svelte scroll-triggered animations (FadeIn, Stagger, Counter, TextReveal, Parallax), Sanity CMS for blog and product catalog, and Cloudflare D1 for contact form storage. Built with Astro v6 SSR on Cloudflare Pages. View on GitHub at github.com/Salmankabir12/KANSMODE."
  },
  {
    slug: "nsu-cgpa-calculator",
    title: "NSU CGPA Calculator",
    description: "Calculate your semester and cumulative CGPA for North South University. Enter course credits and grades to instantly compute your results.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    content: "A lightweight, client-side CGPA calculator built for North South University students. Features include dynamic course row management (add/remove courses), optional previous CGPA input for cumulative calculation, and the official NSU grading scale (A = 4.0 through F = 0.0). No data is stored — everything runs in your browser. Deployed on GitHub Pages. View on GitHub at github.com/Salmankabir12/NSU-CGPA-Calculator or use it live at salmankabir12.github.io/NSU-CGPA-Calculator."
  }
];
