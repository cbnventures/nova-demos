# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** Nova Demos
- **Description:** Live demonstration sites for the Nova Docusaurus preset family.
- **Primary language:** TypeScript
- **Framework / runtime:** Docusaurus 3.10.0 via `@cbnventures/docusaurus-preset-nova`, orchestrated across npm workspaces with Turborepo

### Repository URL

- **URL:** https://github.com/cbnventures/nova-demos

## Repository Layout

```
nova-demos/
├── .github/                    — GitHub Actions workflows, issue templates, funding links
│   ├── ISSUE_TEMPLATE/         — Bug report, feature request, and support request forms
│   ├── workflows/              — sponsor-check and lock-inactive workflows (Nova-generated)
│   └── FUNDING.yml             — GitHub Sponsors / PayPal funding links
├── apps/                       — The six preset demo sites, each a standalone Docusaurus app
│   ├── demo-envoy/
│   ├── demo-foundry/
│   ├── demo-lantern/
│   ├── demo-marshal/
│   ├── demo-sentinel/
│   └── demo-signal/
├── conventions/                — Per-language coding convention docs (Nova-generated)
├── packages/                   — Shared workspaces that are not demo sites
│   └── demos-testkit/          — Cross-demo structural, preset, block, and locale parity tests
├── scripts/                    — Repo-level maintenance scripts
│   ├── fix-markdown-tables.mjs — Reformats markdown tables via Nova's MarkdownTable renderer
│   └── link-nova.mjs           — postinstall: npm-links globally linked @cbnventures packages
├── .editorconfig               — Editor formatting rules
├── .env.sample                 — Root environment variable reference (Node.js / Nova CLI settings)
├── .gitignore                  — Git ignore patterns
├── AGENTS.md                   — Generated agent-convention entry point (Codex)
├── CLAUDE.md                   — Generated agent-convention entry point (Claude Code)
├── eslint.config.mts           — Root ESLint flat config
├── LICENSE                     — MIT license
├── nova.config.json            — Nova project identity, workspace, and recipe configuration
├── package.json                — npm workspace root manifest and orchestration scripts
├── PROJECT_RULES.md            — This file
├── README.md                   — Project overview and badges (Nova-generated)
├── tsconfig.json               — Root TypeScript project references
├── tsconfig.config.json        — TypeScript config for eslint.config.mts
├── tsconfig.scripts.json       — TypeScript config for scripts/*.mjs
├── turbo.json                  — Turborepo task graph (dev, prod, build, check, deploy, clean)
└── VISION.md                   — Purpose, marketing copy, and glossary
```

Note: `package-lock.json` is generated locally but is gitignored (not committed); dependency versions are pinned directly in each `package.json` instead.

## Source Structure

This repository has two workspace types: six identical demo apps under `apps/`, and one shared test package under `packages/`. `demo-envoy` below is representative — all six demos follow this exact layout.

