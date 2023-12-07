import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { toPrecision } from '@project-rouge/service-core/data/number';
import type { ModuleElementReferenceFeedItemDataSanitised, ModuleElementReferenceFeedItemSanitised } from '../../external/snowflake/table/kit-module-element-reference';
import type { KitModuleElementReferenceDomainModel } from '../model/kit-module-element-reference';

export class KitModuleElementReferenceDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemSanitised(feed: ModuleElementReferenceFeedItemSanitised): KitModuleElementReferenceDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      index_group: feed.data.index_group,
      index_group_item: feed.data.index_group_item,

      assembly_or_group: feed.data.assembly_or_group,
      cost_plan_section: feed.data.cost_plan_section,
      unit_of_measurement: feed.data.unit_of_measurement,

      rate_cost: toPrecision(feed.data.rate, 4),
      rate_cost_tall_building: toPrecision(feed.data.rate_tall_building, 4),
      rate_carbon: toPrecision(feed.data.embodied_carbon_rate, 4),

      option_groups: feed.data.option_group_and_value_ids,
      option_count: feed.data.option_count,

      percentage_targets: feed.data.related_elements_for_percent_items,

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitModuleElementReferenceDomainModel,
    sourceUpdatedAt: Date,
    data: ModuleElementReferenceFeedItemDataSanitised,
  ): KitModuleElementReferenceDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      index_group: data.index_group,
      index_group_item: data.index_group_item,

      assembly_or_group: data.assembly_or_group,
      cost_plan_section: data.cost_plan_section,
      unit_of_measurement: data.unit_of_measurement,

      rate_cost: toPrecision(data.rate, 4),
      rate_cost_tall_building: toPrecision(data.rate_tall_building, 4),
      rate_carbon: toPrecision(data.embodied_carbon_rate, 4),

      option_groups: data.option_group_and_value_ids,
      option_count: data.option_count,

      percentage_targets: data.related_elements_for_percent_items,
    };
  }
}
