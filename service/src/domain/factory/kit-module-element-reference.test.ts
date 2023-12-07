import { fn } from '@matt-usurp/grok/testing';
import type { DateFactory } from '@project-rouge/service-core/data/date';
import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import { FeedItemAssemblyOrGroup, FeedItemCostPlanSection } from '../../external/snowflake/data';
import { FeedTableName } from '../../external/snowflake/table';
import type { KitModuleElementReferenceDomainModel } from '../model/kit-module-element-reference';
import { KitModuleElementReferenceDomainModelFactory } from './kit-module-element-reference';

describe(KitModuleElementReferenceDomainModelFactory.name, (): void => {
  describe('fromModuleElementReferenceFeedSanitised()', (): void => {
    it('with sanitised feed record, creates domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:identity:value');

      const date = fn<DateFactory>();
      date.mockReturnValueOnce(fromIsoString('2023-01-14T12:54:51.801Z'));

      const factory = new KitModuleElementReferenceDomainModelFactory(identity, date);

      expect(
        factory.fromFeedItemSanitised({
          source_id: 'recA1B2C3D4E5F6G',
          source_table_name: FeedTableName.ModuleElementReference,
          source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

          data: {
            assembly_or_group: FeedItemAssemblyOrGroup.CeilingFinish,
            cost_plan_section: FeedItemCostPlanSection.FixturesAndFittings,
            embodied_carbon_rate: 344.32,
            index_group: '1',
            index_group_item: '1.1',
            rate: 10,
            rate_tall_building: 2,
            option_group_and_value_ids: undefined,
            option_count: 0,
            related_elements_for_percent_items: undefined,
            unit_of_measurement: UnitOfMeasurement.MetreCubic,
          },
        }),
      ).toStrictEqual<KitModuleElementReferenceDomainModel>({
        id: 'test:identity:value',

        source_id: 'recA1B2C3D4E5F6G',
        source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

        index_group: '1',
        index_group_item: '1.1',

        assembly_or_group: FeedItemAssemblyOrGroup.CeilingFinish,
        cost_plan_section: FeedItemCostPlanSection.FixturesAndFittings,
        unit_of_measurement: UnitOfMeasurement.MetreCubic,

        rate_cost: 10,
        rate_cost_tall_building: 2,
        rate_carbon: 344.32,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: undefined,

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

      const factory = new KitModuleElementReferenceDomainModelFactory(identity, date);

      const model: KitModuleElementReferenceDomainModel = {
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        index_group: '1',
        index_group_item: '1.1',

        assembly_or_group: FeedItemAssemblyOrGroup.CeilingFinish,
        cost_plan_section: FeedItemCostPlanSection.FixturesAndFittings,
        unit_of_measurement: UnitOfMeasurement.MetreCubic,

        rate_cost: 10,
        rate_cost_tall_building: 34,
        rate_carbon: 33.12,

        option_groups: undefined,
        option_count: 0,

        percentage_targets: undefined,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      };

      expect(
        factory.withFeedItemDataSanitised(
          model,
          fromIsoString('2023-02-14T13:16:57.072Z'),
          {
            assembly_or_group: FeedItemAssemblyOrGroup.FloorCassette,
            cost_plan_section: FeedItemCostPlanSection.MechanicalElectricalPlumbingAndHeating,
            embodied_carbon_rate: 344.32,
            index_group: '2',
            index_group_item: '2.1',
            rate: 20,
            rate_tall_building: 56,
            option_group_and_value_ids: [
              'test:option-group-id',
              'test:option-value-id',
            ],
            option_count: 2,
            related_elements_for_percent_items: undefined,
            unit_of_measurement: UnitOfMeasurement.Percentage,
          },
        ),
      ).toStrictEqual<KitModuleElementReferenceDomainModel>({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T13:16:57.072Z'),

        index_group: '2',
        index_group_item: '2.1',

        assembly_or_group: FeedItemAssemblyOrGroup.FloorCassette,
        cost_plan_section: FeedItemCostPlanSection.MechanicalElectricalPlumbingAndHeating,
        unit_of_measurement: UnitOfMeasurement.Percentage,

        rate_cost: 20,
        rate_cost_tall_building: 56,
        rate_carbon: 344.32,

        option_groups: [
          'test:option-group-id',
          'test:option-value-id',
        ],
        option_count: 2,

        percentage_targets: undefined,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      });

      expect(identity).toBeCalledTimes(0);
      expect(date).toBeCalledTimes(0);
    });
  });
});