```
apps/demo-envoy/                       — Representative of all 6 demo apps; identical layout throughout
├── blog/                              — Blog posts (dated .mdx) + authors.yml
├── docs/                              — Docs pages, grouped into sidebar categories
│   ├── advanced/                      — architecture.mdx, integrations.mdx
│   ├── core/                          — authentication.mdx, protocol-translation.mdx, routing-dispatch.mdx
│   ├── operations/                    — monitoring-relays.mdx, scaling-relays.mdx
│   ├── reference/                     — api-reference.mdx
│   ├── setup/                         — configuration.mdx, installation.mdx, your-first-relay.mdx
│   ├── overview.mdx                   — Docs landing page
│   ├── theme-showcase.mdx             — Living style guide for every theme component
│   ├── bare-sample.mdx                — Demonstrates ?docusaurus-data-bare=true embed mode
│   ├── draft-sample.mdx               — Demonstrates draft: true docs
│   └── unlisted-sample.mdx            — Demonstrates unlisted: true docs
├── i18n/                              — 36 locale bundles (UI-string translations; ar and zh-Hans also carry translated docs/blog/pages content)
├── src/
│   ├── lib/                           — Reserved for demo-specific helpers (currently empty)
│   ├── pages/
│   │   ├── index.tsx                  — Homepage composed from preset blocks (Hero, Features, Stats, ...)
│   │   ├── showcase.tsx               — /showcase/ route rendering every preset block with sample data
│   │   └── manifesto.mdx              — Standalone manifesto page
│   ├── tests/                         — Self-check suites, each a thin wrapper around a shared rule suite
│   │   ├── frontmatter.test.ts        — registerFrontmatterSuite (@cbnventures/nova/rules/vitest)
│   │   ├── link.test.ts               — registerLinkSuite
│   │   ├── markdown-table.test.ts
│   │   ├── terminology.test.ts        — registerTerminologySuite
│   │   └── type-declarations.test.ts  — registerTypeDeclarationSuite
│   └── types/
│       └── tests/                     — Mirrors src/tests/ (currently empty; populated as needed)
├── static/                            — Favicons, manifest, logo, OG thumbnail
├── versioned_docs/version-1.0.0/      — Snapshotted docs for the 1.0.0 version
├── versioned_sidebars/                — Sidebars for versioned docs
├── docusaurus.config.ts               — Site config, preset selection, theme config
├── sidebars.ts                        — Docs sidebar structure
├── versions.json                      — Declared doc versions
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.config.json / tsconfig.tests.json
├── eslint.config.mts
├── vitest.config.ts / vitest.setup.ts
└── .env.sample

packages/demos-testkit/                — The one non-demo workspace; shared cross-demo test harness
├── src/
│   ├── lib/
│   │   ├── demos.ts                   — Discovers demos under apps/, reads their configs and file trees
│   │   ├── preset.ts                  — Reads block names + theme-config leaf paths from the installed preset
│   │   └── regex.ts                   — Shared regex patterns for both lib modules
│   ├── tests/
│   │   ├── block-coverage.test.ts     — Every preset block is used by at least one demo
│   │   ├── locale-coverage.test.ts    — i18n locale bundles stay in sync across demos
│   │   ├── logo-override.test.ts      — Logo override wiring is consistent across demos
│   │   ├── preset-coverage.test.ts    — Every theme-config leaf path is exercised by some demo
│   │   ├── prop-coverage.test.ts      — Block prop surfaces stay covered across demos
│   │   └── structure-parity.test.ts   — All demos share the same docs/blog/pages/versions structure
│   └── types/
│       ├── lib/                       — Mirrors src/lib/
│       └── tests/                     — Mirrors src/tests/
├── package.json
├── tsconfig.json / tsconfig.config.json / tsconfig.tests.json
├── eslint.config.mts
└── vitest.config.mts / vitest.setup.mts
```

## Key Files

| File                                     | Purpose                                                                   | When to modify                                                          |
|-------------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `nova.config.json`                        | Project identity, workspace registry, environment prefixes, and recipes    | Changing project metadata, adding/removing a workspace, changing recipes  |
| `turbo.json`                              | Task graph (dev, prod, build, check, deploy, clean) shared by every workspace | Adding a turbo task or changing caching/dependency behavior              |
| `package.json` (root)                     | npm workspace root manifest and orchestration scripts                      | Adding a workspace glob, bumping shared devDependencies                  |
| `apps/demo-*/docusaurus.config.ts`        | Per-demo site config and Nova preset wiring                                | Changing which preset a demo showcases, or its metadata/theme config      |
| `apps/demo-*/sidebars.ts`                 | Docs sidebar structure for a demo                                          | Adding or reorganizing docs categories                                   |
| `packages/demos-testkit/src/lib/demos.ts` | Discovers all demo apps and reads their file trees/configs at test time    | Changing how demos are discovered or what demo metadata is read           |
| `packages/demos-testkit/src/lib/preset.ts`| Reads block names and theme-config leaf paths from the installed preset    | Changing how preset/block coverage is measured                           |
| `scripts/link-nova.mjs`                   | postinstall: links globally npm-linked @cbnventures packages into workspaces | Changing local Nova development linking behavior                         |
| `scripts/fix-markdown-tables.mjs`         | Reformats markdown tables via Nova's MarkdownTable renderer during build   | Changing markdown table formatting rules                                 |
| `LICENSE`                                 | MIT license                                                                | Updating the copyright year (Nova-managed)                               |

## Build and Tooling

### Prerequisites

