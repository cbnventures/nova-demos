import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { discoverDemoNames, readShowcaseSource } from '../lib/demos.js';
import { readBlockNames } from '../lib/preset.js';

import type {
  Tests_BlockCoverage_BlockCoverage_BlockName,
  Tests_BlockCoverage_BlockCoverage_Message,
  Tests_BlockCoverage_BlockCoverage_Missing,
  Tests_BlockCoverage_BlockCoverage_Source,
  Tests_BlockCoverage_BlockNames,
  Tests_BlockCoverage_DemoNames,
  Tests_BlockCoverage_SourceByDemo,
} from '../types/tests/block-coverage.test.d.ts';

const demoNames: Tests_BlockCoverage_DemoNames = await discoverDemoNames();
const blockNames: Tests_BlockCoverage_BlockNames = await readBlockNames();
const sourceByDemo: Tests_BlockCoverage_SourceByDemo = new Map();

for (const demoName of demoNames) {
  sourceByDemo.set(demoName, await readShowcaseSource(demoName));
}

/**
 * Tests - Block Coverage - Block Coverage.
 *
 * Every block the preset publicly exports is a showcase obligation. The block
 * roster is read from the installed preset's blocks barrel rather than
 * hardcoded, so publishing a new block turns every demo red until it is shown.
 *
 * @since UNRELEASED
 */
describe('block coverage', () => {
  it('preset exports at least one block', () => {
    strictEqual(blockNames.length > 0, true, 'No blocks were discovered in the installed preset.');

    return;
  });

  it('every demo was discovered with readable showcase source', () => {
    strictEqual(demoNames.length > 0, true, 'No demo applications were discovered under apps.');

    return;
  });

  for (const demoName of demoNames) {
    it(`'${demoName}' demonstrates every block the preset exports`, () => {
      const source: Tests_BlockCoverage_BlockCoverage_Source = sourceByDemo.get(demoName) ?? '';
      const missing: Tests_BlockCoverage_BlockCoverage_Missing = [];

      for (const blockName of blockNames) {
        const currentBlockName: Tests_BlockCoverage_BlockCoverage_BlockName = blockName;

        if (source.includes(`<${currentBlockName}`) === false) {
          missing.push(`  - ${currentBlockName}`);
        }
      }

      const message: Tests_BlockCoverage_BlockCoverage_Message = [
        `'${demoName}' never renders ${missing.length} of ${blockNames.length} exported blocks:`,
        ...missing,
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });
  }

  return;
});
