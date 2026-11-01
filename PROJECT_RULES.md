# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** Nova Demos
- **Description:** Live demonstration sites for the Nova Docusaurus preset family, with a repository website that hosts the project identity and routes visitors to Nova documentation.
- **Primary language:** TypeScript
- **Framework / runtime:** Docusaurus via `@cbnventures/docusaurus-preset-nova` for preset demos and Astro for the repository website, orchestrated across npm workspaces with Nova

### Repository URL

- **URL:** https://github.com/cbnventures/nova-demos

## Repository Structure

### Repository Layout

```
nova-demos/
├── .github/                    — GitHub Actions workflows, issue templates, funding links
│   ├── ISSUE_TEMPLATE/         — Bug report, feature request, and support request forms
│   ├── workflows/              — Project publishing and issue-management workflows (Nova-generated)
│   └── FUNDING.yml             — GitHub Sponsors / PayPal funding links
├── apps/                       — Six preset demo sites plus the repository website
│   ├── demo-envoy/
│   ├── demo-foundry/
│   ├── demo-lantern/
│   ├── demo-marshal/
│   ├── demo-sentinel/
│   ├── demo-signal/
│   └── website/                — Astro repository site, logo host, and Nova documentation redirect
├── build/                      — Generated root artifact assemblies (gitignored)
├── conventions/                — Per-language coding convention docs (Nova-generated)
├── packages/                   — Shared workspaces that are not demo sites
│   └── demos-testkit/          — Cross-demo structural, preset, block, and locale parity tests
├── scripts/                    — Repo-level maintenance scripts
│   ├── build.mjs               — Locale planner and artifact-aware build dispatcher
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
└── VISION.md                   — Purpose, marketing copy, and glossary
```

Note: `package-lock.json` is generated locally but is gitignored (not committed); dependency versions are pinned directly in each `package.json` instead.

### Source Structure

This repository has three workspace types: six structurally identical Docusaurus demo apps, one Astro repository website, and one shared test package. `demo-envoy` below is representative of only the six demos.

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
├── static/                            — Favicons, manifest, navbar artwork, OG thumbnail
├── versioned_docs/version-<snapshot>/ — Snapshotted documentation versions
├── versioned_sidebars/                — Sidebars for versioned docs
├── docusaurus.config.ts               — Site config, preset selection, theme config
├── sidebars.ts                        — Docs sidebar structure
├── versions.json                      — Declared doc versions
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.config.json / tsconfig.tests.json
├── eslint.config.mts
├── vitest.config.mts / vitest.setup.ts
└── .env.sample

apps/website/                          — Repository identity and redirect site
├── public/
│   ├── favicon.svg
│   └── images/logo.svg
├── src/
│   ├── i18n/en.json                   — Translation-ready English copy
│   ├── pages/index.astro              — No-index repository landing and documentation redirect
│   └── styles/website.css
├── astro.config.mjs
├── package.json
├── eslint.config.mts
├── tsconfig.astro.json / tsconfig.config.json / tsconfig.tests.json
├── vitest.config.mts
└── .env.sample

