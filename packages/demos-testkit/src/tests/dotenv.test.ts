import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Dotenv.
 *
 * @since 2026.8.0
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
