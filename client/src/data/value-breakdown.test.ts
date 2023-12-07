import * as nancy from '../testing/fixture/building/nancy';
import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from './cost-summary';
import type { ValueGroup, ValueGroupItem } from './value-breakdown';
import { getValueGroupByIndex, getValueGroupItemByIndex } from './value-breakdown';

describe('getValueGroupByIndex()', (): void => {
  it('with group index, missing, returns undefined', (): void => {
    expect(
      getValueGroupByIndex([], CostSummaryGroupIndex.OverheadsAndProfit),
    ).toStrictEqual<undefined>(undefined);
  });

  it('with group index, found, returns group', (): void => {
    expect(
      getValueGroupByIndex(nancy.FIXTURE_COSTING_BUILDING_MODULAR_SUMMARY, CostSummaryGroupIndex.Contingency),
    ).toStrictEqual<ValueGroup<number>>({
      index: '3',
      total: 127037.12,
      items: [
        {
          index: '3.1',
          value: 127037.12,
        },
      ],
    });
  });
});

describe('getValueGroupItemByIndex()', (): void => {
  it('with group index, missing group, returns undefined', (): void => {
    expect(
      getValueGroupItemByIndex([], CostSummaryGroupItemIndex.OverheadsAndProfit),
    ).toStrictEqual<undefined>(undefined);
  });

  it('with group index, found group, missing item, returns undefined', (): void => {
    expect(
      getValueGroupItemByIndex(nancy.FIXTURE_COSTING_BUILDING_MODULAR_SUMMARY, CostSummaryGroupItemIndex.ConstructionBaseBuild),
    ).toStrictEqual<undefined>(undefined);
  });

  it('with group index, return child', (): void => {
    expect(
      getValueGroupItemByIndex(nancy.FIXTURE_COSTING_BUILDING_MODULAR_SUMMARY, CostSummaryGroupItemIndex.ConstructionModules),
    ).toStrictEqual<ValueGroupItem<number>>({
      index: '1.1',
      value: 2268378.16,
    });
  });
});
