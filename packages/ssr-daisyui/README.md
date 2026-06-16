# ssr-daisyui — React Router 7 SSR Starter

A server-side-rendering (SSR) starter built with **React Router 7** (framework mode) and styled with
**Tailwind CSS 4 + DaisyUI 5**, plus **Base UI** for headless, accessible components. It comes with
typesafe internationalization, forms, an image-optimization service, and analytics wired up.

> New here? Run the app (`yarn dev`) and open the home page — it renders a guided tour of the
> included features (source: [`app/md-content/home.en.md`](./app/md-content/home.en.md)).

## Prerequisites

- **Node.js ≥ 24**
- **Yarn 4** — this repo pins the exact version via the `packageManager` field. The easiest way to
  get it is **Corepack** (bundled with Node): run `corepack enable` once, and the correct Yarn
  version is used automatically inside the project.

## Quick start

Scaffold a fresh project from this template (recommended — you get a clean, standalone copy):

```bash
npx create-react-router@latest --template https://github.com/tegonal/react-router-templates/tree/main/packages/ssr-daisyui
```

Then, in the new project directory:

```bash
yarn install   # install dependencies
yarn dev       # start the dev server (http://localhost:5173)
```

## Scripts

| Command                       | What it does                                                                |
| ----------------------------- | --------------------------------------------------------------------------- |
| `yarn dev`                    | Start the development server with HMR                                       |
| `yarn build`                  | Type-check, then build the production server + client bundles into `build/` |
| `yarn start`                  | Run the built app with `react-router-serve`                                 |
| `yarn typecheck`              | Generate route types and run `tsc`                                          |
| `yarn lint` / `yarn lint:fix` | Run ESLint (optionally autofix)                                             |
| `yarn prettier`               | Format the codebase with Prettier                                           |
| `yarn check`                  | `lint:fix` + `prettier` + `typecheck` — run before committing               |
| `yarn i18n:extract`           | Scan code for `t()` calls, update locale JSON, regenerate types             |
| `yarn i18n:types`             | Regenerate translation types only (from `app/locales/en`)                   |
| `yarn i18n:sync`              | Extract and report changed keys (for sending to translators)                |
| `yarn i18n:lint`              | Lint translation usage                                                      |
| `yarn up`                     | Update dependencies interactively                                           |

## Tech stack

- **React Router 7** (framework mode, SSR with stable middleware) · **React 19** · **TypeScript 6** ·
  **Vite 8**
- **Tailwind CSS 4** + **DaisyUI 5** (theming is CSS-first in `app/styles/tailwind.css`) +
  **[Base UI](https://base-ui.com)** for headless, accessible primitives (dialog, menu, select, …)
- **i18n**: `i18next` + `react-i18next` + `remix-i18next` (middleware), with keys extracted and typed
  by **`i18next-cli`**
- **Forms**: `react-hook-form` + `remix-hook-form` + `zod`
- **Tooling**: ESLint 9 (flat config) + Prettier, maintained directly in the project (no shared
  config dependency)

## Components & styling

DaisyUI provides the visuals; Base UI provides accessible behavior. The convention:

- **Simple, presentational components** (buttons, cards, badges, inputs, layout) — use
  **DaisyUI classes only**. No extra library needed.
- **Complex, interactive components** (dropdowns, dialogs, menus, selects, popovers, tabs,
  tooltips, comboboxes) — build on **Base UI headless components** and style them with **DaisyUI
  classes** and theme tokens (`bg-base-100`, `btn`, `rounded-box`, …). Base UI handles focus
  management, keyboard navigation, and ARIA; DaisyUI handles the look. Import per subpath, e.g.
  `import { Dialog } from '@base-ui/react/dialog'`.

Avoid DaisyUI's _structural container_ classes (`modal`, `dropdown`, `collapse`) on Base UI
components — they assume specific HTML; use Tailwind utilities + theme tokens instead.

## Internationalization

Translations live in `app/locales/<lng>/<namespace>.json`. English holds the source strings (the
default values you pass to `t()`); other locales are filled in from there.

Typical workflow:

1. Use translations in code with a key **and** an English default: `t('header.title', 'ACME Inc.')`.
2. Run `yarn i18n:extract` — this writes any new keys into the locale files and regenerates the
   types in `app/types/` so `t()` is fully type-checked.
3. Translate the non-English JSON files (or use `yarn i18n:sync` to get a list of changed keys).

To add a language, extend `LOCALES` in `app/i18n-constants.ts` and `locales` in `i18next.config.ts`.
Extraction config lives in `i18next.config.ts`; runtime config in `app/i18n-config.ts`.

## Project structure

```
app/
  components/    UI components (ui/, theme/, typography/)
  features/      self-contained modules (image-service/, plausible/)
  routes/        route modules (api/ for resource routes, files/ for robots/sitemap)
  middleware/    React Router middleware (i18n, …)
  lib/           helpers, server utilities, cookies
  locales/       translation JSON + generated index files
  types/         generated i18next types and shared types
  styles/        Tailwind entry + self-hosted fonts
  md-content/    in-app markdown docs (the feature tour)
public/          static assets
```

## Deployment

A `Dockerfile` is included (builds the app and runs `react-router-serve`). The GitHub workflow
publishes an image to `ghcr.io`.
