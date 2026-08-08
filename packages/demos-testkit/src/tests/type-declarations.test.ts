import { registerTypeDeclarationSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Type Declarations.
 *
 * @since UNRELEASED
 */
registerTypeDeclarationSuite({
  vitest,
  enable: 'all',
  typeRoots: ['src'],
});
