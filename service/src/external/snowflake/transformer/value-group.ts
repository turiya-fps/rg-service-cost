import { parseFloatFromString, toPrecision } from '@project-rouge/service-core/data/number';
import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '@project-rouge/service-cost-client/src/data/cost-summary';
import type { ValueGroup } from '@project-rouge/service-cost-client/src/data/value-breakdown';
import { getValueGroupByIndex } from '@project-rouge/service-cost-client/src/data/value-breakdown';
import { parseValueGroupItemIndex, sortValueGroupIndexFunction } from '@project-rouge/service-cost-client/src/data/value-index';
import type { Configuration } from '../data';
import type { BuildingQueryRecord } from '../query/view';

export const withoutZeroValueGroups = (groups: ValueGroup<number>[]): ValueGroup<number>[] => {
  return groups.filter((group) => group.total !== 0);
};

export const withValueGroupTotals = (groups: ValueGroup<number>[]): ValueGroup<number>[] => {
  return groups.map((group) => {
    return {
      ...group,

      total: toPrecision(group.items.reduce((total, item) => total + item.value, 0), 2),
      items: group.items.sort(sortValueGroupIndexFunction),
    };
  }).sort(sortValueGroupIndexFunction);
};

export const createValueGroupFromQueryRecords = (records: BuildingQueryRecord[], key: 'cost' | 'carbon'): ValueGroup<number>[] => {
  const groups: ValueGroup<number>[] = [];

  for (const record of records) {
    const index = parseValueGroupItemIndex(record.index);

    let group: ValueGroup<number> | undefined = groups.find((group) => group.index === index.group);

    if (group === undefined) {
      group = {
        index: index.group,
        total: 0,
        items: [],
      };

      groups.push(group);
    }

    const value = toPrecision(parseFloatFromString(record[key] ?? '0'), 2);

    if (value !== 0) {
      group.items.push({
        index: record.index,
        value,
      });
    }
  }

  return withoutZeroValueGroups(
    withValueGroupTotals(groups),
  );
};

export const withOnCostsForValueGroupConstruction = (summary: ValueGroup<number>[], configuration: Configuration): ValueGroup<number>[] => {
  const construction = getValueGroupByIndex(summary, CostSummaryGroupIndex.Construction)?.total;

  if (construction === undefined) {
    return summary;
  }

  const preliminiaries = construction * configuration.preliminaries;

  summary.push({
    index: CostSummaryGroupIndex.Preliminaries,
    total: toPrecision(preliminiaries, 2),
    items: [
      {
        index: CostSummaryGroupItemIndex.Preliminaries,
        value: toPrecision(preliminiaries, 2),
      },
    ],
  });

  const contingencies = (construction + preliminiaries) * configuration.contingencies;

  summary.push({
    index: CostSummaryGroupIndex.Contingency,
    total: toPrecision(contingencies, 2),
    items: [
      {
        index: CostSummaryGroupItemIndex.Contingency,
        value: toPrecision(contingencies, 2),
      },
    ],
  });

  const ohp = (construction + preliminiaries + contingencies) * configuration.overheads_and_profits;

  summary.push({
    index: CostSummaryGroupIndex.OverheadsAndProfit,
    total: toPrecision(ohp, 2),
    items: [
      {
        index: CostSummaryGroupItemIndex.OverheadsAndProfit,
        value: toPrecision(ohp, 2),
      },
    ],
  });

  return withValueGroupTotals(summary);
};
