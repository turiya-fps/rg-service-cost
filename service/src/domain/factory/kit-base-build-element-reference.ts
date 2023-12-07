import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { toPrecision } from '@project-rouge/service-core/data/number';
import type { BaseBuildElementReferenceFeedItemDataSanitised, BaseBuildElementReferenceFeedItemSanitised } from '../../external/snowflake/table/kit-base-build-element-reference';
import type { KitBaseBuildElementReferenceDomainModel } from '../model/kit-base-build-element-reference';

export class KitBaseBuildElementReferenceDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemDataSanitised(feed: BaseBuildElementReferenceFeedItemSanitised): KitBaseBuildElementReferenceDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      index_group: feed.data.index_group,
      index_group_item: feed.data.index_group_item,

      area_adjustment: feed.data.area_adjustment === null
        ? undefined
        : feed.data.area_adjustment,

      building_data_target: feed.data.area_or_quantity_type === null
        ? undefined
        : feed.data.area_or_quantity_type,

      building_height_breakpoints: feed.data.building_height_breakpoints,

      unit_of_measurement: feed.data.unit_of_measurement,

      rate_cost: toPrecision(feed.data.rate, 4),

      rate_carbon: feed.data.embodied_carbon_rate === null
        ? undefined
        : toPrecision(feed.data.embodied_carbon_rate, 4),

      option_groups: feed.data.option_group_and_value_ids,
      option_count: feed.data.option_count,

      percentage_targets: feed.data.related_elements_for_percent_items,

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitBaseBuildElementReferenceDomainModel,
    sourceUpdatedAt: Date,
    data: BaseBuildElementReferenceFeedItemDataSanitised,
  ): KitBaseBuildElementReferenceDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      index_group: data.index_group,
      index_group_item: data.index_group_item,

      area_adjustment: data.area_adjustment === null
        ? undefined
        : data.area_adjustment,

      building_data_target: data.area_or_quantity_type === null
        ? undefined
        : data.area_or_quantity_type,

      building_height_breakpoints: data.building_height_breakpoints,

      unit_of_measurement: data.unit_of_measurement,

      rate_cost: toPrecision(data.rate, 4),

      rate_carbon: data.embodied_carbon_rate === null
        ? undefined
        : toPrecision(data.embodied_carbon_rate, 4),

      option_groups: data.option_group_and_value_ids,
      option_count: data.option_count,

      percentage_targets: data.related_elements_for_percent_items,
    };
  }
}
