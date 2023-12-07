import { fn } from '@matt-usurp/grok/testing';
import type { DateFactory } from '@project-rouge/service-core/data/date';
import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { FeedTableName } from '../../external/snowflake/table';
import type { KitUnitDomainModel } from '../model/kit-unit';
import { KitUnitDomainModelFactory } from './kit-unit';

describe(KitUnitDomainModelFactory.name, (): void => {
  describe('fromUnitFeedSanitised()', (): void => {
    it('with sanitised feed record, creates domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:identity:value');

      const date = fn<DateFactory>();
      date.mockReturnValueOnce(fromIsoString('2023-01-14T12:54:51.801Z'));

      const factory = new KitUnitDomainModelFactory(identity, date);

      expect(
        factory.fromFeedItemSanitised({
          source_id: 'recA1B2C3D4E5F6G',
          source_table_name: FeedTableName.Unit,
          source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

          data: {
            unit_name: 'test:domain-model:label',
          },
        }),
      ).toStrictEqual<KitUnitDomainModel>({
        id: 'test:identity:value',

        source_id: 'recA1B2C3D4E5F6G',
        source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

        label: 'test:domain-model:label',

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

      const factory = new KitUnitDomainModelFactory(identity, date);

      const model: KitUnitDomainModel = {
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        label: 'test:domain-model:label',

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      };

      expect(
        factory.withFeedItemDataSanitised(
          model,
          fromIsoString('2023-02-14T13:16:57.072Z'),
          {
            unit_name: 'test:feed-item:unit-name',
          },
        ),
      ).toStrictEqual<KitUnitDomainModel>({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T13:16:57.072Z'),

        label: 'test:feed-item:unit-name',

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      });

      expect(identity).toBeCalledTimes(0);
      expect(date).toBeCalledTimes(0);
    });
  });
});
