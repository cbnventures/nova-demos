/**
 * Tests - Preset Root - Package Name.
 *
 * @since 2026.11.1
 */
export type Tests_PresetRoot_PackageName = string;

/**
 * Tests - Preset Root - Temp Root.
 *
 * @since 2026.11.1
 */
export type Tests_PresetRoot_TempRoot = string;

/**
 * Tests - Preset Root - Create Fake Tree.
 *
 * @since 2026.11.1
 */
export type Tests_PresetRoot_CreateFakeTree_LayoutName = string;

export type Tests_PresetRoot_CreateFakeTree_EntrySegments = string[];

export type Tests_PresetRoot_CreateFakeTree_Returns = Promise<string>;

export type Tests_PresetRoot_CreateFakeTree_ProjectRoot = string;

export type Tests_PresetRoot_CreateFakeTree_PackageRoot = string;

export type Tests_PresetRoot_CreateFakeTree_EntryPath = string;

export type Tests_PresetRoot_CreateFakeTree_BuildPackagePath = string;

/**
 * Tests - Preset Root - Preset Root.
 *
 * @since 2026.11.1
 */
export type Tests_PresetRoot_PresetRoot_LayoutCaseLayoutName = string;

export type Tests_PresetRoot_PresetRoot_LayoutCaseEntrySegments = string[];

export type Tests_PresetRoot_PresetRoot_LayoutCase = {
  layoutName: Tests_PresetRoot_PresetRoot_LayoutCaseLayoutName;
  entrySegments: Tests_PresetRoot_PresetRoot_LayoutCaseEntrySegments;
};

export type Tests_PresetRoot_PresetRoot_LayoutCases = Tests_PresetRoot_PresetRoot_LayoutCase[];

export type Tests_PresetRoot_PresetRoot_EntryPath = string;

export type Tests_PresetRoot_PresetRoot_ExpectedRoot = string;

export type Tests_PresetRoot_PresetRoot_ResolvedRoot = string;

/**
 * Tests - Preset Root - Preset Root - Throws Without Named Manifest.
 *
 * @since 2026.11.1
 */
export type Tests_PresetRoot_PresetRoot_ThrowsWithoutNamedManifest_EntryPath = string;