| Tool       | Version                      | Purpose                                              |
|------------|-------------------------------|--------------------------------------------------------|
| Node.js    | `^22` or `^24`                 | Runtime for every workspace (per `engines` in each `package.json`) |
| npm        | `11.18.0` (pinned via `packageManager`) | Package manager and workspace orchestration       |
| Turborepo  | `2.10.6`                       | Task graph runner (dev, build, check, deploy, clean) across workspaces |

### Commands

Root commands, from the top-level `package.json`:

| Command              | What it does                                                                                          |
|-----------------------|--------------------------------------------------------------------------------------------------------|
| `npm install`         | Install all workspace dependencies; postinstall links global @cbnventures packages if present         |
| `npm run dev`         | `turbo run dev` — start every demo's Docusaurus dev server in parallel                                 |
| `npm run prod`        | `turbo run prod` — check and build, then serve every demo's production build                          |
| `npm run build`       | `turbo run build --concurrency=2` — build every demo (docusaurus build, transpile, markdown-table fix) |
| `npm run check`       | `turbo run check --concurrency=2`, then root ESLint and Nova type-check on `tsconfig.config.json` and `tsconfig.scripts.json` |
| `npm run deploy`      | `turbo run deploy --concurrency=2` — check and build for every demo                                    |
| `npm run clean`       | `turbo run clean` — remove build output and the Docusaurus cache for every demo                        |
| `npm run changelog`   | `nova utility changelog` — record or release changelog entries                                         |
| `npm run recipes`     | `nova utility run-recipes --replace-file` — regenerate Nova must-haves (README, LICENSE, package.json normalization, and more) |

Every demo app exposes the same scripts (identical across all six `apps/demo-*/package.json`). Target one directly with `npm run <script> --workspace=demo-envoy` (or `npx turbo run <task> --filter=demo-envoy`):

| Command                                                        | What it does                                                              |
|-------------------------------------------------------------------|------------------------------------------------------------------------------|
| `dev` / `dev:start`                                              | `portless`-assigned port 3000, `docusaurus start --host 0.0.0.0`             |
| `prod` / `prod:serve`                                            | `portless`-assigned port 3000, `docusaurus serve --host 0.0.0.0`             |
| `build:build` / `build:transpile-app` / `build:fix-markdown-tables` | `docusaurus build`, then Nova transpile of `tsconfig.app.json`, then the markdown-table fixer |
| `i18n` / `i18n:check` / `i18n:coverage`                          | `theme-nova i18n sync` / `check` / `coverage`                                |
| `check:lint` / `check:types-app` / `check:types-tests` / `check:test` | ESLint, Nova type-check (app and tests projects), `vitest run`         |
| `clean:build` / `clean:clear`                                    | Remove `./build`, then `docusaurus clear`                                    |

`packages/demos-testkit` exposes only `check` and its `check:*` sub-scripts (lint, type-check for tests and config projects, and `vitest run`) — it has no `dev`, `build`, `prod`, or `deploy` script, since it ships no site of its own.

### Environment Variables

Every workspace's `.env.sample` defines the same base variables:

| Variable    | Required | Purpose                                                                 |
|-------------|----------|----------------------------------------------------------------------------|
| `NODE_ENV`  | No       | `development` \| `production` \| `test` (default: `development`)          |
| `LOG_LEVEL` | No       | `debug` \| `info` \| `warn` \| `error` \| `auto` (default: `auto`, derived from `NODE_ENV`) |
| `LOG_TIME`  | No       | `true` \| `false` (default: `false`)                                       |

Beyond those base variables, `nova.config.json` assigns one environment-variable prefix per workspace and per workflow:

| Prefix       | Scope                                                          |
|--------------|-----------------------------------------------------------------|
| `PROJECT_`   | Project-wide variables (`environment.project.prefix`)           |
| `ROOT_`      | Root workspace (`./`)                                            |
| `ENVOY_`     | `apps/demo-envoy`                                                |
| `FOUNDRY_`   | `apps/demo-foundry`                                              |
| `LANTERN_`   | `apps/demo-lantern`                                              |
| `MARSHAL_`   | `apps/demo-marshal`                                              |
| `SENTINEL_`  | `apps/demo-sentinel`                                             |
| `SIGNAL_`    | `apps/demo-signal`                                               |
| `SGS_`       | sponsor-check workflow variables (for example `SGS_ISSUE_LABELS`, `SGS_SPONSOR_MINIMUM`) |

