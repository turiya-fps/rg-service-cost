/**
 * Major cost summary line item group indexes.
 *
 * This area of the cost plan is entirely fabricated and exists to make data consistent.
 *
 * See {@link CostSummaryGroupItemIndex} for child items.
 */
export const enum CostSummaryGroupIndex {
  Construction = '1',
  Preliminaries = '2',
  Contingency = '3',
  OverheadsAndProfit = '4',
}

/**
 * A collection of all supported {@link CostSummaryGroupIndex}.
 */
export const COST_SUMMARY_GROUP_INDEXES: CostSummaryGroupIndex[] = [
  CostSummaryGroupIndex.Construction,
  CostSummaryGroupIndex.Preliminaries,
  CostSummaryGroupIndex.Contingency,
  CostSummaryGroupIndex.OverheadsAndProfit,
];

/**
 * Minor cost summary group item indexes for items within an cost summary group.
 *
 * This area of the cost plan is entirely fabricated and exists to make data consistent.
 *
 * These are named after their parent {@link CostSummaryGroupIndex} entry.
 * Those with the same name as their parent are just named their parent.
 */
export const enum CostSummaryGroupItemIndex {
  // 1.x
  ConstructionModules = '1.1',
  ConstructionFitOut = '1.2',
  ConstructionBaseBuild = '1.3',

  // 2.x
  Preliminaries = '2.1',

  // 3.x
  Contingency = '3.1',

  // 4.x
  OverheadsAndProfit = '4.1',
}

/**
 * A collection of all supported {@link CostSummaryGroupItemIndex}.
 */
export const COST_SUMMARY_GROUP_ITEM_INDEXES: CostSummaryGroupItemIndex[] = [
  // 1.x
  CostSummaryGroupItemIndex.ConstructionModules,
  CostSummaryGroupItemIndex.ConstructionFitOut,
  CostSummaryGroupItemIndex.ConstructionBaseBuild,

  // 2.x
  CostSummaryGroupItemIndex.Preliminaries,

  // 3.x
  CostSummaryGroupItemIndex.Contingency,

  // 4.x
  CostSummaryGroupItemIndex.OverheadsAndProfit,
];
