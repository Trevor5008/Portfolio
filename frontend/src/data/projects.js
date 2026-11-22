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