`packages/demos-testkit` has no `.env.sample` and no entry under `environment.workspaces` — it does not participate in Nova's per-workspace environment prefix convention.

## Workspace Rules

Per `nova.config.json`, every registered workspace is `policy: "freezable"`; the root is `role: "project"` and all six demo apps are `role: "template"`:

| Workspace              | Role      | Policy     |
|--------------------------|-----------|------------|
| `./` (root)               | project   | freezable  |
| `./apps/demo-envoy`       | template  | freezable  |
| `./apps/demo-foundry`     | template  | freezable  |
| `./apps/demo-lantern`     | template  | freezable  |
| `./apps/demo-marshal`     | template  | freezable  |
| `./apps/demo-sentinel`    | template  | freezable  |
| `./apps/demo-signal`      | template  | freezable  |

`packages/demos-testkit` is not listed above because it is not a registered Nova workspace — it does not appear in `nova.config.json`'s `workspaces`, `environment.workspaces`, or `recipes.package-json` maps, so Nova's generators and normalization recipes skip it.

### Naming Conventions

| Entity                  | Convention                        | Example                                             |
|--------------------------|-------------------------------------|--------------------------------------------------------|
| Demo workspace name      | `demo-<preset>`                     | `demo-envoy`, `demo-signal`                             |
| Demo app directory       | `apps/demo-<preset>`                | `apps/demo-lantern`                                     |
| Preset identifier        | Lowercase, matches the demo suffix  | `preset: 'envoy'` in `docusaurus.config.ts`             |
| Docs categories          | kebab-case directory + `_category_.json` | `docs/core/`, `docs/setup/`                       |
| Blog post files          | `YYYY-MM-DD-slug.mdx`               | `2026-03-08-migrating-from-zapier-webhooks.mdx`         |
| Test files               | Mirror source path + `.test.ts`     | `src/tests/link.test.ts`                                |
| Type declaration files   | Mirror source/test path + `.d.ts`   | `src/types/tests/structure-parity.test.d.ts`            |
| Environment variable prefix | SCREAMING_SNAKE_CASE, one per workspace | `ENVOY_`, `FOUNDRY_`, `SGS_`                     |

### Do / Don't

**Do:**
- Keep all six demo apps structurally identical — only the preset, its copy, and its content should differ between them. `demos-testkit`'s structure-parity and preset-coverage tests enforce this.
- Route every demo through `@cbnventures/docusaurus-preset-nova`; compose pages from its exported blocks rather than hand-rolling navbar, footer, or block markup.
- Wire any new block or theme-config field into the showcase page (`src/pages/showcase.tsx`) and at least one demo's `docusaurus.config.ts` so `demos-testkit`'s coverage tests can see it.
- Use the shared `@cbnventures/nova/rules/vitest` suites (frontmatter, link, terminology, type-declarations) in each demo's `src/tests/`, rather than writing bespoke equivalents per demo.
- Keep `packages/demos-testkit` agnostic of any single demo — it must discover demos dynamically (`discoverDemoNames`), never hardcode a demo name.

**Don't:**
- Don't add a seventh demo app without also registering it in `nova.config.json`'s `workspaces`, `environment.workspaces`, and `recipes.package-json` maps — Nova's generators only touch registered workspaces.
- Don't edit `CLAUDE.md`, `AGENTS.md`, or `conventions/*.md` directly; they are regenerated by `nova generate must-haves agent-conventions` and local edits are lost on the next run.
- Don't commit `.env` or `package-lock.json`; both are gitignored. Only `.env.sample` is tracked.
- Don't let a demo's docs or blog content reference this repository or Nova itself as its subject matter — each demo's content is an in-universe fictional product used to exercise the preset, not documentation about this repository.

## Project-Specific Patterns

### Architecture

```
nova.config.json (identity, workspaces, recipes)
  |
  v
npm workspaces (apps/*, packages/*) -- orchestrated by Turborepo (turbo.json)
  |
  +-- apps/demo-<preset>/  (6x, identical structure)
  |     Docusaurus site -> @cbnventures/docusaurus-preset-nova (preset: '<preset>')
  |     -> preset blocks (Hero, Features, Stats, Spotlight, ...) + docs/blog/i18n content
  |
  +-- packages/demos-testkit/
        Discovers every apps/demo-* at test time -> asserts structural/preset/block/locale parity
```

