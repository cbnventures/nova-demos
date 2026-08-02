import { deepStrictEqual, strictEqual } from 'node:assert/strict';
import { resolve } from 'node:path';

import { describe, it } from 'vitest';

import {
  discoverDemoNames,
  getDemoRoot,
  listFiles,
  loadDemoConfig,
} from '../lib/demos.js';

import type {
  Tests_LocaleCoverage_DeclaredByDemo,
  Tests_LocaleCoverage_DeepLocales,
  Tests_LocaleCoverage_DefaultLocaleByDemo,
  Tests_LocaleCoverage_DemoNames,
  Tests_LocaleCoverage_LocaleConfigsByDemo,
  Tests_LocaleCoverage_LocaleCoverage_Baseline,
  Tests_LocaleCoverage_LocaleCoverage_BundleFile,
  Tests_LocaleCoverage_LocaleCoverage_Config,
  Tests_LocaleCoverage_LocaleCoverage_Declared,
  Tests_LocaleCoverage_LocaleCoverage_DirectoryEntries,
  Tests_LocaleCoverage_LocaleCoverage_Files,
  Tests_LocaleCoverage_LocaleCoverage_I18n,
  Tests_LocaleCoverage_LocaleCoverage_Locale,
  Tests_LocaleCoverage_LocaleCoverage_LocaleConfigs,
  Tests_LocaleCoverage_LocaleCoverage_LocaleEntry,
  Tests_LocaleCoverage_LocaleCoverage_Message,
  Tests_LocaleCoverage_LocaleCoverage_Missing,
  Tests_LocaleCoverage_ThemeBundleFiles,
} from '../types/tests/locale-coverage.test.d.ts';

const demoNames: Tests_LocaleCoverage_DemoNames = await discoverDemoNames();
const declaredByDemo: Tests_LocaleCoverage_DeclaredByDemo = new Map();
const localeConfigsByDemo: Tests_LocaleCoverage_LocaleConfigsByDemo = new Map();
const defaultLocaleByDemo: Tests_LocaleCoverage_DefaultLocaleByDemo = new Map();

for (const demoName of demoNames) {
  const config: Tests_LocaleCoverage_LocaleCoverage_Config = await loadDemoConfig(demoName);
  const i18n: Tests_LocaleCoverage_LocaleCoverage_I18n = config['i18n'] as Tests_LocaleCoverage_LocaleCoverage_I18n;

  declaredByDemo.set(demoName, (i18n['locales'] as Tests_LocaleCoverage_LocaleCoverage_Declared).slice().sort());

  localeConfigsByDemo.set(demoName, i18n['localeConfigs'] as Tests_LocaleCoverage_LocaleCoverage_LocaleConfigs);

  defaultLocaleByDemo.set(demoName, i18n['defaultLocale'] as Tests_LocaleCoverage_LocaleCoverage_Locale);
}

/**
 * Tests - Locale Coverage - Deep Locales.
 *
 * The two locales the demos translate in full rather than registering only. One
 * is right-to-left and one is CJK, so the preset's bidirectional and wide-glyph
 * rendering paths both stay exercised.
 *
 * @since UNRELEASED
 */
const deepLocales: Tests_LocaleCoverage_DeepLocales = [
  'ar',
  'zh-Hans',
];

/**
 * Tests - Locale Coverage - Theme Bundle Files.
 *
 * The theme translation files a fully localized locale must carry, one per
 * translatable surface the preset renders chrome for.
 *
 * @since UNRELEASED
 */
const themeBundleFiles: Tests_LocaleCoverage_ThemeBundleFiles = [
  'announcementBar.json',
  'blog.json',
  'errorPages.json',
  'footer.json',
  'navbar.json',
];

/**
 * Tests - Locale Coverage - Locale Coverage.
 *
 * Registering a locale is a promise the locale switcher will resolve. Declared
 * locales must exist on disk with translations, be described in localeConfigs,
 * and stay identical across demos so no demo silently drops a language.
 *
 * @since UNRELEASED
 */
