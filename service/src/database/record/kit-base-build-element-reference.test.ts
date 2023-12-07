import { fromIsoString } from '@project-rouge/service-core/data/date';
import { toDecimalDatabaseValue } from '@project-rouge/service-core/database/column/decimal';
import { toBinaryJsonDatabaseValue } from '@project-rouge/service-core/database/column/jsonb';
import { BuildingData, UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { KitBaseBuildElementReferenceDomainModel } from '../../domain/model/kit-base-build-element-reference';
import type { KitBaseBuildElementReferenceDatabaseRecord } from './kit-base-build-element-reference';
import { fromKitBaseBuildElementReferenceDomainModel, toKitBaseBuildElementReferenceDomainModel } from './kit-base-build-element-reference';

describe('toKitBaseBuildElementReferenceDomainModel()', (): void => {
  it('with record, converts to domain model', (): void => {
    expect(
      toKitBaseBuildElementReferenceDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        index_group: '1',
        index_group_item: '1.1',

        area_adjustment: null,
        building_data_target: BuildingData.CoreAndCorridorArea,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: toDecimalDatabaseValue(4.32),
        rate_carbon: toDecimalDatabaseValue(5.23),

        option_group_ids: null,
        option_count: 0,

        percentage_targets: null,

        building_height_breakpoints: [],

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitBaseBuildElementReferenceDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      index_group: '1',
      index_group_item: '1.1',

      area_adjustment: undefined,
      building_data_target: BuildingData.CoreAndCorridorArea,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      option_groups: undefined,
      option_count: 0,

      percentage_targets: undefined,

      rate_cost: 4.32,
      rate_carbon: 5.23,

      building_height_breakpoints: [],

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });

  it('with record, area adjustment, converts to domain model', (): void => {
    expect(
      toKitBaseBuildElementReferenceDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        index_group: '1',
        index_group_item: '1.1',

        area_adjustment: toDecimalDatabaseValue(3.45),
        building_data_target: BuildingData.CoreAndCorridorArea,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: toDecimalDatabaseValue(4.32),
        rate_carbon: toDecimalDatabaseValue(5.23),

        option_group_ids: null,
        option_count: 0,

        percentage_targets: null,

        building_height_breakpoints: [],

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitBaseBuildElementReferenceDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      index_group: '1',
      index_group_item: '1.1',

      area_adjustment: 3.45,
      building_data_target: BuildingData.CoreAndCorridorArea,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      rate_cost: 4.32,
      rate_carbon: 5.23,

      option_groups: undefined,
      option_count: 0,

      percentage_targets: undefined,

      building_height_breakpoints: [],

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });

  it('with record, percentage targets, converts to domain model', (): void => {
    expect(
      toKitBaseBuildElementReferenceDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        index_group: '1',
        index_group_item: '1.1',

        area_adjustment: toDecimalDatabaseValue(3.45),
        building_data_target: BuildingData.CoreAndCorridorArea,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: toDecimalDatabaseValue(4.32),
        rate_carbon: toDecimalDatabaseValue(5.23),

        option_group_ids: null,
        option_count: 0,

        percentage_targets: toBinaryJsonDatabaseValue([
          'target-a',
          'target-b',
          'target-c',
        ]),

        building_height_breakpoints: [],

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitBaseBuildElementReferenceDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      index_group: '1',
      index_group_item: '1.1',

      area_adjustment: 3.45,
      building_data_target: BuildingData.CoreAndCorridorArea,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      rate_cost: 4.32,
      rate_carbon: 5.23,

      option_groups: undefined,
      option_count: 0,

      percentage_targets: [
        'target-a',
        'target-b',
        'target-c',
      ],

      building_height_breakpoints: [],

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });
});

describe('fromKitBaseBuildElementReferenceDomainModel()', (): void => {
  it('with domain model, converts to database record', (): void => {
    expect(
      fromKitBaseBuildElementReferenceDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        index_group: '1',
        index_group_item: '1.1',

        area_adjustment: undefined,
        building_data_target: BuildingData.CoreAndCorridorArea,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: 4.32,
        rate_carbon: 5.23,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: undefined,

        building_height_breakpoints: [],

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitBaseBuildElementReferenceDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      index_group: '1',
      index_group_item: '1.1',

      area_adjustment: null,
      building_data_target: BuildingData.CoreAndCorridorArea,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      rate_cost: toDecimalDatabaseValue(4.32),
      rate_carbon: toDecimalDatabaseValue(5.23),

      option_group_ids: null,
      option_count: 0,

      percentage_targets: null,

      building_height_breakpoints: [],

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });

  it('with domain model, area adjustment, converts to database record', (): void => {
    expect(
      fromKitBaseBuildElementReferenceDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        index_group: '1',
        index_group_item: '1.1',

        area_adjustment: 3.45,
        building_data_target: BuildingData.CoreAndCorridorArea,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: 4.32,
        rate_carbon: 5.23,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: undefined,

        building_height_breakpoints: [],

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitBaseBuildElementReferenceDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      index_group: '1',
      index_group_item: '1.1',

      area_adjustment: toDecimalDatabaseValue(3.45),
      building_data_target: BuildingData.CoreAndCorridorArea,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      rate_cost: toDecimalDatabaseValue(4.32),
      rate_carbon: toDecimalDatabaseValue(5.23),

      option_group_ids: null,
      option_count: 0,

      percentage_targets: null,

      building_height_breakpoints: [],

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });

  it('with domain model, percentage targets, converts to database record', (): void => {
    expect(
      fromKitBaseBuildElementReferenceDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        index_group: '1',
        index_group_item: '1.1',

        area_adjustment: 3.45,
        building_data_target: BuildingData.CoreAndCorridorArea,
        unit_of_measurement: UnitOfMeasurement.MetreSquare,

        rate_cost: 4.32,
        rate_carbon: 5.23,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: [
          'target-a',
          'target-b',
          'target-c',
        ],

        building_height_breakpoints: [],

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitBaseBuildElementReferenceDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      index_group: '1',
      index_group_item: '1.1',

      area_adjustment: toDecimalDatabaseValue(3.45),
      building_data_target: BuildingData.CoreAndCorridorArea,
      unit_of_measurement: UnitOfMeasurement.MetreSquare,

      rate_cost: toDecimalDatabaseValue(4.32),
      rate_carbon: toDecimalDatabaseValue(5.23),

      option_group_ids: null,
      option_count: 0,

      percentage_targets: toBinaryJsonDatabaseValue([
        'target-a',
        'target-b',
        'target-c',
      ]),

      building_height_breakpoints: [],

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });
});
