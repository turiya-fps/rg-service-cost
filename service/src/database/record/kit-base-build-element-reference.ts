import { fromIsoString, toIsoString } from '@project-rouge/service-core/data/date';
import type { DecimalDatabaseValue } from '@project-rouge/service-core/database/column/decimal';
import { fromDecimalDatabaseValue, toDecimalDatabaseValue } from '@project-rouge/service-core/database/column/decimal';
import type { BinaryJsonDatabaseValue } from '@project-rouge/service-core/database/column/jsonb';
import { fromBinaryJsonDatabaseValue, toBinaryJsonDatabaseValue } from '@project-rouge/service-core/database/column/jsonb';
import type { BuildingData, ScenarioData, UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { KitBaseBuildElementReferenceDomainModel } from '../../domain/model/kit-base-build-element-reference';
import type { BuildingHeightBreakpoint } from '../../external/snowflake/data';

export type KitBaseBuildElementReferenceDatabaseRecord = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: string;

  readonly index_group: string;
  readonly index_group_item: string;

  readonly area_adjustment: DecimalDatabaseValue | null;
  readonly building_data_target: ScenarioData | BuildingData | null;
  readonly building_height_breakpoints: BuildingHeightBreakpoint[];
  readonly unit_of_measurement: UnitOfMeasurement;

  readonly rate_cost: DecimalDatabaseValue;
  readonly rate_carbon: DecimalDatabaseValue | null;

  readonly option_group_ids: string[] | null;
  readonly option_count: number;

  readonly percentage_targets: BinaryJsonDatabaseValue<string[]> | null;

  readonly created_at: string;
};

export const toKitBaseBuildElementReferenceDomainModel = (record: KitBaseBuildElementReferenceDatabaseRecord): KitBaseBuildElementReferenceDomainModel => {
  return {
    id: record.id,

    source_id: record.source_id,
    source_updated_at: fromIsoString(record.source_updated_at),

    index_group: record.index_group,
    index_group_item: record.index_group_item,

    area_adjustment: record.area_adjustment === null
      ? undefined
      : fromDecimalDatabaseValue(record.area_adjustment),

    building_data_target: record.building_data_target === null
      ? undefined
      : record.building_data_target,

    building_height_breakpoints: record.building_height_breakpoints,
    unit_of_measurement: record.unit_of_measurement,

    rate_cost: fromDecimalDatabaseValue(record.rate_cost),

    rate_carbon: record.rate_carbon === null
      ? undefined
      : fromDecimalDatabaseValue(record.rate_carbon),

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

export const fromKitBaseBuildElementReferenceDomainModel = (model: KitBaseBuildElementReferenceDomainModel): KitBaseBuildElementReferenceDatabaseRecord => {
  return {
    id: model.id,

    source_id: model.source_id,
    source_updated_at: toIsoString(model.source_updated_at),

    index_group: model.index_group,
    index_group_item: model.index_group_item,

    area_adjustment: model.area_adjustment === undefined
      ? null
      : toDecimalDatabaseValue(model.area_adjustment),

    building_data_target: model.building_data_target === undefined
      ? null
      : model.building_data_target,

    building_height_breakpoints: model.building_height_breakpoints,
    unit_of_measurement: model.unit_of_measurement,

    rate_cost: toDecimalDatabaseValue(model.rate_cost),

    rate_carbon: model.rate_carbon === undefined
      ? null
      : toDecimalDatabaseValue(model.rate_carbon),

    option_group_ids: model.option_groups === undefined
      ? null
      : model.option_groups,

    option_count: model.option_count,

    percentage_targets: model.percentage_targets === undefined
      ? null
      : toBinaryJsonDatabaseValue<string[]>(model.percentage_targets),

    created_at: toIsoString(model.created_at),
  };
};
