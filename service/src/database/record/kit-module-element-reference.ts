import { fromIsoString, toIsoString } from '@project-rouge/service-core/data/date';
import type { DecimalDatabaseValue } from '@project-rouge/service-core/database/column/decimal';
import { fromDecimalDatabaseValue, toDecimalDatabaseValue } from '@project-rouge/service-core/database/column/decimal';
import type { BinaryJsonDatabaseValue } from '@project-rouge/service-core/database/column/jsonb';
import { fromBinaryJsonDatabaseValue, toBinaryJsonDatabaseValue } from '@project-rouge/service-core/database/column/jsonb';
import type { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { KitModuleElementReferenceDomainModel } from '../../domain/model/kit-module-element-reference';
import type { FeedItemAssemblyOrGroup, FeedItemCostPlanSection } from '../../external/snowflake/data';

export type KitModuleElementReferenceDatabaseRecord = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: string;

  readonly index_group: string;
  readonly index_group_item: string;

  readonly assembly_or_group: FeedItemAssemblyOrGroup;
  readonly cost_plan_section: FeedItemCostPlanSection;
  readonly unit_of_measurement: UnitOfMeasurement;

  readonly rate_cost: DecimalDatabaseValue;
  readonly rate_cost_tall_building: DecimalDatabaseValue;
  readonly rate_carbon: DecimalDatabaseValue;

  readonly option_group_ids: string[] | null;
  readonly option_count: number;

  readonly percentage_targets: BinaryJsonDatabaseValue<string[]> | null;

  readonly created_at: string;
};

export const toKitModuleElementReferenceDomainModel = (record: KitModuleElementReferenceDatabaseRecord): KitModuleElementReferenceDomainModel => {
  return {
    id: record.id,

    source_id: record.source_id,
    source_updated_at: fromIsoString(record.source_updated_at),

    index_group: record.index_group,
    index_group_item: record.index_group_item,

    assembly_or_group: record.assembly_or_group,
    cost_plan_section: record.cost_plan_section,
    unit_of_measurement: record.unit_of_measurement,

    rate_cost: fromDecimalDatabaseValue(record.rate_cost),
    rate_cost_tall_building: fromDecimalDatabaseValue(record.rate_cost_tall_building),
    rate_carbon: fromDecimalDatabaseValue(record.rate_carbon),

    option_groups: record.option_group_ids === null
      ? undefined
      : record.option_group_ids,

    option_count: record.option_count,

    percentage_targets: record.percentage_targets === null
      ? undefined
      : fromBinaryJsonDatabaseValue<string[]>(record.percentage_targets),

    created_at: fromIsoString(record.created_at),
  };
};

export const fromKitModuleElementReferenceDomainModel = (model: KitModuleElementReferenceDomainModel): KitModuleElementReferenceDatabaseRecord => {
  return {
    id: model.id,

    source_id: model.source_id,
    source_updated_at: toIsoString(model.source_updated_at),

    index_group: model.index_group,
    index_group_item: model.index_group_item,

    assembly_or_group: model.assembly_or_group,
    cost_plan_section: model.cost_plan_section,
    unit_of_measurement: model.unit_of_measurement,

    rate_cost: toDecimalDatabaseValue(model.rate_cost),
    rate_cost_tall_building: toDecimalDatabaseValue(model.rate_cost_tall_building),
    rate_carbon: toDecimalDatabaseValue(model.rate_carbon),

    option_group_ids: model.option_groups === undefined
      ? null
      : model.option_groups,

    option_count: model.option_count,

    percentage_targets: model.percentage_targets === undefined
      ? null
      : toBinaryJsonDatabaseValue(model.percentage_targets),

    created_at: toIsoString(model.created_at),
  };
};
