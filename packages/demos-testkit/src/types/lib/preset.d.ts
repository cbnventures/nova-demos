/**
 * Lib - Preset - Get Repo Root.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_GetRepoRoot_Returns = string;

export type Lib_Preset_GetRepoRoot_CurrentFilePath = string;

export type Lib_Preset_GetRepoRoot_CurrentFileDirectory = string;

/**
 * Lib - Preset - Get Preset Root.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_GetPresetRoot_Returns = string;

/**
 * Lib - Preset - To Kebab Case.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_ToKebabCase_Value = string;

export type Lib_Preset_ToKebabCase_Returns = string;

/**
 * Lib - Preset - Read Block Names.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_ReadBlockNames_Returns = Promise<string[]>;

export type Lib_Preset_ReadBlockNames_BarrelPath = string;

export type Lib_Preset_ReadBlockNames_FileText = string;

export type Lib_Preset_ReadBlockNames_Pattern = RegExp;

export type Lib_Preset_ReadBlockNames_Match = RegExpExecArray | null;

export type Lib_Preset_ReadBlockNames_Names = string[];

/**
 * Lib - Preset - Read Type Aliases.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_ReadTypeAliases_FileText = string;

export type Lib_Preset_ReadTypeAliases_Returns = Map<string, string>;

export type Lib_Preset_ReadTypeAliases_Aliases = Map<string, string>;

export type Lib_Preset_ReadTypeAliases_Pattern = RegExp;

export type Lib_Preset_ReadTypeAliases_Match = RegExpExecArray | null;

export type Lib_Preset_ReadTypeAliases_AliasName = string;

export type Lib_Preset_ReadTypeAliases_AliasBody = string;

/**
 * Lib - Preset - Read Variants.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_ReadVariants_Expression = string;

export type Lib_Preset_ReadVariants_Aliases = Map<string, string>;

export type Lib_Preset_ReadVariants_Returns = string[];

export type Lib_Preset_ReadVariants_Resolved = string;

export type Lib_Preset_ReadVariants_Pattern = RegExp;

export type Lib_Preset_ReadVariants_Match = RegExpExecArray | null;

export type Lib_Preset_ReadVariants_Variants = string[];

/**
 * Lib - Preset - Prop Descriptor.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_PropDescriptor = {
  name: string;
  optional: boolean;
  shared: boolean;
  variants: string[];
};

/**
 * Lib - Preset - Read Block Prop Surface.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_ReadBlockPropSurface_BlockName = string;

export type Lib_Preset_ReadBlockPropSurface_Returns = Promise<Lib_Preset_PropDescriptor[]>;

export type Lib_Preset_ReadBlockPropSurface_TypeFilePath = string;

export type Lib_Preset_ReadBlockPropSurface_FileText = string;

export type Lib_Preset_ReadBlockPropSurface_Aliases = Map<string, string>;

export type Lib_Preset_ReadBlockPropSurface_ObjectMatch = RegExpExecArray | null;

export type Lib_Preset_ReadBlockPropSurface_ObjectBody = string;

export type Lib_Preset_ReadBlockPropSurface_Lines = string[];

export type Lib_Preset_ReadBlockPropSurface_FieldMatch = RegExpMatchArray | null;

export type Lib_Preset_ReadBlockPropSurface_FieldName = string;

export type Lib_Preset_ReadBlockPropSurface_FieldOptional = boolean;

export type Lib_Preset_ReadBlockPropSurface_FieldExpression = string;

export type Lib_Preset_ReadBlockPropSurface_FieldAliasBody = string;

export type Lib_Preset_ReadBlockPropSurface_FieldShared = boolean;

export type Lib_Preset_ReadBlockPropSurface_Descriptors = Lib_Preset_PropDescriptor[];

/**
 * Lib - Preset - Read Block Variant Values.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_ReadBlockVariantValues_BlockName = string;

export type Lib_Preset_ReadBlockVariantValues_Returns = Promise<string[]>;

export type Lib_Preset_ReadBlockVariantValues_TypeFilePath = string;

export type Lib_Preset_ReadBlockVariantValues_FileText = string;

export type Lib_Preset_ReadBlockVariantValues_Aliases = Map<string, string>;

export type Lib_Preset_ReadBlockVariantValues_Values = string[];

export type Lib_Preset_ReadBlockVariantValues_AliasEntry = [string, string];

export type Lib_Preset_ReadBlockVariantValues_AliasName = string;

export type Lib_Preset_ReadBlockVariantValues_AliasBody = string;

export type Lib_Preset_ReadBlockVariantValues_Members = string[];

/**
 * Lib - Preset - Read Theme Config Leaf Paths.
 *
 * @since UNRELEASED
 */
export type Lib_Preset_ReadThemeConfigLeafPaths_Returns = Promise<string[]>;

export type Lib_Preset_ReadThemeConfigLeafPaths_TypeFilePath = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_FileText = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_ObjectTypes = Map<string, Map<string, string>>;

export type Lib_Preset_ReadThemeConfigLeafPaths_BlockPattern = RegExp;

export type Lib_Preset_ReadThemeConfigLeafPaths_BlockMatch = RegExpExecArray | null;

export type Lib_Preset_ReadThemeConfigLeafPaths_TypeName = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_BlockBody = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_Fields = Map<string, string>;

export type Lib_Preset_ReadThemeConfigLeafPaths_Lines = string[];

export type Lib_Preset_ReadThemeConfigLeafPaths_FieldMatch = RegExpMatchArray | null;

export type Lib_Preset_ReadThemeConfigLeafPaths_FieldName = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_FieldExpression = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_FieldTypeMatch = RegExpMatchArray | null;

export type Lib_Preset_ReadThemeConfigLeafPaths_FieldType = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_Leaves = string[];

export type Lib_Preset_ReadThemeConfigLeafPaths_WalkEntry = {
  typeName: string;
  path: string[];
};

export type Lib_Preset_ReadThemeConfigLeafPaths_WalkStack = Lib_Preset_ReadThemeConfigLeafPaths_WalkEntry[];

export type Lib_Preset_ReadThemeConfigLeafPaths_Entry = Lib_Preset_ReadThemeConfigLeafPaths_WalkEntry;

export type Lib_Preset_ReadThemeConfigLeafPaths_EntryFields = Map<string, string> | undefined;

export type Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldEntry = [string, string];

export type Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldName = string;

export type Lib_Preset_ReadThemeConfigLeafPaths_WalkFieldType = string;
