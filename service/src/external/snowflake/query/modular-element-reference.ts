import { schema } from '../../../database/table';
import { sql } from '../query';

export const createUnitModuleElementReferenceGroupCosts = (tableUnitModuleLineItems: string): string => {
  return sql`
SELECT
  km.id AS kit_module_id
, km.label AS kit_module_label
, t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
, SUM(t.kit_module_element_reference_cost) AS kit_module_cost
, SUM(t.kit_module_element_reference_cost_carbon) AS kit_module_cost_carbon
FROM "${schema}"."kit_module" km
JOIN "${tableUnitModuleLineItems}" t ON t.kit_module_id = km.id
GROUP BY
  km.id
, km.label
, t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
`;
};

export const createUnitElementReferenceGroupCosts = (tableUnitModuleElementReferenceGroupCosts: string): string => {
  return sql`
SELECT
  ku.id AS kit_unit_id
, ku.label AS kit_unit_label
, t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
, SUM(kum.quantity * t.kit_module_cost) AS kit_unit_cost
, SUM(kum.quantity * t.kit_module_cost_carbon) AS kit_unit_cost_carbon
FROM "${tableUnitModuleElementReferenceGroupCosts}" t
JOIN "${schema}"."kit_unit_module" kum ON kum.kit_module_id = t.kit_module_id
JOIN "${schema}"."kit_unit" ku ON ku.id = kum.kit_unit_id
GROUP BY
  ku.id
, ku.label
, t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
`;
};

export const createElementReferenceGroupCosts = (tableUnitElementReferenceGroupCosts: string, tableInputUnixMix: string): string => {
  return sql`
SELECT
  t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
, SUM(kum.unit_quantity * t.kit_unit_cost) AS building_unit_cost
, SUM(kum.unit_quantity * t.kit_unit_cost_carbon) AS building_unit_cost_carbon
FROM "${tableUnitElementReferenceGroupCosts}" t
JOIN "${tableInputUnixMix}" kum ON kum.unit_label = t.kit_unit_label
GROUP BY
  t.kit_module_element_reference_index_group
, t.kit_module_element_reference_index_group_item
`;
};

export const createOutputElementReferenceLineItems = (tableElementReferenceGroupCosts: string): string => {
  return sql`
SELECT *
FROM (
  SELECT
    t.kit_module_element_reference_index_group AS index_group
  , t.kit_module_element_reference_index_group_item AS index_group_item
  , ROUND(t.building_unit_cost, 2) AS cost
  , ROUND(t.building_unit_cost_carbon, 2) AS carbon
  FROM "${tableElementReferenceGroupCosts}" t
) x
ORDER BY
  x.index_group
, x.index_group_item
`;
};
