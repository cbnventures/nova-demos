import { spawnSync } from 'node:child_process';
import {
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { createJiti } from 'jiti';

/**
 * @typedef {object} BuildArguments
 * @property {boolean} complete Whether a complete build was explicitly requested.
 * @property {boolean} help Whether help was requested.
 * @property {string[]} locales Explicit locale overrides.
 * @property {boolean} representative Whether an automatic representative build was requested.
 */

/**
 * @typedef {object} DemoBuildConfiguration
 * @property {string} directory Absolute demo workspace directory.
 * @property {string} defaultLocale Configured default locale.
 * @property {Record<string, LocaleConfiguration>} localeConfigs Per-locale Docusaurus settings.
 * @property {string[]} locales Configured locale identifiers.
 * @property {string} name Workspace package name.
 * @property {Record<string, number>} translationFileCounts Translation-file counts by locale.
 */

/**
 * @typedef {object} DocusaurusConfiguration
 * @property {DocusaurusI18nConfiguration} i18n Docusaurus internationalization settings.
 */

/**
 * @typedef {object} DocusaurusI18nConfiguration
 * @property {string} defaultLocale Default locale identifier.
 * @property {Record<string, LocaleConfiguration>} [localeConfigs] Per-locale settings.
 * @property {string[]} locales Configured locale identifiers.
 * @property {string} [path] Translation directory relative to the demo.
 */

/**
 * @typedef {object} LocaleConfiguration
 * @property {'ltr' | 'rtl'} [direction] Text direction override.
 * @property {string} [htmlLang] HTML language identifier.
 * @property {string} [path] Translation directory name.
 */

/**
 * @typedef {object} DemoBuildPlan
 * @property {DemoBuildConfiguration} demo Demo workspace configuration.
 * @property {string[]} locales Locales selected for this demo.
 */

/**
 * @typedef {'complete' | 'locales' | 'representative'} BuildMode
 */

/**
 * @typedef {object} BuildPlan
 * @property {boolean} explicit Whether the mode was explicitly selected.
 * @property {DemoBuildPlan[]} demos Per-demo locale selections.
 * @property {BuildMode} mode Build mode.
 */

/**
 * Build - Repository Root.
 *
 * Anchors discovery and child commands to the repository containing this
 * helper instead of whichever directory launched Node.
 *
 * @since 2026.10.3
 */
const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));

/**
 * Build - Rtl Scripts.
 *
 * Recognizes the scripts that exercise right-to-left text rendering when the
 * active Docusaurus configuration does not declare an explicit direction.
 *
 * @since 2026.10.3
 */
const rtlScripts = new Set([
  'Adlm',
  'Arab',
  'Hebr',
  'Mand',
  'Nkoo',
  'Rohg',
  'Samr',
  'Syrc',
  'Thaa',
]);

/**
 * Build - Cjk Scripts.
 *
 * Recognizes the scripts that provide meaningful CJK rendering coverage when
 * selecting one automatic representative from the configured locales.
 *
 * @since 2026.10.3
 */
const cjkScripts = new Set([
  'Hans',
  'Hant',
  'Jpan',
  'Kore',
]);

/**
 * Build - Countdown Seconds.
 *
 * Gives an accidental complete build enough time to be cancelled before any
 * Docusaurus work starts.
 *
 * @since 2026.10.3
 */
const countdownSeconds = 10;

/**
 * Build - Jiti.
 *
 * Loads each TypeScript Docusaurus configuration without adding a separate
 * compilation step to the build planner.
 *
 * @since 2026.10.3
 */
const jiti = createJiti(import.meta.url);

/**
 * Build - Parse Build Arguments.
 *
 * Keeps the npm-facing flags small while rejecting ambiguous combinations
 * before discovery or build work begins.
 *
 * @param {string[]} args CLI arguments.
 *
 * @returns {BuildArguments}
 *
 * @since 2026.10.3
 */
