# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

NPM workspaces monorepo for learning computer science and frontend development concepts. Two packages:

- **`packages/algorhythmics`** — TypeScript data structures, algorithms, sorting, and coding challenge solutions
- **`packages/cassess`** — CSS/React frontend with Vite, Frontend Mentor projects, and CSS concept explorations

Node 24 / npm 11 versions are pinned via Volta.

## Commands

All commands can be run from the root or within a specific package directory.

### Root (runs across all workspaces)

```sh
npm run test          # lint:check + build:ts + vitest (full CI check)
npm run vitest        # run tests only (no lint/build)
npm run lint          # format + lint (writes changes)
npm run lint:check    # format + lint (read-only, used in CI)
npm run build:ts      # TypeScript compile check
```

### algorhythmics-specific

```sh
cd packages/algorhythmics
npm run vitest        # run tests only
npm run test          # full check: lint + build + vitest
npm run fcc           # format FreeCodeCamp .txt problem files
```

### cassess-specific

```sh
cd packages/cassess
npm run vite:serve    # dev server (opens browser)
npm run vite:build    # production build to dist/
npm run stylelint     # lint CSS files
```

### Running a single test file

```sh
cd packages/algorhythmics
npx vitest run tests/linked-list.test.ts

cd packages/cassess
npx vitest run tests/projects/some-project.spec.js
```

## Architecture

### algorhythmics

- `src/` — implementations (data structures, algorithms, sorting, problems)
- `tests/` — mirrors `src/` structure with `.test.ts` files; has its own `tsconfig.json`
- `freecodecamp-problems/` — FreeCodeCamp challenge files (`.js`/`.txt`), managed by `scripts/fcc-file-formatter.ts`
- TypeScript uses `nodenext` module resolution with ESM (`"type": "module"`)
- Tests use vitest globals (no explicit imports needed for `describe`, `it`, `expect`)

### cassess

- Multi-page app (MPA) built with Vite; each `index.html` is its own entry point
- `concepts/` — standalone HTML/CSS explorations (flexbox, grid)
- `projects/fementor/` — Frontend Mentor challenge implementations
- `tests/projects/` — vitest + jsdom tests for project JS behavior
- React with automatic JSX inject (`import React` not needed in `.tsx`/`.jsx` files)
- Vite config (`vite.config.js`) has custom `rolldownOptions` to preserve original file paths in the build output

### Linting stack

- **ESLint** — JS/TS (root config shared; cassess adds React/a11y/HTML plugins)
- **Prettier** — all file types; config at root `prettier.config.js`
- **Stylelint** — CSS only (cassess only, `stylelint-config-standard`)
- **Husky + lint-staged** — runs prettier and eslint on staged files pre-commit
