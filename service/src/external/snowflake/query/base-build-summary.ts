import * as quote from '@project-rouge/service-core/database/syntax/quote';
import { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '@project-rouge/service-cost-client/src/data/cost-summary';
import { schema } from '../../../database/table';
import type { BuildingHeightBreakpoint } from '../data';
import { commentForValue, sql, toPostgresAnyArray } from '../query';

export const createBaseBuildElementReferenceLineItemsWithoutOptions = (
): string => {
  return sql`
SELECT *
FROM "${schema}"."kit_base_build_element_reference" kbber
WHERE kbber.option_count = 0
`;
};

export const createBaseBuildElementReferenceLineItemsForSelectedOptions = (
  selectedOptions: string[],
): string => {
  return sql`
SELECT
kbber.id AS id
, kbber.source_id AS source_id
, kbber.source_updated_at AS source_updated_at
, kbber.index_group AS index_group
, kbber.index_group_item AS index_group_item
, kbber.area_adjustment AS area_adjustment
, kbber.building_data_target AS building_data_target
, kbber.building_height_breakpoints AS building_height_breakpoints
, kbber.unit_of_measurement AS unit_of_measurement
, kbber.rate_cost AS rate_cost
, kbber.rate_carbon AS rate_carbon
, kbber.option_group_ids AS option_group_ids
, kbber.option_count AS option_count
, kbber.percentage_targets AS percentage_targets
, kbber.created_at AS created_at
FROM "${schema}"."kit_base_build_element_reference" kbber
JOIN "${schema}"."kit_option" ko on kbber.source_id = ANY (ko.base_build_element_reference_ids)
WHERE ko.option_group_and_value = ANY (${toPostgresAnyArray(selectedOptions)})
`;
};

export const createBaseBuildElementReferenceLineItemsOptionsApplied = (
  tableBaseBuildElementReferenceLineItemsWithoutOptions: string,
  tableBaseBuildElementReferenceLineItemsForSelectedOptions: string,
): string => {
  return sql`
SELECT
  id
, source_id
, source_updated_at
, index_group
, index_group_item
, area_adjustment
, building_data_target
, building_height_breakpoints
, unit_of_measurement
, rate_cost
, rate_carbon
, option_group_ids
, option_count
, percentage_targets
, created_at
FROM "${tableBaseBuildElementReferenceLineItemsWithoutOptions}" t

UNION ALL
SELECT
  id
, source_id
, source_updated_at
, index_group
, index_group_item
, area_adjustment
, building_data_target
, building_height_breakpoints
, unit_of_measurement
, rate_cost
, rate_carbon
, option_group_ids
, option_count
, percentage_targets
, created_at
FROM "${tableBaseBuildElementReferenceLineItemsForSelectedOptions}" t
`;
};

export const createBaseBuildElementReferenceLineItemsWithoutPercentages = (
  baseBuildElementReferenceTableAppliedOptions: string,
  tableInputBuildingData: string,
  buildingHeightBreakpointTarget: BuildingHeightBreakpoint,
): string => {
  return sql`
SELECT
  kbber.id AS kit_base_build_element_reference_id
, kbber.index_group AS kit_base_build_element_reference_index_group
, kbber.index_group_item AS kit_base_build_element_reference_index_group_item
, kbber.building_data_target AS kit_base_build_element_reference_building_data_target
, (
    CASE
      WHEN kbber.unit_of_measurement = ${commentForValue('UnitOfMeasurement.Once', quote.single(UnitOfMeasurement.Once))}
        THEN kbber.rate_cost
      WHEN kbber.unit_of_measurement = ${commentForValue('UnitOfMeasurement.Each', quote.single(UnitOfMeasurement.Each))}
        THEN kbber.rate_cost * ibd.value
      ELSE kbber.rate_cost * (ibd.value * COALESCE(kbber.area_adjustment, 1.0))
    END
  ) AS kit_base_build_element_reference_cost
, (
    CASE
      WHEN kbber.unit_of_measurement = ${commentForValue('UnitOfMeasurement.Once', quote.single(UnitOfMeasurement.Once))}
        THEN kbber.rate_carbon
      WHEN kbber.unit_of_measurement = ${commentForValue('UnitOfMeasurement.Each', quote.single(UnitOfMeasurement.Each))}
        THEN kbber.rate_carbon * ibd.value
      ELSE kbber.rate_carbon * (ibd.value * COALESCE(kbber.area_adjustment, 1.0))
    END
  ) AS kit_base_build_element_reference_cost_carbon
FROM "${baseBuildElementReferenceTableAppliedOptions}" kbber
LEFT JOIN "${tableInputBuildingData}" ibd ON ibd.key = kbber.building_data_target
WHERE
    kbber.unit_of_measurement != ${commentForValue('UnitOfMeasurement.Percentage', quote.single(UnitOfMeasurement.Percentage))}
AND kbber.building_height_breakpoints && ARRAY[${quote.single(buildingHeightBreakpointTarget)}]::varchar[]
`;
};

export const createBaseBuildElementReferenceLineItemsOnlyPercentages = (
  tableBaseBuildElementReferenceLineItemsWithoutPercentages: string,
): string => {
  return sql`
SELECT
  t.kit_base_build_element_reference_id
, kbber.index_group AS kit_base_build_element_reference_index_group
, kbber.index_group_item AS kit_base_build_element_reference_index_group_item
, SUM(t.kit_base_build_element_reference_cost) * kbber.rate_cost AS kit_base_build_element_reference_cost
, SUM(t.kit_base_build_element_reference_cost_carbon) * kbber.rate_carbon AS kit_base_build_element_reference_cost_carbon
FROM (
  SELECT
    kbber.id AS percentage_target_kit_module_element_reference_id
  , jsonb_array_elements_text(kbber.percentage_targets::jsonb) AS percentage_target_source_id
  FROM "${schema}"."kit_base_build_element_reference" kbber
  WHERE kbber.unit_of_measurement = ${commentForValue('UnitOfMeasurement.Percentage', quote.single(UnitOfMeasurement.Percentage))}
) x
JOIN "${schema}"."kit_base_build_element_reference" kbber ON kbber.id = x.percentage_target_kit_module_element_reference_id
JOIN "${schema}"."kit_base_build_element_reference" kbber_target ON kbber_target.source_id = x.percentage_target_source_id
JOIN "${tableBaseBuildElementReferenceLineItemsWithoutPercentages}" t ON t.kit_base_build_element_reference_id = kbber_target.id
GROUP BY
  t.kit_base_build_element_reference_id
, kbber.index_group
, kbber.index_group_item
, kbber.rate_cost
, kbber.rate_carbon
`;
};

export const createBaseBuildElementReferenceLineItems = (
  tableBaseBuildElementReferenceLineItemsWithoutPercentages: string,
  tableBaseBuildElementReferenceLineItemsOnlyPercentages: string,
): string => {
  return sql`
SELECT
  t.kit_base_build_element_reference_id
, t.kit_base_build_element_reference_index_group
, t.kit_base_build_element_reference_index_group_item
, t.kit_base_build_element_reference_cost
, t.kit_base_build_element_reference_cost_carbon
FROM "${tableBaseBuildElementReferenceLineItemsWithoutPercentages}" t

UNION ALL
SELECT
  t.kit_base_build_element_reference_id
, t.kit_base_build_element_reference_index_group
, t.kit_base_build_element_reference_index_group_item
, t.kit_base_build_element_reference_cost
, t.kit_base_build_element_reference_cost_carbon
FROM "${tableBaseBuildElementReferenceLineItemsOnlyPercentages}" t
`;
};

export const createBaseBuildGroupCosts = (tableBaseBuildElementReferenceLineItems: string): string => {
  return sql`
SELECT
  SUM(t.kit_base_build_element_reference_cost) AS kit_base_build_element_reference_cost
, SUM(t.kit_base_build_element_reference_cost_carbon) AS kit_base_build_element_reference_cost_carbon
FROM "${tableBaseBuildElementReferenceLineItems}" t
`;
};

export const createOutputSummaryLineItems = (tableBaseBuildGroupCosts: string): string => {
  return sql`
SELECT *
FROM (
  SELECT
    ${commentForValue('CostSummaryGroupIndex.Construction', quote.single(CostSummaryGroupIndex.Construction))} AS index_group
  , ${commentForValue('CostSummaryGroupItemIndex.ConstructionBaseBuild', quote.single(CostSummaryGroupItemIndex.ConstructionBaseBuild))} AS index_group_item
  , ROUND(t.kit_base_build_element_reference_cost, 2) AS cost
  , ROUND(t.kit_base_build_element_reference_cost_carbon, 2) AS carbon
  FROM "${tableBaseBuildGroupCosts}" t
) x
ORDER BY
  x.index_group
, x.index_group_item
`;
};
