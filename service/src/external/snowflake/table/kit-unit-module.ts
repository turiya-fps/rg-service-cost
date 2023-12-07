import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { createFeedItemValidationSchema, createFeedQueryExecutor, createSnowflakeIdentityValidationSchema, FeedTableName } from '../table';

/**
 * @example
 * {
 *   "module_id": "recWY1aJuZe0pUPf2",
 *   "module_quantity": 1,
 *   "unit_id": "recZttlq7BQO37ppi"
 * }
 */
export type UnitModuleFeedItemData = {
  readonly module_id: string;
  readonly module_quantity: number;
  readonly unit_id: string;
};

export type UnitModuleFeedItemDataSanitised = {
  readonly module_id: string;
  readonly module_quantity: number;

  readonly unit_id: string;
};

export type UnitModuleFeedItem = FeedItem<FeedTableName.UnitModule, UnitModuleFeedItemData>;
export type UnitModuleFeedItemSanitised = FeedItemSanitised<FeedTableName.UnitModule, UnitModuleFeedItemDataSanitised>;

const data = z.object<ToZodSchema<UnitModuleFeedItemData>>({
  module_id: createSnowflakeIdentityValidationSchema(),
  module_quantity: z.number().min(1),

  unit_id: createSnowflakeIdentityValidationSchema(),
});

export const createUnitModuleFeedItemValidationSchema = (): ZodSchema => {
  return createFeedItemValidationSchema(FeedTableName.UnitModule, data);
};

export const toUnitModuleFeedItemSanitised = (feed: UnitModuleFeedItem): UnitModuleFeedItemSanitised | undefined => {
  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      module_id: feed.data.module_id,
      module_quantity: feed.data.module_quantity,

      unit_id: feed.data.unit_id,
    },
  };
};

export const createUnitModuleFeedItemQueryExecutor = (): QueryExecutor<UnitModuleFeedItem, UnitModuleFeedItemSanitised> => {
  const schema = createUnitModuleFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.UnitModule, schema, toUnitModuleFeedItemSanitised);
};
