import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { BuildingOption, UnitCategoryMix } from '@project-rouge/service-cost-client/src/data/building';
import { BuildingData } from '@project-rouge/service-cost-client/src/data/building';
import { convertLevelToBuildingHeightBreakpointTarget, isTallBuilding } from '../data';
import type { QueryComposition, QueryDataMapping } from '../query';
import { commentForValue, createQueryDataMappingQueryFragment, createUnitMixQueryFragment, sql, withQueryFragment } from '../query';
import * as bber from './base-build-element-reference';
import * as bbs from './base-build-summary';
import * as mer from './modular-element-reference';
import * as ms from './modular-summary';

export const enum QueryView {
  ModularSummary = 'ms',
  ModularElementReference = 'mer',
  BaseBuildSummary = 'bbs',
  BaseBuildElementReference = 'bber',
}

export const createOutputMaster = (
  tableModularSummarySelection: string,
  tableModularElementReferenceSelection: string,
  tableBaseBuildSummarySelection: string,
  tableBaseBuildElementReferenceSelection: string,
): string => {
  return sql`
SELECT *
FROM (
  SELECT
    ${commentForValue('QueryView.ModularSummary', quote.single(QueryView.ModularSummary))} AS view
  , t.index_group_item AS index
  , t.cost AS cost
  , t.carbon AS carbon
  FROM "${tableModularSummarySelection}" t

  UNION
  SELECT
    ${commentForValue('QueryView.ModularElementReference', quote.single(QueryView.ModularElementReference))} AS view
  , t.index_group_item AS index
  , t.cost AS cost
  , t.carbon AS carbon
  FROM "${tableModularElementReferenceSelection}" t

  UNION
  SELECT
    ${commentForValue('QueryView.BaseBuildSummary', quote.single(QueryView.BaseBuildSummary))} AS view
  , t.index_group_item AS index
  , t.cost AS cost
  , t.carbon AS carbon
  FROM "${tableBaseBuildSummarySelection}" t

  UNION
  SELECT
    ${commentForValue('QueryView.BaseBuildElementReference', quote.single(QueryView.BaseBuildElementReference))} AS view
  , t.index_group_item AS index
  , t.cost AS cost
  , t.carbon AS carbon
  FROM "${tableBaseBuildElementReferenceSelection}" t
) x
ORDER BY
  x.view
, x.index
`;
};

export type BuildingQueryRecord = {
  readonly view: QueryView;
  readonly index: string;
  readonly cost: string | null;
  readonly carbon: string | null;
};

