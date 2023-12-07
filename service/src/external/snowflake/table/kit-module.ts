import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { createFeedItemValidationSchema, createFeedQueryExecutor, FeedTableName } from '../table';

/**
 * @example
 * {
 *   "module_name": "[Scarlet] M03a"
 * }
 */
export type ModuleFeedItemData = {
  readonly module_name: string;
};

export type ModuleFeedItemDataSanitised = {
  readonly module_name: string;
};

export type ModuleFeedItem = FeedItem<FeedTableName.Module, ModuleFeedItemData>;
export type ModuleFeedItemSanitised = FeedItemSanitised<FeedTableName.Module, ModuleFeedItemDataSanitised>;

const data = z.object<ToZodSchema<ModuleFeedItemData>>({
  module_name: z.string().min(1),
});

export const createModuleFeedItemValidationSchema = (): ZodSchema => {
  return createFeedItemValidationSchema(FeedTableName.Module, data);
};

export const toModuleFeedItemSanitised = (feed: ModuleFeedItem): ModuleFeedItemSanitised | undefined => {
  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      module_name: feed.data.module_name,
    },
  };
};

export const createModuleFeedItemQueryExecutor = (): QueryExecutor<ModuleFeedItem, ModuleFeedItemSanitised> => {
  const schema = createModuleFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.Module, schema, toModuleFeedItemSanitised);
};
