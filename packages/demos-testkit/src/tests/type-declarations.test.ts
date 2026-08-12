import { registerTypeDeclarationSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Type Declarations.
 *
 * @since 2026.8.0
 */
registerTypeDeclarationSuite({
  vitest,
  enable: 'all',
  typeRoots: ['src'],
});
