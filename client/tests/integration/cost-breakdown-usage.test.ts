import { add, toPrecision } from '@project-rouge/service-core/data/number';
import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '../../src/data/cost-summary';
import { getValueGroupByIndex, getValueGroupItemByIndex } from '../../src/data/value-breakdown';
import type { ValuePerMetric } from '../../src/data/value-per-metric';
import { calculateValuePerMetrics } from '../../src/data/value-per-metric';
import * as ann from '../../src/testing/fixture/building/ann';
import * as nancy from '../../src/testing/fixture/building/nancy';
import { aggregateValueBreakdown, getAggregateValueGroupItemTotalByIndex, getAggregateValueGroupTotalByIndex } from '../../src/utility/value-breakdown/aggregate-value-breakdown';

it('with testing building, nancy', (): void => {
  const resource = nancy.FIXTURE_COSTING_CALCULATION_RESOURCE;

  const modules = getValueGroupItemByIndex(resource.buildings.costing.modular.summary, CostSummaryGroupItemIndex.ConstructionModules)?.value?.[0] ?? 0;
  const fitout = getValueGroupItemByIndex(resource.buildings.costing.modular.summary, CostSummaryGroupItemIndex.ConstructionFitOut)?.value?.[0] ?? 0;
  const basebuild = getValueGroupItemByIndex(resource.buildings.costing.basebuild.summary, CostSummaryGroupItemIndex.ConstructionBaseBuild)?.value?.[0] ?? 0;

  expect(modules).toStrictEqual<number>(2268378.16);
  expect(fitout).toStrictEqual<number>(1581231.52);
  expect(basebuild).toStrictEqual<number>(3358083.67);

  const subtotal = toPrecision(modules + fitout + basebuild, 2);

  expect(subtotal).toStrictEqual<number>(7207693.35);

  const preliminaries = toPrecision(add(
    getValueGroupByIndex(resource.buildings.costing.modular.summary, CostSummaryGroupIndex.Preliminaries)?.total?.[0] ?? 0,
    getValueGroupByIndex(resource.buildings.costing.basebuild.summary, CostSummaryGroupIndex.Preliminaries)?.total?.[0] ?? 0,
  ), 2);

  const contingency = toPrecision(add(
    getValueGroupByIndex(resource.buildings.costing.modular.summary, CostSummaryGroupIndex.Contingency)?.total?.[0] ?? 0,
    getValueGroupByIndex(resource.buildings.costing.basebuild.summary, CostSummaryGroupIndex.Contingency)?.total?.[0] ?? 0,
  ), 2);

  const overheads = toPrecision(add(
    getValueGroupByIndex(resource.buildings.costing.modular.summary, CostSummaryGroupIndex.OverheadsAndProfit)?.total?.[0] ?? 0,
    getValueGroupByIndex(resource.buildings.costing.basebuild.summary, CostSummaryGroupIndex.OverheadsAndProfit)?.total?.[0] ?? 0,
  ), 2);

  expect(preliminaries).toStrictEqual<number>(720769.34);
  expect(contingency).toStrictEqual<number>(237853.88);
  expect(overheads).toStrictEqual<number>(449147.41);

  const total = toPrecision(subtotal + preliminaries + overheads + contingency, 2);

  expect(total).toStrictEqual<number>(8615463.98);

  const values = calculateValuePerMetrics(
    total,
    nancy.FIXTURE_METRIC_NUMBER_OF_UNITS,
    nancy.FIXTURE_METRIC_GIA,
  );

  expect(values).toStrictEqual<ValuePerMetric<number>>({
    unit: 269233.25,
    sqm: 2683.83,
    sqft: 249.34,
  });
});

it('with test building, ann', (): void => {
  const breakdown = ann.FIXTURE_COSTING_CALCULATION_RESOURCE;

  const modules = getValueGroupItemByIndex(breakdown.buildings.costing.modular.summary, CostSummaryGroupItemIndex.ConstructionModules)?.value?.[0] ?? 0;
  const fitout = getValueGroupItemByIndex(breakdown.buildings.costing.modular.summary, CostSummaryGroupItemIndex.ConstructionFitOut)?.value?.[0] ?? 0;
  const basebuild = getValueGroupItemByIndex(breakdown.buildings.costing.basebuild.summary, CostSummaryGroupItemIndex.ConstructionBaseBuild)?.value?.[0] ?? 0;

  expect(modules).toStrictEqual<number>(8455377.45);
  expect(fitout).toStrictEqual<number>(5223311.30);
  expect(basebuild).toStrictEqual<number>(7518039.00);

  const subtotal = toPrecision(modules + fitout + basebuild, 2);

  expect(subtotal).toStrictEqual<number>(21196727.75);

  const preliminaries = toPrecision(add(
    getValueGroupByIndex(breakdown.buildings.costing.modular.summary, CostSummaryGroupIndex.Preliminaries)?.total?.[0] ?? 0,
    getValueGroupByIndex(breakdown.buildings.costing.basebuild.summary, CostSummaryGroupIndex.Preliminaries)?.total?.[0] ?? 0,
  ), 2);

  const contingency = toPrecision(add(
    getValueGroupByIndex(breakdown.buildings.costing.modular.summary, CostSummaryGroupIndex.Contingency)?.total?.[0] ?? 0,
    getValueGroupByIndex(breakdown.buildings.costing.basebuild.summary, CostSummaryGroupIndex.Contingency)?.total?.[0] ?? 0,
  ), 2);

  const overheads = toPrecision(add(
    getValueGroupByIndex(breakdown.buildings.costing.modular.summary, CostSummaryGroupIndex.OverheadsAndProfit)?.total?.[0] ?? 0,
    getValueGroupByIndex(breakdown.buildings.costing.basebuild.summary, CostSummaryGroupIndex.OverheadsAndProfit)?.total?.[0] ?? 0,
  ), 2);

  expect(preliminaries).toStrictEqual<number>(2119672.78);
  expect(contingency).toStrictEqual<number>(699492.02);
  expect(overheads).toStrictEqual<number>(1320874.09);

  const total = toPrecision(subtotal + preliminaries + overheads + contingency, 2);

  expect(total).toStrictEqual<number>(25336766.64);

  const values = calculateValuePerMetrics(total, ann.FIXTURE_METRIC_NUMBER_OF_UNITS, ann.FIXTURE_METRIC_GIA);

  expect(values).toStrictEqual<ValuePerMetric<number>>({
    unit: 245988.03,
    sqm: 2552.44,
    sqft: 237.13,
  });
});

