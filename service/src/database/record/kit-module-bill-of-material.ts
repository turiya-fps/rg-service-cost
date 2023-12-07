import { fromIsoString, toIsoString } from '@project-rouge/service-core/data/date';
import type { PostgresNumericValue } from '@project-rouge/service-core/database/syntax/cast/numeric';
import { fromPostgresNumeric, toPostgresNumeric } from '@project-rouge/service-core/database/syntax/cast/numeric';
import type { KitModuleBillOfMaterialDomainModel } from '../../domain/model/kit-module-bill-of-material';

export type KitModuleBillOfMaterialDatabaseRecord = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: string;

  /** @relation */
  readonly kit_module?: unknown;
  readonly kit_module_id: string;

  /** @relation */
  readonly kit_module_element_reference?: unknown;
  readonly kit_module_element_reference_id: string;

  readonly rate_cost: PostgresNumericValue;
  readonly rate_carbon: PostgresNumericValue;

  readonly quantity: PostgresNumericValue;

  readonly created_at: string;
};

export const toKitModuleBillOfMaterialDomainModel = (record: KitModuleBillOfMaterialDatabaseRecord): KitModuleBillOfMaterialDomainModel => {
  return {
    id: record.id,

    source_id: record.source_id,
    source_updated_at: fromIsoString(record.source_updated_at),

    kit_module_id: record.kit_module_id,
    kit_module_element_reference_id: record.kit_module_element_reference_id,

    rate_cost: fromPostgresNumeric(record.rate_cost),
    rate_carbon: fromPostgresNumeric(record.rate_carbon),

    quantity: fromPostgresNumeric(record.quantity),

    created_at: fromIsoString(record.created_at),
  };
};

export const fromKitModuleBillOfMaterialDomainModel = (model: KitModuleBillOfMaterialDomainModel): KitModuleBillOfMaterialDatabaseRecord => {
  return {
    id: model.id,

    source_id: model.source_id,
    source_updated_at: toIsoString(model.source_updated_at),

    kit_module_id: model.kit_module_id,
    kit_module_element_reference_id: model.kit_module_element_reference_id,

    rate_cost: toPostgresNumeric(model.rate_cost),
    rate_carbon: toPostgresNumeric(model.rate_carbon),

    quantity: toPostgresNumeric(model.quantity),

    created_at: toIsoString(model.created_at),
  };
};
