/**
 * Lib - Demos - Demo Record.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_DemoRecord = Record<string, unknown>;

/**
 * Lib - Demos - Discover Demo Names.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_DiscoverDemoNames_Returns = Promise<string[]>;

export type Lib_Demos_DiscoverDemoNames_AppsDirectory = string;

export type Lib_Demos_DiscoverDemoNames_Entries = string[];

export type Lib_Demos_DiscoverDemoNames_Names = string[];

/**
 * Lib - Demos - Get Demo Root.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_GetDemoRoot_DemoName = string;

export type Lib_Demos_GetDemoRoot_Returns = string;

/**
 * Lib - Demos - Load Demo Config.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_LoadDemoConfig_DemoName = string;

export type Lib_Demos_LoadDemoConfig_Returns = Promise<Lib_Demos_DemoRecord>;

export type Lib_Demos_LoadDemoConfig_ConfigUrl = string;

export type Lib_Demos_LoadDemoConfig_ModuleNamespace = Record<string, unknown>;

/**
 * Lib - Demos - List Files.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_ListFiles_Directory = string;

export type Lib_Demos_ListFiles_Returns = Promise<string[]>;

export type Lib_Demos_ListFiles_Entries = string[];

/**
 * Lib - Demos - Read Showcase Source.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_ReadShowcaseSource_DemoName = string;

export type Lib_Demos_ReadShowcaseSource_Returns = Promise<string>;

export type Lib_Demos_ReadShowcaseSource_Directories = string[];

export type Lib_Demos_ReadShowcaseSource_Files = string[];

export type Lib_Demos_ReadShowcaseSource_Contents = string[];

export type Lib_Demos_ReadShowcaseSource_FileText = string;

/**
 * Lib - Demos - Extract Block Usage Text.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_ExtractBlockUsageText_Source = string;

export type Lib_Demos_ExtractBlockUsageText_BlockName = string;

export type Lib_Demos_ExtractBlockUsageText_Returns = string;

export type Lib_Demos_ExtractBlockUsageText_Marker = string;

export type Lib_Demos_ExtractBlockUsageText_Parts = string[];

export type Lib_Demos_ExtractBlockUsageText_StartIndex = number;

export type Lib_Demos_ExtractBlockUsageText_AfterCharacter = string;

export type Lib_Demos_ExtractBlockUsageText_Depth = number;

export type Lib_Demos_ExtractBlockUsageText_Index = number;

export type Lib_Demos_ExtractBlockUsageText_Character = string;

/**
 * Lib - Demos - Resolve Leaf.
 *
 * @since UNRELEASED
 */
export type Lib_Demos_ResolveLeaf_Config = unknown;

export type Lib_Demos_ResolveLeaf_Path = string;

export type Lib_Demos_ResolveLeaf_Returns = string | null;

export type Lib_Demos_ResolveLeaf_Segments = string[];

export type Lib_Demos_ResolveLeaf_Cursor = unknown;

export type Lib_Demos_ResolveLeaf_Index = number;

export type Lib_Demos_ResolveLeaf_SegmentName = string;
