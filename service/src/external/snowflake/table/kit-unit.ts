import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { ZodSchema, ZodTypeDef } from 'zod';
import { z } from 'zod';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { createFeedItemValidationSchema, createFeedQueryExecutor, FeedTableName } from '../table';

/**
 * @example
 * {
 *   "unit_name": "Scarlet 300"
 * }
 */
export type UnitFeedItemData = {
  readonly unit_name: string;
};

export type UnitFeedItemDataSanitised = {
  readonly unit_name: string;
};

export type UnitFeedItem = FeedItem<FeedTableName.Unit, UnitFeedItemData>;
export type UnitFeedItemSanitised = FeedItemSanitised<FeedTableName.Unit, UnitFeedItemDataSanitised>;

const data = z.object<ToZodSchema<UnitFeedItemData>>({
  unit_name: z.string().min(1),
});

export const createUnitFeedItemValidationSchema = (): ZodSchema<UnitFeedItem, ZodTypeDef, UnitFeedItemSanitised> => {
  return createFeedItemValidationSchema(FeedTableName.Unit, data);
};

export const toUnitFeedItemSanitised = (feed: UnitFeedItem): UnitFeedItemSanitised | undefined => {
  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      unit_name: feed.data.unit_name,
    },
  };
};

export const createUnitFeedItemQueryExecutor = (): QueryExecutor<UnitFeedItem, UnitFeedItemSanitised> => {
  const schema = createUnitFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.Unit, schema, toUnitFeedItemSanitised);
};