describe('locale coverage', () => {
  for (const demoName of demoNames) {
    it(`'${demoName}' declared locales match its i18n directories`, async () => {
      const declared: Tests_LocaleCoverage_LocaleCoverage_Declared = declaredByDemo.get(demoName) ?? [];
      const directoryEntries: Tests_LocaleCoverage_LocaleCoverage_DirectoryEntries = (await listFiles(resolve(getDemoRoot(demoName), 'i18n'))).filter((entry) => entry.includes('/') === false).sort();

      deepStrictEqual(declared, directoryEntries);

      return;
    });

    it(`'${demoName}' gives every declared locale a code.json`, async () => {
      const declared: Tests_LocaleCoverage_LocaleCoverage_Declared = declaredByDemo.get(demoName) ?? [];
      const files: Tests_LocaleCoverage_LocaleCoverage_Files = await listFiles(resolve(getDemoRoot(demoName), 'i18n'));
      const missing: Tests_LocaleCoverage_LocaleCoverage_Missing = [];

      for (const locale of declared) {
        const currentLocale: Tests_LocaleCoverage_LocaleCoverage_Locale = locale;

        if (files.includes(`${currentLocale}/code.json`) === false) {
          missing.push(`  - i18n/${currentLocale}/code.json`);
        }
      }

      const message: Tests_LocaleCoverage_LocaleCoverage_Message = [
        `'${demoName}' registers ${missing.length} locale(s) with no translations:`,
        ...missing,
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });

    it(`'${demoName}' gives the default and deep locales a complete localeConfigs entry`, () => {
      const localeConfigs: Tests_LocaleCoverage_LocaleCoverage_LocaleConfigs = localeConfigsByDemo.get(demoName) ?? {};
      const explicitLocales: Tests_LocaleCoverage_LocaleCoverage_Declared = [
        defaultLocaleByDemo.get(demoName) ?? '',
        ...deepLocales,
      ];
      const missing: Tests_LocaleCoverage_LocaleCoverage_Missing = [];

      for (const locale of explicitLocales) {
        const currentLocale: Tests_LocaleCoverage_LocaleCoverage_Locale = locale;
        const localeEntry: Tests_LocaleCoverage_LocaleCoverage_LocaleEntry = localeConfigs[currentLocale] as Tests_LocaleCoverage_LocaleCoverage_LocaleEntry;

        if (localeEntry === undefined) {
          missing.push(`  - ${currentLocale} has no localeConfigs entry`);

          continue;
        }

        if (localeEntry['label'] === undefined) {
          missing.push(`  - ${currentLocale} is missing a label`);
        }

        if (localeEntry['direction'] === undefined) {
          missing.push(`  - ${currentLocale} is missing a direction`);
        }

        if (localeEntry['htmlLang'] === undefined) {
          missing.push(`  - ${currentLocale} is missing an htmlLang`);
        }
      }

      const message: Tests_LocaleCoverage_LocaleCoverage_Message = [
        `'${demoName}' has ${missing.length} incomplete localeConfigs entr(ies):`,
        ...missing,
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });

    it(`'${demoName}' declares Arabic right-to-left so the bidirectional path stays exercised`, () => {
      const localeConfigs: Tests_LocaleCoverage_LocaleCoverage_LocaleConfigs = localeConfigsByDemo.get(demoName) ?? {};
      const localeEntry: Tests_LocaleCoverage_LocaleCoverage_LocaleEntry = localeConfigs['ar'] as Tests_LocaleCoverage_LocaleCoverage_LocaleEntry;

      strictEqual((localeEntry ?? {})['direction'], 'rtl', `'${demoName}' does not declare 'ar' as rtl.`);

      return;
    });

    it(`'${demoName}' fully localizes its deep locales`, async () => {
      const files: Tests_LocaleCoverage_LocaleCoverage_Files = await listFiles(resolve(getDemoRoot(demoName), 'i18n'));
      const missing: Tests_LocaleCoverage_LocaleCoverage_Missing = [];

      for (const locale of deepLocales) {
        const currentLocale: Tests_LocaleCoverage_LocaleCoverage_Locale = locale;

        for (const bundleFile of themeBundleFiles) {
          const currentBundleFile: Tests_LocaleCoverage_LocaleCoverage_BundleFile = bundleFile;

          if (files.includes(`${currentLocale}/docusaurus-theme-nova/${currentBundleFile}`) === false) {
            missing.push(`  - i18n/${currentLocale}/docusaurus-theme-nova/${currentBundleFile}`);
          }
        }
      }

      const message: Tests_LocaleCoverage_LocaleCoverage_Message = [
        `'${demoName}' is missing ${missing.length} deep-locale theme bundle file(s):`,
        ...missing,
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });

    it(`'${demoName}' declares the same locale set as every other demo`, () => {
      const baseline: Tests_LocaleCoverage_LocaleCoverage_Baseline = declaredByDemo.get(demoNames[0] ?? '') ?? [];
      const declared: Tests_LocaleCoverage_LocaleCoverage_Declared = declaredByDemo.get(demoName) ?? [];

      deepStrictEqual(declared, baseline);

      return;
    });
  }

  return;
});
