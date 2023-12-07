import { toPrecision } from '@project-rouge/service-core/data/number';
import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { FeedItemEmbodiedCarbonCategory, FeedItemEmbodiedCarbonSubCategory } from '../data';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { FeedTableName, createEmbodiedCarbonCategoryValidationSchema, createEmbodiedCarbonSubCategoryValidationSchema, createFeedItemValidationSchema, createFeedQueryExecutor, createSnowflakeIdentityValidationSchema } from '../table';

/**
 * @example
 * {
 *  "embodied_carbon_category": "Others",
 *  "embodied_carbon_sub_category": "Paint",
 *  "modular_element_id": "recUJeTRXkA3BH4wi",
 *  "number_attribute": 1
 * }
 */
export type ModuleElementCategoryFeedItemData = {
  readonly embodied_carbon_category: FeedItemEmbodiedCarbonCategory;
  readonly embodied_carbon_sub_category: FeedItemEmbodiedCarbonSubCategory;
  readonly modular_element_id: string;
  readonly number_attribute: number;
};

export type ModuleElementCategoryFeedItemDataSanitised = {
  readonly embodied_carbon_category: string;
  readonly embodied_carbon_sub_category: string;
  readonly embodied_carbon_weight: number;
  readonly module_element_reference: string;
};

export type ModuleElementCategoryFeedItem = FeedItem<FeedTableName.ModuleElementCategory, ModuleElementCategoryFeedItemData>;
export type ModuleElementCategoryFeedItemSanitised = FeedItemSanitised<FeedTableName.ModuleElementCategory, ModuleElementCategoryFeedItemDataSanitised>;

const data = z.object<ToZodSchema<ModuleElementCategoryFeedItemData>>({
  embodied_carbon_category: createEmbodiedCarbonCategoryValidationSchema(),
  embodied_carbon_sub_category: createEmbodiedCarbonSubCategoryValidationSchema(),
  modular_element_id: createSnowflakeIdentityValidationSchema(),
  number_attribute: z.number(),
});

export const createModuleElementCategoryFeedItemValidationSchema = (): ZodSchema => {
  return createFeedItemValidationSchema(FeedTableName.ModuleElementCategory, data);
};

export const toModuleElementCategoryFeedItemSanitised = (feed: ModuleElementCategoryFeedItem): ModuleElementCategoryFeedItemSanitised => {
  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      embodied_carbon_category: feed.data.embodied_carbon_category,
      embodied_carbon_sub_category: feed.data.embodied_carbon_sub_category,
      embodied_carbon_weight: toPrecision(feed.data.number_attribute, 2),
      module_element_reference: feed.data.modular_element_id,
    },
  };
};

export const createModuleElementCategoryFeedItemQueryExecutor = (): QueryExecutor<ModuleElementCategoryFeedItem, ModuleElementCategoryFeedItemSanitised> => {
  const schema = createModuleElementCategoryFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.ModuleElementCategory, schema, toModuleElementCategoryFeedItemSanitised);
};
