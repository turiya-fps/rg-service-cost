import { fromIsoString, toIsoString } from '@project-rouge/service-core/data/date';
import type { BuildingOption } from '@project-rouge/service-cost-client/src/data/building';
import type { KitOptionDomainModel } from '../../domain/model/kit-option';

export type KitOptionDatabaseRecord = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: string;

  readonly option_group_and_value: string;
  readonly is_default_option_value: boolean;

  readonly base_build_element_reference_ids: string[] | null;
  readonly module_element_reference_ids: string[] | null;

  readonly created_at: string;
};

export const toKitOptionDomainModel = (record: KitOptionDatabaseRecord): KitOptionDomainModel => {
  return {
    id: record.id,

    source_id: record.source_id,
    source_updated_at: fromIsoString(record.source_updated_at),

    option_group_and_value: record.option_group_and_value as BuildingOption,
    is_default_option_value: record.is_default_option_value,

    base_build_element_reference_ids: record.base_build_element_reference_ids,
    module_element_reference_ids: record.module_element_reference_ids,

    created_at: fromIsoString(record.created_at),
  };
};

export const fromKitOptionDomainModel = (model: KitOptionDomainModel): KitOptionDatabaseRecord => {
  return {
    id: model.id,

    source_id: model.source_id,
    source_updated_at: toIsoString(model.source_updated_at),

    option_group_and_value: model.option_group_and_value,
    is_default_option_value: model.is_default_option_value,

    base_build_element_reference_ids: model.base_build_element_reference_ids,
    module_element_reference_ids: model.module_element_reference_ids,

    created_at: toIsoString(model.created_at),
  };
};
