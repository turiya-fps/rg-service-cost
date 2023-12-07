
export type KitModuleElementCategoryDomainModel = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: Date;

  readonly embodied_carbon_category: string;
  readonly embodied_carbon_sub_category: string;
  readonly embodied_carbon_weight: number;

  readonly module_element_reference: string;

  readonly created_at: Date;
};
