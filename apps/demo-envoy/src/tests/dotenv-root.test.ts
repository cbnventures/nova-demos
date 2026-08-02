import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Dotenv Root.
 *
 * Covers the monorepo root .env files from this workspace's vitest runner.
 * The root workspace has no vitest of its own, so demo-envoy hosts the suite.
 *
 * @since UNRELEASED
 */
registerDotenvSuite({
  vitest,
  enable: 'all',
  rootDir: join(dirname(fileURLToPath(import.meta.url)), '../../../../'),
  envPaths: [
    '.env',
    '.env.sample',
  ],
});
