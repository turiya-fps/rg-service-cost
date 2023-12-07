import { provide } from '@matt-usurp/grok';
import { provideDecimalDatabaseValue } from '@project-rouge/service-core/database/column/decimal';
import { provideBinaryJsonDatabaseValue } from '@project-rouge/service-core/database/column/jsonb';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitModuleElementReferenceDomainModel } from '../../domain/model/kit-module-element-reference';
import { fromKitModuleElementReferenceDomainModel, toKitModuleElementReferenceDomainModel } from '../record/kit-module-element-reference';
import { KitModuleElementReferenceDatabaseSchema } from '../schema/kit-module-element-reference';

export class KitModuleElementReferenceDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitModuleElementReferenceDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleElementReferenceDatabaseSchema).insert();
    const record = fromKitModuleElementReferenceDomainModel(model);

    qb.values({
      id: provide(cast.uuid(quote.single(record.id))),

      source_id: record.source_id,
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      index_group: record.index_group,
      index_group_item: record.index_group_item,

      assembly_or_group: record.assembly_or_group,
      cost_plan_section: record.cost_plan_section,
      unit_of_measurement: record.unit_of_measurement,

      option_group_ids: record.option_group_ids === undefined
        ? null
        : record.option_group_ids,
      option_count: record.option_count,

      rate_cost: provideDecimalDatabaseValue(record.rate_cost),
      rate_cost_tall_building: provideDecimalDatabaseValue(record.rate_cost_tall_building),
      rate_carbon: provideDecimalDatabaseValue(record.rate_carbon),

      percentage_targets: record.percentage_targets === null
        ? null
        : provideBinaryJsonDatabaseValue(record.percentage_targets),

      created_at: provide(cast.timestamp(quote.single(record.created_at))),
    });

    await qb.execute();
  }

  public async update(model: KitModuleElementReferenceDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleElementReferenceDatabaseSchema).update();
    const record = fromKitModuleElementReferenceDomainModel(model);

    qb.set({
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      index_group: record.index_group,
      index_group_item: record.index_group_item,

      assembly_or_group: record.assembly_or_group,
      cost_plan_section: record.cost_plan_section,
      unit_of_measurement: record.unit_of_measurement,

      option_group_ids: record.option_group_ids === undefined
        ? null
        : record.option_group_ids,
      option_count: record.option_count,

      rate_cost: provideDecimalDatabaseValue(record.rate_cost),
      rate_cost_tall_building: provideDecimalDatabaseValue(record.rate_cost_tall_building),
      rate_carbon: provideDecimalDatabaseValue(record.rate_carbon),

      percentage_targets: record.percentage_targets === null
        ? null
        : provideBinaryJsonDatabaseValue(record.percentage_targets),
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findAllBySourceIds(ids: string[]): Promise<KitModuleElementReferenceDomainModel[]> {
    const qb = await this.database.querybuilder(KitModuleElementReferenceDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitModuleElementReferenceDomainModel(record);
    });
  }
}
