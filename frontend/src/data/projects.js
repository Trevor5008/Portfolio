const createEmptyCaseStudy = () => ({
  tldr: "",
  problem: "",
  contribution: [],
  solution: "",
  stackNotes: [],
  decisions: [],
  evidence: [],
  outcome: "",
  limitations: "",
});

export const projects = [
  {
    slug: "palander",
    title: "Palander",
    summary:
      "Full-stack execution planner organizing domains, objectives, recurring tasks, and calendar timelines over FastAPI and PostgreSQL.",
    status: "in-progress",
    featured: true,
    role: "Solo Author",
    timeline: "",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "React",
      "TypeScript",
      "Docker",
    ],
    thumbnail: "",
    links: {
      demo: "",
      repo: "https://github.com/Trevor5008/Palander",
    },
    caseStudy: createEmptyCaseStudy(),
  },
  {
    slug: "rsa-learning-lab",
    title: "RSA Learning Lab",
    summary:
      "Interactive cryptography workbench demonstrating step-by-step RSA key generation, modular arithmetic, and textbook-versus-production security boundaries.",
    status: "live",
    featured: true,
    role: "Solo Author",
    timeline: "",
    stack: ["React", "TypeScript", "Flask", "Pytest", "Vitest"],
    thumbnail: "",
    links: {
      demo: "https://rsa-cipher-demo.onrender.com",
      repo: "https://github.com/Trevor5008/rsa-cipher-demo",
    },
    caseStudy: createEmptyCaseStudy(),
  },
  {
    slug: "stacktrack",
    title: "StackTrack",
    summary:
      "Offline-first mobile blackjack bankroll and live-session tracker with SQLite persistence, table-rule analysis, and risk-of-ruin heuristics.",
    status: "in-progress",
    featured: true,
    role: "Solo Author",
    timeline: "",
    stack: ["React Native", "Expo", "TypeScript", "SQLite"],
    thumbnail: "",
    links: {
      demo: "",
      repo: "https://github.com/Trevor5008/StackTrack",
    },
    caseStudy: createEmptyCaseStudy(),
  },
  {
    slug: "critical-materials-recovery",
    title: "Critical Materials Recovery",
    summary:
      "Contract-driven decision-support prototype linking DLA PUB LOG catalog records to USGS critical-mineral references with deterministic rule traces.",
    status: "in-progress",
    featured: false,
    role: "Team Project — Schema, Ingestion, and Decision-Support Lead",
    timeline: "",
    stack: ["Python", "Pydantic", "JSON Schema", "Streamlit"],
    thumbnail: "",
    links: {
      demo: "",
      repo: "https://github.com/hmedi028/Critical-Materials-Recovery-Capstone-Project",
    },
    caseStudy: createEmptyCaseStudy(),
  },
  {
    slug: "market-sentiment-analysis",
    title: "Market Sentiment Analysis",
    summary:
      "Reproducible news-ingestion and FinBERT sentiment pipeline examining coverage, sentiment signals, and short-term market behavior.",
    status: "in-progress",
    featured: false,
    role: "Team Lead and Project Manager",
    timeline: "",
    stack: ["Python", "FinBERT", "pandas", "Parquet"],
    thumbnail: "",
    links: {
      demo: "",
      repo: "https://github.com/Trevor5008/market-sentiment-analysis",
    },
    caseStudy: createEmptyCaseStudy(),
  },
  {
    slug: "f1-podium-prediction",
    title: "F1 Podium Prediction",
    summary:
      "Binary podium classification pipeline comparing three machine learning models against a held-out 2024 Formula 1 season.",
    status: "in-progress",
    featured: false,
    role: "Solo Author",
    timeline: "",
    stack: ["Python", "pandas", "scikit-learn", "XGBoost"],
    thumbnail: "",
    links: {
      demo: "",
      repo: "https://github.com/Trevor5008/f1-podium-prediction",
    },
    caseStudy: createEmptyCaseStudy(),
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
