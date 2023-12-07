import { provide } from '@matt-usurp/grok';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitModuleBillOfMaterialDomainModel } from '../../domain/model/kit-module-bill-of-material';
import { fromKitModuleBillOfMaterialDomainModel, toKitModuleBillOfMaterialDomainModel } from '../record/kit-module-bill-of-material';
import { KitModuleBillOfMaterialDatabaseSchema } from '../schema/kit-module-bill-of-material';

export class KitModuleBillOfMaterialDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitModuleBillOfMaterialDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleBillOfMaterialDatabaseSchema).insert();
    const record = fromKitModuleBillOfMaterialDomainModel(model);

    qb.values({
      id: provide(cast.uuid(quote.single(record.id))),

      source_id: record.source_id,
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      kit_module: record.kit_module_id,
      kit_module_element_reference: record.kit_module_element_reference_id,

      rate_cost: record.rate_cost,
      rate_carbon: record.rate_carbon,

      quantity: record.quantity,

      created_at: provide(cast.timestamp(quote.single(record.created_at))),
    });

    await qb.execute();
  }

  public async update(model: KitModuleBillOfMaterialDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleBillOfMaterialDatabaseSchema).update();
    const record = fromKitModuleBillOfMaterialDomainModel(model);

    qb.set({
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      kit_module: record.kit_module_id,
      kit_module_element_reference: record.kit_module_element_reference_id,

      rate_cost: record.rate_cost,
      rate_carbon: record.rate_carbon,

      quantity: record.quantity,
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findAllBySourceIds(ids: string[]): Promise<KitModuleBillOfMaterialDomainModel[]> {
    const qb = await this.database.querybuilder(KitModuleBillOfMaterialDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitModuleBillOfMaterialDomainModel(record);
    });
  }
}
