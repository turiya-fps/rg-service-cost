import { toPrecision } from '@project-rouge/service-core/data/number';
import { CostElementReferenceGroupIndex } from '../data/cost-element-reference';
import { CostSummaryGroupItemIndex } from '../data/cost-summary';
import { getValueGroupByIndex, getValueGroupItemByIndex, type ValueGroup } from '../data/value-breakdown';
import type { ProjectCostingCalculationHttpResource } from '../resource/project/project-costing-calculation-resource';
import { flatternValueGroupsForIndex } from './value-breakdown/flatten-value-group';
import { mergeValueGroupIntoOutput } from './value-breakdown/sum-value-group';
import { recreateWithTotalForValueGroup } from './value-group';

/**
 * A custom view of the costing summary data.
 */
export type CostingViewSummary = {
  construction: number;
  constructionModules: number;
  constructionFitOut: number;
  constructionBaseBuild: number;
  preliminaries: number;
  contingencies: number;
  overheadsAndProfits: number;
  total: number;
};

/**
 * A custom transformed view of the costing element referenced.
 */
export type CostingViewElementRefernece = {
  readonly modular: ValueGroup<number>[];
  readonly basebuild: ValueGroup<number>[];
};

/**
 * A custom transformed view of the costing data for various use-cases.
 */
export type CostingView = {
  readonly summary: CostingViewSummary;
  readonly element: CostingViewElementRefernece;
};

/**
 * Creates a custom view of the costing summary data.
 */
export const createCostingViewSummaryFromValueGroups = (groups: ValueGroup<number>[]): CostingViewSummary => {
  const constructionModules = getValueGroupItemByIndex(groups, CostSummaryGroupItemIndex.ConstructionModules)?.value ?? 0;
  const constructionFitOut = getValueGroupItemByIndex(groups, CostSummaryGroupItemIndex.ConstructionFitOut)?.value ?? 0;
  const constructionBaseBuild = getValueGroupItemByIndex(groups, CostSummaryGroupItemIndex.ConstructionBaseBuild)?.value ?? 0;
  const construction = toPrecision(constructionModules + constructionFitOut + constructionBaseBuild, 2);

  const preliminaries = getValueGroupItemByIndex(groups, CostSummaryGroupItemIndex.Preliminaries)?.value ?? 0;
  const contingencies = getValueGroupItemByIndex(groups, CostSummaryGroupItemIndex.Contingency)?.value ?? 0;
  const overheadsAndProfits = getValueGroupItemByIndex(groups, CostSummaryGroupItemIndex.OverheadsAndProfit)?.value ?? 0;

  return {
    construction,
    constructionModules,
    constructionFitOut,
    constructionBaseBuild,
    preliminaries,
    contingencies,
    overheadsAndProfits,
    total: toPrecision(construction + preliminaries + contingencies + overheadsAndProfits, 2),
  };
};

/**
 * Creates a custom view of the costing data for totals including buildings and scenario.
 */
export const createCostingViewForTotal = (calculation: ProjectCostingCalculationHttpResource): CostingView => {
  const summary: ValueGroup<number>[] = [];

  mergeValueGroupIntoOutput(calculation.scenario.costing.summary, summary);
  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.costing.modular.summary, 0), summary);
  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.costing.basebuild.summary, 0), summary);

  const basebuild: ValueGroup<number>[] = [];

  mergeValueGroupIntoOutput(calculation.scenario.costing.element, basebuild);
  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.costing.basebuild.element, 0), basebuild);

  return {
    summary: createCostingViewSummaryFromValueGroups(summary),

    element: {
      modular: recreateWithTotalForValueGroup(
        flatternValueGroupsForIndex(calculation.buildings.costing.modular.element, 0),
      ),

      basebuild: recreateWithTotalForValueGroup(basebuild),
    },
  };
};

/**
 * Creates a custom view of the costing data for totals including buildings.
 * This view is without the scenario data added.
 */
