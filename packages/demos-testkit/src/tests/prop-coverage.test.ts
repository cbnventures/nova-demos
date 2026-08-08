import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  discoverDemoNames,
  extractBlockUsageText,
  readShowcaseSource,
} from '../lib/demos.js';
import {
  readBlockNames,
  readBlockPropSurface,
  readBlockVariantValues,
} from '../lib/preset.js';

import type {
  Tests_PropCoverage_BlockNames,
  Tests_PropCoverage_DemoNames,
  Tests_PropCoverage_Descriptors,
  Tests_PropCoverage_PropCoverage_CurrentPropName,
  Tests_PropCoverage_PropCoverage_CurrentSharedPropName,
  Tests_PropCoverage_PropCoverage_CurrentSurface,
  Tests_PropCoverage_PropCoverage_CurrentVariantValue,
  Tests_PropCoverage_PropCoverage_DerivedAtLeastOneVariantValueAcrossTheBlockSurface_TotalPoints,
  Tests_PropCoverage_PropCoverage_Message,
  Tests_PropCoverage_PropCoverage_Missing,
  Tests_PropCoverage_PropCoverage_ScopedSource,
  Tests_PropCoverage_PropCoverage_Source,
  Tests_PropCoverage_PropNames,
  Tests_PropCoverage_SharedPropNames,
  Tests_PropCoverage_SourceByDemo,
  Tests_PropCoverage_Surfaces,
} from '../types/tests/prop-coverage.test.d.ts';

const demoNames: Tests_PropCoverage_DemoNames = await discoverDemoNames();
const blockNames: Tests_PropCoverage_BlockNames = await readBlockNames();
const surfaces: Tests_PropCoverage_Surfaces = [];
const sourceByDemo: Tests_PropCoverage_SourceByDemo = new Map();

for (const blockName of blockNames) {
  const descriptors: Tests_PropCoverage_Descriptors = await readBlockPropSurface(blockName);
  const propNames: Tests_PropCoverage_PropNames = descriptors.filter((descriptor) => descriptor['shared'] === false).map((descriptor) => descriptor['name']);
  const sharedPropNames: Tests_PropCoverage_SharedPropNames = descriptors.filter((descriptor) => descriptor['shared'] === true).map((descriptor) => descriptor['name']);

  surfaces.push({
    name: blockName,
    props: propNames,
    sharedProps: sharedPropNames,
    variants: await readBlockVariantValues(blockName),
  });
}

for (const demoName of demoNames) {
  sourceByDemo.set(demoName, await readShowcaseSource(demoName));
}

/**
 * Tests - Prop Coverage - Prop Coverage.
 *
 * Showcasing a block is not the same as showcasing what it can do. Every prop and
 * every string-literal variant value must be exercised in each demo, with props
 * matched inside their own block's tags so one block cannot mask another.
 *
 * @since UNRELEASED
 */
describe('prop coverage', () => {
  it('derived a prop surface for every exported block', () => {
    strictEqual(surfaces.length, blockNames.length, 'Prop surface derivation missed at least one block.');

    return;
  });

  it('derived at least one variant value across the block surface', () => {
    const totalPoints: Tests_PropCoverage_PropCoverage_DerivedAtLeastOneVariantValueAcrossTheBlockSurface_TotalPoints = surfaces.reduce((count, surface) => count + surface['variants'].length, 0);

    strictEqual(totalPoints > 0, true, 'No string-literal variant values were derived from the preset.');

    return;
  });

  for (const demoName of demoNames) {
    for (const surface of surfaces) {
      const currentSurface: Tests_PropCoverage_PropCoverage_CurrentSurface = surface;

      it(`'${demoName}' exercises every prop and variant of <${currentSurface['name']}>`, () => {
        const source: Tests_PropCoverage_PropCoverage_Source = sourceByDemo.get(demoName) ?? '';
        const scopedSource: Tests_PropCoverage_PropCoverage_ScopedSource = extractBlockUsageText(source, currentSurface['name']);
        const missing: Tests_PropCoverage_PropCoverage_Missing = [];

        for (const propName of currentSurface['props']) {
          const currentPropName: Tests_PropCoverage_PropCoverage_CurrentPropName = propName;

          if (
            scopedSource.includes(`${currentPropName}=`) === false
            && scopedSource.includes(`${currentPropName}:`) === false
          ) {
            missing.push(`  - prop '${currentPropName}' is never set`);
          }
        }

        for (const sharedPropName of currentSurface['sharedProps']) {
          const currentSharedPropName: Tests_PropCoverage_PropCoverage_CurrentSharedPropName = sharedPropName;

          if (source.includes(`${currentSharedPropName}=`) === false) {
            missing.push(`  - shared prop '${currentSharedPropName}' is never set anywhere in the demo`);
          }
        }

        for (const variantValue of currentSurface['variants']) {
          const currentVariantValue: Tests_PropCoverage_PropCoverage_CurrentVariantValue = variantValue;

          if (scopedSource.includes(`'${currentVariantValue}'`) === false && scopedSource.includes(`"${currentVariantValue}"`) === false) {
            missing.push(`  - variant value '${currentVariantValue}' is never shown`);
          }
        }

        const message: Tests_PropCoverage_PropCoverage_Message = [
          `'${demoName}' leaves ${missing.length} capability point(s) of <${currentSurface['name']}> unshowcased:`,
          ...missing,
        ].join('\n');

        strictEqual(missing.length, 0, message);

        return;
      });
    }
  }

  return;
});
