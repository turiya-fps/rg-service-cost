import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitOptionDomainModel } from './kit-option';

// This can be removed when the file has something other than types in it.
import type { BuildingOption } from '@project-rouge/service-cost-client/src/data/building';
import './kit-unit';

it('type test', (): void => {
  const model: KitOptionDomainModel = {
    id: 'test:domain-model:id',

    source_id: 'test:domain-model:source-id',
    source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

    option_group_and_value: 'test:domain-model:option-group:test:domain-model:option-value' as BuildingOption,
    is_default_option_value: false,

    base_build_element_reference_ids: ['test:domain-model:base-build-element-reference-id'],
    module_element_reference_ids: ['test:domain-model:modular-element-reference-id'],

    created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
  };

  expect(model).toBeTypeOf('object');
});