packages/demos-testkit/                — Shared cross-demo test harness
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
└── vitest.config.mts / vitest.setup.ts
```

### Key Files

| File                                         | Purpose                                                                      | When to modify                                                                  |
|----------------------------------------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `nova.config.json`                           | Project identity, workspaces, artifacts, workflows, environment, and recipes | Changing project metadata, workspaces, artifact assembly, workflows, or recipes |
| `package.json` (root)                        | npm workspace root manifest and orchestration scripts                        | Adding a workspace glob or changing shared dependencies                         |
| `scripts/build.mjs`                          | Plans locale builds and delegates workspace/artifact selections to Nova      | Changing complete, representative, targeted, or workflow-driven build behavior  |
| `apps/demo-*/docusaurus.config.ts`           | Per-demo site config and Nova preset wiring                                  | Changing which preset a demo showcases, or its metadata/theme config            |
| `apps/demo-*/sidebars.ts`                    | Docs sidebar structure for a demo                                            | Adding or reorganizing docs categories                                          |
| `apps/website/astro.config.mjs`              | Astro repository-site configuration                                          | Changing the repository website build or deployment origin                      |
| `apps/website/src/pages/index.astro`         | No-index repository landing and redirect                                     | Changing the repository identity presentation or documentation destination      |
| `packages/demos-testkit/src/lib/demos.ts`    | Discovers all demo apps and reads their file trees/configs at test time      | Changing how demos are discovered or what demo metadata is read                 |
| `packages/demos-testkit/src/lib/preset.ts`   | Reads block names and theme-config leaf paths from the installed preset      | Changing how preset/block coverage is measured                                  |
| `.github/workflows/nova-publish-project.yml` | Builds, validates, uploads, and deploys the assembled website artifact       | Regenerate through Nova after changing the configured project publish workflow  |
| `scripts/link-nova.mjs`                      | postinstall: links globally npm-linked @cbnventures packages into workspaces | Changing local Nova development linking behavior                                |
| `LICENSE`                                    | MIT license                                                                  | Updating the copyright year (Nova-managed)                                      |

## Build and Tooling

### Prerequisites

| Tool     | Version                   | Purpose                                            |
|----------|---------------------------|----------------------------------------------------|
| Node.js  | See root `engines`        | Runtime for every workspace                        |
| npm      | See root `packageManager` | Package manager and workspace orchestration        |
| Nova CLI | See root dependency pin   | Project tooling and native workspace orchestration |

### Commands

Root commands, from the top-level `package.json`:

| Command                              | What it does                                                                                                            |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `npm install`                        | Install all workspace dependencies; postinstall links global @cbnventures packages if present                           |
| `npm run dev`                        | Start the configured development servers for all application workspaces through Nova                                    |
| `npm run prod`                       | Check and build, then serve the configured production applications through Nova                                         |
| `npm run build`                      | Build every configured demo locale after a dynamic cost summary, then build and assemble the repository website         |
| `npm run build -- --complete`        | Build every configured locale immediately, without the safety countdown                                                 |
| `npm run build -- --representative`  | Auto-select English plus meaningful RTL and CJK coverage for each preset                                                |
| `npm run build -- --locale <locale>` | Build one or more explicitly requested locales; repeat `--locale` for additional values                                 |
| `npm run check`                      | Check workspaces with concurrency 2, then run root ESLint, Nova type-checks, and Vitest                                 |
| `npm run deploy`                     | Run configured workspace deployment lifecycles; GitHub Actions owns repository website publication                      |
| `npm run clean`                      | Remove workspace build output, generated caches, and root artifact assemblies through Nova                              |
| `npm run changelog`                  | `nova utility changelog` — record or release changelog entries                                                          |
| `npm run recipes`                    | `nova utility run-recipes --replace-file` — refresh Nova-managed files and recipes, including Markdown table formatting |

The complete-build notice is calculated from the demos and locales currently configured in the repository; no preset or locale count is hardcoded. Representative mode always selects an English baseline, then the most complete configured RTL and CJK translations when those categories exist. It never substitutes an unrelated locale merely to reach three builds.

Every demo app exposes the same script structure (with demo-specific portless names). Target one directly with `npm run <script> --workspace=demo-envoy` or `nova utility run-workspaces <script> --workspace demo-envoy`:

| Command                                                               | What it does                                                     |
|-----------------------------------------------------------------------|------------------------------------------------------------------|
| `dev` / `dev:start`                                                   | `portless`-assigned port 3000, `docusaurus start --host 0.0.0.0` |
| `prod` / `prod:serve`                                                 | `portless`-assigned port 3000, `docusaurus serve --host 0.0.0.0` |
| `build` / `build:build`                                               | Select locales, then run `docusaurus build`                      |
| `i18n` / `i18n:sync` / `i18n:check` / `i18n:coverage`                 | Nova script dispatcher runs `theme-nova i18n` commands           |
| `check:lint` / `check:types-app` / `check:types-tests` / `check:test` | ESLint, Nova type-check (app and tests projects), `vitest run`   |
| `clean:build` / `clean:clear`                                         | Remove `./build`, then `docusaurus clear`                        |

`packages/demos-testkit` exposes only `check` and its `check:*` sub-scripts (lint, type-check for tests and config projects, and `vitest run`) — it has no `dev`, `build`, `prod`, or `deploy` script, since it ships no site of its own.

`apps/website` exposes Astro `dev`, `prod`, `check`, `build`, and `clean` lifecycles. Its workspace build remains independent at `apps/website/build/`; Nova assembles that output into `build/website/` for publication.

### Environment Variables

The root, each application workspace, and `packages/demos-testkit` define the same base variables in `.env.sample`:

| Variable    | Required | Purpose                                                                                     |
|-------------|----------|---------------------------------------------------------------------------------------------|
| `NODE_ENV`  | No       | `development` \| `production` \| `test` (default: `development`)                            |
| `LOG_LEVEL` | No       | `debug` \| `info` \| `warn` \| `error` \| `auto` (default: `auto`, derived from `NODE_ENV`) |
| `LOG_TIME`  | No       | `true` \| `false` (default: `false`)                                                        |

Beyond those base variables, `nova.config.json` assigns one environment-variable prefix per workspace and per workflow:

| Prefix      | Scope                                                                                    |
|-------------|------------------------------------------------------------------------------------------|
| `PROJECT_`  | Project-wide variables (`environment.project.prefix`)                                    |
| `ROOT_`     | Root workspace (`./`)                                                                    |
| `ENVOY_`    | `apps/demo-envoy`                                                                        |
| `FOUNDRY_`  | `apps/demo-foundry`                                                                      |
| `LANTERN_`  | `apps/demo-lantern`                                                                      |
| `MARSHAL_`  | `apps/demo-marshal`                                                                      |
| `SENTINEL_` | `apps/demo-sentinel`                                                                     |
| `SIGNAL_`   | `apps/demo-signal`                                                                       |
| `TESTKIT_`  | `packages/demos-testkit`                                                                 |
| `WEBSITE_`  | `apps/website`                                                                           |
| `SGS_`      | sponsor-check workflow variables (for example `SGS_ISSUE_LABELS`, `SGS_SPONSOR_MINIMUM`) |

`packages/demos-testkit` uses the `TESTKIT_` prefix from `environment.workspaces`; its generated `.env.sample` keeps the same Nova base variables as the other workspaces.

## Workspace Rules

Per `nova.config.json`, the root is freezable while the six demos, repository website, and shared testkit are private, trackable workspaces:

| Workspace                  | Role     | Policy    |
|----------------------------|----------|-----------|
| `./` (root)                | project  | freezable |
| `./apps/demo-envoy`        | template | trackable |
| `./apps/demo-foundry`      | template | trackable |
| `./apps/demo-lantern`      | template | trackable |
| `./apps/demo-marshal`      | template | trackable |
| `./apps/demo-sentinel`     | template | trackable |
| `./apps/demo-signal`       | template | trackable |
| `./packages/demos-testkit` | tool     | trackable |
| `./apps/website`           | app      | trackable |

### Versioning and Release Model

- The root keeps its freezable sentinel version and does not receive releases.
- Every trackable workspace uses CalVer (`YYYY.MM.MICRO`) and has its own `CHANGELOG.md`.
- `settings.lockStepVersioning` keeps the six demos, website, and testkit on one version. Before a release, Nova requires all eight to start at the same valid CalVer version; a mismatch is an error, not an implicit repair.
- The manual Git tag uses the same unprefixed CalVer value as the released workspaces.

### Naming Conventions

| Entity                      | Convention                               | Example                                         |
|-----------------------------|------------------------------------------|-------------------------------------------------|
| Demo workspace name         | `demo-<preset>`                          | `demo-envoy`, `demo-signal`                     |
| Demo app directory          | `apps/demo-<preset>`                     | `apps/demo-lantern`                             |
| Preset identifier           | Lowercase, matches the demo suffix       | `preset: 'envoy'` in `docusaurus.config.ts`     |
| Docs categories             | kebab-case directory + `_category_.json` | `docs/core/`, `docs/setup/`                     |
| Blog post files             | `YYYY-MM-DD-slug.mdx`                    | `2026-03-08-migrating-from-zapier-webhooks.mdx` |
| Test files                  | Mirror source path + `.test.ts`          | `src/tests/link.test.ts`                        |
| Type declaration files      | Mirror source/test path + `.d.ts`        | `src/types/tests/structure-parity.test.d.ts`    |
| Environment variable prefix | SCREAMING_SNAKE_CASE, one per workspace  | `ENVOY_`, `FOUNDRY_`, `SGS_`                    |

### Do / Don't

**Do:**
- Keep all six demo apps structurally identical — only the preset, its copy, and its content should differ between them. `demos-testkit`'s structure-parity and preset-coverage tests enforce this.
- Route every demo through `@cbnventures/docusaurus-preset-nova`; compose pages from its exported blocks rather than hand-rolling navbar, footer, or block markup.
- Wire any new block or theme-config field into the showcase page (`src/pages/showcase.tsx`) and at least one demo's `docusaurus.config.ts` so `demos-testkit`'s coverage tests can see it.
- Use the shared `@cbnventures/nova/rules/vitest` suites (frontmatter, link, terminology, type-declarations) in each demo's `src/tests/`, rather than writing bespoke equivalents per demo.
- Keep `packages/demos-testkit` agnostic of any single demo — it must discover demos dynamically (`discoverDemoNames`), never hardcode a demo name.

**Don't:**
- Don't add another demo app without also registering it in `nova.config.json`'s `workspaces`, `artifacts`, `environment.workspaces`, and `recipes.package-json` maps — Nova's generators only touch registered workspaces and artifacts.
- Don't edit `CLAUDE.md`, `AGENTS.md`, or `conventions/*.md` directly; they are regenerated by `nova generate must-haves agent-conventions` and local edits are lost on the next run.
- Don't commit `.env` or `package-lock.json`; both are gitignored. Only `.env.sample` is tracked.
- Don't let a demo's docs or blog content reference this repository or Nova itself as its subject matter — each demo's content is an in-universe fictional product used to exercise the preset, not documentation about this repository.

## Architecture and Data

### Architecture

```
nova.config.json (identity, workspaces, recipes)
  |
  v
npm workspaces (apps/*, packages/*) -- orchestrated by Nova
  |
  +-- apps/demo-<preset>/  (6x, identical structure)
  |     Docusaurus site -> @cbnventures/docusaurus-preset-nova (preset: '<preset>')
  |     -> preset blocks (Hero, Features, Stats, Spotlight, ...) + docs/blog/i18n content
  |
  +-- apps/website/
  |     Astro repository site -> apps/website/build/
  |     -> Nova artifact assembly -> build/website/ -> Cloudflare Pages
  |
  +-- packages/demos-testkit/
        Discovers every apps/demo-* at test time -> asserts structural/preset/block/locale parity
```

The root is a plain npm-workspaces monorepo (`apps/*`, `packages/*`) with Nova driving the shared task graph and root artifact assembly. Each demo app is an independent Docusaurus site that installs `@cbnventures/docusaurus-preset-nova` and selects exactly one preset. The Astro website is independent from the locale planner and exists only as the repository identity, logo host, and Nova documentation redirect. `demos-testkit` is the only workspace that reaches across demo boundaries — it never ships its own site, it only reads the six demos.

### Data Flow and Ownership

1. **Configuration** — `nova.config.json` defines the project, six template workspaces, website, testkit, artifact assemblies, environment prefixes, generated workflows, and recipes. Module: `nova.config.json` (read by the `nova` CLI, not by the sites themselves).
2. **Site configuration** — Each demo's `docusaurus.config.ts` selects a preset (envoy, foundry, lantern, marshal, sentinel, or signal) and wires plugins (docs, blog, pages, sitemap), theme config (navbar, footer, announcement bar, error pages), and content directories (`docs/`, `blog/`, `i18n/`). Module: `apps/demo-*/docusaurus.config.ts`.
3. **Rendering** — Docusaurus resolves docs/blog/pages content through `@cbnventures/docusaurus-preset-nova`, which supplies the theme components and blocks (Hero, Features, Stats, Spotlight, Terminology, Typewriter, and more) used in `src/pages/index.tsx` and `src/pages/showcase.tsx`.
4. **Cross-demo verification** — `demos-testkit` reads every demo's installed preset (`src/lib/preset.ts`) and every demo's file tree (`src/lib/demos.ts`), then asserts structure parity, preset/block/prop coverage, and locale coverage across all six demos. Module: `packages/demos-testkit/src/tests/*.test.ts`.
5. **Orchestration** — Nova runs `dev` / `build` / `check` / `deploy` / `clean` across configured workspaces with dependency-aware lifecycle prerequisites. The root build planner sends locale options only to the six demos and builds the website separately.
6. **Artifact assembly and deployment** — Each workspace owns its local `build/` output. Nova copies only configured sources into root `build/<artifact>/` directories. The generated project publish workflow validates and uploads `build/website/`, then deploys it to Cloudflare Pages.

### Error Strategy

| Layer                 | Strategy                                                                                                                                                                  |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Docusaurus site build | `onBrokenLinks`, `onBrokenAnchors`, and `onDuplicateRoutes` are all `'throw'` in `docusaurus.config.ts` — the build fails hard rather than shipping broken links          |
| Astro website build   | Astro emits the repository site to `apps/website/build/`; a failed check or build stops artifact assembly and publication                                                 |
| Markdown links        | `onBrokenMarkdownLinks: 'warn'`, `onBrokenMarkdownImages: 'throw'`                                                                                                        |
| Type checking         | `nova utility type-check` per tsconfig project (app, tests, config, scripts) — a non-zero exit fails `check`                                                              |
| Self-check tests      | Shared suites from `@cbnventures/nova/rules/vitest` (frontmatter, link, terminology, type-declarations) run per demo via Vitest; failures fail `check:test`               |
| Cross-demo tests      | `demos-testkit` asserts equality between demos' structures and preset surfaces (`node:assert/strict`); any mismatch fails the suite with a diff-style message             |
| Nova workspace tasks  | Non-persistent tasks (`build`, `check`, `deploy`, `clean`) propagate non-zero exit codes; `check` depends on dependency builds, and `deploy` depends on checks and builds |
| Publish workflow      | The generated workflow rejects missing, empty, escaping, recursive, broken, or sensitive artifact contents before upload and Cloudflare deployment                        |

## Project Guardrails

No additional project-specific guardrails are currently documented beyond the workspace rules and shared convention files.

## Testing and Verification

The supported verification commands are documented under Build and Tooling. Changes must pass every check applicable to the affected workspaces and platforms.

## Documentation and Ownership

### Documentation Structure

#### Framework

- **Framework:** Docusaurus via each demo's pinned `@cbnventures/docusaurus-preset-nova` dependency; Astro for the repository website
- **Source directory:** Each demo is its own documentation site under `apps/demo-*/`; `apps/website/` is the separate repository website. There is no shared root `docs/` directory.
- **Workspace build output:** `apps/demo-*/build/` and `apps/website/build/`
- **Assembled build output:** `build/demo-*/` and `build/website/`

#### Site Structure

`demo-envoy` shown as representative; all six demos share this layout:

```
apps/demo-envoy/
├── docusaurus.config.ts           — Site configuration, preset selection, theme config
├── sidebars.ts                    — Sidebar navigation structure
├── versions.json                  — Declared documentation versions
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
├── versioned_docs/version-<snapshot>/ — Versioned documentation snapshots
├── versioned_sidebars/                — Matching versioned sidebar snapshots
├── blog/                           — Dated .mdx posts + authors.yml
├── i18n/<locale>/                  — 36 locales, each with code.json (UI strings); ar and zh-Hans additionally carry translated docs/blog/pages content
└── static/                         — Favicons, manifest, images/navbar.svg, thumbnails/brand.png
```

#### Commands

| Command                                            | What it does                                                                    |
|----------------------------------------------------|---------------------------------------------------------------------------------|
| `npm run dev --workspace=demo-envoy`               | Start one demo's Docusaurus dev server (portless-assigned port) with hot reload |
| `npm run build --workspace=demo-envoy`             | Build one demo's static site to `apps/demo-envoy/build/`                        |
| `npm run prod --workspace=demo-envoy`              | Serve one demo's production build locally                                       |
| `npm run i18n --workspace=demo-envoy`              | Sync i18n JSON files for one demo (`theme-nova i18n sync`)                      |
| `npm run i18n:check --workspace=demo-envoy`        | Check i18n completeness (`theme-nova i18n check`)                               |
| `npm run dev`                                      | Start all six demos and the repository website in parallel through Nova         |
| `npm run dev --workspace=nova-demos-app-website`   | Start the repository website with Astro                                         |
| `npm run build --workspace=nova-demos-app-website` | Build the repository website to `apps/website/build/`                           |

## Publishing and Deployment

### Release Process

1. Record each user-facing change while developing with `npm run changelog -- --record ...`; do not hand-write `.changelog/*.md` entries.
2. Run `npm run recipes` when `nova.config.json` changes, then review every generated diff before keeping it.
3. Run `npm run changelog -- --release --dry-run`. The preview must show one next CalVer version for all eight trackable workspaces and must not report version drift.
4. Run `npm run check` and `npm run build` against the same working copy that will be released.
5. When the batch is final, run `npm run changelog -- --release`. Nova updates all eight workspace versions and changelogs together; the freezable root keeps its sentinel version.
6. Run `npm install` to refresh the local, gitignored `package-lock.json` and installed workspace metadata, then run `npm run check` and `npm run build` again against the released versions.
7. Review the release diff, commit it, and create an annotated tag whose unprefixed name exactly matches the CalVer version. Push the commit and tag only after local verification succeeds.

The generated project publish workflow does not deploy any of the six demo sites. It builds only the repository website closure, validates and uploads the assembled `build/website/` artifact, and deploys that artifact to Cloudflare Pages for a release tag or an explicitly non-dry manual run. Recording entries and running a dry run are safe during development; do not run the non-dry release, commit, tag, push, or publication until the whole batch is intentionally ready.

### CI/CD Workflows

| Workflow file                                       | Trigger                                                    | What it does                                                                                               |
|-----------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `nova-check-sponsor-gated-issues-sponsor-check.yml` | `issue_comment` (created/edited), `issues` (opened/closed) | Gates support issues behind GitHub Sponsors status via `mrjackyliang/sponsor-gated-support`                |
| `nova-lock-inactive-issues-lock-inactive.yml`       | Weekly cron (Sunday 00:00 UTC) + manual dispatch           | Locks issues and pull requests inactive for more than 30 days via `mrjackyliang/lock-inactive-threads`     |
| `nova-publish-project.yml`                          | Unprefixed CalVer tag push + manual dispatch               | Checks and builds the website, validates and uploads `build/website/`, then deploys it to Cloudflare Pages |

The two issue-management workflows do not build or publish project artifacts. `nova-publish-project.yml` is the only build and deployment workflow, and it is scoped to the repository website.

### Environments

Each demo declares its production URL in `docusaurus.config.ts`, and the repository website declares its origin in `astro.config.mjs`. All seven sites currently opt out of search indexing.

| Environment   | URL                                       | Purpose                                                         |
|---------------|-------------------------------------------|-----------------------------------------------------------------|
| demo-envoy    | https://envoy-demo.nova.cbnventures.io    | Envoy preset reference build                                    |
| demo-foundry  | https://foundry-demo.nova.cbnventures.io  | Foundry preset reference build                                  |
| demo-lantern  | https://lantern-demo.nova.cbnventures.io  | Lantern preset reference build                                  |
| demo-marshal  | https://marshal-demo.nova.cbnventures.io  | Marshal preset reference build                                  |
| demo-sentinel | https://sentinel-demo.nova.cbnventures.io | Sentinel preset reference build                                 |
| demo-signal   | https://signal-demo.nova.cbnventures.io   | Signal preset reference build                                   |
| website       | https://nova-demos.cbnventures.io/        | Repository identity, logo host, and Nova documentation redirect |

## Additional Project Rules

No additional project rules are currently documented.
