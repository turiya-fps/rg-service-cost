import { toPrecision } from '@project-rouge/service-core/data/number';
import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { createFeedItemValidationSchema, createFeedQueryExecutor, createSnowflakeIdentityValidationSchema, FeedTableName } from '../table';

/**
 * @example
 * {
 *  "embodied_carbon_line_cost": 57.8448,
 *  "line_cost": 238.9608,
 *  "modular_element_id": "recVU9VStlZxOUrBD",
 *  "module_id": "recHzZdsncaYVXVqw",
 *  "quantity_actual": 28.08,
 *  "tall_building_line_cost": 238.9608
 * }
 */
export type ModuleBillOfMaterialFeedItemData = {
  readonly embodied_carbon_line_cost: number | null;
  readonly line_cost: number;
  readonly modular_element_id: string;
  readonly module_id: string;
  readonly quantity_actual: number;
};

export type ModuleBillOfMaterialFeedItemDataSanitised = {
  readonly embodied_carbon_line_cost: number;
  readonly line_cost: number;
  readonly modular_element_id: string;
  readonly module_id: string;
  readonly quantity_actual: number;
};

export type ModuleBillOfMaterialFeedItem = FeedItem<FeedTableName.ModuleBillOfMaterial, ModuleBillOfMaterialFeedItemData>;
export type ModuleBillOfMaterialFeedItemSanitised = FeedItemSanitised<FeedTableName.ModuleBillOfMaterial, ModuleBillOfMaterialFeedItemDataSanitised>;

const data = z.object<ToZodSchema<ModuleBillOfMaterialFeedItemData>>({
  embodied_carbon_line_cost: z.number().nullable(),
  line_cost: z.number(),
  modular_element_id: createSnowflakeIdentityValidationSchema(),
  module_id: createSnowflakeIdentityValidationSchema(),
  quantity_actual: z.number(),
});

export const createModuleBillOfMaterialFeedItemValidationSchema = (): ZodSchema => {
  return createFeedItemValidationSchema(FeedTableName.ModuleBillOfMaterial, data);
};

export const toModuleBillOfMaterialFeedItemSanitised = (feed: ModuleBillOfMaterialFeedItem): ModuleBillOfMaterialFeedItemSanitised | undefined => {
  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      embodied_carbon_line_cost: toPrecision(feed.data.embodied_carbon_line_cost ?? 0, 4),
      line_cost: toPrecision(feed.data.line_cost, 4),
      modular_element_id: feed.data.modular_element_id,
      module_id: feed.data.module_id,
      quantity_actual: feed.data.quantity_actual,
    },
  };
};

export const createModuleBillOfMaterialFeedItemQueryExecutor = (): QueryExecutor<ModuleBillOfMaterialFeedItem, ModuleBillOfMaterialFeedItemSanitised> => {
  const schema = createModuleBillOfMaterialFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.ModuleBillOfMaterial, schema, toModuleBillOfMaterialFeedItemSanitised);
};
