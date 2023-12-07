import { fromIsoString, toIsoString } from '@project-rouge/service-core/data/date';
import type { KitUnitDomainModel } from '../../domain/model/kit-unit';

export type KitUnitDatabaseRecord = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: string;

  readonly label: string;

  readonly created_at: string;
};

export const toKitUnitDomainModel = (record: KitUnitDatabaseRecord): KitUnitDomainModel => {
  return {
    id: record.id,

    source_id: record.source_id,
    source_updated_at: fromIsoString(record.source_updated_at),

    label: record.label,

    created_at: fromIsoString(record.created_at),
  };
};

export const fromKitUnitDomainModel = (model: KitUnitDomainModel): KitUnitDatabaseRecord => {
  return {
    id: model.id,

    source_id: model.source_id,
    source_updated_at: toIsoString(model.source_updated_at),

    label: model.label,

    created_at: toIsoString(model.created_at),
  };
};
