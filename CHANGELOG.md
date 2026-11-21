# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
