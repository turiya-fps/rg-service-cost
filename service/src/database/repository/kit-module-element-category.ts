import { provide } from '@matt-usurp/grok';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { KitModuleElementCategoryDomainModel } from '../../domain/model/kit-module-element-category';
import { fromKitModuleElementCategoryDomainModel, toKitModuleElementCategoryDomainModel } from '../record/kit-module-element-category';
import { KitModuleElementCategoryDatabaseSchema } from '../schema/kit-module-element-category';

export class KitModuleElementCategoryDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: KitModuleElementCategoryDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleElementCategoryDatabaseSchema).insert();
    const record = fromKitModuleElementCategoryDomainModel(model);

    qb.values({
      id: provide(cast.uuid(quote.single(record.id))),

      source_id: record.source_id,
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      embodied_carbon_category: record.embodied_carbon_category,
      embodied_carbon_sub_category: record.embodied_carbon_sub_category,
      embodied_carbon_weight: record.embodied_carbon_weight,

      module_element_reference: record.module_element_reference,

      created_at: provide(cast.timestamp(quote.single(record.created_at))),
    });

    await qb.execute();
  }

  public async update(model: KitModuleElementCategoryDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(KitModuleElementCategoryDatabaseSchema).update();
    const record = fromKitModuleElementCategoryDomainModel(model);

    qb.set({
      source_updated_at: provide(cast.timestamp(quote.single(record.source_updated_at))),

      embodied_carbon_category: record.embodied_carbon_category,
      embodied_carbon_sub_category: record.embodied_carbon_sub_category,
      embodied_carbon_weight: record.embodied_carbon_weight,

      module_element_reference: record.module_element_reference,
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findAllBySourceIds(ids: string[]): Promise<KitModuleElementCategoryDomainModel[]> {
    const qb = await this.database.querybuilder(KitModuleElementCategoryDatabaseSchema).select('self');

    qb.where('self.source_id IN (:...sourceIds)');

    qb.setParameters({
      sourceIds: ids,
    });

    qb.orderBy('self.created_at', 'DESC');

    const records = await qb.getMany();

    return records.map((record) => {
      return toKitModuleElementCategoryDomainModel(record);
    });
  }
}
