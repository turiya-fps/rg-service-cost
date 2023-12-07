export type KitModuleBillOfMaterialDomainModel = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: Date;

  readonly kit_module_id: string;
  readonly kit_module_element_reference_id: string;

  readonly rate_cost: number;
  readonly rate_carbon: number;

  readonly quantity: number;

  readonly created_at: Date;
};
