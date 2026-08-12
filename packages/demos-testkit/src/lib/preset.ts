import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  LIB_REGEX_BLOCK_EXPORT,
  LIB_REGEX_PASCAL_BOUNDARY,
  LIB_REGEX_PROPS_FIELD,
  LIB_REGEX_PROPS_OBJECT,
  LIB_REGEX_PROPS_TYPE_ALIAS,
  LIB_REGEX_QUOTED_STRING,
  LIB_REGEX_THEME_CONFIG_OBJECT_TYPE,
  LIB_REGEX_THEME_CONFIG_TYPE_REFERENCE,
} from './regex.js';

import type {
  Lib_Preset_GetPresetRoot_Returns,
  Lib_Preset_GetRepoRoot_CurrentFileDirectory,
  Lib_Preset_GetRepoRoot_CurrentFilePath,
  Lib_Preset_GetRepoRoot_Returns,
  Lib_Preset_ReadBlockNames_BarrelPath,
  Lib_Preset_ReadBlockNames_FileText,
  Lib_Preset_ReadBlockNames_Match,
  Lib_Preset_ReadBlockNames_Names,
  Lib_Preset_ReadBlockNames_Pattern,
  Lib_Preset_ReadBlockNames_Returns,
  Lib_Preset_ReadBlockPropSurface_Aliases,
  Lib_Preset_ReadBlockPropSurface_BlockName,
  Lib_Preset_ReadBlockPropSurface_Descriptors,
  Lib_Preset_ReadBlockPropSurface_FieldAliasBody,
  Lib_Preset_ReadBlockPropSurface_FieldExpression,
  Lib_Preset_ReadBlockPropSurface_FieldMatch,
  Lib_Preset_ReadBlockPropSurface_FieldName,
  Lib_Preset_ReadBlockPropSurface_FieldOptional,
  Lib_Preset_ReadBlockPropSurface_FieldShared,
  Lib_Preset_ReadBlockPropSurface_FileText,
  Lib_Preset_ReadBlockPropSurface_Lines,
  Lib_Preset_ReadBlockPropSurface_ObjectBody,
  Lib_Preset_ReadBlockPropSurface_ObjectMatch,
  Lib_Preset_ReadBlockPropSurface_Returns,
  Lib_Preset_ReadBlockPropSurface_TypeFilePath,
  Lib_Preset_ReadBlockVariantValues_AliasBody,
  Lib_Preset_ReadBlockVariantValues_Aliases,
  Lib_Preset_ReadBlockVariantValues_AliasName,
  Lib_Preset_ReadBlockVariantValues_BlockName,
  Lib_Preset_ReadBlockVariantValues_BodyParts,
  Lib_Preset_ReadBlockVariantValues_CurrentAliasEntry,
  Lib_Preset_ReadBlockVariantValues_FileText,
  Lib_Preset_ReadBlockVariantValues_Members,
  Lib_Preset_ReadBlockVariantValues_ResolvedBody,
  Lib_Preset_ReadBlockVariantValues_ResolvedParts,
  Lib_Preset_ReadBlockVariantValues_Returns,
  Lib_Preset_ReadBlockVariantValues_SharedAliases,
  Lib_Preset_ReadBlockVariantValues_SharedFilePath,
  Lib_Preset_ReadBlockVariantValues_SharedFileText,
  Lib_Preset_ReadBlockVariantValues_TrimmedPart,
  Lib_Preset_ReadBlockVariantValues_TypeFilePath,
  Lib_Preset_ReadBlockVariantValues_Values,
  Lib_Preset_ReadThemeConfigLeafPaths_BlockBody,
  Lib_Preset_ReadThemeConfigLeafPaths_BlockMatch,
  Lib_Preset_ReadThemeConfigLeafPaths_BlockPattern,
  Lib_Preset_ReadThemeConfigLeafPaths_Entry,
  Lib_Preset_ReadThemeConfigLeafPaths_EntryFields,
  Lib_Preset_ReadThemeConfigLeafPaths_FieldExpression,
  Lib_Preset_ReadThemeConfigLeafPaths_FieldMatch,
  Lib_Preset_ReadThemeConfigLeafPaths_FieldName,
  Lib_Preset_ReadThemeConfigLeafPaths_Fields,
  Lib_Preset_ReadThemeConfigLeafPaths_FieldType,
  Lib_Preset_ReadThemeConfigLeafPaths_FieldTypeMatch,
  Lib_Preset_ReadThemeConfigLeafPaths_FileText,
  Lib_Preset_ReadThemeConfigLeafPaths_Leaves,
  Lib_Preset_ReadThemeConfigLeafPaths_Lines,
  Lib_Preset_ReadThemeConfigLeafPaths_ObjectTypes,
  Lib_Preset_ReadThemeConfigLeafPaths_Returns,
  Lib_Preset_ReadThemeConfigLeafPaths_TypeFilePath,
  Lib_Preset_ReadThemeConfigLeafPaths_TypeName,
  Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldEntry,
  Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldName,
  Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldType,
  Lib_Preset_ReadThemeConfigLeafPaths_WalkStack,
  Lib_Preset_ReadTypeAliases_AliasBody,
  Lib_Preset_ReadTypeAliases_Aliases,
  Lib_Preset_ReadTypeAliases_AliasName,
  Lib_Preset_ReadTypeAliases_FileText,
  Lib_Preset_ReadTypeAliases_Match,
  Lib_Preset_ReadTypeAliases_Pattern,
  Lib_Preset_ReadTypeAliases_Returns,
  Lib_Preset_ReadVariants_Aliases,
  Lib_Preset_ReadVariants_Expression,
  Lib_Preset_ReadVariants_Match,
  Lib_Preset_ReadVariants_Pattern,
  Lib_Preset_ReadVariants_Resolved,
  Lib_Preset_ReadVariants_Returns,
  Lib_Preset_ReadVariants_Variants,
  Lib_Preset_ToKebabCase_Returns,
  Lib_Preset_ToKebabCase_Value,
} from '../types/lib/preset.d.ts';

