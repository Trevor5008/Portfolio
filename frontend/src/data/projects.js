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
      tldr: "Personal execution planner for solo operators balancing software engineering, coursework, and portfolio delivery—connecting Domains and Objectives to daily Tasks, calendar Events, and RRULE recurrence over FastAPI and PostgreSQL 16 without turning into a notes vault.",
      availabilityNote:
        "Palander currently runs locally via Docker Compose or native Python/PostgreSQL using the documented clean-checkout setup and synthetic reset_demo.sh seed. There is no public hosted demo, and no GitHub Release or GHCR container tag has been published yet (current repository version is 0.13.0).",
      problem:
        "Solo operators managing concurrent software engineering, university coursework, and portfolio commitments often split their schedule across disconnected calendars, flat to-do lists, and sprawling Markdown vaults. Daily tasks lose their connection to higher-level objectives, recurring commitments break when a single instance needs to be skipped or rescheduled, and general-purpose workspaces accumulate long-form notes that obscure what actually needs to happen today.",
      contribution: [
        "Sole human product and engineering owner across product scoping, PostgreSQL schema design (through Alembic revision 009), FastAPI routers, RRULE recurrence services, React 19 / TypeScript views (Daily, Planning, Weekly, Monthly), and synthetic demo tooling.",
        "Implemented server-side domain and multi-objective link validation (link_validation.py), single-date GET /daily-workspace aggregation, instance-safe recurring event and recurring task edit/delete scopes (occurrence, future, series), and paste/PDF recurring schedule import.",
        "Built and documented reproducible verification spanning 83 backend Pytest tests, 3 focused frontend Vitest workflow tests plus production build, 3-job GitHub Actions CI (backend, frontend, and Docker Compose health check), clean-checkout steps, and dependency audit logs.",
      ],
      solution:
        "Palander owns dated execution state while keeping long-form knowledge tools such as Obsidian explicitly external (in-app daily and event notes were retired in v0.12.0 with a legacy export path). Users organize commitments by Domain and Objective, execute the day on the Daily workspace—which pairs an hourly event timeline with Today, 10-row paginated Overdue, and collapsed Completed today task sections alongside domain and objective rollups—review allocation and carry-forward in Planning (/planning), inspect Weekly and Monthly calendars, and bulk-import recurring class or meeting schedules via text paste or PDF.",
      architecture:
        "The React 19, TypeScript, and Vite frontend (DailyView, PlanningView, CalendarView, EventModal) communicates through typed client mappers (api.ts, apiMappers.ts) over JWT Bearer authentication (POST /auth/login) to FastAPI routers (domains, objectives, events, tasks, daily_workspace, planning), Pydantic schemas, SQLAlchemy models, and PostgreSQL 16.\n\nAt the relational layer (Alembic revision 009), users own domains, objectives belong to a domain, and every task and event requires a domain_id while linking to one or more same-domain objectives through event_objectives and task_objectives junction tables validated server-side in link_validation.py. Recurring events and tasks store RRULE definitions (DAILY, WEEKLY, or MONTHLY with optional INTERVAL and required UNTIL) on the series row: events expand virtually against event_occurrence_exceptions (uq_event_occurrence_exception), whereas recurring tasks merge RRULE dates with per-date task_occurrences rows (uq_task_occurrence_date) supporting occurrence-level complete, move, skip, and overdue policies (keep_overdue, skip_expired, carry_forward).",
      stackNotes: [
        {
          tech: "FastAPI, SQLAlchemy & Alembic",
          why: "Enforces typed Pydantic contracts, JWT Bearer authentication, domain/multi-objective link integrity, RRULE expansion, and versioned schema migrations through revision 009.",
        },
        {
          tech: "PostgreSQL 16",
          why: "Backs relational ownership, many-to-many objective junction tables, and uniqueness constraints on per-date task occurrences and recurring event exceptions.",
        },
        {
          tech: "React 19, TypeScript & Tailwind CSS",
          why: "Powers the Daily timeline and execution pane, Planning objectives/weekly-review tabs, Weekly/Monthly calendar views, and scoped recurrence modals.",
        },
        {
          tech: "Docker Compose, Pytest, Vitest & GitHub Actions",
          why: "Runs 83 backend tests, 3 frontend workflow tests + Vite production build, and a live PostgreSQL + FastAPI /health container smoke test on every push and pull request.",
        },
      ],
      decisions: [
        {
          title: "Retire embedded notes to keep the execution-versus-knowledge boundary crisp (v0.12.0)",
          options:
            "Maintain built-in daily and per-event Markdown notes alongside external vaults, or remove in-app notes and dedicate Palander strictly to dated execution.",
          choice:
            "Removed in-app notes tables and endpoints in migration 008 (documenting an export path in docs/legacy-notes-export.md) and left long-form knowledge in external tools like Obsidian.",
          tradeoff:
            "Gave up inline journaling inside the planner in exchange for a smaller, more maintainable surface centered on schedule blocks, due dates, and objective rollups.",
        },
        {
          title: "Pair RRULE series rows with per-occurrence exception tables and explicit edit scopes",
          options:
            "Eagerly materialize rows for every future date on creation, or store an RRULE on the series and persist only per-occurrence state and exceptions.",
          choice:
            "Stored RRULE + UNTIL on events and tasks, tracked per-instance overrides in event_occurrence_exceptions and task_occurrences, and required explicit occurrence | future | series edit/delete scopes plus task overdue policies.",
          tradeoff:
            "Adds recurrence-expansion and modal-scope complexity across API and UI, but prevents unbounded row growth and eliminates ambiguous single-instance edits.",
        },
        {
          title: "Enforce same-domain multi-objective links server-side (Alembic 009)",
          options:
            "Allow free-form tags or unconstrained cross-domain objective links, or validate domain ownership and junction links on every write.",
          choice:
            "Required domain_id on tasks and events and enforced same-domain membership across event_objectives and task_objectives in backend/app/services/link_validation.py.",
          tradeoff:
            "Requires selecting a domain before linking objectives, ensuring GET /daily-workspace and /planning/weekly-review rollups stay relationally consistent.",
        },
        {
          title: "Use a deterministic local synthetic seed instead of a shared public sandbox",
          options:
            "Host a shared mutable demo database or ship a one-command synthetic local reset anchored to a fixed date with generic schedule fixtures.",
          choice:
            "Built scripts/reset_demo.sh and backend/app/demo_seed.py anchored to 2026-10-28 alongside generic schedule_import.txt paste data containing zero personal or school-account records.",
          tradeoff:
            "Evaluators must run Docker Compose locally rather than clicking a hosted URL, avoiding shared-state drift, credential abuse, and personal-data exposure.",
        },
      ],
      evidence: [
        {
          src: "/projects/palander/hero.png",
          alt: "Palander Daily workspace on October 28, 2026 showing a 9 AM Deep work block on the Wednesday timeline beside Domain Coverage, Objective Activity, Today tasks, and paginated Overdue tasks.",
          caption:
            "Daily view (synthetic demo seed anchored to 2026-10-28): pairs the hourly event timeline with Domain Coverage, Objective Activity, Today tasks, and paginated Overdue controls.",
          width: 1356,
          height: 826,
        },
        {
          src: "/projects/palander/planning.png",
          alt: "Palander Planning view displaying Objectives, Weekly review, and Progress tabs, a New objective form, and domain cards including an active Portfolio case study objective under Career.",
          caption:
            "Planning view (/planning): groups active objectives by domain alongside Weekly review and Progress tabs.",
          width: 1356,
          height: 826,
        },
        {
          src: "/projects/palander/recurrence.png",
          alt: "Palander Recurring task modal for Practice drills linked to Career and Portfolio case study with Daily frequency, Repeat until 12/05/2026, Keep overdue policy, and This occurrence vs This and future scope options.",
          caption:
            "Recurring task modal (v0.13.0): configures RRULE frequency, overdue policy, multi-objective links, and explicit occurrence-versus-future edit scope.",
          width: 1356,
          height: 826,
        },
        {
          src: "/projects/palander/schedule-import.png",
          alt: "Palander Import schedule modal on the Paste text tab showing synthetic Chemistry Lab and Team Sync rows with term start and end dates, America/New_York timezone, and Extract candidates button.",
          caption:
            "Schedule import modal: parses pasted text or text-based PDF schedules into recurring calendar candidates before import.",
          width: 1356,
          height: 826,
        },
      ],
      evidenceLinks: [
        {
          label: "Palander Engineering Case-Study Source (docs/portfolio-case-study.md)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/portfolio-case-study.md",
          note: "Canonical v0.13.0 repository narrative mapping claims to source files, migrations, and tests.",
        },
        {
          label: "Clean-Checkout Setup & Verification Log (docs/clean-checkout.md)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/clean-checkout.md",
          note: "Docker Compose and native Python/PostgreSQL setup commands plus recorded 83-pytest / 3-vitest verification run.",
        },
        {
          label: "GitHub Actions CI Workflow (.github/workflows/ci.yml)",
          url: "https://github.com/Trevor5008/Palander/blob/main/.github/workflows/ci.yml",
          note: "Automated backend-test (pytest + Postgres 16), frontend-build (Vitest + Vite build), and Docker Compose /health smoke jobs.",
        },
        {
          label: "Architecture & Request Data Flow (docs/data-flow.md)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/data-flow.md",
          note: "Mermaid component, CRUD sequence, GET /daily-workspace aggregation, and recurrence scope documentation.",
        },
        {
          label: "PostgreSQL Entity-Relationship Schema — Alembic 009 (docs/schema.md)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/schema.md",
          note: "ER diagram and uniqueness/check constraints across domains, objectives, events, tasks, and occurrence tables.",
        },
        {
          label: "Dependency Audit Summary (docs/dependency-audit.md)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/dependency-audit.md",
          note: "Backend pip-audit (0 vulnerabilities) and frontend npm audit remediation log with documented dev-only residual risk.",
        },
        {
          label: "Seeded Demo Walkthrough, Capture Metadata & Walkthrough GIF (docs/demo/)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/demo/walkthrough.md",
          note: "Step-by-step local walkthrough anchored to 2026-10-28, linking CAPTURE.md and the repository walkthrough.gif artifact.",
        },
        {
          label: "Synthetic Demo Reset Script (scripts/reset_demo.sh)",
          url: "https://github.com/Trevor5008/Palander/blob/main/scripts/reset_demo.sh",
          note: "Rebuilds local Compose volumes and seeds deterministic synthetic domains, objectives, events, and recurring tasks.",
        },
        {
          label: "Legacy Notes Export Boundary (docs/legacy-notes-export.md)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/legacy-notes-export.md",
          note: "Documents the v0.12.0 notes retirement and export path that keeps long-form knowledge outside Palander.",
        },
        {
          label: "Sprint 2 Daily Workspace Usability Draft (docs/planning/sprint-2-draft.md)",
          url: "https://github.com/Trevor5008/Palander/blob/main/docs/planning/sprint-2-draft.md",
          note: "Uncommitted draft scope for progressive disclosure, occurrence-safe bulk overdue cleanup, and delete-scope copy.",
        },
      ],
      outcome:
        "At repository version 0.13.0, Palander delivers an end-to-end daily execution, objective planning, RRULE recurrence, and schedule-import workflow backed by 83 passing backend Pytest tests, 3 passing frontend Vitest workflow tests plus a clean production build, green 3-job GitHub Actions CI, verified clean-checkout and dependency-audit documentation, and deterministic synthetic demo tooling.",
      limitations: "",
      limitationItems: [
        "No public hosted demo and no published v*.*.* GitHub Release or ghcr.io/trevor5008/palander-api container image exist yet.",
        "PDF schedule import parses text-based PDFs only (scanned PDFs are not OCR-processed), and reminder records are not yet exposed in the UI.",
        "Frontend unit test coverage is intentionally narrow (3 DailyExecutionPane tests covering overdue pagination and occurrence-scoped completion), relying on backend Pytest suites and the seeded walkthrough for broader UI regression.",
        "One moderate dev/build-time postcss-selector-parser advisory (transitive via @tailwindcss/typography) remains accepted in docs/dependency-audit.md to avoid forcing a breaking plugin downgrade.",
      ],
      deferredItems: [
        "Sprint 2 Daily Workspace Usability (draft planning only — not committed or loaded to GitHub issues): progressive disclosure for Daily/Overdue lists, occurrence-safe bulk overdue cleanup, and clearer recurring delete-scope confirmation language.",
        "First tagged public release and GHCR container publish (issue #18 / PAL-S1-004, deferred in Backlog): version-surface verification, v*.*.* git tag, GitHub Release notes, and container package visibility.",
        "Unscheduled future candidates (not shipped): proposed AI/chat workspace assistant, theme/dark-mode support, and historical recurring-task hygiene for past-starting series; Obsidian sync and knowledge-graph features remain out of scope.",
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
      tldr: "Interactive cryptography learning lab pairing a React and TypeScript guided workspace with a Flask and SymPy teaching API so learners can inspect RSA key derivation, per-character modular exponentiation traces, and the security gap between textbook RSA and production cryptography.",
      problem:
        "Introductory discrete-structures and cryptography courses often jump straight from modular-arithmetic definitions to opaque library calls. Students rarely get an interactive way to inspect intermediate values (n, φ(n), and d), test parameter failure modes such as non-coprime exponents (gcd(e, φ(n)) ≠ 1) or code points exceeding the modulus (m ≥ n), or observe firsthand why deterministic textbook RSA leaks plaintext structure.",
      contribution: [
        "Designed and implemented the /teaching/keys, /teaching/encrypt, and /teaching/decrypt Flask blueprint and pure SymPy arithmetic core with 4096-bit input bounds, multi-field learner-readable validation codes, per-Unicode-code-point trace generation, and backward-compatible legacy routes.",
        "Migrated the frontend to strict TypeScript and replaced a multi-modal prototype with a single-view, three-step guided workspace (Key Pair, Input, Output), collapsible How It Works worked examples and 1-based trace tables, and one-click Decrypt this / Encrypt again round-trip handoffs.",
        "Authored the companion RSA Foundations mathematical reference and verified the application with 83 backend Pytest tests alongside 66 frontend Vitest, React Testing Library, and axe-core accessibility tests.",
      ],
      solution:
        "Learners start from curated prime presets—Textbook (p = 61, q = 53, e = 17) or Bigger primes (p = 1009, q = 1013, e = 65537)—or enter custom primes to watch n = p · q, φ(n) = (p − 1)(q − 1), and d ≡ e⁻¹ (mod φ(n)) derive live with debounced validation. Encrypting a message computes c ≡ mᵉ (mod n) per Unicode code point, surfaces a worked arithmetic breakdown for the first character alongside a scrollable trace table, and lets students pass the resulting ciphertext array directly into decryption to verify m ≡ cᵈ (mod n) end-to-end. Keyboard focus management, non-color-only active-key badges, polite ARIA live announcements, and single-column 390px mobile stacking keep every step accessible without modal traps.",
      stackNotes: [
        {
          tech: "React 18 & TypeScript",
          why: "Provides typed API contracts across key derivation, encryption, and decryption states, deterministic round-trip mode handoffs, and accessible single-view workspace controls.",
        },
        {
          tech: "Flask, Gunicorn & SymPy",
          why: "Executes arbitrary-precision primality checks (sympy.isprime), greatest-common-divisor verification, modular inverses (mod_inverse), and modular exponentiation behind bounded JSON endpoints served from the same origin as the compiled SPA.",
        },
        {
          tech: "Pytest, Vitest & axe-core",
          why: "Covers 83 backend unit and HTTP validation tests (composite primes, non-coprime exponents, bit-length limits, legacy compatibility) and 66 frontend component, round-trip workflow, and automated WCAG check suites.",
        },
      ],
      decisions: [
        {
          title: "Decimal-string serialization for arbitrary-precision integers",
          options:
            "Standard JSON numbers, hexadecimal/Base64 byte encodings, or base-10 integer strings across /teaching/* payloads.",
          choice:
            "Serialized all RSA parameters and ciphertext blocks as base-10 decimal strings bounded at 4096 bits (1234 digits) while accepting integer or string inputs.",
          tradeoff:
            "Eliminates silent IEEE-754 precision loss above Number.MAX_SAFE_INTEGER (2^53 − 1) and matches the base-10 equations shown in the UI, at the cost of slightly larger JSON payloads than binary encodings.",
        },
        {
          title: "Per-code-point textbook RSA with explicit security warnings",
          options:
            "Hide deterministic block repetition behind OAEP padding or encrypt each Unicode code point directly and teach why raw RSA fails in practice.",
          choice:
            "Encrypted each character's Unicode code point directly and paired the trace table with explicit warnings contrasting deterministic textbook output (for example, repeated 't' characters producing identical ciphertext blocks) against padded RSAES-OAEP hybrid encryption.",
          tradeoff:
            "Makes modular arithmetic transparent and hand-verifiable for students, which means the cipher is strictly pedagogical and intentionally unsuitable for real secrets.",
        },
        {
          title: "Single-origin Flask + Gunicorn deployment on Render",
          options:
            "Deploy separate static-frontend and Python-API services or serve compiled Vite assets directly from the Flask application.",
          choice:
            "Configured a two-stage Node + Python build so Flask and Gunicorn serve both frontend/dist and the /teaching/* JSON endpoints from a single Render web service.",
          tradeoff:
            "Avoids split-origin CORS rules and environment-URL drift for an interactive classroom tool, trading away CDN-only edge caching and incurring free-tier Python container cold starts.",
        },
      ],
      evidence: [],
      outcome:
        "Deployed live at rsa-cipher-demo.onrender.com with full /teaching/* parity, backed by 83 passing Pytest tests, 66 passing Vitest + axe-core frontend tests, and documented 390px mobile and keyboard-only walkthroughs.",
      limitations:
        "Implements unpadded textbook RSA strictly for education (no RSAES-OAEP or RSASSA-PSS padding, deterministic per-character ciphertext, 1000-character and 4096-bit teaching caps, and general-purpose PRNG in the legacy helper). Embedded workspace screenshots/GIFs and automated GitHub Actions CI in the rsa-cipher-demo repository are queued as follow-up polish, and the live Render free-tier web service may take up to ~30 seconds to wake after idle periods.",
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
