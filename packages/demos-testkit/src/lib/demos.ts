import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { getRepoRoot } from './preset.js';
import { LIB_REGEX_IDENTIFIER_CHAR } from './regex.js';

import type {
  Lib_Demos_DemoRecord,
  Lib_Demos_DiscoverDemoNames_AppsDirectory,
  Lib_Demos_DiscoverDemoNames_Entries,
  Lib_Demos_DiscoverDemoNames_Names,
  Lib_Demos_DiscoverDemoNames_Returns,
  Lib_Demos_ExtractBlockUsageText_AfterCharacter,
  Lib_Demos_ExtractBlockUsageText_BlockName,
  Lib_Demos_ExtractBlockUsageText_Character,
  Lib_Demos_ExtractBlockUsageText_Depth,
  Lib_Demos_ExtractBlockUsageText_Index,
  Lib_Demos_ExtractBlockUsageText_Marker,
  Lib_Demos_ExtractBlockUsageText_Parts,
  Lib_Demos_ExtractBlockUsageText_Returns,
  Lib_Demos_ExtractBlockUsageText_Source,
  Lib_Demos_ExtractBlockUsageText_StartIndex,
  Lib_Demos_GetDemoRoot_DemoName,
  Lib_Demos_GetDemoRoot_Returns,
  Lib_Demos_ListFiles_Directory,
  Lib_Demos_ListFiles_Entries,
  Lib_Demos_ListFiles_Returns,
  Lib_Demos_LoadDemoConfig_ConfigUrl,
  Lib_Demos_LoadDemoConfig_DemoName,
  Lib_Demos_LoadDemoConfig_ModuleNamespace,
  Lib_Demos_LoadDemoConfig_Returns,
  Lib_Demos_ReadShowcaseSource_Contents,
  Lib_Demos_ReadShowcaseSource_DemoName,
  Lib_Demos_ReadShowcaseSource_Directories,
  Lib_Demos_ReadShowcaseSource_Files,
  Lib_Demos_ReadShowcaseSource_FileText,
  Lib_Demos_ReadShowcaseSource_Returns,
  Lib_Demos_ResolveLeaf_Config,
  Lib_Demos_ResolveLeaf_Cursor,
  Lib_Demos_ResolveLeaf_Index,
  Lib_Demos_ResolveLeaf_Path,
  Lib_Demos_ResolveLeaf_Returns,
  Lib_Demos_ResolveLeaf_SegmentName,
  Lib_Demos_ResolveLeaf_Segments,
} from '../types/lib/demos.d.ts';

/**
 * Lib - Demos - Discover Demo Names.
 *
 * Lists every demo application directory under apps so the suites iterate the
 * real showcase set rather than a hardcoded roster that can fall out of date.
 *
 * @returns {Lib_Demos_DiscoverDemoNames_Returns}
 *
 * @since UNRELEASED
 */
export async function discoverDemoNames(): Lib_Demos_DiscoverDemoNames_Returns {
  const appsDirectory: Lib_Demos_DiscoverDemoNames_AppsDirectory = resolve(getRepoRoot(), 'apps');
  const entries: Lib_Demos_DiscoverDemoNames_Entries = await readdir(appsDirectory);
  const names: Lib_Demos_DiscoverDemoNames_Names = entries.filter((entry) => entry.startsWith('demo-') === true);

  return names.sort();
}

/**
 * Lib - Demos - Get Demo Root.
 *
 * Resolves the absolute directory of a single demo application from its
 * directory name.
 *
 * @param {Lib_Demos_GetDemoRoot_DemoName} demoName - Demo name.
 *
 * @returns {Lib_Demos_GetDemoRoot_Returns}
 *
 * @since UNRELEASED
 */
export function getDemoRoot(demoName: Lib_Demos_GetDemoRoot_DemoName): Lib_Demos_GetDemoRoot_Returns {
  return resolve(getRepoRoot(), 'apps', demoName);
}

/**
 * Lib - Demos - Load Demo Config.
 *
 * Dynamically imports a demo's Docusaurus config and returns its default
 * export. The configs are plain object literals with type-only imports, so the
 * import resolves without booting any Docusaurus runtime.
 *
 * @param {Lib_Demos_LoadDemoConfig_DemoName} demoName - Demo name.
 *
 * @returns {Lib_Demos_LoadDemoConfig_Returns}
 *
 * @since UNRELEASED
 */
export async function loadDemoConfig(demoName: Lib_Demos_LoadDemoConfig_DemoName): Lib_Demos_LoadDemoConfig_Returns {
  const configUrl: Lib_Demos_LoadDemoConfig_ConfigUrl = pathToFileURL(resolve(getDemoRoot(demoName), 'docusaurus.config.ts')).href;
  const moduleNamespace: Lib_Demos_LoadDemoConfig_ModuleNamespace = await import(configUrl) as Lib_Demos_LoadDemoConfig_ModuleNamespace;

  return moduleNamespace['default'] as Lib_Demos_DemoRecord;
}

/**
 * Lib - Demos - List Files.
 *
 * Recursively lists every file path under a directory, returning an empty list
 * when the directory does not exist so optional content areas stay non-fatal.
 *
 * @param {Lib_Demos_ListFiles_Directory} directory - Directory.
 *
 * @returns {Lib_Demos_ListFiles_Returns}
 *
 * @since UNRELEASED
 */
