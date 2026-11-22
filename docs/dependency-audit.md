# Dependency Audit & Remediation Record

**Repository:** `Trevor5008/Portfolio` (`frontend/`)  
**Date:** 2026-11-22  
**Branch:** `mvp-hardening`

---

## 1. Baseline Findings (Commit `9354049` / `v0.3.0`)

Running `npm --prefix frontend audit` against the `v0.3.0` lockfile reported **13 vulnerabilities** across 216 audited packages:

- **Critical (1):** `tar` (`<= 7.5.10`, transitive via `@tailwindcss/oxide` in `@tailwindcss/vite@4.1.7` / `tailwindcss@4.1.7`) — arbitrary file overwrite / symlink path traversal advisories during tarball extraction.
- **High (9):**
  - `react-router` (`6.0.0 - 7.17.0`, direct runtime dependency at `7.7.0`) — multiple CSRF, open-redirect, XSS, and SSR scroll-restoration advisories (`GHSA-2w69-qvjg-hvjx`, `GHSA-h5cw-625j-3rxh`, `GHSA-9jcx-v3wj-wh4m`, `GHSA-v62p-rq8g-j8g4`, `GHSA-xq37-363w-22h4`), though SSR/framework-action paths were not exercised by this static client-rendered SPA.
  - `postcss`, `nanoid`, `source-map-js` (transitive build-time CSS dependencies under `@tailwindcss/vite@4.1.7` / `tailwindcss@4.1.7`).
  - `rollup` (`4.0.0 - 4.58.0`, transitive bundler dependency under `vite`).
  - `brace-expansion`, `flatted`, `js-yaml`, `minimatch` (transitive lint/glob tooling under `eslint@9.25.0`).
- **Moderate (2):** `ajv` (`< 6.14.0`), `@humanfs/node` (transitive `eslint` dependencies).
- **Low (1):** `@eslint/plugin-kit` (`< 0.3.4`, transitive `eslint` ReDoS advisory).

Running `npm --prefix frontend audit --omit=dev` initially reported **6 vulnerabilities** (`1` critical, `5` high) because `react-router` was pinned to `7.7.0` and build-only plugin `@tailwindcss/vite` was classified under `dependencies` rather than `devDependencies`.

---

## 2. Remediation Actions Applied

All remediation stayed strictly within compatible minor/patch ranges (no `--force` and no major-version upgrades across React 19, React Router 7, Vite 6, Tailwind CSS 4, ESLint 9, or Vitest 5):

1. **Reclassified build plugin:** Moved `@tailwindcss/vite` from `dependencies` to `devDependencies` in `frontend/package.json` so runtime `dependencies` contain only `gsap`, `react`, `react-dom`, and `react-router`.
2. **Upgraded `react-router` within v7:** Updated `react-router` from `^7.7.0` to `^7.18.6`, resolving all `react-router` advisories affecting `6.0.0 - 7.17.0`.
3. **Upgraded compatible minor/patch build & lint packages and refreshed lockfile:** Updated `@tailwindcss/vite` and `tailwindcss` (`^4.1.7` -> `^4.3.5`), `vite` (`^6.3.5` -> `^6.4.6`), and `eslint` (`^9.25.0` -> `^9.39.5`), followed by `npm --prefix frontend audit fix` to pull patched transitive versions of `rollup`, `postcss`, `nanoid`, `source-map-js`, `tar`, `minimatch`, `brace-expansion`, `flatted`, `js-yaml`, `ajv`, `@humanfs/node`, and `@eslint/plugin-kit`.

---

## 3. Post-Remediation Verification

| Check | Result |
| --- | --- |
| `npm --prefix frontend audit` | **`found 0 vulnerabilities`** (210 audited packages) |
| `npm --prefix frontend audit --omit=dev` | **`found 0 vulnerabilities`** |
| `npm --prefix frontend run test:run` | Passing |
| `npm --prefix frontend run lint` | `0` errors, `0` warnings |
| `npm --prefix frontend run build` | Clean production bundle in `frontend/dist` |

**Remaining open advisories in `Portfolio`:** None (`0` runtime, `0` dev/build-time).  
*(Note: External project repositories linked from the portfolio, such as `Trevor5008/rsa-cipher-demo`, maintain separate dependency trees and must be audited independently in their own repositories.)*
