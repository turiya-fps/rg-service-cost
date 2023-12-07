import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import type { ModuleFeedItemDataSanitised, ModuleFeedItemSanitised } from '../../external/snowflake/table/kit-module';
import type { KitModuleDomainModel } from '../model/kit-module';

export class KitModuleDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemSanitised(feed: ModuleFeedItemSanitised): KitModuleDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      label: feed.data.module_name,

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitModuleDomainModel,
    sourceUpdatedAt: Date,
    data: ModuleFeedItemDataSanitised,
  ): KitModuleDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      label: data.module_name,
    };
  }
}