/**
 * Lib - Preset - Get Repo Root.
 *
 * Resolves the nova-demos monorepo root by walking up from this file, which
 * lives four levels deep at packages/demos-testkit/src/lib.
 *
 * @returns {Lib_Preset_GetRepoRoot_Returns}
 *
 * @since 2026.8.0
 */
export function getRepoRoot(): Lib_Preset_GetRepoRoot_Returns {
  const currentFilePath: Lib_Preset_GetRepoRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Lib_Preset_GetRepoRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..', '..', '..');
}

/**
 * Lib - Preset - Get Preset Root.
 *
 * Resolves the installed docusaurus-preset-nova package directory. Every
 * expectation in this testkit is derived from the dependency the demos actually consume.
 *
 * @returns {Lib_Preset_GetPresetRoot_Returns}
 *
 * @since 2026.8.0
 */
export function getPresetRoot(): Lib_Preset_GetPresetRoot_Returns {
  return resolve(getRepoRoot(), 'node_modules', '@cbnventures', 'docusaurus-preset-nova');
}

/**
 * Lib - Preset - To Kebab Case.
 *
 * Converts a PascalCase block name such as AppMarketDownload into the
 * kebab-case directory name the preset uses on disk.
 *
 * @param {Lib_Preset_ToKebabCase_Value} value - Value.
 *
 * @returns {Lib_Preset_ToKebabCase_Returns}
 *
 * @since 2026.8.0
 */
export function toKebabCase(value: Lib_Preset_ToKebabCase_Value): Lib_Preset_ToKebabCase_Returns {
  return value.replace(new RegExp(LIB_REGEX_PASCAL_BOUNDARY, 'g'), '$1-$2').toLowerCase();
}

/**
 * Lib - Preset - Read Block Names.
 *
 * Reads the preset's blocks barrel and returns every publicly exported block
 * name. This is the authoritative showcase surface, so a newly published block
 * immediately becomes a coverage requirement for every demo.
 *
 * @returns {Lib_Preset_ReadBlockNames_Returns}
 *
 * @since 2026.8.0
 */
export async function readBlockNames(): Lib_Preset_ReadBlockNames_Returns {
  const barrelPath: Lib_Preset_ReadBlockNames_BarrelPath = resolve(getPresetRoot(), 'build', 'src', 'blocks', 'index.js');
  const fileText: Lib_Preset_ReadBlockNames_FileText = await readFile(barrelPath, 'utf-8');
  const pattern: Lib_Preset_ReadBlockNames_Pattern = new RegExp(LIB_REGEX_BLOCK_EXPORT, 'g');
  const names: Lib_Preset_ReadBlockNames_Names = [];

  let match: Lib_Preset_ReadBlockNames_Match = pattern.exec(fileText);

  while (match !== null) {
    names.push(match[1] ?? '');

    match = pattern.exec(fileText);
  }

  return names;
}

