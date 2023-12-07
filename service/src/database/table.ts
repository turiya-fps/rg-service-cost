/**
 * The isolated schema name allocated to this service.
 * This is issued by the supervisor stack.
 */
export const schema = 'rg_service_cost';

/**
 * A enum of all tables provided by the service.
 */
export const enum TableName {
  KitUnit = 'kit_unit',
  KitUnitModule = 'kit_unit_module',
  KitModule = 'kit_module',
  KitModuleElementReference = 'kit_module_element_reference',
  KitModuleBillOfMaterial = 'kit_module_bill_of_material',
  KitBaseBuildElementReference = 'kit_base_build_element_reference',
  KitOption = 'kit_option',
  KitModuleElementCategory = 'kit_module_element_category',

  ProjectCosting = 'project_costing',
}
