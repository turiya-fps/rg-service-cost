import { fn } from '@matt-usurp/grok/testing';
import type { DateFactory } from '@project-rouge/service-core/data/date';
import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { FeedTableName } from '../../external/snowflake/table';
import type { KitModuleBillOfMaterialDomainModel } from '../model/kit-module-bill-of-material';
import { KitModuleBillOfMaterialDomainModelFactory } from './kit-module-bill-of-material';

describe(KitModuleBillOfMaterialDomainModelFactory.name, (): void => {
  describe('fromFeedItemSanitised()', (): void => {
    it('with sanitised feed record, creates domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:identity:value');

      const date = fn<DateFactory>();
      date.mockReturnValueOnce(fromIsoString('2023-01-14T12:54:51.801Z'));

      const factory = new KitModuleBillOfMaterialDomainModelFactory(identity, date);

      expect(
        factory.fromFeedItemSanitised({
          source_id: 'recA1B2C3D4E5F6G',
          source_table_name: FeedTableName.ModuleBillOfMaterial,
          source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

          data: {
            embodied_carbon_line_cost: 344.32,
            line_cost: 232,
            modular_element_id: 'test:domain-model:kit-module-element-id',
            module_id: 'test:domain-model:kit-module-id',
            quantity_actual: 1,
          },
        }),
      ).toStrictEqual<KitModuleBillOfMaterialDomainModel>({
        id: 'test:identity:value',

        source_id: 'recA1B2C3D4E5F6G',
        source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

        kit_module_id: 'test:domain-model:kit-module-id',
        kit_module_element_reference_id: 'test:domain-model:kit-module-element-id',

        rate_cost: 232,
        rate_carbon: 344.32,

        quantity: 1,

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

      const factory = new KitModuleBillOfMaterialDomainModelFactory(identity, date);

      const model: KitModuleBillOfMaterialDomainModel = {
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        kit_module_id: 'test:domain-model:kit-module-id',
        kit_module_element_reference_id: 'test:domain-model:kit-module-element-id',

        rate_cost: 232,
        rate_carbon: 45.32,

        quantity: 2,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      };

      expect(
        factory.withFeedItemDataSanitised(
          model,
          fromIsoString('2023-02-14T13:16:57.072Z'),
          {
            embodied_carbon_line_cost: 344.32,
            line_cost: 342,
            modular_element_id: 'test:feed-item:module-element-id',
            module_id: 'test:feed-item:module-id',
            quantity_actual: 3,
          },
        ),
      ).toStrictEqual<KitModuleBillOfMaterialDomainModel>({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T13:16:57.072Z'),

        kit_module_id: 'test:feed-item:module-id',
        kit_module_element_reference_id: 'test:feed-item:module-element-id',

        rate_cost: 342,
        rate_carbon: 344.32,

        quantity: 3,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      });

      expect(identity).toBeCalledTimes(0);
      expect(date).toBeCalledTimes(0);
    });
  });
});
