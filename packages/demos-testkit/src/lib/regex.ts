/**
 * Lib - Regex - Block Export.
 *
 * Captures the exported block name from a re-export line in the preset's
 * blocks barrel file, such as "export { default as Hero }".
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_BLOCK_EXPORT = /export\s*\{\s*default\s+as\s+(\w+)\s*\}/;

/**
 * Lib - Regex - Props Object.
 *
 * Captures the body of a block's exported Props object type so its individual
 * fields can be enumerated by the props-coverage suite.
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_PROPS_OBJECT = /export type \w*_Props = \{([\s\S]*?)\n\};/;

/**
 * Lib - Regex - Props Field.
 *
 * Captures the field name, its optional marker, and its type expression from a
 * single line inside a Props object body.
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_PROPS_FIELD = /^\s*(\w+)(\??):\s*([^;]+);/;

/**
 * Lib - Regex - Props Type Alias.
 *
 * Captures the name and right-hand side of a block's per-prop type alias so
 * string-literal unions can be expanded into their individual variant values.
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_PROPS_TYPE_ALIAS = /export type (\w+) = ([^;]+);/;

/**
 * Lib - Regex - Quoted String.
 *
 * Captures each single-quoted value, used to read union variant members and
 * locale codes out of a captured source fragment.
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_QUOTED_STRING = /'([^']+)'/;

/**
 * Lib - Regex - Theme Config Object Type.
 *
 * Captures the name and body of each NovaThemeConfig object type alias so the
 * full leaf-path catalogue can be walked.
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_THEME_CONFIG_OBJECT_TYPE = /export type (NovaThemeConfig\w*) = \{([\s\S]*?)\n\};/;

/**
 * Lib - Regex - Theme Config Type Reference.
 *
 * Captures a referenced NovaThemeConfig type alias from a field's type
 * expression so the leaf walk can recurse into nested objects.
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_THEME_CONFIG_TYPE_REFERENCE = /(NovaThemeConfig\w*)/;

/**
 * Lib - Regex - Identifier Char.
 *
 * Matches a single identifier character, used to confirm a block tag match ends
 * at a real boundary so "<Stats" does not also match "<StatsPanel".
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_IDENTIFIER_CHAR = /[A-Za-z0-9_]/;

/**
 * Lib - Regex - Pascal Boundary.
 *
 * Captures the seam between a lowercase or digit character and an uppercase
 * character, used to convert a PascalCase block name into its kebab-case directory.
 *
 * @since UNRELEASED
 */
export const LIB_REGEX_PASCAL_BOUNDARY = /([a-z0-9])([A-Z])/;
