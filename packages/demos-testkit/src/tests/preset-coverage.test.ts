import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  discoverDemoNames,
  loadDemoConfig,
  resolveLeaf,
} from '../lib/demos.js';
import { readThemeConfigLeafPaths } from '../lib/preset.js';

import type {
  Tests_PresetCoverage_ConfigByDemo,
  Tests_PresetCoverage_DemoNames,
  Tests_PresetCoverage_LeafPaths,
  Tests_PresetCoverage_PresetCoverage_Config,
  Tests_PresetCoverage_PresetCoverage_LeafPath,
  Tests_PresetCoverage_PresetCoverage_Message,
  Tests_PresetCoverage_PresetCoverage_MissAt,
  Tests_PresetCoverage_PresetCoverage_Misses,
} from '../types/tests/preset-coverage.test.d.ts';

const demoNames: Tests_PresetCoverage_DemoNames = await discoverDemoNames();
const leafPaths: Tests_PresetCoverage_LeafPaths = await readThemeConfigLeafPaths();
const configByDemo: Tests_PresetCoverage_ConfigByDemo = new Map();

for (const demoName of demoNames) {
  configByDemo.set(demoName, await loadDemoConfig(demoName));
}

/**
 * Tests - Preset Coverage - Preset Coverage.
 *
 * Every consumer-facing leaf of NovaThemeConfig must be set by every demo. The
 * catalogue is walked out of the preset's shipped nova-config.d.ts, so a new
 * config field becomes a demo obligation with no registry to hand-maintain.
 *
 * @since UNRELEASED
 */
describe('preset coverage', () => {
  it('derived a non-empty leaf catalogue from the installed preset', () => {
    strictEqual(leafPaths.length > 0, true, 'No NovaThemeConfig leaf paths were derived from nova-config.d.ts.');

    return;
  });

  for (const demoName of demoNames) {
    it(`'${demoName}' sets every NovaThemeConfig leaf`, () => {
      const config: Tests_PresetCoverage_PresetCoverage_Config = configByDemo.get(demoName);
      const misses: Tests_PresetCoverage_PresetCoverage_Misses = [];

      for (const leafPath of leafPaths) {
        const currentLeafPath: Tests_PresetCoverage_PresetCoverage_LeafPath = leafPath;
        const missAt: Tests_PresetCoverage_PresetCoverage_MissAt = resolveLeaf(config, currentLeafPath);

        if (missAt !== null) {
          misses.push(`  - ${currentLeafPath} (missing at: ${missAt})`);
        }
      }

      const message: Tests_PresetCoverage_PresetCoverage_Message = [
        `'${demoName}' leaves ${misses.length} of ${leafPaths.length} NovaThemeConfig leaves unset:`,
        ...misses,
      ].join('\n');

      strictEqual(misses.length, 0, message);

      return;
    });
  }

  return;
});
