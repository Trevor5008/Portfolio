# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Full structured case study for **Palander** (`/projects/palander`) covering the solo-operator execution problem, Obsidian/knowledge boundary, FastAPI → PostgreSQL architecture, RRULE recurrence and multi-objective decisions, four static screenshots with intrinsic dimensions, public repository evidence links, truthful local-only availability, and deferred Sprint 2 / release / AI scope
- Optional case-study schema fields (`architecture`, `evidenceLinks`, `limitationItems`, `deferredItems`, `availabilityNote`) with backward-compatible rendering for existing RSA Learning Lab content
- Static Palander screenshots at `frontend/public/projects/palander/` (`hero.png`, `planning.png`, `recurrence.png`, `schedule-import.png`)
- Synthetic CaseStudy fixture tests covering empty optional sections, Availability, Architecture, Evidence links, and separated limitation vs deferred lists
- Optional `highlights` case-study field rendered as an at-a-glance list under the TL;DR
- Word-budget tests (`caseStudyBudgets.test.js`) that cap each case-study section and keep the total at or under 600 words

### Changed

- Rewrote the Palander and RSA Learning Lab case studies for a two-minute read (Palander from about 1,430 words to under 600), keeping every material claim and cutting Palander's evidence links from 10 to 6

## [0.3.1] - 2026-11-22

### Added

- Full structured case study for **RSA Learning Lab** (`/projects/rsa-learning-lab`) documenting the learner problem, three-step guided workspace, Flask/SymPy `/teaching/*` architecture, decimal-string big-integer serialization, textbook-versus-production RSA tradeoffs, accessibility design, and `83` `pytest` + `66` `Vitest`/`axe-core` verification suite
- Added `frontend/public/robots.txt` so SPA rewrite rules do not return `index.html` for crawler `/robots.txt` requests, and published the human-readable one-page résumé at `/resume.pdf` across `Home` (`TitleCard` and `Get in Touch`), `About`, `Contact`, and `Footer`
- Verified `Experience` (`Collab Collective Studio`, `Procentrix, LLC`, `PNC`, `United States Navy`) and `Education & Certifications` (`Florida International University — expected July 2027, GPA: 3.84`, `MIT`, `University of San Francisco — Summa Cum Laude, GPA: 3.87`) sections on `/about`
- Dependency audit and remediation record ([`docs/dependency-audit.md`](docs/dependency-audit.md))
- Regression tests covering interrupted `CircuitHero` intro navigation, mobile `Primary` navigation landmark membership, structured `RSA Learning Lab` case-study rendering, and conditional `resumeUrl` rendering

### Changed

- Replaced jargon-heavy hero tagline and meta descriptions with recruiter-readable full-stack positioning and tightened public skill claims to repository- and résumé-verified technologies
- Moved `@tailwindcss/vite` to `devDependencies`, upgraded `react-router` to `^7.18.6`, and updated compatible minor/patch packages to resolve all `13` `npm audit` vulnerabilities (`0` remaining)
- Renamed `ProjectCard` live status badge from `"Live Demo"` to `"Live"` to avoid duplicating the adjacent `"Live Demo"` action link
- Aligned [`render.yaml`](render.yaml) service name with `portfolio-r88y` and documented Render Dashboard SPA rewrite requirements in [`README.md`](README.md)

### Fixed

- Fixed `CircuitHero` intro tracking (`introState.js`) so navigating away before the 3.5-second GSAP animation finishes never replays the intro upon returning to `/`
- Placed `#mobile-primary-menu` inside `<nav aria-label="Primary">` in `Header.jsx` so mobile navigation links belong to the `Primary` landmark when open

### Removed

- Unused Google Fonts `Rock Salt` `@import` and `--font-rock-salt` theme token in `frontend/src/index.css`, eliminating external font requests

## [0.3.0] - 2026-11-21

### Added