export const createBuildingQueryComposition = (
  unitmix: UnitCategoryMix,
  data: QueryDataMapping,
  options: BuildingOption[],
): QueryComposition => {
  const buildingHeightBreakpointTarget = convertLevelToBuildingHeightBreakpointTarget(data[BuildingData.NumberOfLevels]);
  const isTallBuildingTarget = isTallBuilding(data[BuildingData.NumberOfLevels]);

  const pipeline = [
    withQueryFragment('input_unit_mix', createUnitMixQueryFragment(unitmix)),
    withQueryFragment('input_building_data', createQueryDataMappingQueryFragment(data)),

    withQueryFragment('ms_unit_module_element_reference_line_items_without_options', ms.createUnitModuleElementReferenceLineItemsWithoutOptions()),
    withQueryFragment('ms_unit_module_element_reference_line_items_only_selected_options', ms.createUnitModuleElementReferenceLineItemsForSelectedOptions(options)),
    withQueryFragment('ms_unit_module_element_reference_line_items_applied_options', ms.createUnitModuleElementReferenceLineItemsOptionsApplied('ms_unit_module_element_reference_line_items_without_options', 'ms_unit_module_element_reference_line_items_only_selected_options')),

    withQueryFragment('ms_unit_module_line_items_without_percentages', ms.createUnitModuleLineItemsWithoutPercentages('ms_unit_module_element_reference_line_items_applied_options', isTallBuildingTarget)),
    withQueryFragment('ms_unit_module_line_items_only_percentages', ms.createUnitModuleLineItemsOnlyPercentages('ms_unit_module_line_items_without_percentages', isTallBuildingTarget)),
    withQueryFragment('ms_unit_module_line_items', ms.createUnitModuleLineItems('ms_unit_module_line_items_without_percentages', 'ms_unit_module_line_items_only_percentages')),
    withQueryFragment('ms_unit_module_base_cost', ms.createUnitModuleBaseCosts('ms_unit_module_line_items')),
    withQueryFragment('ms_unit_module_fit_out_cost', ms.createUnitModuleFitOutCosts('ms_unit_module_base_cost')),
    withQueryFragment('ms_unit_grouped_costs', ms.createUnitGroupCosts('ms_unit_module_fit_out_cost')),
    withQueryFragment('ms_unit_mix_grouped_costs', ms.createUnitMixGroupCosts('ms_unit_grouped_costs', 'input_unit_mix')),
    withQueryFragment('ms_selection', ms.createOutputSummaryLineItems('ms_unit_mix_grouped_costs')),

    withQueryFragment('mer_unit_module_element_reference_grouped_costs', mer.createUnitModuleElementReferenceGroupCosts('ms_unit_module_line_items')),
    withQueryFragment('mer_unit_element_reference_grouped_costs', mer.createUnitElementReferenceGroupCosts('mer_unit_module_element_reference_grouped_costs')),
    withQueryFragment('mer_element_reference_grouped_costs', mer.createElementReferenceGroupCosts('mer_unit_element_reference_grouped_costs', 'input_unit_mix')),
    withQueryFragment('mer_selection', mer.createOutputElementReferenceLineItems('mer_element_reference_grouped_costs')),

    withQueryFragment('bbs_base_build_element_reference_line_items_without_options', bbs.createBaseBuildElementReferenceLineItemsWithoutOptions()),
    withQueryFragment('bbs_base_build_element_reference_line_items_only_selected_options', bbs.createBaseBuildElementReferenceLineItemsForSelectedOptions(options)),
    withQueryFragment('bbs_base_build_element_reference_line_items_options_applied', bbs.createBaseBuildElementReferenceLineItemsOptionsApplied('bbs_base_build_element_reference_line_items_without_options', 'bbs_base_build_element_reference_line_items_only_selected_options')),

    withQueryFragment('bbs_base_build_element_reference_line_items_without_percentages', bbs.createBaseBuildElementReferenceLineItemsWithoutPercentages('bbs_base_build_element_reference_line_items_options_applied', 'input_building_data', buildingHeightBreakpointTarget)),
    withQueryFragment('bbs_base_build_element_reference_line_items_only_percentages', bbs.createBaseBuildElementReferenceLineItemsOnlyPercentages('bbs_base_build_element_reference_line_items_without_percentages')),
    withQueryFragment('bbs_base_build_element_reference_line_items', bbs.createBaseBuildElementReferenceLineItems('bbs_base_build_element_reference_line_items_without_percentages', 'bbs_base_build_element_reference_line_items_only_percentages')),
    withQueryFragment('bbs_base_build_grouped_costs', bbs.createBaseBuildGroupCosts('bbs_base_build_element_reference_line_items')),
    withQueryFragment('bbs_selection', bbs.createOutputSummaryLineItems('bbs_base_build_grouped_costs')),

    withQueryFragment('bber_base_build_element_reference_grouped_costs', bber.createBaseBuildElementReferenceGroupCosts('bbs_base_build_element_reference_line_items')),
    withQueryFragment('bber_selection', bber.createOutputElementReferenceLineItems('bber_base_build_element_reference_grouped_costs')),
  ].join('\n,\n\n');

  const selection = createOutputMaster(
    'ms_selection',
    'mer_selection',
    'bbs_selection',
    'bber_selection',
  );

  return {
    label: 'building',
    pipeline,
    selection,
  };
};