export function parseBuildArguments(args) {
  const parsed = /** @type {BuildArguments} */ ({
    complete: false,
    help: false,
    locales: [],
    representative: false,
  });

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === undefined || argument === '--') {
      continue;
    }

    if (argument === '--complete' || argument === '-c') {
      parsed.complete = true;

      continue;
    }

    if (argument === '--help' || argument === '-h') {
      parsed.help = true;

      continue;
    }

    if (argument === '--representative' || argument === '-r') {
      parsed.representative = true;

      continue;
    }

    if (argument === '--locale' || argument === '-l') {
      const locale = args[index + 1];

      if (locale === undefined || locale.startsWith('-') === true) {
        throw new Error(`Build option "${argument}" requires a locale value.`);
      }

      parsed.locales.push(locale);
      index += 1;

      continue;
    }

    let localePrefix = undefined;

    if (argument.startsWith('--locale=') === true) {
      localePrefix = '--locale=';
    } else if (argument.startsWith('-l=') === true) {
      localePrefix = '-l=';
    }

    if (localePrefix !== undefined) {
      const locale = argument.slice(localePrefix.length);

      if (locale.length === 0) {
        throw new Error(`Build option "${localePrefix.slice(0, -1)}" requires a locale value.`);
      }

      parsed.locales.push(locale);

      continue;
    }

    throw new Error(`Unknown build option "${argument}". Run "npm run build -- --help" for usage.`);
  }

  parsed.locales = [...new Set(parsed.locales)];

  const selectedModeCount = Number(parsed.complete)
    + Number(parsed.representative)
    + Number(parsed.locales.length > 0);

  if (selectedModeCount > 1) {
    throw new Error('Choose only one build mode: --complete, --representative, or one or more --locale options.');
  }

  return parsed;
}

/**
 * Build - Count Files.
 *
 * Measures translation depth so representative selection favors real content
 * over locales that contain only a generated UI-string file.
 *
 * @param {string} directory Directory to scan.
 *
 * @returns {number}
 *
 * @since 2026.10.3
 */
function countFiles(directory) {
  if (existsSync(directory) === false) {
    return 0;
  }

  let count = 0;

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() === true) {
      count += countFiles(join(directory, entry.name));
    } else if (entry.isFile() === true) {
      count += 1;
    }
  }

  return count;
}

/**
 * Build - Discover Demos.
 *
 * Reads the current workspace tree and Docusaurus configuration so neither
 * preset names nor locale counts are hardcoded in this helper.
 *
 * @param {string} root Repository root.
 *
 * @returns {Promise<DemoBuildConfiguration[]>}
 *
 * @since 2026.10.3
 */
