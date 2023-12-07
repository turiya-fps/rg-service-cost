import type { Mutable } from '@matt-usurp/grok';
import { sum, toPrecision } from '@project-rouge/service-core/data/number';
import type { ValueGroup, ValueGroupItem } from '../../data/value-breakdown';

/**
 * A utility function that alters the given {@link output} by merginging in the given {@link summary}.
 *
 * When merging the values and totals are updated, existing items are summed.
 * Missing items are added and the totals are aligned with those items.
 */
export const mergeValueGroupIntoOutput = (summary: ValueGroup<number>[], output: ValueGroup<number>[]): void => {
  for (const x of summary) {
    let group: Mutable<ValueGroup<number>> | undefined = output.find((group) => {
      return x.index === group.index;
    });

    // Create the group if its missing.
    if (group === undefined) {
      group = {
        index: x.index,
        total: 0,
        items: [],
      };

      output.push(group);
    }

    if (group.items.length === 0) {
      group.total = toPrecision(group.total + x.total, 2);
    }

    for (const xx of x.items) {
      let item: Mutable<ValueGroupItem<number>> | undefined = group.items.find((v) => {
        return v.index === xx.index;
      });

      // Create the item if its missing.
      if (item === undefined) {
        item = {
          index: xx.index,
          value: xx.value,
        };

        group.items.push(item);
      } else {
        // Otherwise we add the cost, the items are the same here.
        item.value = toPrecision(item.value + xx.value, 2);
      }
    }

    // Calculate the group total value from all items.
    // This is difficult to do in the loop above, so a reduce happens at the end.
    group.total = toPrecision(sum(group.items.map((x) => x.value)), 2);
  }

  // Coverage is struggling with the final bracket.
  // Coverage issues come from AST transforms that are not perfect from TS.
  // So this is fine, we can try removing it sometimes to see if it gets fixed.
  /* c8 ignore next */
};

/**
 * Sum two value groups together into one value group.
 *
 * This can be used to simplify the data structure when building summary tables.
 * These values are typically summed across the both the modular and base build summaries.
 */
export const sumValueGroups = (a: ValueGroup<number>[], b: ValueGroup<number>[]): ValueGroup<number>[] => {
  const output: ValueGroup<number>[] = [];

  mergeValueGroupIntoOutput(a, output);
  mergeValueGroupIntoOutput(b, output);

  return output;
};
