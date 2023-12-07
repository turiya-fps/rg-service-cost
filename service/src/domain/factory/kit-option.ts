import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import type { BuildingOption } from '@project-rouge/service-cost-client/src/data/building';
import type { OptionFeedItemDataSanitised, OptionFeedItemSanitised } from '../../external/snowflake/table/kit-option';
import type { KitOptionDomainModel } from '../model/kit-option';

export class KitOptionDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemSanitised(feed: OptionFeedItemSanitised): KitOptionDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      option_group_and_value: feed.data.option_group_and_value as BuildingOption,
      is_default_option_value: feed.data.default_within_group,

      base_build_element_reference_ids: feed.data.base_build_element_reference,
      module_element_reference_ids: feed.data.module_element_reference,

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitOptionDomainModel,
    sourceUpdatedAt: Date,
    data: OptionFeedItemDataSanitised,
  ): KitOptionDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      option_group_and_value: data.option_group_and_value as BuildingOption,
      is_default_option_value: data.default_within_group,

      base_build_element_reference_ids: data.base_build_element_reference,
      module_element_reference_ids: data.module_element_reference,
    };
  }
}
