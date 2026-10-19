# demo-lantern

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
- Translated newly-seeded code.json keys across all 35 non-en locales, fixed half-width CJK parentheses in zh-Hans, and reconciled the i18n tree.

## 2026.8.4

### UPDATED
- Updated @cbnventures/nova to 0.25.2 and @cbnventures/docusaurus-preset-nova to 0.25.2.

## 2026.8.3

### UPDATED
- Bumped @cbnventures/nova and @cbnventures/docusaurus-preset-nova from 0.25.0 to 0.25.1

### FIXED
- Standardized double hyphens to em dashes in the Three modes for three weather patterns blog post description frontmatter

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
- Update i18n navbar translations, add English code.json locale file, expand the showcase page, and fix theme-showcase and landing page content.
- Add SEO frontmatter (description and keywords) to all blog posts and docs, add a new long-form blog post with i18n translations, and refine doc page descriptions.
