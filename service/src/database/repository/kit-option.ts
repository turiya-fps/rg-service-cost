import { provide } from '@matt-usurp/grok';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitOptionDomainModel } from '../../domain/model/kit-option';
import { fromKitOptionDomainModel, toKitOptionDomainModel } from '../record/kit-option';
import { KitOptionDatabaseSchema } from '../schema/kit-option';

export class KitOptionDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitOptionDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitOptionDatabaseSchema).insert();
    const record = fromKitOptionDomainModel(model);

    qb.values({
      id: provide(cast.uuid(quote.single(record.id))),

      source_id: record.source_id,
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      option_group_and_value: record.option_group_and_value,
      is_default_option_value: record.is_default_option_value,

      base_build_element_reference_ids: record.base_build_element_reference_ids,
      module_element_reference_ids: record.module_element_reference_ids,

      created_at: provide(cast.timestamp(quote.single(record.created_at))),
    });

    await qb.execute();
  }

  public async update(model: KitOptionDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitOptionDatabaseSchema).update();
    const record = fromKitOptionDomainModel(model);

    qb.set({
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      option_group_and_value: record.option_group_and_value,
      is_default_option_value: record.is_default_option_value,

      base_build_element_reference_ids: record.base_build_element_reference_ids,
      module_element_reference_ids: record.module_element_reference_ids,
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findAllBySourceIds(ids: string[]): Promise<KitOptionDomainModel[]> {
    const qb = await this.database.querybuilder(KitOptionDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitOptionDomainModel(record);
    });
  }
}