export async function discoverDemos(root = repositoryRoot) {
  const applicationsDirectory = join(root, 'apps');
  const demos = [];

  for (const entry of readdirSync(applicationsDirectory, { withFileTypes: true })) {
    if (entry.isDirectory() === false) {
      continue;
    }

    const directory = join(applicationsDirectory, entry.name);
    const configPath = join(directory, 'docusaurus.config.ts');
    const packagePath = join(directory, 'package.json');

    if (existsSync(configPath) === false || existsSync(packagePath) === false) {
      continue;
    }

    const packageJson = /** @type {{ name?: unknown }} */ (JSON.parse(readFileSync(packagePath, 'utf8')));
    const importedConfig = await jiti.import(configPath, { default: true });
    const config = /** @type {DocusaurusConfiguration} */ (importedConfig);

    if (typeof packageJson.name !== 'string' || packageJson.name.length === 0) {
      throw new Error(`Demo workspace at "${directory}" has no valid package name.`);
    }

    if (config.i18n === undefined || Array.isArray(config.i18n.locales) === false) {
      throw new Error(`Demo workspace "${packageJson.name}" has no valid Docusaurus i18n configuration.`);
    }

    const localeConfigs = config.i18n.localeConfigs ?? {};
    const translationsDirectory = join(directory, config.i18n.path ?? 'i18n');
    const translationFileCounts = Object.fromEntries(config.i18n.locales.map((locale) => {
      const localeConfiguration = localeConfigs[locale];
      const localeDirectory = (localeConfiguration === undefined) ? locale : (localeConfiguration.path ?? locale);

      return [
        locale,
        countFiles(join(translationsDirectory, localeDirectory)),
      ];
    }));

    demos.push({
      defaultLocale: config.i18n.defaultLocale,
      directory,
      localeConfigs,
      locales: [...config.i18n.locales],
      name: packageJson.name,
      translationFileCounts,
    });
  }

  if (demos.length === 0) {
    throw new Error(`No Docusaurus demo workspaces were discovered under "${applicationsDirectory}".`);
  }

  return demos.sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * Build - Create Locale.
 *
 * Uses the configured HTML language when present so Docusaurus aliases such as
 * zh-Hans retain the same language metadata the rendered site receives.
 *
 * @param {DemoBuildConfiguration} demo Demo configuration.
 * @param {string} locale Locale identifier.
 *
 * @returns {Intl.Locale}
 *
 * @since 2026.10.3
 */
function createLocale(demo, locale) {
  const localeConfiguration = demo.localeConfigs[locale];
  const language = (localeConfiguration === undefined) ? locale : (localeConfiguration.htmlLang ?? locale);

  try {
    return new Intl.Locale(language).maximize();
  } catch {
    throw new Error(`Demo workspace "${demo.name}" contains invalid locale identifier "${language}".`);
  }
}

/**
 * Build - Read Locale Direction.
 *
 * Honors an explicit Docusaurus direction first, then derives the direction
 * from the runtime's current Unicode locale data.
 *
 * @param {DemoBuildConfiguration} demo Demo configuration.
 * @param {string} locale Locale identifier.
 *
 * @returns {'ltr' | 'rtl'}
 *
 * @since 2026.10.3
 */
function readLocaleDirection(demo, locale) {
  const localeConfiguration = demo.localeConfigs[locale];
  const configuredDirection = (localeConfiguration === undefined) ? undefined : localeConfiguration.direction;

  if (configuredDirection !== undefined) {
    return configuredDirection;
  }

  const normalizedLocale = createLocale(demo, locale);
  const getTextInfo = normalizedLocale.getTextInfo;

  if (typeof getTextInfo === 'function') {
    const direction = getTextInfo.call(normalizedLocale).direction;

    if (direction === 'rtl') {
      return 'rtl';
    }

    return 'ltr';
  }

  if (rtlScripts.has(normalizedLocale.script ?? '') === true) {
    return 'rtl';
  }

  return 'ltr';
}

/**
 * Build - Select Strongest Locale.
 *
 * Preserves configured order for ties while preferring the candidate with the
 * deepest checked-in translation tree.
 *
 * @param {DemoBuildConfiguration} demo Demo configuration.
 * @param {string[]} candidates Locale candidates in configured order.
 *
 * @returns {string | undefined}
 *
 * @since 2026.10.3
 */
function selectStrongestLocale(demo, candidates) {
  let selected = undefined;
  let selectedFileCount = -1;

  for (const candidate of candidates) {
    const fileCount = demo.translationFileCounts[candidate] ?? 0;

    if (fileCount > selectedFileCount) {
      selected = candidate;
      selectedFileCount = fileCount;
    }
  }

  return selected;
}

/**
 * Build - Select Representative Locales.
 *
 * Automatically selects an English baseline plus the most complete configured
 * RTL and CJK translations. Missing categories are left empty rather than
 * filled by unrelated locales.
 *
 * @param {DemoBuildConfiguration} demo Demo configuration.
 *
 * @returns {string[]}
 *
 * @since 2026.10.3
 */
export function selectRepresentativeLocales(demo) {
  const englishLocales = demo.locales.filter((locale) => createLocale(demo, locale).language === 'en');
  const englishLocale = (englishLocales.includes(demo.defaultLocale) === true) ? demo.defaultLocale : englishLocales[0];

  if (englishLocale === undefined) {
    throw new Error(`Demo workspace "${demo.name}" cannot run a representative build because no English locale is configured.`);
  }

  const remainingLocales = demo.locales.filter((locale) => locale !== englishLocale);
  const rtlLocales = remainingLocales.filter((locale) => readLocaleDirection(demo, locale) === 'rtl');
  const cjkLocales = remainingLocales.filter((locale) => cjkScripts.has(createLocale(demo, locale).script ?? ''));
  const selected = [englishLocale];
  const rtlLocale = selectStrongestLocale(demo, rtlLocales);
  const cjkLocale = selectStrongestLocale(demo, cjkLocales);

  if (rtlLocale !== undefined) {
    selected.push(rtlLocale);
  }

  if (cjkLocale !== undefined && selected.includes(cjkLocale) === false) {
    selected.push(cjkLocale);
  }

  return selected;
}

/**
 * Build - Create Build Plan.
 *
 * Expands the selected mode into one validated locale list per discovered demo
 * before Nova's workspace runner is allowed to start any workspace.
 *
 * @param {DemoBuildConfiguration[]} demos Demo configurations.
 * @param {BuildArguments} args Parsed build arguments.
 *
 * @returns {BuildPlan}
 *
 * @since 2026.10.3
 */
export function createBuildPlan(demos, args) {
  if (args.representative === true) {
    return {
      demos: demos.map((demo) => ({
        demo,
        locales: selectRepresentativeLocales(demo),
      })),
      explicit: true,
      mode: 'representative',
    };
  }

  if (args.locales.length > 0) {
    for (const demo of demos) {
      const unavailableLocales = args.locales.filter((locale) => demo.locales.includes(locale) === false);

      if (unavailableLocales.length > 0) {
        throw new Error(`Demo workspace "${demo.name}" does not configure requested locale(s): ${unavailableLocales.join(', ')}.`);
      }
    }

    return {
      demos: demos.map((demo) => ({
        demo,
        locales: [...args.locales],
      })),
      explicit: true,
      mode: 'locales',
    };
  }

  return {
    demos: demos.map((demo) => ({
      demo,
      locales: [...demo.locales],
    })),
    explicit: args.complete,
    mode: 'complete',
  };
}

/**
 * Build - Format Build Summary.
 *
 * Calculates every displayed count from the live plan so the notice stays
 * accurate when presets or configured locales change.
 *
 * @param {BuildPlan} plan Build plan.
 *
 * @returns {string}
 *
 * @since 2026.10.3
 */
export function formatBuildSummary(plan) {
  let heading = 'Requested locale build selected.';

  if (plan.mode === 'complete') {
    heading = 'Complete locale build selected.';
  } else if (plan.mode === 'representative') {
    heading = 'Representative locale build selected.';
  }

  const total = plan.demos.reduce((sum, item) => sum + item.locales.length, 0);
  const localeCounts = new Set(plan.demos.map((item) => item.locales.length));
  const lines = [
    heading,
    '',
  ];

  if (localeCounts.size === 1) {
    const firstDemo = plan.demos[0];
    const localeCount = (firstDemo === undefined) ? 0 : firstDemo.locales.length;
    const presetLabel = (plan.demos.length === 1) ? 'preset' : 'presets';
    const localeLabel = (localeCount === 1) ? 'locale' : 'locales';
    const buildLabel = (total === 1) ? 'locale build' : 'locale builds';

    lines.push(`${String(plan.demos.length)} ${presetLabel} × ${String(localeCount)} ${localeLabel} = ${String(total)} ${buildLabel}.`);
  } else {
    lines.push(`${String(plan.demos.length)} presets = ${String(total)} locale builds:`);

    for (const item of plan.demos) {
      lines.push(`  ${item.demo.name}: ${String(item.locales.length)}`);
    }
  }

  if (plan.mode !== 'complete') {
    const localeSelections = new Set(plan.demos.map((item) => item.locales.join(', ')));

    lines.push('');

    if (localeSelections.size === 1) {
      const firstDemo = plan.demos[0];
      const locales = (firstDemo === undefined) ? '' : firstDemo.locales.join(', ');

      lines.push(`Locales: ${locales}`);
    } else {
      lines.push('Locales by preset:');

      for (const item of plan.demos) {
        lines.push(`  ${item.demo.name}: ${item.locales.join(', ')}`);
      }
    }
  }

  return lines.join('\n');
}

/**
 * Build - Print Help.
 *
 * Keeps the discoverable npm interface beside the implementation so additions
 * cannot silently drift from the accepted argument parser.
 *
 * @returns {void}
 *
 * @since 2026.10.3
 */
function printHelp() {
  process.stdout.write([
    'Nova Demos locale build helper',
    '',
    'Usage:',
    '  npm run build',
    '  npm run build -- --complete',
    '  npm run build -- --representative',
    '  npm run build -- --locale <locale> [--locale <locale> ...]',
    '',
    'Options:',
    '  -c, --complete        Build every configured locale without the safety countdown.',
    '  -r, --representative  Auto-select English plus meaningful RTL and CJK coverage.',
    '  -l, --locale <locale> Build one or more explicitly requested locales.',
    '  -h, --help            Display this help menu.',
    '',
    'Running npm run build with no options remains a complete build. It calculates',
    'the current preset × locale cost, explains the faster representative mode, and',
    `waits ${String(countdownSeconds)} seconds before starting.`,
    '',
  ].join('\n'));

  return;
}

/**
 * Build - Countdown.
 *
 * Delays only an implicit complete build, giving people and agents a clear
 * opportunity to choose the faster representative mode instead.
 *
 * @returns {Promise<void>}
 *
 * @since 2026.10.3
 */
async function countdown() {
  process.stdout.write([
    '',
    'For faster preset validation, cancel and run:',
    '  npm run build -- --representative',
    '',
  ].join('\n'));
  process.stdout.write('Press Ctrl+C to cancel.\n');

  await new Promise((resolvePromise) => {
    let remaining = countdownSeconds;

    writeCountdown(remaining);

    const interval = setInterval(() => {
      remaining -= 1;

      if (remaining === 0) {
        clearInterval(interval);
        resolvePromise(undefined);

        return;
      }

      writeCountdown(remaining);

      return;
    }, 1000);

    return;
  });

  if (process.stdout.isTTY === true) {
    process.stdout.write('\rStarting the complete build now.          \n');
  }

  return;
}

/**
 * Build - Write Countdown.
 *
 * Updates one terminal line for people while retaining line-oriented output in
 * captured logs used by agents and continuous-integration systems.
 *
 * @param {number} remaining Remaining seconds.
 *
 * @returns {void}
 *
 * @since 2026.10.3
 */
function writeCountdown(remaining) {
  const secondLabel = (remaining === 1) ? 'second' : 'seconds';
  const message = `Starting the complete build in ${String(remaining)} ${secondLabel}…`;

  if (process.stdout.isTTY === true) {
    process.stdout.write(`\r${message}`);
  } else {
    process.stdout.write(`${message}\n`);
  }

  return;
}

/**
 * Build - Run Command.
 *
 * Executes each existing nested npm script without introducing shell quoting or
 * platform-specific command composition.
 *
 * @param {string} directory Working directory.
 * @param {string[]} args npm arguments.
 *
 * @returns {void}
 *
 * @since 2026.10.3
 */
function runCommand(directory, args) {
  const result = spawnSync('npm', args, {
    cwd: directory,
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
    stdio: 'inherit',
  });

  if (result.error !== undefined) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
    throw new Error(`Command "npm ${args.join(' ')}" failed.`);
  }

  return;
}

