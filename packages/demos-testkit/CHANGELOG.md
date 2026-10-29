# nova-demos-tool-testkit

## 2026.10.5

### UPDATED
- Updated Nova and Docusaurus Preset Nova to 0.36.0.
- Aligned workspace tooling and project guidance with current Nova defaults.

### FIXED
- Resolved Docusaurus Preset Nova from the testkit workspace so local links and published installs use the declared dependency.

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

No changes.

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
- Updated Nova and Docusaurus Preset Nova to 0.27.0 alongside TypeScript 6.0.3, ESLint 9.39.5, and Vitest 4.1.11, and standardized the testkit files as `vitest.config.mts` and `vitest.setup.ts`.

## 2026.8.5

No changes.

## 2026.8.4

### UPDATED
- Updated @cbnventures/nova to 0.25.2.

## 2026.8.3

### UPDATED
- Bumped @cbnventures/nova and @cbnventures/docusaurus-preset-nova from 0.25.0 to 0.25.1

## 2026.8.2

### UPDATED
- Updated @cbnventures/nova to 0.25.0 and @cbnventures/docusaurus-preset-nova to 0.25.0.

## 2026.8.1

### UPDATED
- Add index.module.css to expected pages structure parity check

## 2026.8.0

### UPDATED
- Bump Nova to 0.23.0 and rename a duplicate variable for type-declaration convention compliance.

### ADDED
- Generate README and dotenv files, register type-declarations and dotenv meta-suites, and fix 24 pre-existing .d.ts convention violations for full Nova adoption.
