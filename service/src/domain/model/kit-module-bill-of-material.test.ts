import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitModuleBillOfMaterialDomainModel } from './kit-module-bill-of-material';

// This can be removed when the file has something other than types in it.
import './kit-module-bill-of-material';

it('type test', (): void => {
  const model: KitModuleBillOfMaterialDomainModel = {
    id: 'test:domain-model:id',

    source_id: 'test:domain-model:source-id',
    source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

    kit_module_id: 'test:domain-model:kit-module-id',
    kit_module_element_reference_id: 'test:domain-model:kit-module-element-id',

    rate_cost: 232,
    rate_carbon: 34.32,

    quantity: 2,

    created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
  };

  expect(model).toBeTypeOf('object');
});
