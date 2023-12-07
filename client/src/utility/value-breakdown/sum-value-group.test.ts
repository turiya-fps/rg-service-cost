import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '../../data/cost-summary';
import type { ValueGroup } from '../../data/value-breakdown';
import * as nancy from '../../testing/fixture/building/nancy';
import { sumValueGroups } from './sum-value-group';

describe('sumCostSummary()', (): void => {
  it('with missing group, sums to single summary', (): void => {
    expect(
      sumValueGroups(
        [
          {
            index: CostSummaryGroupIndex.Construction,
            total: 2498555,
            items: [
              {
                index: CostSummaryGroupItemIndex.ConstructionModules,
                value: 2498555,
              },
            ],
          },
        ],
        [
          {
            index: CostSummaryGroupIndex.Construction,
            total: 2996952,
            items: [
              {
                index: CostSummaryGroupItemIndex.ConstructionBaseBuild,
                value: 2996952,
              },
            ],
          },
          {
            index: CostSummaryGroupIndex.Preliminaries,
            total: 419573,
            items: [
              {
                index: CostSummaryGroupItemIndex.Preliminaries,
                value: 419573,
              },
            ],
          },
        ],
      ),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostSummaryGroupIndex.Construction,
        total: (2498555 + 2996952),
        items: [
          {
            index: CostSummaryGroupItemIndex.ConstructionModules,
            value: 2498555,
          },
          {
            index: CostSummaryGroupItemIndex.ConstructionBaseBuild,
            value: 2996952,
          },
        ],
      },
      {
        index: CostSummaryGroupIndex.Preliminaries,
        total: 419573,
        items: [
          {
            index: CostSummaryGroupItemIndex.Preliminaries,
            value: 419573,
          },
        ],
      },
    ]);
  });

  it('with modular summary, with base build summary, sums to single summary', (): void => {
    expect(
      sumValueGroups(
        nancy.FIXTURE_COSTING_BUILDING_MODULAR_SUMMARY,
        nancy.FIXTURE_COSTING_BUILDING_BASEBUILD_SUMMARY,
      ),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostSummaryGroupIndex.Construction,
        total: 7207693.35,
        items: [
          {
            index: CostSummaryGroupItemIndex.ConstructionModules,
            value: 2268378.16,
          },
          {
            index: CostSummaryGroupItemIndex.ConstructionFitOut,
            value: 1581231.52,
          },
          {
            index: CostSummaryGroupItemIndex.ConstructionBaseBuild,
            value: 3358083.67,
          },
        ],
      },
      {
        index: CostSummaryGroupIndex.Preliminaries,
        total: 720769.34,
        items: [
          {
            index: CostSummaryGroupItemIndex.Preliminaries,
            value: 720769.34,
          },
        ],
      },
      {
        index: CostSummaryGroupIndex.Contingency,
        total: 237853.88,
        items: [
          {
            index: CostSummaryGroupItemIndex.Contingency,
            value: 237853.88,
          },
        ],
      },
      {
        index: CostSummaryGroupIndex.OverheadsAndProfit,
        total: 449147.41,
        items: [
          {
            index: CostSummaryGroupItemIndex.OverheadsAndProfit,
            value: 449147.41,
          },
        ],
      },
    ]);
  });
});
