import { deepStrictEqual, strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, it } from 'vitest';

import { discoverDemoNames, getDemoRoot, listFiles } from '../lib/demos.js';

import type {
  Tests_StructureParity_DemoNames,
  Tests_StructureParity_ExpectedPages,
  Tests_StructureParity_StructureParity_BlogFiles,
  Tests_StructureParity_StructureParity_BlogPosts,
  Tests_StructureParity_StructureParity_Categories,
  Tests_StructureParity_StructureParity_DocFiles,
  Tests_StructureParity_StructureParity_Message,
  Tests_StructureParity_StructureParity_Missing,
  Tests_StructureParity_StructureParity_Pages,
  Tests_StructureParity_StructureParity_UniversalDoc,
  Tests_StructureParity_StructureParity_Versions,
  Tests_StructureParity_StructureParity_VersionsPath,
  Tests_StructureParity_StructureParity_VersionsText,
  Tests_StructureParity_UniversalDocs,
} from '../types/tests/structure-parity.test.d.ts';

const demoNames: Tests_StructureParity_DemoNames = await discoverDemoNames();

/**
 * Tests - Structure Parity - Expected Pages.
 *
 * The three pages every demo ships. index exercises the marketing surface,
 * showcase is the exhaustive block and variant matrix, and manifesto proves an
 * MDX page renders through the preset.
 *
 * @since UNRELEASED
 */
const expectedPages: Tests_StructureParity_ExpectedPages = [
  'index.tsx',
  'manifesto.mdx',
  'showcase.tsx',
];

/**
 * Tests - Structure Parity - Universal Docs.
 *
 * Docs that exist in every demo because each one exercises a distinct rendering
 * path rather than product content: the landing page, the theme matrix, and the
 * bare, draft, and unlisted visibility states.
 *
 * @since UNRELEASED
 */
const universalDocs: Tests_StructureParity_UniversalDocs = [
  'bare-sample.mdx',
  'draft-sample.mdx',
  'overview.mdx',
  'theme-showcase.mdx',
  'unlisted-sample.mdx',
];

/**
 * Tests - Structure Parity - Structure Parity.
 *
 * The demos must stay structurally interchangeable. Themed product prose is
 * deliberately free to differ in volume, so doc counts are not asserted; what is
 * locked is the scaffolding every demo needs to exercise the same preset paths.
 *
 * @since UNRELEASED
 */
describe('structure parity', () => {
  for (const demoName of demoNames) {
    it(`'${demoName}' ships exactly the expected pages`, async () => {
      const pages: Tests_StructureParity_StructureParity_Pages = await listFiles(resolve(getDemoRoot(demoName), 'src', 'pages'));

      deepStrictEqual(pages, expectedPages);

      return;
    });

    it(`'${demoName}' ships 15 blog posts plus an authors file`, async () => {
      const blogFiles: Tests_StructureParity_StructureParity_BlogFiles = await listFiles(resolve(getDemoRoot(demoName), 'blog'));
      const blogPosts: Tests_StructureParity_StructureParity_BlogPosts = blogFiles.filter((file) => file.endsWith('.mdx') === true);

      strictEqual(blogPosts.length, 15, `'${demoName}' has ${blogPosts.length} blog posts, expected 15.`);
      strictEqual(blogFiles.includes('authors.yml'), true, `'${demoName}' is missing blog/authors.yml.`);

      return;
    });

    it(`'${demoName}' ships 5 doc categories`, async () => {
      const docFiles: Tests_StructureParity_StructureParity_DocFiles = await listFiles(resolve(getDemoRoot(demoName), 'docs'));
      const categories: Tests_StructureParity_StructureParity_Categories = docFiles.filter((file) => file.endsWith('_category_.json') === true);

      strictEqual(categories.length, 5, `'${demoName}' has ${categories.length} doc categories, expected 5.`);

      return;
    });

    it(`'${demoName}' ships every universal doc`, async () => {
      const docFiles: Tests_StructureParity_StructureParity_DocFiles = await listFiles(resolve(getDemoRoot(demoName), 'docs'));
      const missing: Tests_StructureParity_StructureParity_Missing = [];

      for (const universalDoc of universalDocs) {
        const currentUniversalDoc: Tests_StructureParity_StructureParity_UniversalDoc = universalDoc;

        if (docFiles.includes(currentUniversalDoc) === false) {
          missing.push(`  - docs/${currentUniversalDoc}`);
        }
      }

      const message: Tests_StructureParity_StructureParity_Message = [
        `'${demoName}' is missing ${missing.length} universal doc(s):`,
        ...missing,
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });

    it(`'${demoName}' declares a single versioned docs release`, async () => {
      const versionsPath: Tests_StructureParity_StructureParity_VersionsPath = resolve(getDemoRoot(demoName), 'versions.json');
      const versionsText: Tests_StructureParity_StructureParity_VersionsText = await readFile(versionsPath, 'utf-8');
      const versions: Tests_StructureParity_StructureParity_Versions = JSON.parse(versionsText) as Tests_StructureParity_StructureParity_Versions;

      deepStrictEqual(versions, ['1.0.0']);

      return;
    });
  }

  return;
});
