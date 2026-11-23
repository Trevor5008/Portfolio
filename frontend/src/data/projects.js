const createEmptyCaseStudy = () => ({
  tldr: "",
  highlights: [],
  problem: "",
  contribution: [],
  solution: "",
  stackNotes: [],
  decisions: [],
  evidence: [],
  outcome: "",
  limitations: "",
  architecture: "",
  evidenceLinks: [],
  limitationItems: [],
  deferredItems: [],
  availabilityNote: "",
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
    thumbnail: "/projects/palander/hero.png",
    links: {
      demo: "",
      repo: "https://github.com/Trevor5008/Palander",
    },
    caseStudy: {
      tldr: "Execution planner that ties daily tasks and recurring events to long-term objectives, built on FastAPI, PostgreSQL, and React.",
      highlights: [
        "83 backend tests · 3-job CI",
        "Scoped edits for recurring items",
        "One-command synthetic demo",
      ],
      availabilityNote:
        "Palander currently runs locally via Docker Compose with a one-command synthetic demo. There is no public hosted demo, and no GitHub Release or GHCR container tag has been published yet.",
      problem:
        "Solo operators juggling engineering, coursework, and portfolio work end up with tasks scattered across calendars, to-do lists, and note vaults. Daily work loses its link to bigger goals, and recurring commitments break when one instance needs to move or be skipped.",
      contribution: [
        "Sole product and engineering owner: scoped the product, designed the PostgreSQL schema, and built the FastAPI backend and React views.",
        "Implemented objective link validation, the Daily workspace endpoint, scoped recurring edits, and paste/PDF schedule import.",
        "Set up verification: 83 backend tests, 3 frontend workflow tests, a 3-job CI pipeline, and a dependency audit.",
      ],
      solution:
        "Users group work by domain and objective, then run the day from a Daily view that pairs the calendar timeline with Today, Overdue, and Completed tasks. Planning reviews progress by objective, and recurring class or meeting schedules can be imported from pasted text or a PDF. Long-form notes stay in tools like Obsidian.",
      architecture:
        "A React and TypeScript frontend calls a FastAPI backend over JWT authentication, with SQLAlchemy and Alembic managing PostgreSQL 16. Every task and event belongs to a domain and can link to several of its objectives, enforced on every write.\n\nRecurring items store one RRULE per series. Per-date changes live in occurrence tables, and each edit names its scope: this occurrence, this and future, or the whole series.",
      stackNotes: [
        {
          tech: "FastAPI, SQLAlchemy & Alembic",
          why: "Typed API contracts, link validation, recurrence expansion, and versioned migrations.",
        },
        {
          tech: "PostgreSQL 16",
          why: "Relational ownership rules and unique per-date occurrence records.",
        },
        {
          tech: "React 19 & TypeScript",
          why: "Daily, Planning, Weekly, and Monthly views with scoped recurrence editing.",
        },
        {
          tech: "Docker Compose & GitHub Actions",
          why: "Backend, frontend, and container health checks on every push and pull request.",
        },
      ],
      decisions: [
        {
          title: "Retire in-app notes (v0.12)",
          options:
            "Keep built-in notes, or limit Palander to dated execution.",
          choice:
            "Removed notes in migration 008 with an export path, leaving long-form writing to tools like Obsidian.",
          tradeoff: "Lost inline journaling; gained a smaller, clearer product.",
        },
        {
          title: "Store recurrence rules, not rows",
          options:
            "Create a row for every future date, or store one RRULE per series.",
          choice:
            "Stored RRULEs on each series, kept per-date changes in occurrence tables, and required an explicit edit scope.",
          tradeoff:
            "More complex expansion and UI, but bounded storage and no ambiguous edits.",
        },
        {
          title: "Synthetic local demo over a hosted sandbox",
          options:
            "Host a shared demo database, or ship a one-command local seed.",
          choice:
            "Built a reset script that seeds synthetic data anchored to a fixed date.",
          tradeoff:
            "Reviewers run Docker locally, but no shared state or personal data is exposed.",
        },
      ],
      evidence: [
        {
          src: "/projects/palander/hero.png",
          alt: "Palander Daily workspace on October 28, 2026 showing a 9 AM Deep work block on the Wednesday timeline beside Domain Coverage, Objective Activity, Today tasks, and paginated Overdue tasks.",
          caption:
            "Daily view: calendar timeline beside Today, Overdue, and objective rollups.",
          width: 1356,
          height: 826,
        },
        {
          src: "/projects/palander/planning.png",
          alt: "Palander Planning view displaying Objectives, Weekly review, and Progress tabs, a New objective form, and domain cards including an active Portfolio case study objective under Career.",
          caption:
            "Planning view: active objectives grouped by domain, with weekly review.",
          width: 1356,
          height: 826,
        },
        {
          src: "/projects/palander/recurrence.png",
          alt: "Palander Recurring task modal for Practice drills linked to Career and Portfolio case study with Daily frequency, Repeat until 12/05/2026, Keep overdue policy, and This occurrence vs This and future scope options.",
          caption:
            "Recurring task setup: frequency, overdue policy, and edit scope.",
          width: 1356,
          height: 826,
        },
        {
          src: "/projects/palander/schedule-import.png",
          alt: "Palander Import schedule modal on the Paste text tab showing synthetic Chemistry Lab and Team Sync rows with term start and end dates, America/New_York timezone, and Extract candidates button.",
          caption:
            "Schedule import: pasted text becomes recurring calendar entries to review.",
          width: 1356,
          height: 826,
        },
      ],
      evidenceLinks: [
        {
          label: "Full case-study source",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/portfolio-case-study.md",
          note: "Every claim mapped to code, migrations, and tests.",
        },
        {
          label: "Setup & test log",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/clean-checkout.md",
          note: "Clean-checkout steps and recorded test runs.",
        },
        {
          label: "CI workflow",
          url: "https://github.com/Trevor5008/Palander/blob/main/.github/workflows/ci.yml",
          note: "Backend, frontend, and Docker Compose jobs.",
        },
        {
          label: "Architecture & data flow",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/data-flow.md",
          note: "Request paths, schema links, and recurrence scopes.",
        },
        {
          label: "Dependency audit",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/dependency-audit.md",
          note: "Backend and frontend audit results and accepted risks.",
        },
        {
          label: "Demo walkthrough & reset",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/demo/walkthrough.md",
          note: "One-command synthetic seed, walkthrough, and capture notes.",
        },
      ],
      outcome:
        "Version 0.13.0 delivers the full daily execution, planning, recurrence, and schedule-import workflow, with 83 backend and 3 frontend tests passing in CI.",
      limitations: "",
      limitationItems: [
        "No hosted demo, tagged release, or published container image yet.",
        "PDF import reads text-based PDFs only, and reminders aren't shown in the UI.",
        "Frontend tests are narrow; broader UI checks rely on the seeded walkthrough.",
      ],
      deferredItems: [
        "Sprint 2 (draft, not committed): simpler Daily and Overdue lists and safe bulk overdue cleanup.",
        "First tagged release and container publish (deferred backlog item).",
        "Not scheduled: an AI planning assistant and dark mode.",
      ],
    },
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
    stack: ["React", "TypeScript", "Flask", "SymPy", "Pytest", "Vitest"],
    thumbnail: "",
    links: {
      demo: "https://rsa-cipher-demo.onrender.com",
      repo: "https://github.com/Trevor5008/rsa-cipher-demo",
    },
    caseStudy: {
      tldr: "Interactive lab that shows every step of RSA, from key generation to decryption, and why textbook RSA isn't secure.",
      highlights: [
        "Live demo on Render",
        "83 backend · 66 frontend tests",
        "Automated axe-core accessibility checks",
      ],
      problem:
        "Cryptography courses often jump from modular-arithmetic definitions straight to library calls. Students rarely get to inspect intermediate values like n, φ(n), and d, see how bad parameters fail, or watch textbook RSA leak patterns in plaintext.",
      contribution: [
        "Built the Flask and SymPy teaching API for key generation, encryption, and decryption, with clear validation messages and 4096-bit limits.",
        "Rebuilt the frontend in strict TypeScript as a three-step guided workspace with worked examples, trace tables, and one-click round trips.",
        "Wrote the companion RSA math reference and verified the app with 83 backend and 66 frontend tests, including accessibility checks.",
      ],
      solution:
        "Learners pick preset or custom primes and watch n, φ(n), and d derive live. Encrypting shows the arithmetic for each character in a trace table, and the result passes straight into decryption to confirm the round trip. Keyboard support and screen-reader announcements cover every step.",
      stackNotes: [
        {
          tech: "React 18 & TypeScript",
          why: "Typed contracts across the key, encrypt, and decrypt steps in one accessible workspace.",
        },
        {
          tech: "Flask, Gunicorn & SymPy",
          why: "Arbitrary-precision primality checks, modular inverses, and exponentiation behind bounded endpoints.",
        },
        {
          tech: "Pytest, Vitest & axe-core",
          why: "Validation edge cases, round-trip workflows, and automated accessibility checks.",
        },
      ],
      decisions: [
        {
          title: "Send big integers as decimal strings",
          options: "JSON numbers, hex/Base64 encodings, or decimal strings.",
          choice:
            "Serialized every RSA value as a decimal string, capped at 4096 bits.",
          tradeoff:
            "No precision loss past JavaScript's 2^53 limit, and values match the on-screen math, at the cost of slightly larger payloads.",
        },
        {
          title: "Teach textbook RSA, with warnings",
          options:
            "Hide patterns behind OAEP padding, or encrypt each character directly.",
          choice:
            "Encrypted each character's code point and showed how repeated letters produce repeated ciphertext.",
          tradeoff:
            "The math stays transparent and hand-checkable, so the cipher is for learning only.",
        },
        {
          title: "One service for the app and API",
          options:
            "Separate frontend and API services, or Flask serving both.",
          choice:
            "Flask and Gunicorn serve the built frontend and the API from one Render service.",
          tradeoff:
            "No CORS rules or URL drift, but no CDN caching and free-tier cold starts.",
        },
      ],
      evidence: [],
      outcome:
        "Live at rsa-cipher-demo.onrender.com with 83 backend and 66 frontend tests passing, plus documented mobile and keyboard-only walkthroughs.",
      limitations:
        "Implements unpadded textbook RSA strictly for education, so it isn't for real secrets. Inputs are capped at 1,000 characters and 4096 bits, screenshots and CI are still to come, and free-tier hosting can take about 30 seconds to wake.",
    },
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
