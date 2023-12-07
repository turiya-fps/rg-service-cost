import { provide } from '@matt-usurp/grok';
import { provideBinaryJsonDatabaseValue } from '@project-rouge/service-core/database/column/jsonb';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitBaseBuildElementReferenceDomainModel } from '../../domain/model/kit-base-build-element-reference';
import { fromKitBaseBuildElementReferenceDomainModel, toKitBaseBuildElementReferenceDomainModel } from '../record/kit-base-build-element-reference';
import { KitBaseBuildElementReferenceDatabaseSchema } from '../schema/kit-base-build-element-reference';

export class KitBaseBuildElementReferenceDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitBaseBuildElementReferenceDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitBaseBuildElementReferenceDatabaseSchema).insert();
    const record = fromKitBaseBuildElementReferenceDomainModel(model);

    qb.values({
      id: provide(cast.uuid(quote.single(record.id))),

      source_id: record.source_id,
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      index_group: record.index_group,
      index_group_item: record.index_group_item,

      area_adjustment: record.area_adjustment,
      building_data_target: record.building_data_target,
      building_height_breakpoints: record.building_height_breakpoints,
      unit_of_measurement: record.unit_of_measurement,

      option_group_ids: record.option_group_ids === undefined
        ? null
        : record.option_group_ids,
      option_count: record.option_count,

      rate_cost: record.rate_cost,
      rate_carbon: record.rate_carbon,

      percentage_targets: record.percentage_targets === null
        ? null
        : provideBinaryJsonDatabaseValue(record.percentage_targets),

      created_at: provide(cast.timestamp(quote.single(record.created_at))),
    });

    await qb.execute();
  }

  public async update(model: KitBaseBuildElementReferenceDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitBaseBuildElementReferenceDatabaseSchema).update();
    const record = fromKitBaseBuildElementReferenceDomainModel(model);

    qb.set({
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      index_group: record.index_group,
      index_group_item: record.index_group_item,

      area_adjustment: record.area_adjustment,
      building_data_target: record.building_data_target,
      building_height_breakpoints: record.building_height_breakpoints,
      unit_of_measurement: record.unit_of_measurement,

      option_group_ids: record.option_group_ids === undefined
        ? null
        : record.option_group_ids,
      option_count: record.option_count,

      rate_cost: record.rate_cost,
      rate_carbon: record.rate_carbon,

      percentage_targets: record.percentage_targets === null
        ? null
        : provideBinaryJsonDatabaseValue(record.percentage_targets),
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findAllBySourceIds(ids: string[]): Promise<KitBaseBuildElementReferenceDomainModel[]> {
    const qb = await this.database.querybuilder(KitBaseBuildElementReferenceDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitBaseBuildElementReferenceDomainModel(record);
    });
  }
}
