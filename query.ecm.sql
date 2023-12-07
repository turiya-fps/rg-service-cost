WITH module_element_fact AS (
SELECT
    kmer.id,
    kmer.rate_carbon
FROM
    kit_module_element_reference kmer
)
SELECT
    kmb.source_id,
    kmb.kit_module_id,
    kmb.kit_module_element_reference_id,
    kmb.quantity,
    mef.rate_carbon,
    (kmb.quantity * mef.rate_carbon) as embodied_carbon_value
FROM
    kit_module_bill_of_material  kmb
LEFT JOIN
    module_element_fact mef ON kmb.kit_module_element_reference_id = mef.id
LEFT JOIN
    kit_module km on km.id = kmb.kit_module_id
ORDER BY source_id ASC
