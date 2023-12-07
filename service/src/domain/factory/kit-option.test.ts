import { fn } from '@matt-usurp/grok/testing';
import type { DateFactory } from '@project-rouge/service-core/data/date';
import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import { BuildingOption } from '@project-rouge/service-cost-client/src/data/building';
import { FeedTableName } from '../../external/snowflake/table';
import type { KitOptionDomainModel } from '../model/kit-option';
import { KitOptionDomainModelFactory } from './kit-option';

describe(KitOptionDomainModelFactory.name, (): void => {
  describe('fromOptionFeedSanitised()', (): void => {
    it('with sanitised feed record, creates domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:identity:value');

      const date = fn<DateFactory>();
      date.mockReturnValueOnce(fromIsoString('2023-01-14T12:54:51.801Z'));

      const factory = new KitOptionDomainModelFactory(identity, date);

      expect(
        factory.fromFeedItemSanitised({
          source_id: 'recA1B2C3D4E5F6G',
          source_table_name: FeedTableName.Option,
          source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

          data: {
            option_group_and_value: BuildingOption.FacadeFinishesBrickSlipMechanical,
            default_within_group: false,

            base_build_element_reference: ['test:domain-model:base-build-element-reference'],
            module_element_reference: null,
          },
        }),
      ).toStrictEqual<KitOptionDomainModel>({
        id: 'test:identity:value',

        source_id: 'recA1B2C3D4E5F6G',
        source_updated_at: fromIsoString('2023-01-14T12:53:05.021Z'),

        option_group_and_value: 'facade_finishes:brick_slip_mechanical' as BuildingOption,
        is_default_option_value: false,

        base_build_element_reference_ids: ['test:domain-model:base-build-element-reference'],
        module_element_reference_ids: null,

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

      const factory = new KitOptionDomainModelFactory(identity, date);

      const model: KitOptionDomainModel = {
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        option_group_and_value: 'test:domain-model:option-group-and-value' as BuildingOption,
        is_default_option_value: false,

        base_build_element_reference_ids: ['test:domain-model:base-build-element-reference'],
        module_element_reference_ids: null,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      };

      expect(
        factory.withFeedItemDataSanitised(
          model,
          fromIsoString('2023-02-14T13:16:57.072Z'),
          {
            option_group_and_value: BuildingOption.FacadeFinishesBrickSlipMechanical,
            default_within_group: false,

            base_build_element_reference: ['test:feed-item:base-build-element-reference'],
            module_element_reference: null,
          },
        ),
      ).toStrictEqual<KitOptionDomainModel>({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T13:16:57.072Z'),

        option_group_and_value: 'facade_finishes:brick_slip_mechanical' as BuildingOption,
        is_default_option_value: false,

        base_build_element_reference_ids: ['test:feed-item:base-build-element-reference'],
        module_element_reference_ids: null,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      });

      expect(identity).toBeCalledTimes(0);
      expect(date).toBeCalledTimes(0);
    });
  });
});
