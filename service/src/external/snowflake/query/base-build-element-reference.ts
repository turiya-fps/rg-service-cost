import { sql } from '../query';

export const createBaseBuildElementReferenceGroupCosts = (tableBaseBuildElementReferenceLineItems: string): string => {
  return sql`
SELECT
  t.kit_base_build_element_reference_index_group
, t.kit_base_build_element_reference_index_group_item
, SUM(t.kit_base_build_element_reference_cost) AS kit_base_build_element_reference_cost
, SUM(t.kit_base_build_element_reference_cost_carbon) AS kit_base_build_element_reference_cost_carbon
FROM "${tableBaseBuildElementReferenceLineItems}" t
GROUP BY
  t.kit_base_build_element_reference_index_group
, t.kit_base_build_element_reference_index_group_item
`;
};

export const createOutputElementReferenceLineItems = (tableBaseBuildElementReferenceGroupCosts: string): string => {
  return sql`
SELECT *
FROM (
  SELECT
    t.kit_base_build_element_reference_index_group AS index_group
  , t.kit_base_build_element_reference_index_group_item AS index_group_item
  , ROUND(t.kit_base_build_element_reference_cost, 2) AS cost
  , ROUND(t.kit_base_build_element_reference_cost_carbon, 2) AS carbon
  FROM "${tableBaseBuildElementReferenceGroupCosts}" t
) x
ORDER BY
  x.index_group
, x.index_group_item
`;
};
