/**
 * Tests - Prop Coverage - Block Surface.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_BlockSurface_Name = string;

export type Tests_PropCoverage_BlockSurface_Props = string[];

export type Tests_PropCoverage_BlockSurface_SharedProps = string[];

export type Tests_PropCoverage_BlockSurface_Variants = string[];

export type Tests_PropCoverage_BlockSurface = {
  name: Tests_PropCoverage_BlockSurface_Name;
  props: Tests_PropCoverage_BlockSurface_Props;
  sharedProps: Tests_PropCoverage_BlockSurface_SharedProps;
  variants: Tests_PropCoverage_BlockSurface_Variants;
};

/**
 * Tests - Prop Coverage - Demo Names.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_DemoNames = string[];

/**
 * Tests - Prop Coverage - Block Names.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_BlockNames = string[];

/**
 * Tests - Prop Coverage - Surfaces.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_Surfaces = Tests_PropCoverage_BlockSurface[];

/**
 * Tests - Prop Coverage - Source By Demo.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_SourceByDemo = Map<string, string>;

/**
 * Tests - Prop Coverage - Descriptors.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_Descriptors_Name = string;

export type Tests_PropCoverage_Descriptors_Optional = boolean;

export type Tests_PropCoverage_Descriptors_Shared = boolean;

export type Tests_PropCoverage_Descriptors_Variants = string[];

export type Tests_PropCoverage_Descriptors = {
  name: Tests_PropCoverage_Descriptors_Name;
  optional: Tests_PropCoverage_Descriptors_Optional;
  shared: Tests_PropCoverage_Descriptors_Shared;
  variants: Tests_PropCoverage_Descriptors_Variants;
}[];

/**
 * Tests - Prop Coverage - Prop Names.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_PropNames = string[];

/**
 * Tests - Prop Coverage - Shared Prop Names.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_SharedPropNames = string[];

/**
 * Tests - Prop Coverage - Prop Coverage.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_PropCoverage_CurrentSurface_Name = string;

export type Tests_PropCoverage_PropCoverage_CurrentSurface_Props = string[];

export type Tests_PropCoverage_PropCoverage_CurrentSurface_SharedProps = string[];

export type Tests_PropCoverage_PropCoverage_CurrentSurface_Variants = string[];

export type Tests_PropCoverage_PropCoverage_CurrentSurface = {
  name: Tests_PropCoverage_PropCoverage_CurrentSurface_Name;
  props: Tests_PropCoverage_PropCoverage_CurrentSurface_Props;
  sharedProps: Tests_PropCoverage_PropCoverage_CurrentSurface_SharedProps;
  variants: Tests_PropCoverage_PropCoverage_CurrentSurface_Variants;
};

export type Tests_PropCoverage_PropCoverage_Source = string;

export type Tests_PropCoverage_PropCoverage_ScopedSource = string;

export type Tests_PropCoverage_PropCoverage_Missing = string[];

export type Tests_PropCoverage_PropCoverage_CurrentPropName = string;

export type Tests_PropCoverage_PropCoverage_CurrentSharedPropName = string;

export type Tests_PropCoverage_PropCoverage_CurrentVariantValue = string;

export type Tests_PropCoverage_PropCoverage_Message = string;

/**
 * Tests - Prop Coverage - Prop Coverage - Derived A Prop Surface For Every Exported Block.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_PropCoverage_DerivedAPropSurfaceForEveryExportedBlock_Returns = void;

/**
 * Tests - Prop Coverage - Prop Coverage - Derived At Least One Variant Value Across The Block Surface.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_PropCoverage_DerivedAtLeastOneVariantValueAcrossTheBlockSurface_TotalPoints = number;
