import type { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { FeedItemAssemblyOrGroup, FeedItemCostPlanSection } from '../../external/snowflake/data';

export type KitModuleElementReferenceDomainModel = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: Date;

  readonly index_group: string;
  readonly index_group_item: string;

  readonly assembly_or_group: FeedItemAssemblyOrGroup;
  readonly cost_plan_section: FeedItemCostPlanSection;
  readonly unit_of_measurement: UnitOfMeasurement;

  readonly rate_cost: number;
  readonly rate_cost_tall_building: number;
  readonly rate_carbon: number;

  readonly option_groups: string[] | undefined;
  readonly option_count: number;

  readonly percentage_targets: string[] | undefined;

  readonly created_at: Date;
};