/**
 * Lib - Preset - Read Type Aliases.
 *
 * Indexes every single-line exported type alias in a declaration file so a
 * prop's type expression can be resolved to its underlying union definition.
 *
 * @param {Lib_Preset_ReadTypeAliases_FileText} fileText - File text.
 *
 * @returns {Lib_Preset_ReadTypeAliases_Returns}
 *
 * @since 2026.8.0
 */
export function readTypeAliases(fileText: Lib_Preset_ReadTypeAliases_FileText): Lib_Preset_ReadTypeAliases_Returns {
  const aliases: Lib_Preset_ReadTypeAliases_Aliases = new Map();
  const pattern: Lib_Preset_ReadTypeAliases_Pattern = new RegExp(LIB_REGEX_PROPS_TYPE_ALIAS, 'g');

  let match: Lib_Preset_ReadTypeAliases_Match = pattern.exec(fileText);

  while (match !== null) {
    const aliasName: Lib_Preset_ReadTypeAliases_AliasName = match[1] ?? '';
    const aliasBody: Lib_Preset_ReadTypeAliases_AliasBody = match[2] ?? '';

    aliases.set(aliasName, aliasBody);

    match = pattern.exec(fileText);
  }

  return aliases;
}

/**
 * Lib - Preset - Read Variants.
 *
 * Expands a prop's type expression into its string-literal union members,
 * resolving one alias hop so a named union type yields its individual values.
 *
 * @param {Lib_Preset_ReadVariants_Expression} expression - Expression.
 * @param {Lib_Preset_ReadVariants_Aliases}    aliases    - Aliases.
 *
 * @returns {Lib_Preset_ReadVariants_Returns}
 *
 * @since 2026.8.0
 */
export function readVariants(expression: Lib_Preset_ReadVariants_Expression, aliases: Lib_Preset_ReadVariants_Aliases): Lib_Preset_ReadVariants_Returns {
  const resolved: Lib_Preset_ReadVariants_Resolved = aliases.get(expression.trim()) ?? expression;
  const pattern: Lib_Preset_ReadVariants_Pattern = new RegExp(LIB_REGEX_QUOTED_STRING, 'g');
  const variants: Lib_Preset_ReadVariants_Variants = [];

  let match: Lib_Preset_ReadVariants_Match = pattern.exec(resolved);

  while (match !== null) {
    variants.push(match[1] ?? '');

    match = pattern.exec(resolved);
  }

  return variants;
}

/**
 * Lib - Preset - Read Block Prop Surface.
 *
 * Returns every prop a block accepts, each flagged optional or required and
 * carrying its string-literal variant values. Presentation-only escape hatches
 * (className and style) are excluded since they showcase nothing.
 *
 * @param {Lib_Preset_ReadBlockPropSurface_BlockName} blockName - Block name.
 *
 * @returns {Lib_Preset_ReadBlockPropSurface_Returns}
 *
 * @since 2026.8.0
 */
