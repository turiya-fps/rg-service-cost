import { fromIsoString, toIsoString } from '@project-rouge/service-core/data/date';
import type { KitUnitModuleDomainModel } from '../../domain/model/kit-unit-module';

export type KitUnitModuleDatabaseRecord = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: string;

  /** @relation */
  readonly kit_unit?: unknown;
  readonly kit_unit_id: string;

  /** @relation */
  readonly kit_module?: unknown;
  readonly kit_module_id: string;

  readonly quantity: number;

  readonly created_at: string;
};

export const toKitUnitModuleDomainModel = (record: KitUnitModuleDatabaseRecord): KitUnitModuleDomainModel => {
  return {
    id: record.id,

    source_id: record.source_id,
    source_updated_at: fromIsoString(record.source_updated_at),

    kit_unit_id: record.kit_unit_id,
    kit_module_id: record.kit_module_id,

    quantity: record.quantity,

    created_at: fromIsoString(record.created_at),
  };
};

export const fromKitUnitModuleDomainModel = (model: KitUnitModuleDomainModel): KitUnitModuleDatabaseRecord => {
  return {
    id: model.id,

    source_id: model.source_id,
    source_updated_at: toIsoString(model.source_updated_at),

    kit_unit_id: model.kit_unit_id,
    kit_module_id: model.kit_module_id,

    quantity: model.quantity,

    created_at: toIsoString(model.created_at),
  };
};
