import type { PercentageValue } from '@project-rouge/service-core/data/percentage';

export type ProjectCostingDomainModel = {
  readonly id: string;

  readonly project_id: string;

  readonly on_cost_preliminiaries_percentage: PercentageValue | undefined;
  readonly on_cost_contingencies_percentage: PercentageValue | undefined;
  readonly on_cost_overheads_and_profits_percentage: PercentageValue | undefined;
};
