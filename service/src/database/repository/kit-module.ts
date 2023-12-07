import { provide } from '@matt-usurp/grok';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitModuleDomainModel } from '../../domain/model/kit-module';
import { toKitModuleDomainModel } from '../record/kit-module';
import { fromKitUnitDomainModel } from '../record/kit-unit';
import { KitModuleDatabaseSchema } from '../schema/kit-module';

export class KitModuleDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitModuleDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleDatabaseSchema).insert();
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

  public async update(model: KitModuleDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleDatabaseSchema).update();
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

  public async findAllBySourceIds(ids: string[]): Promise<KitModuleDomainModel[]> {
    const qb = await this.database.querybuilder(KitModuleDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitModuleDomainModel(record);
    });
  }
}
