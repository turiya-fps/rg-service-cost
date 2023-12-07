import { fn } from '@matt-usurp/grok/testing';
import type { DateFactory } from '@project-rouge/service-core/data/date';
import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { BuildingData, UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import { FeedTableName } from '../../external/snowflake/table';
import type { KitBaseBuildElementReferenceDomainModel } from '../model/kit-base-build-element-reference';
import { KitBaseBuildElementReferenceDomainModelFactory } from './kit-base-build-element-reference';

describe(KitBaseBuildElementReferenceDomainModelFactory.name, (): void => {
  describe('fromBaseBuildElementReferenceFeedSanitised()', (): void => {
    it('with sanitised feed record, creates domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:identity:value');

      const date = fn<DateFactory>();
      date.mockReturnValueOnce(fromIsoString('2023-01-14T12:54:51.801Z'));

      const factory = new KitBaseBuildElementReferenceDomainModelFactory(identity, date);

      expect(
        factory.fromFeedItemDataSanitised({
          source_id: 'recA1B2C3D4E5F6G',
          source_table_name: FeedTableName.BaseBuildElementReference,
          source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

          data: {
            index_group: '1',
            index_group_item: '1.2',

            area_adjustment: 234,
            area_or_quantity_type: BuildingData.NumberOfDoubleDoors,
            unit_of_measurement: UnitOfMeasurement.MetreLinear,

            embodied_carbon_rate: 45.32,
            rate: 23,

            option_group_and_value_ids: undefined,
            option_count: 0,

            related_elements_for_percent_items: undefined,

            building_height_breakpoints: [],
          },
        }),
      ).toStrictEqual<KitBaseBuildElementReferenceDomainModel>({
        id: 'test:identity:value',

        source_id: 'recA1B2C3D4E5F6G',
        source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

        index_group: '1',
        index_group_item: '1.2',

        area_adjustment: 234,
        building_data_target: BuildingData.NumberOfDoubleDoors,
        unit_of_measurement: UnitOfMeasurement.MetreLinear,

        rate_cost: 23,
        rate_carbon: 45.32,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: undefined,

        building_height_breakpoints: [],

        created_at: fromIsoString('2023-01-14T12:54:51.801Z'),
      });

      expect(identity).toBeCalledTimes(1);
      expect(date).toBeCalledTimes(1);
    });
  });

  describe('withFeedItemDataSanitised()', (): void => {
    it('with domain model, combines feed item', (): void => {
      const identity = fn<IdentityFactory>();
      const date = fn<DateFactory>();

      const factory = new KitBaseBuildElementReferenceDomainModelFactory(identity, date);

      const model: KitBaseBuildElementReferenceDomainModel = {
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        index_group: '1',
        index_group_item: '1.2',

        area_adjustment: 234,
        building_data_target: BuildingData.NumberOfDoubleDoors,
        unit_of_measurement: UnitOfMeasurement.MetreLinear,

        rate_cost: 23,
        rate_carbon: 33,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: undefined,

        building_height_breakpoints: [],

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      };

      expect(
        factory.withFeedItemDataSanitised(
          model,
          fromIsoString('2023-02-14T13:16:57.072Z'),
          {
            index_group: '3.1',
            index_group_item: '3.4',

            area_adjustment: null,
            area_or_quantity_type: BuildingData.NumberOfMiscDoors,
            unit_of_measurement: UnitOfMeasurement.Each,

            embodied_carbon_rate: 45.32,
            rate: 33,

            option_group_and_value_ids: [
              'test:domain-model:option-group-and-value-id',
            ],
            option_count: 1,

            related_elements_for_percent_items: [
              'target-a',
              'target-b',
            ],

            building_height_breakpoints: [],
          },
        ),
      ).toStrictEqual<KitBaseBuildElementReferenceDomainModel>({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T13:16:57.072Z'),

        index_group: '3.1',
        index_group_item: '3.4',

        area_adjustment: undefined,
        building_data_target: BuildingData.NumberOfMiscDoors,
        unit_of_measurement: UnitOfMeasurement.Each,

        rate_cost: 33,
        rate_carbon: 45.32,

        option_groups: [
          'test:domain-model:option-group-and-value-id',
        ],
        option_count: 1,

        percentage_targets: [
          'target-a',
          'target-b',
        ],

        building_height_breakpoints: [],

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      });

      expect(identity).toBeCalledTimes(0);
      expect(date).toBeCalledTimes(0);
    });
  });
});
