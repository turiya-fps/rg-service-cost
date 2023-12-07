import type { PercentageValue } from '@project-rouge/service-core/data/percentage';
import type { ValueBreakdown, ValueBreakdownArea, ValueGroup } from '../../data/value-breakdown';

export type ProjectCostingCalculationHttpResource = {
  /**
   * The configuration used to calculate.
   */
  readonly configuration: {
    readonly on_costs: {
      readonly preliminiaries_percentage: PercentageValue;
      readonly contingencies_percentage: PercentageValue;
      readonly overheads_and_profits_percentage: PercentageValue;
    };
  };

  readonly scenario: {
    readonly costing: ValueBreakdownArea<number>;
    readonly carbon: ValueGroup<number>[];
  };

  readonly buildings: {
    /**
     * The breakdown of costing values.
     *
     * The breakdown uses numeric arrays to represent all the buildings posted.
     * As a utility the first item is always the total of all buildings.
     * Therefore, the data structure looks as following `[total, building[0], building[1], ..]`.
     */
    readonly costing: ValueBreakdown<number[]>;

    /**
     * The emobdied carbon cost values.
     *
     * The breakdown uses numeric arrays to represent all the buildings posted.
     * As a utility the first item is always the total of all buildings.
     * Therefore, the data structure looks as following `[total, building[0], building[1], ..]`.
     */
    readonly carbon: ValueGroup<number[]>[];
  };
};
