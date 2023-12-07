export type KitUnitModuleDomainModel = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: Date;

  readonly kit_unit_id: string;
  readonly kit_module_id: string;

  readonly quantity: number;

  readonly created_at: Date;
};
