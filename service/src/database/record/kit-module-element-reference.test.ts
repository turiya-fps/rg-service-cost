import { fromIsoString } from '@project-rouge/service-core/data/date';
import { toDecimalDatabaseValue } from '@project-rouge/service-core/database/column/decimal';
import { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { KitModuleElementReferenceDomainModel } from '../../domain/model/kit-module-element-reference';
import { FeedItemAssemblyOrGroup, FeedItemCostPlanSection } from '../../external/snowflake/data';
import type { KitModuleElementReferenceDatabaseRecord } from './kit-module-element-reference';
import { fromKitModuleElementReferenceDomainModel, toKitModuleElementReferenceDomainModel } from './kit-module-element-reference';

describe('toKitModuleElementReferenceDomainModel()', (): void => {
  it('with record, converts to domain model', (): void => {
    expect(
      toKitModuleElementReferenceDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        index_group: '2',
        index_group_item: '2.3',

        assembly_or_group: FeedItemAssemblyOrGroup.Disposal,
        cost_plan_section: FeedItemCostPlanSection.InternalWalls,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: toDecimalDatabaseValue(34),
        rate_cost_tall_building: toDecimalDatabaseValue(33),
        rate_carbon: toDecimalDatabaseValue(45.32),

        option_group_ids: null,
        option_count: 0,

        percentage_targets: null,

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitModuleElementReferenceDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      index_group: '2',
      index_group_item: '2.3',

      assembly_or_group: FeedItemAssemblyOrGroup.Disposal,
      cost_plan_section: FeedItemCostPlanSection.InternalWalls,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      rate_cost: 34,
      rate_cost_tall_building: 33,
      rate_carbon: 45.32,

      option_groups: undefined,
      option_count: 0,

      percentage_targets: undefined,

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });
});

describe('fromKitModuleElementReferenceDomainModel()', (): void => {
  it('with domain model, converts to database record', (): void => {
    expect(
      fromKitModuleElementReferenceDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        index_group: '2',
        index_group_item: '2.3',

        assembly_or_group: FeedItemAssemblyOrGroup.Disposal,
        cost_plan_section: FeedItemCostPlanSection.InternalWalls,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: 34,
        rate_cost_tall_building: 54,
        rate_carbon: 45.32,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: undefined,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitModuleElementReferenceDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      index_group: '2',
      index_group_item: '2.3',

      assembly_or_group: FeedItemAssemblyOrGroup.Disposal,
      cost_plan_section: FeedItemCostPlanSection.InternalWalls,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      rate_cost: toDecimalDatabaseValue(34),
      rate_cost_tall_building: toDecimalDatabaseValue(54),
      rate_carbon: toDecimalDatabaseValue(45.32),

      option_group_ids: null,
      option_count: 0,

      percentage_targets: null,

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });
});
