WITH modular_element_values AS (
-- At this stage, for each modular element we take the embodied carbon value and multiply it by the weighting associated to the particular categories
-- note, there can be multiple rows per modular element
SELECT
    ecc.modular_element_id,
    ecm.module_id,
    ecc.category_value,
    ecc.sub_level_category,
    ecc.number_attribute,
    ecm.embodied_carbon_value,
    ecm.embodied_carbon_value * (ecc.number_attribute/100) as weighted_embodied_carbon_value
FROM
    DATABRAIN_USE.DBT_costing_airtable.embodied_carbon_categories ecc
LEFT JOIN
    DATABRAIN_USE.DBT_costing_airtable.embodied_carbon_modules ecm ON ecc.modular_element_id = ecm.modular_element_id
    )
, unit_module AS (
-- The embodied carbon value is determined for 1 unit at the modular element sub-category level
SELECT
    mev.*,
    um.unit_id,
    um.module_quantity * weighted_embodied_carbon_value as weighted_embodied_carbon_module
FROM
modular_element_values mev
JOIN DATABRAIN_USE.DBT_costing_airtable.unit_modules um ON mev.module_id = um.module_id
)
, building_level AS (
-- The embodied carbon value is determined for each project-building at the modular element sub-category level
SELECT
    b.project_id,
    bu.building_id,
    bu.floor_or_level,
    um.unit_id,
    um.module_id,
    um.modular_element_id,
    um.category_value,
    um.sub_level_category,
    um.weighted_embodied_carbon_module*bu.unit_quantity as weighted_unit_embodied_carbon
FROM
unit_module um
INNER JOIN
    DATABRAIN_USE.DBT_costing_airtable.building_units bu ON bu.unit_id = um.unit_id
INNER JOIN
    DATABRAIN_USE.DBT_costing_airtable.buildings_dim b on bu.building_id = b.building_id)
SELECT * FROM building_level
