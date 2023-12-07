import type { ValueGroup, ValueGroupItem } from '../../data/value-breakdown';
import { recreateWithTotalForValueGroup } from '../value-group';

/**
 * Flatten a {@link ValueGroup} with `number[]` into `number`.
 * This is done by taking the value at the given {@link index}.
 */
export const flatternValueGroupsForIndex = (groups: ValueGroup<number[]>[], index: number): ValueGroup<number>[] => {
  return recreateWithTotalForValueGroup(
    groups.map<ValueGroup<number>>((x) => {
      return {
        index: x.index,
        total: x.total[index],
        items: x.items.map<ValueGroupItem<number>>((xx) => {
          return {
            index: xx.index,
            value: xx.value[index],
          };
        }),
      };
    }),
  );
};

/**
 * Flatten a {@link ValueGroup} with `number[]` into `number`.
 *
 * This is done by taking the first value from each array.
 * This value should be the total entry.
 *
 * @deprecated use {@link flatternValueGroupsForIndex} directly.
 */
export const flatternValueGroups = (groups: ValueGroup<number[]>[]): ValueGroup<number>[] => {
  return flatternValueGroupsForIndex(groups, 0);
};