export const createCostingViewForTotalWithoutScenario = (calculation: ProjectCostingCalculationHttpResource): CostingView => {
  const summary: ValueGroup<number>[] = [];

  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.costing.modular.summary, 0), summary);
  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.costing.basebuild.summary, 0), summary);

  return {
    summary: createCostingViewSummaryFromValueGroups(summary),

    element: {
      modular: recreateWithTotalForValueGroup(
        flatternValueGroupsForIndex(calculation.buildings.costing.modular.element, 0),
      ),

      basebuild: recreateWithTotalForValueGroup(
        flatternValueGroupsForIndex(calculation.buildings.costing.basebuild.element, 0),
      ),
    },
  };
};

/**
 * Creates a custom view of the costing data for totals for a single building.
 * The {@link building} index should be zero based and will be adjusted to look in the correct aggregated location.
 * Naturally the building values will not include any scenario costing values.
 */
export const createCostingViewForBuilding = (calculation: ProjectCostingCalculationHttpResource, building: number): CostingView => {
  // Moving the index along one position as the first value is always the total.
  const index = building + 1;

  const summary: ValueGroup<number>[] = [];

  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.costing.modular.summary, index), summary);
  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.costing.basebuild.summary, index), summary);

  return {
    summary: createCostingViewSummaryFromValueGroups(summary),

    element: {
      modular: recreateWithTotalForValueGroup(
        flatternValueGroupsForIndex(calculation.buildings.costing.modular.element, index),
      ),

      basebuild: recreateWithTotalForValueGroup(
        flatternValueGroupsForIndex(calculation.buildings.costing.basebuild.element, index),
      ),
    },
  };
};

/**
 * A custom view of the carbon summary data.
 */
export type CarbonViewSummary = {
  substructure: number;
  superstructure: number;
  other: number;
  total: number;
};

/**
 * A custom transformed view of the carbon data for various use-cases.
 */
export type CarbonView = {
  readonly summary: CarbonViewSummary;
  readonly element: ValueGroup<number>[];
};

/**
 * Creates a custom view of the carbon summary data.
 */
export const createCarbonViewSummaryFromValueGroups = (groups: ValueGroup<number>[]): CarbonViewSummary => {
  const substructure = getValueGroupByIndex(groups, CostElementReferenceGroupIndex.Substructure)?.total ?? 0;
  const superstructure = getValueGroupByIndex(groups, CostElementReferenceGroupIndex.Superstructure)?.total ?? 0;

  const otherInternalFinishes = getValueGroupByIndex(groups, CostElementReferenceGroupIndex.InternalFinishes)?.total ?? 0;
  const otherFittingsAndFurniture = getValueGroupByIndex(groups, CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment)?.total ?? 0;
  const otherServices = getValueGroupByIndex(groups, CostElementReferenceGroupIndex.Services)?.total ?? 0;
  const other = toPrecision(otherInternalFinishes + otherFittingsAndFurniture + otherServices, 2);

  return {
    substructure,
    superstructure,
    other,
    total: toPrecision(substructure + superstructure + other, 2),
  };
};

/**
 * Creates a custom view of the carbon data for totals including buildings and scenario.
 */
export const createCarbonViewForTotal = (calculation: ProjectCostingCalculationHttpResource): CarbonView => {
  const element: ValueGroup<number>[] = [];

  mergeValueGroupIntoOutput(calculation.scenario.carbon, element);
  mergeValueGroupIntoOutput(flatternValueGroupsForIndex(calculation.buildings.carbon, 0), element);

  return {
    summary: createCarbonViewSummaryFromValueGroups(element),
    element: recreateWithTotalForValueGroup(element),
  };
};

/**
 * Creates a custom view of the carbon data for totals for a single building.
 * The {@link building} index should be zero based and will be adjusted to look in the correct aggregated location.
 * Naturally the building values will not include any scenario carbon values.
 */
export const createCarbonViewForBuilding = (calculation: ProjectCostingCalculationHttpResource, building: number): CarbonView => {
  // Moving the index along one position as the first value is always the total.
  const index = building + 1;

  const element: ValueGroup<number>[] = flatternValueGroupsForIndex(calculation.buildings.carbon, index);

  return {
    summary: createCarbonViewSummaryFromValueGroups(element),
    element: recreateWithTotalForValueGroup(element),
  };
};