export async function readBlockPropSurface(blockName: Lib_Preset_ReadBlockPropSurface_BlockName): Lib_Preset_ReadBlockPropSurface_Returns {
  const typeFilePath: Lib_Preset_ReadBlockPropSurface_TypeFilePath = resolve(getPresetRoot(), 'build', 'src', 'types', 'blocks', toKebabCase(blockName), 'index.d.ts');
  const fileText: Lib_Preset_ReadBlockPropSurface_FileText = await readFile(typeFilePath, 'utf-8');
  const aliases: Lib_Preset_ReadBlockPropSurface_Aliases = readTypeAliases(fileText);
  const objectMatch: Lib_Preset_ReadBlockPropSurface_ObjectMatch = new RegExp(LIB_REGEX_PROPS_OBJECT).exec(fileText);

  if (objectMatch === null) {
    return [];
  }

  const objectBody: Lib_Preset_ReadBlockPropSurface_ObjectBody = objectMatch[1] ?? '';
  const lines: Lib_Preset_ReadBlockPropSurface_Lines = objectBody.split('\n');
  const descriptors: Lib_Preset_ReadBlockPropSurface_Descriptors = [];

  for (const line of lines) {
    const fieldMatch: Lib_Preset_ReadBlockPropSurface_FieldMatch = line.match(LIB_REGEX_PROPS_FIELD);

    if (fieldMatch === null) {
      continue;
    }

    const fieldName: Lib_Preset_ReadBlockPropSurface_FieldName = fieldMatch[1] ?? '';
    const fieldOptional: Lib_Preset_ReadBlockPropSurface_FieldOptional = (fieldMatch[2] === '?');
    const fieldExpression: Lib_Preset_ReadBlockPropSurface_FieldExpression = fieldMatch[3] ?? '';

    if (
      fieldName === 'className'
      || fieldName === 'style'
      || fieldName === 'children'
    ) {
      continue;
    }

    const fieldAliasBody: Lib_Preset_ReadBlockPropSurface_FieldAliasBody = aliases.get(fieldExpression.trim()) ?? '';
    const fieldShared: Lib_Preset_ReadBlockPropSurface_FieldShared = fieldAliasBody.includes('Shared_');

    descriptors.push({
      name: fieldName,
      optional: fieldOptional,
      shared: fieldShared,
      variants: readVariants(fieldExpression, aliases),
    });
  }

  return descriptors;
}

/**
 * Lib - Preset - Read Block Variant Values.
 *
 * Collects every string-literal union member declared on a block's prop or item
 * type aliases. Scoping to _Props_ and _Item_ names keeps internal state unions,
 * such as the typewriter's animation phase, out of the coverage requirement.
 *
 * @param {Lib_Preset_ReadBlockVariantValues_BlockName} blockName - Block name.
 *
 * @returns {Lib_Preset_ReadBlockVariantValues_Returns}
 *
 * @since 2026.8.0
 */
export async function readBlockVariantValues(blockName: Lib_Preset_ReadBlockVariantValues_BlockName): Lib_Preset_ReadBlockVariantValues_Returns {
  const typeFilePath: Lib_Preset_ReadBlockVariantValues_TypeFilePath = resolve(getPresetRoot(), 'build', 'src', 'types', 'blocks', toKebabCase(blockName), 'index.d.ts');
  const fileText: Lib_Preset_ReadBlockVariantValues_FileText = await readFile(typeFilePath, 'utf-8');
  const aliases: Lib_Preset_ReadBlockVariantValues_Aliases = readTypeAliases(fileText);
  const sharedFilePath: Lib_Preset_ReadBlockVariantValues_SharedFilePath = resolve(getPresetRoot(), 'build', 'src', 'types', 'shared.d.ts');
  const sharedFileText: Lib_Preset_ReadBlockVariantValues_SharedFileText = await readFile(sharedFilePath, 'utf-8');
  const sharedAliases: Lib_Preset_ReadBlockVariantValues_SharedAliases = readTypeAliases(sharedFileText);
  const values: Lib_Preset_ReadBlockVariantValues_Values = [];

  for (const aliasEntry of aliases) {
    const currentAliasEntry: Lib_Preset_ReadBlockVariantValues_CurrentAliasEntry = aliasEntry;
    const aliasName: Lib_Preset_ReadBlockVariantValues_AliasName = currentAliasEntry[0];
    const aliasBody: Lib_Preset_ReadBlockVariantValues_AliasBody = currentAliasEntry[1];

    if (aliasName.includes('_Props_') === false && aliasName.includes('_Item_') === false) {
      continue;
    }

    const bodyParts: Lib_Preset_ReadBlockVariantValues_BodyParts = aliasBody.split('|');
    const resolvedParts: Lib_Preset_ReadBlockVariantValues_ResolvedParts = [];

    for (const bodyPart of bodyParts) {
      const trimmedPart: Lib_Preset_ReadBlockVariantValues_TrimmedPart = bodyPart.trim();

      if (sharedAliases.has(trimmedPart) === true) {
        continue;
      }

      resolvedParts.push(trimmedPart);
    }

    const resolvedBody: Lib_Preset_ReadBlockVariantValues_ResolvedBody = resolvedParts.join(' | ');
    const members: Lib_Preset_ReadBlockVariantValues_Members = readVariants(resolvedBody, aliases);

    for (const member of members) {
      if (values.includes(member) === false) {
        values.push(member);
      }
    }
  }

  return values.sort();
}

