import type { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from './cost-element-reference';
import type { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from './cost-summary';
import { parseValueGroupItemIndex } from './value-index';

/**
 * A value group of type {@link T}.
 */
export type ValueGroup<T> = {
  readonly index: string;
  readonly total: T;
  readonly items: ValueGroupItem<T>[];
};

/**
 * A collection of {@link ValueGroup} of type {@link T}.
 *
 * @deprecated use `ValueGroup<T>[]` directly, to be removed in `2.1`
 */
export type ValueGroupCollection<T> = ValueGroup<T>[];

/**
 * Retrieve a {@link CostSummaryGroupIndex} or {@link CostElementReferenceGroupIndex} from the given {@link haystack}.
 */
export const getValueGroupByIndex = <T>(haystack: ValueGroup<T>[], index: CostSummaryGroupIndex | CostElementReferenceGroupIndex): ValueGroup<T> | undefined => {
  return haystack.find((group) => {
    return group.index === index;
  });
};

/**
 * A value group item of type {@link T}.
 */
export type ValueGroupItem<T> = {
  readonly index: string;
  readonly value: T;
};

/**
 * Retrieve a {@link CostSummaryGroupItemIndex} or {@link CostElementReferenceGroupItemIndex} from the given {@link haystack}.
 */
export const getValueGroupItemByIndex = <T>(haystack: ValueGroup<T>[], index: CostSummaryGroupItemIndex | CostElementReferenceGroupItemIndex): ValueGroupItem<T> | undefined => {
  const parsed = parseValueGroupItemIndex(index);
  const group = getValueGroupByIndex(haystack, parsed.group);

  if (group === undefined) {
    return group;
  }

  return group.items.find((item) => {
    return item.index === index;
  });
};

/**
 * A grouping of summary and element reference values and items.
 */
export type ValueBreakdownArea<V> = {
  /**
   * The value summary line items.
   */
  readonly summary: ValueGroup<V>[];

  /**
   * The value element reference line items.
   */
  readonly element: ValueGroup<V>[];
};

/**
 * A grouping of modular and base build value items.
 */
export type ValueBreakdown<V> = {
  /**
   * The values for the modular aspect.
   */
  readonly modular: ValueBreakdownArea<V>;

  /**
   * The values for the base build aspect.
   */
  readonly basebuild: ValueBreakdownArea<V>;
};
