import { toPrecision } from '@project-rouge/service-core/data/number';
import type { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from '../../data/cost-element-reference';
import type { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '../../data/cost-summary';
import type { ValueBreakdown, ValueGroup, ValueGroupItem } from '../../data/value-breakdown';
import { getValueGroupByIndex, getValueGroupItemByIndex } from '../../data/value-breakdown';
import { sortValueGroupIndexFunction } from '../../data/value-index';

/**
 * Recreate the value group collection and total all values.
 * The total is added as the first element in the value arrays.
 */
export const recreateWithTotalForValueGroupAggregated = (grouping: ValueGroup<number[]>[]): ValueGroup<number[]>[] => {
  const output: ValueGroup<number[]>[] = [];

  for (const x of grouping) {
    const total = toPrecision(x.total.reduce((total, value) => total + value, 0), 2);
    const group: ValueGroup<number[]> = {
      index: x.index,
      total: [total, ...x.total],
      items: [],
    };

    for (const xx of x.items) {
      const total = toPrecision(xx.value.reduce((total, value) => total + value, 0), 2);
      const item: ValueGroupItem<number[]> = {
        index: xx.index,
        value: [total, ...xx.value],
      };

      group.items.push(item);
    }

    group.items.sort(sortValueGroupIndexFunction);

    output.push(group);
  }

  output.sort(sortValueGroupIndexFunction);

  return output;
};

/**
 * Aggregate all the value summary groups given into a single collection of numbers.
 */
export const aggregateValueGroups = (summaries: ValueGroup<number>[][]): ValueGroup<number[]>[] => {
  const output: ValueGroup<number[]>[] = [];
  const numbers = new Array(summaries.length).fill(0);

  for (const i in summaries) {
    const summary = summaries[i];

    for (const x of summary) {
      let group: ValueGroup<number[]> | undefined = output.find((v) => v.index === x.index);

      if (group === undefined) {
        group = {
          index: x.index,
          total: [...numbers],
          items: [],
        };

        output.push(group);
      }

      group.total[i] = x.total;

      for (const xx of x.items) {
        // We know this exists as we just created it!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const group = output.find((v) => v.index === x.index)!;
        let item = group.items.find((v) => v.index === xx.index);

        if (item === undefined) {
          item = {
            index: xx.index,
            value: [...numbers],
          };

          group.items.push(item);
        }

        item.value[i] = xx.value;
      }
    }
  }

  return output;
};

/**
 * Aggregate all the cost breakdowns.
 *
 * This reduces all given value breakdowns into a single one with multiple numbers for each numeric value.
 * Additionally a total is created and added as the first element of the number arrays.
 * Therefore the values are `[total, 0.total, 1.total, ...]` depending on amount of breakdowns given.
 */
export const aggregateValueBreakdown = (costs: ValueBreakdown<number>[]): ValueBreakdown<number[]> => {
  return {
    modular: {
      summary: recreateWithTotalForValueGroupAggregated(
        aggregateValueGroups(
          costs.map((x) => x.modular.summary),
        ),
      ),

      element: recreateWithTotalForValueGroupAggregated(
        aggregateValueGroups(
          costs.map((x) => x.modular.element),
        ),
      ),
    },

    basebuild: {
      summary: recreateWithTotalForValueGroupAggregated(
        aggregateValueGroups(
          costs.map((x) => x.basebuild.summary),
        ),
      ),

      element: recreateWithTotalForValueGroupAggregated(
        aggregateValueGroups(
          costs.map((x) => x.basebuild.element),
        ),
      ),
    },
  };
};

/**
 * Return the total value of the group for the given {@link index}.
 */
export const getAggregateValueGroupTotalByIndex = (aggregated: ValueGroup<number[]>[], index: CostSummaryGroupIndex | CostElementReferenceGroupIndex): number | undefined => {
  return getValueGroupByIndex(aggregated, index)?.total?.[0];
};

/**
 * Return the total value of the group item for the given {@link index}.
 */
export const getAggregateValueGroupItemTotalByIndex = (aggregated: ValueGroup<number[]>[], index: CostSummaryGroupItemIndex | CostElementReferenceGroupItemIndex): number | undefined => {
  return getValueGroupItemByIndex(aggregated, index)?.value?.[0];
};
