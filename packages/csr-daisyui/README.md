# csr-daisyui — React Router 7 CSR Starter

A client-side-rendering (CSR / SPA) starter built with **React Router 7** (library mode) and styled
with **Tailwind CSS 4 + DaisyUI 5**, plus **Base UI** for headless, accessible components. It builds
to static assets you can host anywhere.

> New here? Run the app (`yarn dev`) and open the home page — it renders a guided tour of the
> stack (source: [`public/md-content/home.en.md`](./public/md-content/home.en.md)).

## Prerequisites

- **Node.js ≥ 24**
- **Yarn 4** — this repo pins the exact version via the `packageManager` field. The easiest way to
  get it is **Corepack** (bundled with Node): run `corepack enable` once, and the correct Yarn
  version is used automatically inside the project.

## Quick start

Scaffold a fresh project from this template (recommended — you get a clean, standalone copy):

```bash
npx create-react-router@latest --template https://github.com/tegonal/react-router-templates/tree/main/packages/csr-daisyui
```

Then, in the new project directory:

```bash
yarn install   # install dependencies
yarn dev       # start the dev server (http://localhost:5173)
```

## Scripts

| Command                       | What it does                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `yarn dev`                    | Start the Vite development server with HMR                                   |
| `yarn build`                  | Build the static SPA into `dist/` (use `build:prod` for the production mode) |
| `yarn typecheck`              | Run `tsc`                                                                    |
| `yarn lint` / `yarn lint:fix` | Run ESLint (optionally autofix)                                              |
| `yarn prettier`               | Format the codebase with Prettier                                            |
| `yarn check`                  | `lint:fix` + `prettier` + `typecheck` — run before committing                |
| `yarn i18n:extract`           | Scan code for `t()` calls, update locale JSON, regenerate types              |
| `yarn i18n:types`             | Regenerate translation types only                                            |
| `yarn i18n:sync`              | Extract and report changed keys (for sending to translators)                 |
| `yarn up`                     | Update dependencies interactively                                            |

## Tech stack

- **React Router 7** (library mode / `BrowserRouter`, client-side rendering) · **React 19** ·
  **TypeScript 6** · **Vite 8**
- **Tailwind CSS 4** + **DaisyUI 5** (theming is CSS-first in `app/styles/tailwind.css`) +
  **[Base UI](https://base-ui.com)** for headless, accessible primitives (dialog, menu, select, …)
- **i18n**: `i18next` + `react-i18next` (translations loaded at runtime via `i18next-http-backend`),
  with keys extracted and typed by **`i18next-cli`**
- **Forms**: `react-hook-form` + `zod`
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

Translations live in `public/locales/<namespace>.<lng>.json` and are fetched at runtime. English
holds the source strings (the default values you pass to `t()`); other locales are filled in from
there.

Typical workflow:

1. Use translations in code with a key **and** an English default: `t('header.title', 'ACME Inc.')`.
2. Run `yarn i18n:extract` — this writes any new keys into the locale files and regenerates the
   types in `app/types/` so `t()` is fully type-checked.
3. Translate the non-English JSON files (or use `yarn i18n:sync` to get a list of changed keys).

Extraction config lives in `i18next.config.ts`; runtime config in `app/i18n.ts`.

## Project structure

```
app/
  components/    UI components (ui/, theme/, typography/)
  routes/        page components
  contexts/      React context providers
  lib/           helpers and utilities
  hooks/         custom React hooks
  config/        app configuration
  styles/        Tailwind entry + self-hosted fonts
  app.tsx        application root (routes)
  index.tsx      client entry / mount
public/
  locales/       translation JSON (loaded at runtime)
  md-content/    in-app markdown docs
```

## Deployment

A `Dockerfile` is included: it builds the SPA and serves the static files with **Caddy** on the
domain configured in the `Caddyfile`. The GitHub workflow publishes an image to `ghcr.io`. Because
the output in `dist/` is fully static, you can also host it on any static/CDN provider.
