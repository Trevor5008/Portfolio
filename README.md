# Trevor Werner — Portfolio

Static personal portfolio and engineering case-study site built with **React 19**, **Vite 6**, **Tailwind CSS 4**, **GSAP**, and **React Router 7**.

---

## Tech Stack

- **UI & Routing:** React 19, React Router 7 (`BrowserRouter`), Tailwind CSS 4 (`@tailwindcss/vite`)
- **SVG & Motion:** Custom SVG circuit-board hero animated with GSAP (`prefers-reduced-motion` aware)
- **Verification:** Vitest, jsdom, React Testing Library, ESLint 9
- **Deployment:** Static Single-Page Application (Render Static Site)

---

## Project Structure

```text
Portfolio/
├── render.yaml                     # Render Static Site blueprint + SPA rewrite rule
├── README.md
└── frontend/
    ├── index.html                  # Document metadata, Open Graph tags, SVG favicon
    ├── public/
    │   └── favicon.svg
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
npm run preview    # Preview production bundle locally
```

---

## Static Deployment (Render)

This repository includes [`render.yaml`](render.yaml) for deploying as a **Render Static Site**:

- **Root Directory:** `frontend`
- **Build Command:** `npm ci && npm run build`
- **Publish Directory:** `dist`
- **SPA Deep-Link Rewrite:** `/*` -> `/index.html` (`Rewrite`) so direct refreshes on `/projects/:slug`, `/about`, and `/contact` resolve through `BrowserRouter`.

---

## Credits & Contact

- Circuit-board SVG layout inspired by Christopher Prins ([Original CodePen](https://codepen.io/christopherprins/pen/rZZWoj)).
- **GitHub:** [github.com/Trevor5008](https://github.com/Trevor5008)
- **LinkedIn:** [linkedin.com/in/trevor-werner](https://www.linkedin.com/in/trevor-werner)
- **Email:** [twern005@fiu.edu](mailto:twern005@fiu.edu)