it('with cost breakdowns, two buildings, can generate a conceptual minimal summary', (): void => {
  const aggregated = aggregateValueBreakdown([
    nancy.FIXTURE_COSTING_BUILDING_BREAKDOWN,
    ann.FIXTURE_COSTING_BUILDING_BREAKDOWN,
  ]);

  // As per the interface, a summary has the construction items listed individually.
  // These could be pulled from a summed cost breakdown, but these items are only found once.
  // We know that "modules" and "fit out" are only modular items, "base build" is only in base build.

  const modules = getAggregateValueGroupItemTotalByIndex(aggregated.modular.summary, CostSummaryGroupItemIndex.ConstructionModules) ?? 0;
  const fitout = getAggregateValueGroupItemTotalByIndex(aggregated.modular.summary, CostSummaryGroupItemIndex.ConstructionFitOut) ?? 0;
  const basebuild = getAggregateValueGroupItemTotalByIndex(aggregated.basebuild.summary, CostSummaryGroupItemIndex.ConstructionBaseBuild) ?? 0;

  // Values are totals for each quote.
  expect(modules).toStrictEqual<number>(10723755.61);
  expect(fitout).toStrictEqual<number>(6804542.82);
  expect(basebuild).toStrictEqual<number>(10876122.67);

  // We can use these values to get a sub-total value.
  // This should be the same as grabbing the aggregated totals of the construction group.

  const subtotal = toPrecision(modules + fitout + basebuild, 2);

  expect(subtotal).toStrictEqual<number>(28404421.10);

  // Then we have the remainder of the summary level items but only their totals.
  // These are also present across both modular and basebuild so we need to add them.
  // Contingency in the interface are the child items so we use the item searching functions instead.

  const preliminaries = toPrecision(add(
    getAggregateValueGroupTotalByIndex(aggregated.modular.summary, CostSummaryGroupIndex.Preliminaries) ?? 0,
    getAggregateValueGroupTotalByIndex(aggregated.basebuild.summary, CostSummaryGroupIndex.Preliminaries) ?? 0,
  ), 2);

  const overheads = toPrecision(add(
    getAggregateValueGroupTotalByIndex(aggregated.modular.summary, CostSummaryGroupIndex.OverheadsAndProfit) ?? 0,
    getAggregateValueGroupTotalByIndex(aggregated.basebuild.summary, CostSummaryGroupIndex.OverheadsAndProfit) ?? 0,
  ), 2);

  const contingency = toPrecision(add(
    getAggregateValueGroupTotalByIndex(aggregated.modular.summary, CostSummaryGroupIndex.Contingency) ?? 0,
    getAggregateValueGroupTotalByIndex(aggregated.basebuild.summary, CostSummaryGroupIndex.Contingency) ?? 0,
  ), 2);

  // Values are (modular + basebuild) for each quote.
  expect(preliminaries).toStrictEqual<number>(2840442.12);
  expect(overheads).toStrictEqual<number>(1770021.50);
  expect(contingency).toStrictEqual<number>(937345.90);

  // Finally we sum these values together to get a building total.

  const total = toPrecision(subtotal + preliminaries + overheads + contingency, 2);

  expect(total).toStrictEqual<number>(33952230.62);

  // For some values we care about the costs per value, we can generate those using a helper.
  // We need the number of units in total and an area we want to use for SQM, this is typically NIA at the moment.

  // Below are some example numbers based on the fixture data used.
  // These should be pulled from the site itself.

  const NUMBER_OF_UNITS_OR_APAREMENTS = nancy.FIXTURE_METRIC_NUMBER_OF_UNITS + ann.FIXTURE_METRIC_NUMBER_OF_UNITS;
  const NIA = nancy.FIXTURE_METRIC_GIA + ann.FIXTURE_METRIC_GIA;

  const values = calculateValuePerMetrics(total, NUMBER_OF_UNITS_OR_APAREMENTS, NIA);

  expect(values).toStrictEqual<ValuePerMetric<number>>({
    unit: 251498.00,
    sqm: 2584.54,
    sqft: 240.11,
  });
});
