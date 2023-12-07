import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { BuildingOption } from '@project-rouge/service-cost-client/src/data/building';
import type { KitOptionDomainModel } from '../../domain/model/kit-option';
import type { KitOptionDatabaseRecord } from './kit-option';
import { fromKitOptionDomainModel, toKitOptionDomainModel } from './kit-option';

describe('toKitOptionDomainModel()', (): void => {
  it('with record, converts to domain model', (): void => {
    expect(
      toKitOptionDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        option_group_and_value: 'test:database-record:option-group-and-value',
        is_default_option_value: false,

        base_build_element_reference_ids: ['test:database-record:base-build-element-reference-id'],
        module_element_reference_ids: null,

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitOptionDomainModel | unknown>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      option_group_and_value: 'test:database-record:option-group-and-value',
      is_default_option_value: false,

      base_build_element_reference_ids: ['test:database-record:base-build-element-reference-id'],
      module_element_reference_ids: null,

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });
});

describe('fromKitOptionDomainModel()', (): void => {
  it('with domain model, converts to database record', (): void => {
    expect(
      fromKitOptionDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        option_group_and_value: 'test:domain-model:option-group-and-value' as BuildingOption,
        is_default_option_value: false,

        base_build_element_reference_ids: ['test:domain-model:base-build-element-reference-id'],
        module_element_reference_ids: null,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitOptionDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      option_group_and_value: 'test:domain-model:option-group-and-value',
      is_default_option_value: false,

      base_build_element_reference_ids: ['test:domain-model:base-build-element-reference-id'],
      module_element_reference_ids: null,

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });
});
