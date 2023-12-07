import { parseIntegerFromString } from '@project-rouge/service-core/data/number';
import type { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from './cost-element-reference';
import type { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from './cost-summary';

/**
 * A value group index is made up of a group number and an item number.
 * These numbers represent a line item in the data structure.
 */
export type ValueGroupItemIndex = {
  readonly group: CostSummaryGroupIndex | CostElementReferenceGroupIndex;
  readonly item: CostSummaryGroupItemIndex | CostElementReferenceGroupItemIndex;
};

/**
 * Attempt to parse a value group item index.
 * This should be two numbers separated by a `.`, this looks like a floating point number but it is not.
 *
 * @example `13.1`
 * @example `5.12`
 */
export const parseValueGroupItemIndex = (value: string): ValueGroupItemIndex => {
  const parts = value.split('.');

  return {
    group: parts[0] as CostSummaryGroupIndex | CostElementReferenceGroupIndex,
    item: parts[1] as CostSummaryGroupItemIndex | CostElementReferenceGroupItemIndex,
  };
};

/**
 * A sort function that will order value groups in order if their index.
 */
export const sortValueGroupIndexFunction = (a: { index: string }, b: { index: string }): number => {
  const aa = parseValueGroupItemIndex(a.index);
  const bb = parseValueGroupItemIndex(b.index);

  if (aa.item === undefined) {
    return parseIntegerFromString(aa.group) - parseIntegerFromString(bb.group);
  }

  return parseIntegerFromString(aa.item) - parseIntegerFromString(bb.item);
};