/**
 * Build - Serialize Locale Options.
 *
 * Repeats Docusaurus's variadic locale flag because Commander otherwise treats
 * the second locale token as the optional site-directory argument.
 *
 * @param {string[]} locales Locale identifiers.
 *
 * @returns {string[]}
 *
 * @since 2026.10.3
 */
export function serializeLocaleOptions(locales) {
  return locales.flatMap((locale) => [
    '--locale',
    locale,
  ]);
}

/**
 * Build - Serialize Build Mode.
 *
 * Passes one unambiguous, explicit mode from the root planner through Nova to
 * each demo, preventing repeated countdowns inside child workspaces.
 *
 * @param {BuildPlan} plan Build plan.
 *
 * @returns {string[]}
 *
 * @since 2026.10.3
 */
function serializeBuildMode(plan) {
  if (plan.mode === 'complete') {
    return ['--complete'];
  }

  if (plan.mode === 'representative') {
    return ['--representative'];
  }

  const firstDemo = plan.demos[0];

  if (firstDemo === undefined) {
    return [];
  }

  return serializeLocaleOptions(firstDemo.locales);
}

/**
 * Build - Run Build.
 *
 * Coordinates root and direct-workspace execution while leaving Docusaurus and
 * Nova transpilation in their established nested package scripts.
 *
 * @returns {Promise<void>}
 *
 * @since 2026.10.3
 */
