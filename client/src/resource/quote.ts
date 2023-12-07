import type { BuildingDataMapping } from '../data/building';
import type { ValueBreakdown } from '../data/value-breakdown';

/**
 * @deprecated use `post-project-costing-calculation-resource` instead.
 */
export type QuoteHttpResource = {
  readonly building: BuildingDataMapping;
  readonly costing: ValueBreakdown<number>;
};
