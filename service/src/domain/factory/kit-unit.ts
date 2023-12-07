import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import type { UnitFeedItemDataSanitised, UnitFeedItemSanitised } from '../../external/snowflake/table/kit-unit';
import type { KitUnitDomainModel } from '../model/kit-unit';

export class KitUnitDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemSanitised(feed: UnitFeedItemSanitised): KitUnitDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      label: feed.data.unit_name,

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitUnitDomainModel,
    sourceUpdatedAt: Date,
    data: UnitFeedItemDataSanitised,
  ): KitUnitDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      label: data.unit_name,
    };
  }
}
