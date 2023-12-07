import type { DateFactory } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { toPrecision } from '@project-rouge/service-core/data/number';
import type { ModuleBillOfMaterialFeedItemDataSanitised, ModuleBillOfMaterialFeedItemSanitised } from '../../external/snowflake/table/kit-module-bill-of-material';
import type { KitModuleBillOfMaterialDomainModel } from '../model/kit-module-bill-of-material';

export class KitModuleBillOfMaterialDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
    private readonly date: DateFactory,
  ) {}

  public fromFeedItemSanitised(feed: ModuleBillOfMaterialFeedItemSanitised): KitModuleBillOfMaterialDomainModel {
    const id = this.identity();
    const date = this.date();

    return {
      id,

      source_id: feed.source_id,
      source_updated_at: feed.source_updated_at,

      kit_module_id: feed.data.module_id,
      kit_module_element_reference_id: feed.data.modular_element_id,

      rate_cost: toPrecision(feed.data.line_cost, 4),
      rate_carbon: toPrecision(feed.data.embodied_carbon_line_cost, 4),

      quantity: toPrecision(feed.data.quantity_actual, 2),

      created_at: date,
    };
  }

  public withFeedItemDataSanitised(
    model: KitModuleBillOfMaterialDomainModel,
    sourceUpdatedAt: Date,
    data: ModuleBillOfMaterialFeedItemDataSanitised,
  ): KitModuleBillOfMaterialDomainModel {
    return {
      ...model,

      source_updated_at: sourceUpdatedAt,

      kit_module_id: data.module_id,
      kit_module_element_reference_id: data.modular_element_id,

      rate_cost: toPrecision(data.line_cost, 4),
      rate_carbon: toPrecision(data.embodied_carbon_line_cost, 4),

      quantity: toPrecision(data.quantity_actual, 3),
    };
  }
}