export async function listFiles(directory: Lib_Demos_ListFiles_Directory): Lib_Demos_ListFiles_Returns {
  try {
    const entries: Lib_Demos_ListFiles_Entries = await readdir(directory, { recursive: true });

    return entries.sort();
  } catch {
    return [];
  }
}

/**
 * Lib - Demos - Read Showcase Source.
 *
 * Concatenates every authored page and doc in a demo into one searchable
 * string. The prop-coverage suite scans this to prove each preset capability is
 * actually exercised somewhere in the demo's content.
 *
 * @param {Lib_Demos_ReadShowcaseSource_DemoName} demoName - Demo name.
 *
 * @returns {Lib_Demos_ReadShowcaseSource_Returns}
 *
 * @since UNRELEASED
 */
export async function readShowcaseSource(demoName: Lib_Demos_ReadShowcaseSource_DemoName): Lib_Demos_ReadShowcaseSource_Returns {
  const directories: Lib_Demos_ReadShowcaseSource_Directories = [
    resolve(getDemoRoot(demoName), 'src', 'pages'),
    resolve(getDemoRoot(demoName), 'docs'),
    resolve(getDemoRoot(demoName), 'blog'),
  ];
  const contents: Lib_Demos_ReadShowcaseSource_Contents = [];

  for (const directory of directories) {
    const files: Lib_Demos_ReadShowcaseSource_Files = await listFiles(directory);

    for (const file of files) {
      try {
        const fileText: Lib_Demos_ReadShowcaseSource_FileText = await readFile(resolve(directory, file), 'utf-8');

        contents.push(fileText);
      } catch {
        continue;
      }
    }
  }

  return contents.join('\n');
}

/**
 * Lib - Demos - Extract Block Usage Text.
 *
 * Returns the concatenated opening tags of every use of one block in a source
 * body, so one block's prop cannot mask another's. Depth tracking over braces
 * keeps array and object literals passed as prop values intact.
 *
 * @param {Lib_Demos_ExtractBlockUsageText_Source}    source    - Source.
 * @param {Lib_Demos_ExtractBlockUsageText_BlockName} blockName - Block name.
 *
 * @returns {Lib_Demos_ExtractBlockUsageText_Returns}
 *
 * @since UNRELEASED
 */
export function extractBlockUsageText(source: Lib_Demos_ExtractBlockUsageText_Source, blockName: Lib_Demos_ExtractBlockUsageText_BlockName): Lib_Demos_ExtractBlockUsageText_Returns {
  const marker: Lib_Demos_ExtractBlockUsageText_Marker = `<${blockName}`;
  const parts: Lib_Demos_ExtractBlockUsageText_Parts = [];

  let startIndex: Lib_Demos_ExtractBlockUsageText_StartIndex = source.indexOf(marker);

  while (startIndex !== -1) {
    const afterCharacter: Lib_Demos_ExtractBlockUsageText_AfterCharacter = source.charAt(startIndex + marker.length);

    if (LIB_REGEX_IDENTIFIER_CHAR.test(afterCharacter) === true) {
      startIndex = source.indexOf(marker, startIndex + marker.length);

      continue;
    }

    let depth: Lib_Demos_ExtractBlockUsageText_Depth = 0;
    let index: Lib_Demos_ExtractBlockUsageText_Index = startIndex + marker.length;

    while (index < source.length) {
      const character: Lib_Demos_ExtractBlockUsageText_Character = source.charAt(index);

      if (character === '{' || character === '[') {
        depth += 1;
      } else if (character === '}' || character === ']') {
        depth -= 1;
      } else if (character === '>' && depth === 0) {
        break;
      }

      index += 1;
    }

    parts.push(source.slice(startIndex, index));

    startIndex = source.indexOf(marker, index);
  }

  return parts.join('\n');
}

/**
 * Lib - Demos - Resolve Leaf.
 *
 * Walks a dotted path through a config object and returns the first segment
 * that is not declared as an own property, or null when every segment exists.
 * Values may be undefined; only the property name must be present.
 *
 * @param {Lib_Demos_ResolveLeaf_Config} config - Config.
 * @param {Lib_Demos_ResolveLeaf_Path}   path   - Path.
 *
 * @returns {Lib_Demos_ResolveLeaf_Returns}
 *
 * @since UNRELEASED
 */
export function resolveLeaf(config: Lib_Demos_ResolveLeaf_Config, path: Lib_Demos_ResolveLeaf_Path): Lib_Demos_ResolveLeaf_Returns {
  const segments: Lib_Demos_ResolveLeaf_Segments = path.split('.');

  let cursor: Lib_Demos_ResolveLeaf_Cursor = config;

  for (let index: Lib_Demos_ResolveLeaf_Index = 0; index < segments.length; index += 1) {
    const segmentName: Lib_Demos_ResolveLeaf_SegmentName = segments[index] ?? '';

    if (
      cursor === null
      || cursor === undefined
      || typeof cursor !== 'object'
    ) {
      return segments.slice(0, index + 1).join('.');
    }

    if (Object.hasOwn(cursor as Lib_Demos_DemoRecord, segmentName) === false) {
      return segments.slice(0, index + 1).join('.');
    }

    cursor = (cursor as Lib_Demos_DemoRecord)[segmentName];
  }

  return null;
}