async function runBuild() {
  const args = parseBuildArguments(process.argv.slice(2));

  if (args.help === true) {
    printHelp();

    return;
  }

  const demos = await discoverDemos();
  const packageDirectory = dirname(process.env['npm_package_json'] ?? join(process.cwd(), 'package.json'));
  const isRepositoryRoot = resolve(packageDirectory) === resolve(repositoryRoot);
  const activeDemo = demos.find((demo) => resolve(demo.directory) === resolve(packageDirectory));

  if (isRepositoryRoot === false && activeDemo === undefined) {
    throw new Error(`Build helper must run from the repository root or a discovered demo workspace, not "${packageDirectory}".`);
  }

  let targetedDemos = demos;

  if (isRepositoryRoot === false) {
    if (activeDemo === undefined) {
      throw new Error('No active demo workspace was discovered.');
    }

    targetedDemos = [activeDemo];
  }

  const plan = createBuildPlan(targetedDemos, args);
  const isOrchestrated = process.env['NOVA_WORKSPACE_RUNNER'] === 'true';

  if (isOrchestrated === false) {
    process.stdout.write(`${formatBuildSummary(plan)}\n`);
  }

  if (plan.mode === 'complete' && plan.explicit === false) {
    await countdown();
  }

  if (isRepositoryRoot === true) {
    runCommand(repositoryRoot, [
      'run',
      'build:workspaces',
      '--',
      '--',
      ...serializeBuildMode(plan),
    ]);

    return;
  }

  const demoPlan = plan.demos[0];

  if (demoPlan === undefined) {
    throw new Error('No active demo build plan was created.');
  }

  let docusaurusArguments = [
    'run',
    'build:build',
  ];

  if (plan.mode !== 'complete') {
    docusaurusArguments = [
      'run',
      'build:build',
      '--',
      ...serializeLocaleOptions(demoPlan.locales),
    ];
  }

  runCommand(demoPlan.demo.directory, docusaurusArguments);

  return;
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  try {
    await runBuild();
  } catch (error) {
    const message = (error instanceof Error) ? error.message : String(error);

    process.stderr.write(`build: ${message}\n`);
    process.exitCode = process.exitCode ?? 1;
  }
}
