import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { BuildingOption } from '@project-rouge/service-cost-client/src/data/building';
import type { ZodSchema, ZodTypeDef } from 'zod';
import { z } from 'zod';
import type { OptionGroup, OptionGroupAndValue, OptionValue } from '../data';
import { convertFeedItemOptionGroupAndValueToBuildingOption } from '../data';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { FeedTableName, createFeedItemValidationSchema, createFeedQueryExecutor, createOptionGroupAndValueValidationSchema, createOptionGroupValidationSchema, createOptionValueValidationSchema, createSnowflakeIdentityValidationSchema } from '../table';

/**
 * @example
 * {
 *  "base_build_element_reference": [
 *     "recl9hpSoFBIG4wcy",
 *     "recl9iHj7kou3dDpM",
 *      "recJ74924A19DjmwN"
 *    ],
 *  "modular_element_reference": null,
 *  "default_within_group": false,
 *  "option_group": "Facade Finishes",
 *  "option_value": "Facing Brickwork",
 * }
 */
export type OptionFeedItemData = {
  readonly base_build_element_reference: string[] | null;
  readonly modular_element_reference: string[] | null;
  readonly default_within_group: boolean;
  readonly option_group: OptionGroup;
  readonly option_value: OptionValue;
  readonly option_group_and_value_name: OptionGroupAndValue;
};

export type OptionFeedItemDataSanitised = {
  readonly option_group_and_value: BuildingOption;
  readonly default_within_group: boolean;
  readonly base_build_element_reference: string[] | null;
  readonly module_element_reference: string[] | null;
};

export type OptionFeedItem = FeedItem<FeedTableName.Option, OptionFeedItemData>;
export type OptionFeedItemSanitised = FeedItemSanitised<FeedTableName.Option, OptionFeedItemDataSanitised>;

const data = z.object<ToZodSchema<OptionFeedItemData>>({
  base_build_element_reference: z.array(
    createSnowflakeIdentityValidationSchema(),
  ).min(1).nullable(),

  modular_element_reference: z.array(
    createSnowflakeIdentityValidationSchema(),
  ).min(1).nullable(),

  option_group: createOptionGroupValidationSchema(),
  option_value: createOptionValueValidationSchema(),
  option_group_and_value_name: createOptionGroupAndValueValidationSchema(),

  default_within_group: z.boolean(),
});

export const createOptionFeedItemValidationSchema = (): ZodSchema<OptionFeedItem, ZodTypeDef, OptionFeedItemSanitised> => {
  return createFeedItemValidationSchema(FeedTableName.Option, data);
};

export const toOptionFeedItemSanitised = (feed: OptionFeedItem): OptionFeedItemSanitised | undefined => {
  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      option_group_and_value: convertFeedItemOptionGroupAndValueToBuildingOption(feed.data.option_group_and_value_name),
      default_within_group: feed.data.default_within_group,
      base_build_element_reference: feed.data.base_build_element_reference,
      module_element_reference: feed.data.modular_element_reference,
    },
  };
};

export const createOptionFeedItemQueryExecutor = (): QueryExecutor<OptionFeedItem, OptionFeedItemSanitised> => {
  const schema = createOptionFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.Option, schema, toOptionFeedItemSanitised);
};
