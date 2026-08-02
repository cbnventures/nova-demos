# VISION.md

## Purpose

### Problem Statement

Nova ships six distinct Docusaurus presets — envoy, foundry, lantern, marshal, sentinel, and signal — each with its own color system, navbar and footer defaults, and block composition. A screenshot or a paragraph of prose cannot show how a preset actually behaves: how its navbar collapses on mobile, how its blog sidebar groups by year, how its error pages read, or how its blocks look with real paragraphs instead of lorem ipsum. Anyone choosing a preset for their own site, and anyone building the presets themselves, needs a live, fully wired site per preset to click through and compare — not a component gallery and not a static mockup.

### Target Audience

- **Preset evaluators** — Developers picking a Nova preset for their own Docusaurus site who want to see the full experience (navbar, footer, blog, versioned docs, search, dark mode) before committing to one.
- **Nova maintainers** — Contributors building or changing `@cbnventures/docusaurus-preset-nova` who need real, fully wired sites to verify changes against, not just unit tests and isolated component stories.
- **Prospective adopters** — Teams evaluating Nova as a documentation toolkit who want to browse production-realistic sites rather than take a feature list at its word.

### Value Proposition

Nova Demos is six standalone Docusaurus sites, one per Nova preset, each populated with its own fictional product, full docs set, blog, versioned docs, 36-locale i18n bundle, and block showcase page. We built every demo to the same structural pattern, so the only thing that changes between them is the preset — which makes side-by-side comparison meaningful instead of apples-to-oranges. A shared test package enforces that structural parity automatically, so the demos cannot silently drift apart as the presets evolve.

## Marketing Copy

### Tagline

Six Nova presets, six fully wired Docusaurus sites, compared side by side.

### Elevator Pitch

Nova Demos is a collection of six standalone Docusaurus sites, one for each visual preset in the Nova family: Envoy, Foundry, Lantern, Marshal, Sentinel, and Signal. Every demo is a fully wired reference build — its own docs, blog, versioned docs, 36-locale i18n, search, and a block showcase page — themed around a distinct fictional product, so each preset is exercised against realistic content instead of placeholder text. Preset evaluators, Nova contributors, and prospective adopters can run any demo locally, or compare all six side by side, to see exactly how a preset behaves before adopting it. We enforce structural parity across all six with a shared test package, so what differs between demos is the preset itself and nothing else.

### Key Features

- **One site per preset** — Six parallel Docusaurus apps (`demo-envoy`, `demo-foundry`, `demo-lantern`, `demo-marshal`, `demo-sentinel`, `demo-signal`), each running a different Nova preset with otherwise identical wiring.
- **Realistic, in-universe content** — Each demo is themed around its own fictional product — a protocol relay, a workspace compiler, a home monitoring toolkit, a repository governance system, a zero-trust access engine, and a link attribution engine — so every preset is exercised with real docs depth and blog cadence, not lorem ipsum.
- **Full block showcase** — Every demo ships a `/showcase/` route rendering every block from `@cbnventures/docusaurus-preset-nova` with demo-specific sample data, side by side.
- **Complete feature surface per demo** — Versioned docs, 36-locale i18n, search, dark mode, blog with RSS/Atom feeds, sitemap, an announcement bar, and custom error pages are wired into every single demo, not just one flagship site.
- **Machine-enforced parity** — A shared `demos-testkit` workspace runs cross-demo tests for structure, preset coverage, block coverage, locale coverage, and prop coverage, so no demo can quietly fall out of sync with the others.

### Differentiators

| This project                                                                                          | Alternatives                                                                                |
|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| Six fully wired sites, one per preset, sharing an identical structure                                 | A single demo with a theme switcher, which cannot show navbar, footer, or block layout differences that are structural rather than color-based |
| Realistic fictional products per demo (relay engine, compiler, home monitor, governance system, trust engine, attribution engine) | Lorem-ipsum or placeholder content that never stress-tests typography, block density, or navigation depth |
| Machine-enforced parity via `demos-testkit` (structure, preset, block, locale, and prop coverage tests) | Manually maintained demo sites that drift from each other silently over time |
| Deployed as independent reference builds anyone can browse or run locally                              | Static screenshots or a component storybook that cannot show real routing, search, or versioned-docs behavior |

## Glossary

| Term              | Definition                                                                                                                                                                                        |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Demo              | One of the six standalone Docusaurus sites under `apps/` (demo-envoy, demo-foundry, demo-lantern, demo-marshal, demo-sentinel, demo-signal), each showcasing one Nova preset with its own fictional product, docs, and blog. |
| Preset            | A named visual identity shipped by `@cbnventures/docusaurus-preset-nova` — envoy, foundry, lantern, marshal, sentinel, or signal — covering colors, fonts, navbar/footer defaults, and block styling. Each demo wires exactly one preset via the `preset` field in its `docusaurus.config.ts`. |
| Block             | A themed React component exported by `@cbnventures/docusaurus-preset-nova/blocks` (Hero, Features, Stats, Spotlight, Terminology, Typewriter, InstallStrip, BlogPreview, AppMarketDownload, and others) used to compose a demo's homepage and showcase page. |
| Showcase page     | The `/showcase/` route in every demo, rendering every block from the installed preset with demo-specific sample data so each block can be inspected side by side.                              |
| Reference build   | A demo considered as a complete, realistic site — not a snippet or a screenshot — meant to be browsed live or run locally to evaluate a preset.                                                |
| demos-testkit     | The `packages/demos-testkit` workspace: a shared test suite that discovers every demo at runtime and asserts they remain structurally and preset-API identical. Not a registered Nova workspace. |
| Structure parity  | The property, enforced by `demos-testkit`, that every demo has the same docs categories, blog file count, pages, and versioned-docs layout — only the preset and its content differ.            |
| Bare mode         | A `docusaurus-preset-nova` feature that strips all site chrome (navbar, footer, sidebar, and more) when `?docusaurus-data-bare=true` is appended to a URL, for embedding a page in another surface. Demonstrated on each demo's `docs/bare-sample.mdx`. |
| Fictional product | The in-universe subject matter each demo is themed around (for example, Envoy's protocol relay or Signal's link-attribution engine) — realistic content written to stress-test a preset, not documentation about this repository or Nova itself. |
