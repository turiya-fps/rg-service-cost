import { COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES } from '../data/cost-element-reference';
import type { ValueGroup, ValueGroupItem } from '../data/value-breakdown';
import { parseValueGroupItemIndex, sortValueGroupIndexFunction } from '../data/value-index';

/**
 * Insert the missing element reference group items and return a newly constructed {@link group}.
 * All new group items will be `0` and will not change the group total.
 */
export const withMissingElementReferenceLineItemsForGroup = (group: ValueGroup<number>): ValueGroup<number> => {
  const items: ValueGroupItem<number>[] = [];
  const parsed = parseValueGroupItemIndex(group.index);

  for (const index of COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES) {
    if (parseValueGroupItemIndex(index).group !== parsed.group) {
      continue;
    }

    const found = group.items.find((x) => x.index === index);

    if (found === undefined) {
      items.push({
        index,
        value: 0,
      });

      continue;
    }

    items.push({
      index: found.index,
      value: found.value,
    });
  }

  return {
    index: group.index,
    total: group.total,
    items: items.sort(sortValueGroupIndexFunction),
  };
};
