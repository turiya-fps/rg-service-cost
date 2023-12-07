import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import type { ModuleElementCategoryFeedItemDataSanitised, ModuleElementCategoryFeedItemSanitised } from '../../external/snowflake/table/kit-module-element-category';
import type { KitModuleElementCategoryDomainModel } from '../model/kit-module-element-category';

export class KitModuleElementCategoryDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemSanitised(feed: ModuleElementCategoryFeedItemSanitised): KitModuleElementCategoryDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      embodied_carbon_category: feed.data.embodied_carbon_category,
      embodied_carbon_sub_category: feed.data.embodied_carbon_sub_category,
      embodied_carbon_weight: feed.data.embodied_carbon_weight,
      module_element_reference: feed.data.module_element_reference,

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitModuleElementCategoryDomainModel,
    sourceUpdatedAt: Date,
    data: ModuleElementCategoryFeedItemDataSanitised,
  ): KitModuleElementCategoryDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      embodied_carbon_category: data.embodied_carbon_category,
      embodied_carbon_sub_category: data.embodied_carbon_sub_category,
      embodied_carbon_weight: data.embodied_carbon_weight,
      module_element_reference: data.module_element_reference,
    };
  }
}
