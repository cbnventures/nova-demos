import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Dotenv.
 *
 * This site self-checks its dotenv quote convention THROUGH the published kit. The
 * double-quote rule lives in @cbnventures/nova/rules/vitest; this wrapper supplies the
 * configuration that points at this site's own .env files.
 *
 * @since UNRELEASED
 */
registerDotenvSuite({
  vitest,
  enable: 'all',
  rootDir: join(dirname(fileURLToPath(import.meta.url)), '../../'),
  envPaths: [
    '.env',
    '.env.sample',
  ],
});
