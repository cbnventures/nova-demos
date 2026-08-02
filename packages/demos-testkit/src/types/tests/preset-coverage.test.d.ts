/**
 * Tests - Preset Coverage - Demo Names.
 *
 * @since UNRELEASED
 */
export type Tests_PresetCoverage_DemoNames = string[];

/**
 * Tests - Preset Coverage - Leaf Paths.
 *
 * @since UNRELEASED
 */
export type Tests_PresetCoverage_LeafPaths = string[];

/**
 * Tests - Preset Coverage - Config By Demo.
 *
 * @since UNRELEASED
 */
export type Tests_PresetCoverage_ConfigByDemo = Map<string, Record<string, unknown>>;

/**
 * Tests - Preset Coverage - Preset Coverage.
 *
 * @since UNRELEASED
 */
export type Tests_PresetCoverage_PresetCoverage_Config = Record<string, unknown> | undefined;

export type Tests_PresetCoverage_PresetCoverage_Misses = string[];

export type Tests_PresetCoverage_PresetCoverage_Message = string;

export type Tests_PresetCoverage_PresetCoverage_LeafPath = string;

export type Tests_PresetCoverage_PresetCoverage_MissAt = string | null;
