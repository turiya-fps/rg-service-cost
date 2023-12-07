import { provide } from '@matt-usurp/grok';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitUnitModuleDomainModel } from '../../domain/model/kit-unit-module';
import { fromKitUnitModuleDomainModel, toKitUnitModuleDomainModel } from '../record/kit-unit-module';
import { KitUnitModuleDatabaseSchema } from '../schema/kit-unit-module';

export class KitUnitModuleDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitUnitModuleDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitUnitModuleDatabaseSchema).insert();
    const record = fromKitUnitModuleDomainModel(model);

    qb.values({
      id: provide(cast.uuid(quote.single(record.id))),

      source_id: record.source_id,
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      kit_module: provide(cast.uuid(quote.single(record.kit_module_id))),
      kit_unit: provide(cast.uuid(quote.single(record.kit_unit_id))),

      quantity: record.quantity,

      created_at: provide(cast.timestamp(quote.single(record.created_at))),
    });

    await qb.execute();
  }

  public async update(model: KitUnitModuleDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitUnitModuleDatabaseSchema).update();
    const record = fromKitUnitModuleDomainModel(model);

    qb.set({
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      kit_module: provide(cast.uuid(quote.single(record.kit_module_id))),
      kit_unit: provide(cast.uuid(quote.single(record.kit_unit_id))),

      quantity: record.quantity,
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findAllBySourceIds(ids: string[]): Promise<KitUnitModuleDomainModel[]> {
    const qb = await this.database.querybuilder(KitUnitModuleDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitUnitModuleDomainModel(record);
    });
  }
}