The root is a plain npm-workspaces monorepo (`apps/*`, `packages/*`) with Turborepo driving the shared task graph. Each demo app is an independent Docusaurus 3 site that installs `@cbnventures/docusaurus-preset-nova` and selects exactly one preset. `demos-testkit` is the only workspace that reaches across app boundaries — it never ships its own site, it only reads the other six.

### Data Flow

1. **Configuration** — `nova.config.json` defines the project, its six template workspaces, environment prefixes, and generator recipes. Module: `nova.config.json` (read by the `nova` CLI, not by the sites themselves).
2. **Site configuration** — Each demo's `docusaurus.config.ts` selects a preset (envoy, foundry, lantern, marshal, sentinel, or signal) and wires plugins (docs, blog, pages, sitemap), theme config (navbar, footer, announcement bar, error pages), and content directories (`docs/`, `blog/`, `i18n/`). Module: `apps/demo-*/docusaurus.config.ts`.
3. **Rendering** — Docusaurus resolves docs/blog/pages content through `@cbnventures/docusaurus-preset-nova`, which supplies the theme components and blocks (Hero, Features, Stats, Spotlight, Terminology, Typewriter, and more) used in `src/pages/index.tsx` and `src/pages/showcase.tsx`.
4. **Cross-demo verification** — `demos-testkit` reads every demo's installed preset (`src/lib/preset.ts`) and every demo's file tree (`src/lib/demos.ts`), then asserts structure parity, preset/block/prop coverage, and locale coverage across all six demos. Module: `packages/demos-testkit/src/tests/*.test.ts`.
5. **Orchestration** — Turborepo runs `dev` / `build` / `check` / `deploy` / `clean` across every workspace per the task graph in `turbo.json`, caching `build` and `check` outputs keyed on workspace inputs.

### Error Strategy

| Layer                  | Strategy                                                                                                    |
|--------------------------|------------------------------------------------------------------------------------------------------------|
| Docusaurus site build     | `onBrokenLinks`, `onBrokenAnchors`, and `onDuplicateRoutes` are all `'throw'` in `docusaurus.config.ts` — the build fails hard rather than shipping broken links |
| Markdown links            | `onBrokenMarkdownLinks: 'warn'`, `onBrokenMarkdownImages: 'throw'`                                          |
| Type checking             | `nova utility type-check` per tsconfig project (app, tests, config, scripts) — a non-zero exit fails `check` |
| Self-check tests          | Shared suites from `@cbnventures/nova/rules/vitest` (frontmatter, link, terminology, type-declarations) run per demo via Vitest; failures fail `check:test` |
| Cross-demo tests          | `demos-testkit` asserts equality between demos' structures and preset surfaces (`node:assert/strict`); any mismatch fails the suite with a diff-style message |
| Turborepo tasks           | Non-persistent tasks (`build`, `check`, `deploy`, `clean`) propagate non-zero exit codes; `check` and `deploy` both depend on `check` and `build` completing first |

## Documentation Site

### Framework

- **Framework:** Docusaurus 3.10.0, via `@cbnventures/docusaurus-preset-nova` 0.21.0
- **Source directory:** Each demo is its own site — `apps/demo-envoy/`, `apps/demo-foundry/`, `apps/demo-lantern/`, `apps/demo-marshal/`, `apps/demo-sentinel/`, `apps/demo-signal/`. There is no single shared `docs/` directory; this entire repository is the set of documentation sites.
- **Build output:** `apps/demo-*/build/`

### Site Structure

`demo-envoy` shown as representative; all six demos share this layout:

