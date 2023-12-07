import { toPrecision } from '@project-rouge/service-core/data/number';
import type { ValueGroup } from '../data/value-breakdown';
import { sortValueGroupIndexFunction } from '../data/value-index';

/**
 * Recreate the value group collection and total all values.
 */
export const recreateWithTotalForValueGroup = (grouping: ValueGroup<number>[]): ValueGroup<number>[] => {
  const output: ValueGroup<number>[] = [];

  for (const x of grouping) {
    const total = toPrecision(x.items.reduce((total, item) => item.value + total, 0), 2);

    const group: ValueGroup<number> = {
      index: x.index,
      items: x.items,
      total,
    };

    group.items.sort(sortValueGroupIndexFunction);

    output.push(group);
  }

  output.sort(sortValueGroupIndexFunction);

  return output;
};
