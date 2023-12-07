import type { BuildingData, ScenarioData, UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { BuildingHeightBreakpoint } from '../../external/snowflake/data';

export type KitBaseBuildElementReferenceDomainModel = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: Date;

  readonly index_group: string;
  readonly index_group_item: string;

  readonly area_adjustment: number | undefined;
  readonly building_data_target: ScenarioData | BuildingData | undefined;
  readonly building_height_breakpoints: BuildingHeightBreakpoint[];
  readonly unit_of_measurement: UnitOfMeasurement;

  readonly rate_cost: number;
  readonly rate_carbon: number | undefined;

  readonly option_groups: string[] | undefined;
  readonly option_count: number;

  readonly percentage_targets: string[] | undefined;

  readonly created_at: Date;
};
