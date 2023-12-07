import type { ValueOptional } from '@project-rouge/service-core/data/optional';
import type { PercentageValue } from '@project-rouge/service-core/data/percentage';

export type OnCostConfiguration = {
  readonly preliminiaries_percentage: ValueOptional<PercentageValue>;
  readonly contingencies_percentage: ValueOptional<PercentageValue>;
  readonly overheads_and_profits_percentage: ValueOptional<PercentageValue>;
};

export type ProjectCostingHttpResource = {
  readonly on_costs: OnCostConfiguration;
};
