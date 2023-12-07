import { fromIsoString, toIsoString } from '@project-rouge/service-core/data/date';
import type { KitModuleElementCategoryDomainModel } from '../../domain/model/kit-module-element-category';

export type KitModuleElementCategoryDatabaseRecord = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: string;

  readonly embodied_carbon_category: string;
  readonly embodied_carbon_sub_category: string;
  readonly embodied_carbon_weight: number;
  readonly module_element_reference: string;

  readonly created_at: string;
};

export const toKitModuleElementCategoryDomainModel = (record: KitModuleElementCategoryDatabaseRecord): KitModuleElementCategoryDomainModel => {
  return {
    id: record.id,

    source_id: record.source_id,
    source_updated_at: fromIsoString(record.source_updated_at),

    embodied_carbon_category: record.embodied_carbon_category,
    embodied_carbon_sub_category: record.embodied_carbon_sub_category,
    embodied_carbon_weight: record.embodied_carbon_weight,

    module_element_reference: record.module_element_reference,

    created_at: fromIsoString(record.created_at),
  };
};

export const fromKitModuleElementCategoryDomainModel = (model: KitModuleElementCategoryDomainModel): KitModuleElementCategoryDatabaseRecord => {
  return {
    id: model.id,

    source_id: model.source_id,
    source_updated_at: toIsoString(model.source_updated_at),

    embodied_carbon_category: model.embodied_carbon_category,
    embodied_carbon_sub_category: model.embodied_carbon_sub_category,
    embodied_carbon_weight: model.embodied_carbon_weight,

    module_element_reference: model.module_element_reference,

    created_at: toIsoString(model.created_at),
  };
};
