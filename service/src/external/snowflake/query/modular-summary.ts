import * as quote from '@project-rouge/service-core/database/syntax/quote';
import { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '@project-rouge/service-cost-client/src/data/cost-summary';
import { schema } from '../../../database/table';
import { FeedItemCostPlanSection } from '../data';
import { commentForValue, sql, toPostgresAnyArray } from '../query';

export const createUnitModuleElementReferenceLineItemsWithoutOptions = (
): string => {
  return sql`
SELECT *
FROM "${schema}"."kit_module_element_reference" mer
WHERE mer.option_count = 0
`;
};

export const createUnitModuleElementReferenceLineItemsForSelectedOptions = (
  selectedOptions: string[],
): string => {
  return sql`
SELECT
  mer.id AS id
, mer.source_id AS source_id
, mer.source_updated_at AS source_updated_at
, mer.index_group AS index_group
, mer.index_group_item AS index_group_item
, mer.assembly_or_group AS assembly_or_group
, mer.cost_plan_section AS cost_plan_section
, mer.unit_of_measurement AS unit_of_measurement
, mer.rate_cost AS rate_cost
, mer.rate_carbon AS rate_carbon
, mer.percentage_targets AS percentage_targets
, mer.created_at AS created_at
, mer.rate_cost_tall_building AS rate_cost_tall_building
, mer.option_group_ids AS option_group_ids
, mer.option_count AS option_count
FROM "${schema}"."kit_module_element_reference" mer
JOIN "${schema}"."kit_option" ko on mer.source_id = ANY (ko.module_element_reference_ids)
WHERE ko.option_group_and_value = ANY (${toPostgresAnyArray(selectedOptions)})
`;
};

export const createUnitModuleElementReferenceLineItemsOptionsApplied = (
  tableModuleElementReferenceLineItemsWithoutOptions: string,
  tableModuleElementReferenceLineItemsForSelectedOptions: string,
): string => {
  return sql`
SELECT
  id
, source_id
, source_updated_at
, index_group
, index_group_item
, assembly_or_group
, cost_plan_section
, unit_of_measurement
, rate_cost
, rate_carbon
, percentage_targets
, created_at
, rate_cost_tall_building
, option_group_ids
, option_count
FROM "${tableModuleElementReferenceLineItemsWithoutOptions}" t

UNION ALL
SELECT
id
, source_id
, source_updated_at
, index_group
, index_group_item
, assembly_or_group
, cost_plan_section
, unit_of_measurement
, rate_cost
, rate_carbon
, percentage_targets
, created_at
, rate_cost_tall_building
, option_group_ids
, option_count
FROM "${tableModuleElementReferenceLineItemsForSelectedOptions}" t
`;
};

export const createUnitModuleLineItemsWithoutPercentages = (
  moduleElementReferenceTableAppliedOptions: string,
  isTallBuildingTarget: boolean,
): string => {
  const cost = isTallBuildingTarget === true
    ? 'rate_cost_tall_building'
    : 'rate_cost';

  return sql`
SELECT
  kmbom.kit_module_id
, kmbom.kit_module_element_reference_id
, kmer.index_group AS kit_module_element_reference_index_group
, kmer.index_group_item AS kit_module_element_reference_index_group_item
, kmer.${cost} * kmbom.quantity AS kit_module_element_reference_cost
, kmer.rate_carbon * kmbom.quantity AS kit_module_element_reference_cost_carbon
, kmer.cost_plan_section AS kit_module_element_reference_cost_plan_section
FROM "${schema}"."kit_module_bill_of_material" kmbom
JOIN "${moduleElementReferenceTableAppliedOptions}" kmer ON kmer.id = kmbom.kit_module_element_reference_id
WHERE kmer.unit_of_measurement != ${commentForValue('UnitOfMeasurement.Percentage', quote.single(UnitOfMeasurement.Percentage))}
`;
};

export const createUnitModuleLineItemsOnlyPercentages = (tableUnitModuleLineItemsWithoutPercentages: string, isTallBuildingTarget: boolean): string => {
  const cost = isTallBuildingTarget === true
    ? 'rate_cost_tall_building'
    : 'rate_cost';

  return sql`
SELECT
  t.kit_module_id
, kmer.index_group AS kit_module_element_reference_index_group
, kmer.index_group_item AS kit_module_element_reference_index_group_item
, SUM(t.kit_module_element_reference_cost) * kmer.${cost} AS kit_module_element_reference_cost
, SUM(t.kit_module_element_reference_cost_carbon) * kmer.rate_carbon AS kit_module_element_reference_cost_carbon
, kmer.cost_plan_section AS kit_module_element_reference_cost_plan_section
FROM (
  SELECT
    kmer.id AS percentage_target_kit_module_element_reference_id
  , jsonb_array_elements_text(kmer.percentage_targets::jsonb) AS percentage_target_source_id
  FROM "${schema}"."kit_module_element_reference" kmer
  WHERE kmer.unit_of_measurement = ${commentForValue('UnitOfMeasurement.Percentage', quote.single(UnitOfMeasurement.Percentage))}
) x
JOIN "${schema}"."kit_module_element_reference" kmer ON kmer.id = x.percentage_target_kit_module_element_reference_id
JOIN "${schema}"."kit_module_element_reference" kmer_target ON kmer_target.source_id = x.percentage_target_source_id
JOIN "${tableUnitModuleLineItemsWithoutPercentages}" t ON t.kit_module_element_reference_id = kmer_target.id
GROUP BY
  t.kit_module_id
, kmer.index_group
, kmer.index_group_item
, kmer.${cost}
, kmer.rate_carbon
, kmer.cost_plan_section
`;
};

export const createUnitModuleLineItems = (
  tableUnitModuleLineItemsWithoutPercentages: string,
  tableUnitModuleLineItemsOnlyPercentages: string,
): string => {
  return sql`
SELECT
  t.kit_module_id
, t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
, t.kit_module_element_reference_cost
, t.kit_module_element_reference_cost_carbon
, t.kit_module_element_reference_cost_plan_section
FROM "${tableUnitModuleLineItemsWithoutPercentages}" t

UNION ALL
SELECT
  t.kit_module_id
, t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
, t.kit_module_element_reference_cost
, t.kit_module_element_reference_cost_carbon
, t.kit_module_element_reference_cost_plan_section
FROM "${tableUnitModuleLineItemsOnlyPercentages}" t
`;
};

export const createUnitModuleBaseCosts = (tableUnitModuleLineItems: string): string => sql`
SELECT
  km.id AS kit_module_id
, km.label AS kit_module_label
, SUM(t.kit_module_element_reference_cost) AS kit_module_cost_bill_of_material
, SUM(
    CASE
      WHEN t.kit_module_element_reference_cost_plan_section
        IN (
          ${commentForValue('FeedItemCostPlanSection.OffSite', quote.single(FeedItemCostPlanSection.OffSite))}
        , ${commentForValue('FeedItemCostPlanSection.OnSite', quote.single(FeedItemCostPlanSection.OnSite))}
        ) THEN t.kit_module_element_reference_cost
      ELSE 0
    END
  ) AS kit_module_cost
, SUM(t.kit_module_element_reference_cost_carbon) AS kit_module_cost_carbon
FROM "${schema}"."kit_module" km
JOIN "${tableUnitModuleLineItems}" t ON t.kit_module_id = km.id
GROUP BY
  km.id
, km.label
`;

export const createUnitModuleFitOutCosts = (tableUnitModuleBaseCosts: string): string => {
  return sql`
SELECT
  t.kit_module_id
, t.kit_module_label
, t.kit_module_cost
, t.kit_module_cost_carbon
, t.kit_module_cost_bill_of_material - t.kit_module_cost AS kit_module_cost_fit_out
FROM "${tableUnitModuleBaseCosts}" t
`;
};

export const createUnitGroupCosts = (tableUnitModuleFitOutCosts: string): string => {
  return sql`
SELECT
  ku.id AS kit_unit_id
, ku.label AS kit_unit_label
, SUM(kum.quantity * t.kit_module_cost) AS kit_unit_module_cost
, SUM(kum.quantity * t.kit_module_cost_carbon) AS kit_unit_module_cost_carbon
, SUM(kum.quantity * t.kit_module_cost_fit_out) AS kit_unit_module_cost_fit_out
FROM "${tableUnitModuleFitOutCosts}" t
JOIN "${schema}"."kit_unit_module" kum ON kum.kit_module_id = t.kit_module_id
JOIN "${schema}"."kit_unit" ku ON ku.id = kum.kit_unit_id
GROUP BY
  ku.id
, ku.label
`;
};

export const createUnitMixGroupCosts = (tableUnitGroupCosts: string, tableInputUnitMix: string): string => {
  return sql`
SELECT
  SUM(ium.unit_quantity * t.kit_unit_module_cost) AS building_unit_module_cost
, SUM(ium.unit_quantity * t.kit_unit_module_cost_carbon) AS building_unit_module_cost_carbon
, SUM(ium.unit_quantity * t.kit_unit_module_cost_fit_out) AS building_unit_module_cost_fit_out
FROM "${tableUnitGroupCosts}" t
JOIN "${tableInputUnitMix}" ium ON ium.unit_label = t.kit_unit_label
`;
};

export const createOutputSummaryLineItems = (tableUnitMixGroupCosts: string): string => {
  return sql`
SELECT *
FROM (
  SELECT
    ${commentForValue('CostSummaryGroupIndex.Construction', quote.single(CostSummaryGroupIndex.Construction))} AS index_group
  , ${commentForValue('CostSummaryGroupItemIndex.ConstructionModules', quote.single(CostSummaryGroupItemIndex.ConstructionModules))} AS index_group_item
  , ROUND(t.building_unit_module_cost, 2) AS cost
  , ROUND(t.building_unit_module_cost_carbon, 2) AS carbon
  FROM "${tableUnitMixGroupCosts}" t

  UNION
  SELECT
    ${commentForValue('CostSummaryGroupIndex.Construction', quote.single(CostSummaryGroupIndex.Construction))} AS index_group
  , ${commentForValue('CostSummaryGroupItemIndex.ConstructionFitOut', quote.single(CostSummaryGroupItemIndex.ConstructionFitOut))} AS index_group_item
  , ROUND(t.building_unit_module_cost_fit_out, 2) AS cost
  , ROUND(0, 2) AS carbon
  FROM "${tableUnitMixGroupCosts}" t
) x
ORDER BY
  x.index_group
, x.index_group_item
`;
};