/**
 * Lib - Preset - Read Theme Config Leaf Paths.
 *
 * Walks NovaThemeConfig in the preset's shipped nova-config.d.ts and returns
 * every dotted leaf path. Deriving the catalogue means a new preset config
 * field becomes a demo requirement without any registry to hand-maintain.
 *
 * @returns {Lib_Preset_ReadThemeConfigLeafPaths_Returns}
 *
 * @since 2026.8.0
 */
export async function readThemeConfigLeafPaths(): Lib_Preset_ReadThemeConfigLeafPaths_Returns {
  const typeFilePath: Lib_Preset_ReadThemeConfigLeafPaths_TypeFilePath = resolve(getPresetRoot(), 'nova-config.d.ts');
  const fileText: Lib_Preset_ReadThemeConfigLeafPaths_FileText = await readFile(typeFilePath, 'utf-8');
  const objectTypes: Lib_Preset_ReadThemeConfigLeafPaths_ObjectTypes = new Map();
  const blockPattern: Lib_Preset_ReadThemeConfigLeafPaths_BlockPattern = new RegExp(LIB_REGEX_THEME_CONFIG_OBJECT_TYPE, 'g');

  let blockMatch: Lib_Preset_ReadThemeConfigLeafPaths_BlockMatch = blockPattern.exec(fileText);

  while (blockMatch !== null) {
    const typeName: Lib_Preset_ReadThemeConfigLeafPaths_TypeName = blockMatch[1] ?? '';
    const blockBody: Lib_Preset_ReadThemeConfigLeafPaths_BlockBody = blockMatch[2] ?? '';
    const fields: Lib_Preset_ReadThemeConfigLeafPaths_Fields = new Map();
    const lines: Lib_Preset_ReadThemeConfigLeafPaths_Lines = blockBody.split('\n');

    for (const line of lines) {
      const fieldMatch: Lib_Preset_ReadThemeConfigLeafPaths_FieldMatch = line.match(LIB_REGEX_PROPS_FIELD);

      if (fieldMatch === null) {
        continue;
      }

      const fieldName: Lib_Preset_ReadThemeConfigLeafPaths_FieldName = fieldMatch[1] ?? '';
      const fieldExpression: Lib_Preset_ReadThemeConfigLeafPaths_FieldExpression = (fieldMatch[3] ?? '').trim();
      const fieldTypeMatch: Lib_Preset_ReadThemeConfigLeafPaths_FieldTypeMatch = fieldExpression.match(LIB_REGEX_THEME_CONFIG_TYPE_REFERENCE);
      const fieldType: Lib_Preset_ReadThemeConfigLeafPaths_FieldType = (fieldTypeMatch !== null && fieldTypeMatch[1] !== undefined) ? fieldTypeMatch[1] : fieldExpression;

      fields.set(fieldName, fieldType);
    }

    objectTypes.set(typeName, fields);

    blockMatch = blockPattern.exec(fileText);
  }

  const leaves: Lib_Preset_ReadThemeConfigLeafPaths_Leaves = [];
  const walkStack: Lib_Preset_ReadThemeConfigLeafPaths_WalkStack = [{
    typeName: 'NovaThemeConfig',
    path: ['themeConfig'],
  }];

  while (walkStack.length > 0) {
    const entry: Lib_Preset_ReadThemeConfigLeafPaths_Entry = walkStack.pop() as Lib_Preset_ReadThemeConfigLeafPaths_Entry;
    const entryFields: Lib_Preset_ReadThemeConfigLeafPaths_EntryFields = objectTypes.get(entry['typeName']);

    if (entryFields === undefined) {
      leaves.push(entry['path'].join('.'));

      continue;
    }

    for (const fieldEntry of entryFields) {
      const walkFieldEntry: Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldEntry = fieldEntry;
      const walkFieldName: Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldName = walkFieldEntry[0];
      const walkFieldType: Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldType = walkFieldEntry[1];

      walkStack.push({
        typeName: walkFieldType,
        path: [
          ...entry['path'],
          walkFieldName,
        ],
      });
    }
  }

  return leaves;
}
