/**
 * Tests - Prop Coverage - Block Surface.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_BlockSurface = {
  name: string;
  props: string[];
  sharedProps: string[];
  variants: string[];
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
export type Tests_PropCoverage_Descriptors = {
  name: string;
  optional: boolean;
  shared: boolean;
  variants: string[];
}[];

/**
 * Tests - Prop Coverage - Prop Names.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_PropNames = string[];

/**
 * Tests - Prop Coverage - Prop Coverage.
 *
 * @since UNRELEASED
 */
export type Tests_PropCoverage_PropCoverage_Source = string;

export type Tests_PropCoverage_PropCoverage_ScopedSource = string;

export type Tests_PropCoverage_PropCoverage_Missing = string[];

export type Tests_PropCoverage_PropCoverage_Message = string;

export type Tests_PropCoverage_PropCoverage_Surface = Tests_PropCoverage_BlockSurface;

export type Tests_PropCoverage_PropCoverage_PropName = string;

export type Tests_PropCoverage_PropCoverage_VariantValue = string;

export type Tests_PropCoverage_PropCoverage_TotalPoints = number;
