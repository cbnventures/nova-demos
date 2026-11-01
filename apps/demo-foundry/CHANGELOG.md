# demo-foundry

## 2026.10.6

### UPDATED
- Refreshed the site's app icons, favicons, social preview images, and dedicated navbar artwork.
- Standardized production previews and builds around the workspace's `build/` output and assembled artifacts.

### FIXED
- Prevented locale build modes from forwarding Docusaurus-only options to the repository website.

## 2026.10.5

### UPDATED
- Aligned workspace tooling and project guidance with current Nova defaults.
- Updated Nova and Docusaurus Preset Nova to 0.36.0.
- Adopted the Docusaurus application TypeScript role.

### FIXED
- Removed redundant application transpilation from production builds.
- Normalized Docusaurus title delimiters for preset-managed pages.

## 2026.10.4

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.33.0.
- Replaced Turborepo orchestration with Nova's native workspace runner.
- Migrated generated ignore-file settings to the configurable ignoreFiles contract.
- Updated ESLint configuration to load the Nova custom-rule preset from its dedicated preset entry point.

### FIXED
- Preserved locale-mode argument forwarding while migrating the build planner to Nova's workspace runner.
- Added the required JSX return documentation to demo landing and showcase pages.

## 2026.10.3

### ADDED
- Added dynamic complete, representative, and locale-targeted builds with calculated cost notices.

## 2026.10.2

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.30.1.
- Adopted role-based TypeScript preset layers.
- Standardized root-owned tests under the shared project layout.
- Regenerated the bug-report template with sentence-aware pronoun capitalization.

## 2026.10.1

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.29.0.
- Replaced repeated Nova ESLint rule wiring with the shared rule bundle while preserving project-specific overrides.
- Completed JavaScript and TypeScript preset layering across the root, demo apps, and testkit.
- Declared the root workspace as ESM and extended type-check coverage to the Vitest configuration and setup file.
- Declared README badge and Node.js bug-report field settings explicitly in Nova configuration.
- Approved the optional `fsevents` install script used on supported platforms.

## 2026.10.0

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.28.0, including the runtime-only Vitest resolution fix.
- Assigned explicit child environments to development, production, build, and deployment script groups.

## 2026.9.2

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.27.3, granting the generated inactive-thread workflow write access to pull requests.

## 2026.9.1

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.27.2.

## 2026.9.0

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.27.0 alongside Docusaurus 3.10.2, React 19.2.8, TypeScript 6.0.3, ESLint 9.39.5, and Vitest 4.1.11, and adopted the shared lifecycle-script structure.

## 2026.8.5

### UPDATED
- Translated newly-seeded code.json keys across all 35 non-en locales and reconciled the i18n tree.

## 2026.8.4

### UPDATED
- Updated @cbnventures/nova to 0.25.2 and @cbnventures/docusaurus-preset-nova to 0.25.2.

## 2026.8.3

### UPDATED
- Bumped @cbnventures/nova and @cbnventures/docusaurus-preset-nova from 0.25.0 to 0.25.1

## 2026.8.2

### UPDATED
- Updated @cbnventures/nova to 0.25.0 and @cbnventures/docusaurus-preset-nova to 0.25.0.

## 2026.8.1

### ADDED
- Terminology glossary page with product-specific definitions linked from doc content via the Terminology component.
- Canvas freeform hero section on the homepage with animated status strip and call-to-action buttons.

### UPDATED
- Upgrade Nova from 0.23.0 to 0.24.0 and Portless from 0.10.1 to 0.15.5.
- Docs and blog content updated to satisfy stricter ESLint rules (explicit return types, JSDoc hierarchy, curly braces, mixed-operator parentheses).
- Dev server now auto-cleans the webpack cache on shutdown.

## 2026.8.0

### UPDATED
- Add SEO frontmatter (description and keywords) to all blog posts and docs, add a new long-form blog post with i18n translations, and refine doc page descriptions.
- Update i18n navbar translations, add English code.json locale file, expand the showcase page, and fix doc content.