```
apps/demo-envoy/
├── docusaurus.config.ts           — Site configuration, preset selection, theme config
├── sidebars.ts                    — Sidebar navigation structure
├── versions.json                  — Declared doc versions (current, 1.0.0)
├── docs/
│   ├── overview.mdx                — Docs landing page
│   ├── setup/                      — configuration.mdx, installation.mdx, your-first-relay.mdx
│   ├── core/                       — authentication.mdx, protocol-translation.mdx, routing-dispatch.mdx
│   ├── advanced/                   — architecture.mdx, integrations.mdx
│   ├── operations/                 — monitoring-relays.mdx, scaling-relays.mdx
│   ├── reference/                  — api-reference.mdx
│   ├── theme-showcase.mdx          — Living style guide for every theme component
│   ├── bare-sample.mdx             — Embed-mode (?docusaurus-data-bare=true) demonstration
│   ├── draft-sample.mdx            — draft: true demonstration
│   └── unlisted-sample.mdx         — unlisted: true demonstration
├── versioned_docs/version-1.0.0/   — Snapshot of docs/theme-showcase.mdx under the 1.0.0 version
├── versioned_sidebars/             — version-1.0.0-sidebars.json
├── blog/                           — Dated .mdx posts + authors.yml
├── i18n/<locale>/                  — 36 locales, each with code.json (UI strings); ar and zh-Hans additionally carry translated docs/blog/pages content
└── static/                         — Favicons, manifest, images/logo.svg, thumbnails/brand.png
```

### Commands

| Command                                    | What it does                                                                 |
|----------------------------------------------|---------------------------------------------------------------------------------|
| `npm run dev --workspace=demo-envoy`         | Start one demo's Docusaurus dev server (portless-assigned port) with hot reload |
| `npm run build --workspace=demo-envoy`       | Build one demo's static site to `apps/demo-envoy/build/`                       |
| `npm run prod --workspace=demo-envoy`        | Serve one demo's production build locally                                     |
| `npm run i18n --workspace=demo-envoy`        | Sync i18n JSON files for one demo (`theme-nova i18n sync`)                     |
| `npm run i18n:check --workspace=demo-envoy`  | Check i18n completeness (`theme-nova i18n check`)                              |
| `npm run dev`                                | Start all six demos' dev servers in parallel (`turbo run dev`)                 |

## Publishing and Deployment

### Release Process

1. All changes committed, `git status --short` is clean.
2. Run `npm run check` (turbo `check` across every workspace, root ESLint, and Nova type-check on the config/scripts projects).
3. Run `npm run build` (or `npm run deploy`, which is `check` followed by `build`) to produce a production build for every demo under `apps/demo-*/build/`.
4. Run `npm run recipes` if `nova.config.json` changed, so generated files (`README.md`, `LICENSE`, per-workspace `package.json` normalization) stay in sync.
5. Run `npm run changelog` to record changelog entries via Nova's changelog utility.

No `CHANGELOG.md` exists yet — every workspace is still pinned at version `0.0.0`, and no GitHub Actions workflow publishes or deploys a demo automatically. `npm run deploy` only checks and builds; it does not push a build anywhere.

### CI/CD Workflows

| Workflow file                                          | Trigger                                              | What it does                                                                 |
|-----------------------------------------------------------|---------------------------------------------------------|-----------------------------------------------------------------------------------|
| `nova-check-sponsor-gated-issues-sponsor-check.yml`       | `issue_comment` (created/edited), `issues` (opened/closed) | Gates support issues behind GitHub Sponsors status via `mrjackyliang/sponsor-gated-support` |
| `nova-lock-inactive-issues-lock-inactive.yml`             | Weekly cron (Sunday 00:00 UTC) + manual dispatch          | Locks issues and pull requests inactive for more than 30 days via `mrjackyliang/lock-inactive-threads` |

Both workflows are issue-management only. There is no build, publish, or deploy workflow in this repository.

### Environments

Each demo declares its own production URL in `docusaurus.config.ts` (all currently set `noIndex: true`, so none are meant to be indexed by search engines):

| Environment    | URL                                          | Purpose                          |
|-----------------|-----------------------------------------------|--------------------------------------|
| demo-envoy      | https://envoy-demo.nova.cbnventures.io        | Envoy preset reference build         |
| demo-foundry    | https://foundry-demo.nova.cbnventures.io      | Foundry preset reference build       |
| demo-lantern    | https://lantern-demo.nova.cbnventures.io      | Lantern preset reference build       |
| demo-marshal    | https://marshal-demo.nova.cbnventures.io      | Marshal preset reference build       |
| demo-sentinel   | https://sentinel-demo.nova.cbnventures.io     | Sentinel preset reference build      |
| demo-signal     | https://signal-demo.nova.cbnventures.io       | Signal preset reference build        |