- Shared site configuration (`frontend/src/data/site.js`) centralizing identity, positioning, engineering focus pillars, technical stack groups, and verified contact URLs
- Shared `Layout`, semantic `Header` (`<nav aria-label="Primary">` with desktop active indicators and mobile menu drawer), and `Footer` components across all routes
- Unified six-project inventory (`frontend/src/data/projects.js`) with `featuredProjects` and `getProjectBySlug` helpers covering `Palander`, `RSA Learning Lab`, `StackTrack`, `Critical Materials Recovery`, `Market Sentiment Analysis`, and `F1 Podium Prediction`
- Reusable `ProjectCard` component with 16:10 preview framing, neutral fallback artwork, stretched case-study link without nested anchors, and independent demo/repository actions
- Structured `CaseStudy` route (`/projects/:slug`) with ordered architectural sections, automatic omission of empty optional sections, and an intentional `"Case study in preparation"` state
- Supporting `About` (`/about`), `Contact` (`/contact`), and `NotFound` (`*`) pages
- Per-route document titles (`useDocumentTitle`), HTML description and Open Graph / Twitter metadata, and custom circuit monogram favicon (`frontend/public/favicon.svg`)
- Motion-accessibility hook (`useReducedMotion`) and CSS `prefers-reduced-motion: reduce` safeguards
- Automated component and accessibility test suite (`Vitest`, `jsdom`, `React Testing Library`, `@testing-library/jest-dom`, `@testing-library/user-event`) via `npm test` and `npm run test:run`
- Render Static Site blueprint ([`render.yaml`](render.yaml)) with `/* -> /index.html` SPA deep-link rewrite rule

### Changed

- Restructured `/` (`Home`) into an immediate, Enter-free hero (`CircuitHero` + `TitleCard`) followed by Featured Projects, What I Work On, About, and Get in Touch sections
- Rebuilt `ThemeSwitch` as an accessible `<button type="button">` with action-specific `aria-label` values and minimum 44x44px tap targets
- Centralized circuit node pad colors (`circleStroke`, `circleFill`) and surface/typography tokens in `frontend/src/data/themes.js`
- Scoped GSAP circuit trace draw-in to play once per page load instead of replaying on theme toggles
- Updated `CircuitBoard` SVG to `preserveAspectRatio="xMidYMid slice"` and responsive CSS sizing on the signature SVG so layouts remain distortion-free from `375px` to `1440px`
- Expanded root [`README.md`](README.md) with status shields, table of contents, static architecture documentation, verification commands, and Render deployment notes

### Fixed

- Eliminated nested `h-screen` overflow clipping and `<button>`-wrapped `<Link>` markup across navigation and CTAs
- Restored keyboard focus to the mobile menu toggle button when closing the mobile navigation menu via `Escape`

### Removed

- Legacy `/home` and `/blog` routes, `Blog.jsx`, `ContactMe.jsx` (replaced by `Contact.jsx`), default `vite.svg` icon, boilerplate `frontend/README.md`, and unused `@tailwindcss/postcss`, `postcss`, and `autoprefixer` packages
- Infinite `animate-pulse` on circuit pads and `hover:animate-pulse` on interactive controls

## [0.2.0] - 2026-11-21

### Added

- Global `ThemeProvider` and `useTheme` context (`ThemeContext.jsx`, `useTheme.js`) shared across routes
- Initial multi-page React Router setup and extracted SVG signature path data (`frontend/src/data/namePath.js`)

### Changed

- Added GSAP timeline cleanup (`t1.kill()`) in the circuit animation lifecycle

### Removed

- Unused `app.py` Flask backend stub, legacy CommonJS `tailwind.config.js`, and unused `animejs` dependency

## [0.1.0] - 2025-07-21

### Added

- Initial Vite + React + Tailwind CSS frontend scaffolding and GPL-3.0 `LICENSE`
- Custom SVG circuit-board background (`CircuitBoard`, `AnimatedPath`, `Circle`) and coordinate data (`polyLines.js`, `linePaths.js`, `circles.js`)
- GSAP stroke-dashoffset trace draw-in animation and `TitleCard` calligraphic signature overlay
- Persistent `localStorage` light/dark theme toggle (`ThemeSwitch` and `themes.js`)
