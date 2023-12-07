import { CostSummaryGroupIndex, CostSummaryGroupItemIndex, COST_SUMMARY_GROUP_INDEXES, COST_SUMMARY_GROUP_ITEM_INDEXES } from './cost-summary';

describe('COST_SUMMARY_GROUP_INDEXES', (): void => {
  it('with array, expects length', (): void => {
    expect(COST_SUMMARY_GROUP_INDEXES.length).toStrictEqual(4);
  });

  it('with array, index 0, construction', (): void => {
    expect(
      COST_SUMMARY_GROUP_INDEXES[0],
    ).toStrictEqual(CostSummaryGroupIndex.Construction);
  });

  it('with array, index 9, contingency', (): void => {
    expect(
      COST_SUMMARY_GROUP_INDEXES[3],
    ).toStrictEqual(CostSummaryGroupIndex.OverheadsAndProfit);
  });
});

describe('COST_SUMMARY_GROUP_ITEM_INDEXES', (): void => {
  it('with array, expects length', (): void => {
    expect(COST_SUMMARY_GROUP_ITEM_INDEXES.length).toStrictEqual(6);
  });

  it('with array, index 0, construction, modules', (): void => {
    expect(
      COST_SUMMARY_GROUP_ITEM_INDEXES[0],
    ).toStrictEqual(CostSummaryGroupItemIndex.ConstructionModules);
  });

  it('with array, index 1, construction, fit out', (): void => {
    expect(
      COST_SUMMARY_GROUP_ITEM_INDEXES[1],
    ).toStrictEqual(CostSummaryGroupItemIndex.ConstructionFitOut);
  });

  it('with array, index 10, on costs, contingency', (): void => {
    expect(
      COST_SUMMARY_GROUP_ITEM_INDEXES[5],
    ).toStrictEqual(CostSummaryGroupItemIndex.OverheadsAndProfit);
  });
});
