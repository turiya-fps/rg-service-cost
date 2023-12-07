import type { SafeParseError, ZodEffects, ZodSchema, ZodString, ZodTypeDef } from 'zod';
import { z } from 'zod';
import type { SnowflakeClient } from './client';
import { isEmbodiedCarbonCategory, isEmbodiedCarbonSubCategory, isOptionGroup, isOptionGroupAndValue, isOptionValue } from './data';

export const enum FeedTableName {
  BaseBuildElementReference = 'BASE_BUILD_ELEMENT_REFERENCE',
  ModuleElementReference = 'MODULAR_ELEMENT_REFERENCE',
  ModuleBillOfMaterial = 'MODULE_BOM',
  Module = 'MODULES',
  Unit = 'UNITS',
  UnitModule = 'UNIT_MODULES',
  Option = 'OPTION_GROUPS_AND_VALUES',
  ModuleElementCategory = 'MODULAR_ELEMENT_CATEGORIES',
}

export type FeedItem<T extends FeedTableName, D extends Record<string, unknown>> = {
  readonly source_id: string;
  readonly source_table_name: T;
  readonly source_updated_at: Date;
  readonly data: D;
};

export type FeedItemSanitised<T extends FeedTableName, D extends Record<string, unknown>> = {
  readonly source_id: string;
  readonly source_table_name: T;
  readonly source_updated_at: Date;
  readonly data: D;
};

export const createSnowflakeIdentityValidationSchema = (): ZodString => {
  return z.string().regex(/^rec[a-zA-Z0-9]{14,}$/);
};

export const createFeedItemValidationSchema = (table: FeedTableName, data: ZodSchema): ZodSchema => {
  return z.object({
    source_id: createSnowflakeIdentityValidationSchema(),
    source_table_name: z.literal(table),
    source_updated_at: z.date(),
    data,
  });
};

export const createOptionGroupValidationSchema = (): ZodEffects<ZodString> => {
  return z.string().refine(isOptionGroup);
};

export const createOptionValueValidationSchema = (): ZodEffects<ZodString> => {
  return z.string().refine(isOptionValue);
};

export const createOptionGroupAndValueValidationSchema = (): ZodEffects<ZodString> => {
  return z.string().refine(isOptionGroupAndValue);
};

export const createEmbodiedCarbonCategoryValidationSchema = (): ZodEffects<ZodString> => {
  return z.string().refine(isEmbodiedCarbonCategory);
};

export const createEmbodiedCarbonSubCategoryValidationSchema = (): ZodEffects<ZodString> => {
  return z.string().refine(isEmbodiedCarbonSubCategory);
};

export type FeedSantisierFunction<T, S> = (feed: T) => S | undefined;

export const createFeedQueryForFeedTableName = (table: FeedTableName): string => {
  return `
SELECT
  feed.id_source AS "source_id"
, feed.table_name AS "source_table_name"
, feed.updated_at AS "source_updated_at"
, feed.data_payload AS "data"
FROM "DATABRAIN_USE"."DBT_COSTING_AIRTABLE"."COSTING_SERVICE_PUBLISHED_DATA" feed
WHERE feed.table_name = '${table}'
ORDER BY feed.updated_at DESC
;
`.trim();
};

export type QueryExecutorResult<T, S> = {
  readonly valid: {
    readonly count: number;
    readonly results: S[];
  };

  readonly invalid: {
    readonly count: number;
    readonly results: SafeParseError<S>[];
  };

  readonly skipped: {
    readonly count: number;
    readonly results: T[];
  };
};

export type QueryExecutor<T, S> = (client: SnowflakeClient) => Promise<QueryExecutorResult<T, S>>;

export const createFeedQueryExecutor = <T, S>(
  table: FeedTableName,
  schema: ZodSchema<T, ZodTypeDef, S>,
  santiser: FeedSantisierFunction<T, S>,
): QueryExecutor<T, S> => {
  return async (client: SnowflakeClient): Promise<QueryExecutorResult<T, S>> => {
    const invalid: SafeParseError<S>[] = [];
    const skipped: T[] = [];
    const results: S[] = [];

    const sql = createFeedQueryForFeedTableName(table);
    const records = await client.execute<T>(table, sql);

    // eslint-disable-next-line no-console
    console.dir({
      action: 'feed',
      count: records.length,
    }, { depth: null });

    for await (const record of records) {
      const validation = await schema.spa(record);

      if (validation.success === false) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'validate:record',
          state: 'failed',
          record,
          errors: validation.error.errors,
        }, { depth: null });

        invalid.push(validation);

        continue;
      }

      const sanitised = santiser(validation.data);

      if (sanitised === undefined) {
        skipped.push(record);

        continue;
      }

      results.push(sanitised);
    }

    // eslint-disable-next-line no-console
    console.dir({
      action: 'validation:record',
      invalid: invalid.length,
      skipped: skipped.length,
    }, { depth: null });

    return {
      valid: {
        count: records.length,
        results,
      },

      invalid: {
        count: invalid.length,
        results: invalid,
      },

      skipped: {
        count: skipped.length,
        results: skipped,
      },
    };
  };
};
