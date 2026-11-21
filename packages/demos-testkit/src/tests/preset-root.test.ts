import {
  strictEqual,
  throws,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import { findPackageRoot } from '../lib/preset.js';

import type {
  Tests_PresetRoot_CreateFakeTree_BuildPackagePath,
  Tests_PresetRoot_CreateFakeTree_EntryPath,
  Tests_PresetRoot_CreateFakeTree_EntrySegments,
  Tests_PresetRoot_CreateFakeTree_LayoutName,
  Tests_PresetRoot_CreateFakeTree_PackageRoot,
  Tests_PresetRoot_CreateFakeTree_ProjectRoot,
  Tests_PresetRoot_CreateFakeTree_Returns,
  Tests_PresetRoot_PackageName,
  Tests_PresetRoot_PresetRoot_EntryPath,
  Tests_PresetRoot_PresetRoot_ExpectedRoot,
  Tests_PresetRoot_PresetRoot_LayoutCases,
  Tests_PresetRoot_PresetRoot_ResolvedRoot,
  Tests_PresetRoot_PresetRoot_ThrowsWithoutNamedManifest_EntryPath,
  Tests_PresetRoot_TempRoot,
} from '../types/tests/preset-root.test.d.ts';

const packageName: Tests_PresetRoot_PackageName = '@cbnventures/docusaurus-preset-nova';

const tempRoot: Tests_PresetRoot_TempRoot = await mkdtemp(join(tmpdir(), 'nova-demos-testkit-preset-root-'));

/**
 * Tests - Preset Root - Create Fake Tree.
 *
 * Builds a fake project with the preset installed under node_modules and returns
 * the entry path. The build folder carries a nameless package.json, as published
 * releases do, so the walk must skip it and stop at the named manifest.
 *
 * @param {Tests_PresetRoot_CreateFakeTree_LayoutName}    layoutName    - Layout name.
 * @param {Tests_PresetRoot_CreateFakeTree_EntrySegments} entrySegments - Entry segments.
 *
 * @returns {Tests_PresetRoot_CreateFakeTree_Returns}
 *
 * @since 2026.11.1
 */
async function createFakeTree(layoutName: Tests_PresetRoot_CreateFakeTree_LayoutName, entrySegments: Tests_PresetRoot_CreateFakeTree_EntrySegments): Tests_PresetRoot_CreateFakeTree_Returns {
  const projectRoot: Tests_PresetRoot_CreateFakeTree_ProjectRoot = join(tempRoot, layoutName);
  const packageRoot: Tests_PresetRoot_CreateFakeTree_PackageRoot = join(projectRoot, 'node_modules', '@cbnventures', 'docusaurus-preset-nova');
  const entryPath: Tests_PresetRoot_CreateFakeTree_EntryPath = join(packageRoot, ...entrySegments);
  const buildPackagePath: Tests_PresetRoot_CreateFakeTree_BuildPackagePath = join(packageRoot, 'build', 'package.json');

  await mkdir(dirname(entryPath), { recursive: true });

  await writeFile(join(projectRoot, 'package.json'), JSON.stringify({ name: 'fake-project' }), 'utf-8');
  await writeFile(join(packageRoot, 'package.json'), JSON.stringify({ name: packageName }), 'utf-8');
  await writeFile(buildPackagePath, JSON.stringify({ type: 'module' }), 'utf-8');
  await writeFile(entryPath, 'export default {};\n', 'utf-8');

  return entryPath;
}

/**
 * Tests - Preset Root - Preset Root.
 *
 * Locks package-root discovery for both preset build layouts so a change in the
 * preset's rootDir never sends the testkit to the wrong folder.
 *
 * @since 2026.11.1
 */
describe('preset root', () => {
  const layoutCases: Tests_PresetRoot_PresetRoot_LayoutCases = [
    {
      layoutName: 'build-src',
      entrySegments: [
        'build',
        'src',
        'preset.js',
      ],
    },
    {
      layoutName: 'build',
      entrySegments: [
        'build',
        'preset.js',
      ],
    },
  ];

  afterAll(async () => {
    await rm(tempRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  for (const layoutCase of layoutCases) {
    it(`finds the package root from a '${layoutCase['layoutName']}' entry`, async () => {
      const entryPath: Tests_PresetRoot_PresetRoot_EntryPath = await createFakeTree(layoutCase['layoutName'], layoutCase['entrySegments']);
      const expectedRoot: Tests_PresetRoot_PresetRoot_ExpectedRoot = join(tempRoot, layoutCase['layoutName'], 'node_modules', '@cbnventures', 'docusaurus-preset-nova');
      const resolvedRoot: Tests_PresetRoot_PresetRoot_ResolvedRoot = findPackageRoot(entryPath, packageName);

      strictEqual(resolvedRoot, expectedRoot);

      return;
    });
  }

  it('throws without named manifest', () => {
    const entryPath: Tests_PresetRoot_PresetRoot_ThrowsWithoutNamedManifest_EntryPath = join(tempRoot, 'preset.js');

    throws(() => findPackageRoot(entryPath, 'fake-missing-package'));

    return;
  });

  return;
});
