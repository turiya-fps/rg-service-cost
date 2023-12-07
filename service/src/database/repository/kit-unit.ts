import { provide } from '@matt-usurp/grok';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitUnitDomainModel } from '../../domain/model/kit-unit';
import { fromKitUnitDomainModel, toKitUnitDomainModel } from '../record/kit-unit';
import { KitUnitDatabaseSchema } from '../schema/kit-unit';

export class KitUnitDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitUnitDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitUnitDatabaseSchema).insert();
    const record = fromKitUnitDomainModel(model);

    qb.values({
      id: provide(cast.uuid(quote.single(record.id))),

      source_id: record.source_id,
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      label: record.label,

      created_at: provide(cast.timestamp(quote.single(record.created_at))),
    });

    await qb.execute();
  }

  public async update(model: KitUnitDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitUnitDatabaseSchema).update();
    const record = fromKitUnitDomainModel(model);

    qb.set({
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      label: record.label,
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findAllBySourceIds(ids: string[]): Promise<KitUnitDomainModel[]> {
    const qb = await this.database.querybuilder(KitUnitDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitUnitDomainModel(record);
    });
  }
}
