import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import type { UnitModuleFeedItemDataSanitised, UnitModuleFeedItemSanitised } from '../../external/snowflake/table/kit-unit-module';
import type { KitUnitModuleDomainModel } from '../model/kit-unit-module';

export class KitUnitModuleDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemSanitised(feed: UnitModuleFeedItemSanitised): KitUnitModuleDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      kit_unit_id: feed.data.unit_id,
      kit_module_id: feed.data.module_id,

      quantity: feed.data.module_quantity,

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitUnitModuleDomainModel,
    sourceUpdatedAt: Date,
    data: UnitModuleFeedItemDataSanitised,
  ): KitUnitModuleDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      kit_unit_id: data.unit_id,
      kit_module_id: data.module_id,

      quantity: data.module_quantity,
    };
  }
}
