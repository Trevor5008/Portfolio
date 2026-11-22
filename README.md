# Trevor Werner — Portfolio

[![Version](https://img.shields.io/badge/version-0.3.1-blue)](CHANGELOG.md)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02)](https://gsap.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

Static personal portfolio and engineering case-study site built with **React 19**, **Vite 6**, **Tailwind CSS 4**, **GSAP**, and **React Router 7**.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development & Verification](#local-development--verification)
- [Static Deployment (Render)](#static-deployment-render)
- [Future Improvements](#future-improvements)
- [Changelog](#changelog)
- [Credits & Contact](#credits--contact)
- [License](#license)

---

## Overview

This repository powers the personal portfolio for **Trevor Werner** (*Software & Applied AI Engineer*). It serves as a fast, accessible presentation layer over software engineering, interactive cryptography, local-first mobile, data pipeline, and applied machine learning projects, with GitHub repositories serving as the source of technical evidence.

Key architectural characteristics:

- **Single sources of truth:** Identity, verified experience/education, skills, resume asset path, and contact links live in [`frontend/src/data/site.js`](frontend/src/data/site.js); all featured cards, project index entries, and case-study routes derive from [`frontend/src/data/projects.js`](frontend/src/data/projects.js).
- **Accessible & motion-safe:** Semantic landmarks (including mobile primary navigation), keyboard-operable controls, `>= 44x44px` touch targets, zero external web-font requests, and `prefers-reduced-motion` support on the GSAP circuit-board hero.
- **Zero-backend static SPA:** Deploys directly as static assets with an SPA rewrite rule for clean deep links.

---

## Tech Stack

- **UI & Routing:** React 19, React Router 7 (`BrowserRouter`), Tailwind CSS 4 (`@tailwindcss/vite`)
- **SVG & Motion:** Custom SVG circuit-board hero animated with GSAP (`prefers-reduced-motion` aware)
- **Verification:** Vitest 5, jsdom, React Testing Library, ESLint 9
- **Deployment:** Static Single-Page Application (Render Static Site)

---

## Project Structure

```text
Portfolio/
├── CHANGELOG.md                    # Release history (Keep a Changelog)
├── LICENSE                         # GNU General Public License v3.0
├── README.md
├── render.yaml                     # Render Static Site blueprint + SPA rewrite rule
├── docs/
│   └── dependency-audit.md         # Dependency vulnerability audit & remediation record
└── frontend/
    ├── index.html                  # Document metadata, Open Graph tags, SVG favicon
    ├── public/
    │   ├── favicon.svg             # Custom circuit monogram icon
    │   ├── resume.pdf              # Static PDF resume served at /resume.pdf
    │   └── robots.txt              # Valid crawler directives preventing SPA HTML fallback
    └── src/
        ├── main.jsx                # Root providers (BrowserRouter, ThemeProvider)
        ├── App.jsx                 # Application route table
        ├── components/             # Shared UI (Layout, Header, Footer, CircuitHero, ProjectCard, ThemeSwitch)
        ├── pages/                  # Route views (Home, Projects, CaseStudy, About, Contact, NotFound)
        ├── data/                   # Single sources of truth (site.js, projects.js, themes.js, protected SVG paths)
        ├── hooks/                  # Custom hooks (useDocumentTitle, useReducedMotion)
        ├── test/                   # Vitest + jsdom setup
        └── __tests__/              # Component, routing, and accessibility tests
```

---

## Local Development & Verification

All frontend commands run from `frontend/`:

```bash
cd frontend
npm ci
npm run dev
```

Run the verification suite before committing or deploying:

```bash
cd frontend
npm run test:run   # Vitest component & accessibility suite
npm run lint       # ESLint check
npm run build      # Production static bundle -> frontend/dist/
npm audit          # Dependency vulnerability check (see docs/dependency-audit.md)
npm run preview    # Preview production bundle locally
```

---

## Static Deployment (Render)

This repository includes [`render.yaml`](render.yaml) (`portfolio-r88y`) for deploying as a **Render Static Site**:

- **Root Directory:** `frontend`
- **Build Command:** `npm ci && npm run build`
- **Publish Directory:** `dist`
- **SPA Deep-Link Rewrite:** `/*` -> `/index.html` (`Rewrite`) so direct refreshes on `/projects/:slug`, `/about`, and `/contact` resolve through `BrowserRouter`.

> **Important (Manual Render Dashboard Services):** If the Render Static Site was created manually in the Render Dashboard rather than via Blueprint sync, Render does not automatically import `routes` from `render.yaml`. You must add `Source: /*`, `Destination: /index.html`, `Action: Rewrite` under **Render Dashboard -> Redirects/Rewrites** so deep links do not return `HTTP 404`.

---

## Future Improvements

- **TypeScript Migration (Post-Launch Candidate):** The codebase intentionally remains JavaScript/JSX for Milestone 1 stability; migrating `site.js`, `projects.js`, and React components to strict TypeScript is tracked as a post-launch engineering enhancement.
- **Additional Case Studies & Visual Evidence:** Expand structured case studies (starting with `Palander`) and embed annotated product screenshots and workflow captures.

---

## Changelog

Release history and notable architectural changes are tracked in [`CHANGELOG.md`](CHANGELOG.md).

---

## Credits & Contact

- Circuit-board SVG layout inspired by Christopher Prins ([Original CodePen](https://codepen.io/christopherprins/pen/rZZWoj)).
- **Website:** [trevorwerner.com](https://trevorwerner.com)
- **GitHub:** [github.com/Trevor5008](https://github.com/Trevor5008)
- **LinkedIn:** [linkedin.com/in/trevor-werner](https://www.linkedin.com/in/trevor-werner)
- **Email:** [twern005@fiu.edu](mailto:twern005@fiu.edu)

---

## License

Distributed under the **GNU General Public License v3.0**. See [`LICENSE`](LICENSE) for details.
