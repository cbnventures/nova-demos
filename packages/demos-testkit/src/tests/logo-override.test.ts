import { ok, strictEqual } from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, it } from 'vitest';

import { discoverDemoNames, getDemoRoot, loadDemoConfig } from '../lib/demos.js';
import { getPresetRoot } from '../lib/preset.js';

import type {
  Tests_LogoOverride_DemoNames,
  Tests_LogoOverride_LogoOverride_Config,
  Tests_LogoOverride_LogoOverride_DemoBytes,
  Tests_LogoOverride_LogoOverride_DemoLogoPath,
  Tests_LogoOverride_LogoOverride_Logo,
  Tests_LogoOverride_LogoOverride_LogoSrc,
  Tests_LogoOverride_LogoOverride_LogoSrcLight,
  Tests_LogoOverride_LogoOverride_PresetBytes,
  Tests_LogoOverride_LogoOverride_PresetLogoPath,
  Tests_LogoOverride_LogoOverride_PresetName,
  Tests_LogoOverride_LogoOverride_PresetStats,
  Tests_LogoOverride_LogoOverride_Site,
  Tests_LogoOverride_LogoOverride_ThemeConfig,
} from '../types/tests/logo-override.test.d.ts';

const demoNames: Tests_LogoOverride_DemoNames = await discoverDemoNames();

/**
 * Tests - Logo Override - Logo Override.
 *
 * Locks the preset as the source of truth for logo assets: the canonical file
 * must exist and be non-empty, each demo's override must match it byte for byte,
 * and the config must actually wire the override through to a runtime URL.
 *
 * @since 2026.8.0
 */
describe('logo override', () => {
  for (const demoName of demoNames) {
    const presetName: Tests_LogoOverride_LogoOverride_PresetName = demoName.replace('demo-', '');
    const presetLogoPath: Tests_LogoOverride_LogoOverride_PresetLogoPath = resolve(getPresetRoot(), 'assets', 'presets', presetName, 'logo.svg');
    const demoLogoPath: Tests_LogoOverride_LogoOverride_DemoLogoPath = resolve(getDemoRoot(demoName), 'static', 'images', 'logo.svg');

    it(`preset '${presetName}' ships a non-empty canonical logo`, async () => {
      const presetStats: Tests_LogoOverride_LogoOverride_PresetStats = await stat(presetLogoPath);

      ok(presetStats.isFile(), `${presetLogoPath} is not a file.`);
      ok(presetStats.size > 0, `${presetLogoPath} is empty.`);

      return;
    });

    it(`'${demoName}' override logo bytes equal the preset canonical`, async () => {
      const presetBytes: Tests_LogoOverride_LogoOverride_PresetBytes = await readFile(presetLogoPath);
      const demoBytes: Tests_LogoOverride_LogoOverride_DemoBytes = await readFile(demoLogoPath);

      ok(presetBytes.equals(demoBytes), `${demoLogoPath} has drifted from the preset canonical.`);

      return;
    });

    it(`'${demoName}' wires the override via site.logo.src.light`, async () => {
      const config: Tests_LogoOverride_LogoOverride_Config = await loadDemoConfig(demoName);
      const themeConfig: Tests_LogoOverride_LogoOverride_ThemeConfig = config['themeConfig'] as Tests_LogoOverride_LogoOverride_ThemeConfig;
      const site: Tests_LogoOverride_LogoOverride_Site = themeConfig['site'] as Tests_LogoOverride_LogoOverride_Site;
      const logo: Tests_LogoOverride_LogoOverride_Logo = site['logo'] as Tests_LogoOverride_LogoOverride_Logo;
      const logoSrc: Tests_LogoOverride_LogoOverride_LogoSrc = logo['src'] as Tests_LogoOverride_LogoOverride_LogoSrc;
      const logoSrcLight: Tests_LogoOverride_LogoOverride_LogoSrcLight = logoSrc['light'];

      strictEqual(logoSrcLight, '/images/logo.svg');

      return;
    });
  }

  return;
});
