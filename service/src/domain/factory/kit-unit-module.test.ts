import { fn } from '@matt-usurp/grok/testing';
import type { DateFactory } from '@project-rouge/service-core/data/date';
import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { FeedTableName } from '../../external/snowflake/table';
import type { KitUnitModuleDomainModel } from '../model/kit-unit-module';
import { KitUnitModuleDomainModelFactory } from './kit-unit-module';

describe(KitUnitModuleDomainModelFactory.name, (): void => {
  describe('fromUnitModuleFeedSanitised()', (): void => {
    it('with sanitised feed record, creates domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:identity:value');

      const date = fn<DateFactory>();
      date.mockReturnValueOnce(fromIsoString('2023-01-14T12:54:51.801Z'));

      const factory = new KitUnitModuleDomainModelFactory(identity, date);

      expect(
        factory.fromFeedItemSanitised({
          source_id: 'recA1B2C3D4E5F6G',
          source_table_name: FeedTableName.UnitModule,
          source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

          data: {
            module_id: 'test:domain-model:kit-module-id',
            module_quantity: 2,

            unit_id: 'test:domain-model:kit-unit-id',
          },
        }),
      ).toStrictEqual<KitUnitModuleDomainModel>({
        id: 'test:identity:value',

        source_id: 'recA1B2C3D4E5F6G',
        source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

        kit_module_id: 'test:domain-model:kit-module-id',
        kit_unit_id: 'test:domain-model:kit-unit-id',

        quantity: 2,

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

      const factory = new KitUnitModuleDomainModelFactory(identity, date);

      const model: KitUnitModuleDomainModel = {
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        kit_module_id: 'test:domain-model:kit-module-id',
        kit_unit_id: 'test:domain-model:kit-unit-id',

        quantity: 2,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      };

      expect(
        factory.withFeedItemDataSanitised(
          model,
          fromIsoString('2023-02-14T13:16:57.072Z'),
          {
            module_id: 'test:feed-item:module-id',
            module_quantity: 3,
            unit_id: 'test:feed-item:unit-id',
          },
        ),
      ).toStrictEqual<KitUnitModuleDomainModel>({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T13:16:57.072Z'),

        kit_module_id: 'test:feed-item:module-id',
        kit_unit_id: 'test:feed-item:unit-id',

        quantity: 3,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      });

      expect(identity).toBeCalledTimes(0);
      expect(date).toBeCalledTimes(0);
    });
  });
});
