import { fromIsoString } from '@project-rouge/service-core/data/date';
import { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import { FeedItemAssemblyOrGroup, FeedItemCostPlanSection } from '../../external/snowflake/data';
import type { KitModuleElementReferenceDomainModel } from './kit-module-element-reference';

// This can be removed when the file has something other than types in it.
import './kit-module-element-reference';

it('type test', (): void => {
  const model: KitModuleElementReferenceDomainModel = {
    id: 'test:domain-model:id',

    source_id: 'test:domain-model:source-id',
    source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

    index_group: '1',
    index_group_item: '1.1',

    assembly_or_group: FeedItemAssemblyOrGroup.Bathroom,
    cost_plan_section: FeedItemCostPlanSection.FixturesAndFittings,
    unit_of_measurement: UnitOfMeasurement.Each,

    rate_cost: 343,
    rate_cost_tall_building: 32.23,
    rate_carbon: 34.32,

    option_groups: [
      'test:domain-model:option-group-id',
    ],
    option_count: 1,

    percentage_targets: undefined,

    created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
  };

  expect(model).toBeTypeOf('object');
});
