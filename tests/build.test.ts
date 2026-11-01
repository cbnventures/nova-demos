import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  describe,
  expect,
  it,
} from 'vitest';

import type {
  Build_Evaluation,
  Build_ModuleUrl,
  Build_Result,
} from './types/build.test.d.ts';

/**
 * Build - Locale Build Helper.
 *
 * Confirms the public command contract and inspects plans calculated from the
 * real demo configurations without launching any Docusaurus build.
 *
 * @since 2026.10.3
 */
describe('Locale build helper', () => {
  it('documents every supported build mode', () => {
    const result: Build_Result = spawnSync(process.execPath, [
      resolve('scripts/build.mjs'),
      '--help',
    ], {
      encoding: 'utf8',
    });

    expect(result.status).toBe(0);

    expect(result.stdout).toContain('npm run build -- --complete');

    expect(result.stdout).toContain('npm run build -- --representative');

    expect(result.stdout).toContain('npm run build -- --locale <locale>');

    return;
  });

  it('rejects conflicting modes before starting a build', () => {
    const result: Build_Result = spawnSync(process.execPath, [
      resolve('scripts/build.mjs'),
      '--complete',
      '--representative',
    ], {
      encoding: 'utf8',
    });

    expect(result.status).toBe(1);

    expect(result.stderr).toContain('Choose only one build mode');

    return;
  });

  it('calculates complete and representative plans from live configs', () => {
    const buildModuleUrl: Build_ModuleUrl = pathToFileURL(resolve('scripts/build.mjs')).href;
    const evaluation: Build_Evaluation = [
      `const build = await import(${JSON.stringify(buildModuleUrl)});`,
      'const demos = await build.discoverDemos();',
      'const complete = build.createBuildPlan(demos, build.parseBuildArguments([]));',
      'const representative = build.createBuildPlan(demos, build.parseBuildArguments([\'--representative\']));',
      'const orchestration = build.isNovaOrchestrationInvocation([\'--workspace\', \'nova-demos-app-website\', \'--artifact\', \'website\']);',
      'process.stdout.write(build.formatBuildSummary(complete));',
      'process.stdout.write(String.fromCharCode(10));',
      'process.stdout.write(build.formatBuildSummary(representative));',
      'process.stdout.write(String.fromCharCode(10));',
      'process.stdout.write(build.serializeLocaleOptions([\'en\', \'ar\', \'zh-Hans\']).join(\' \'));',
      'process.stdout.write(String.fromCharCode(10));',
      'process.stdout.write(String(orchestration));',
    ].join('\n');
    const result: Build_Result = spawnSync(process.execPath, [
      '--input-type=module',
      '--eval',
      evaluation,
    ], {
      encoding: 'utf8',
    });

    expect(result.status).toBe(0);

    expect(result.stdout).toContain('6 presets × 36 locales = 216 locale builds.');

    expect(result.stdout).toContain('6 presets × 3 locales = 18 locale builds.');

    expect(result.stdout).toContain('Locales: en, ar, zh-Hans');

    expect(result.stdout).toContain('--locale en --locale ar --locale zh-Hans');

    expect(result.stdout).toContain('\ntrue');

    return;
  });

  return;
});
