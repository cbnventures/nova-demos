import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Dotenv.
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
