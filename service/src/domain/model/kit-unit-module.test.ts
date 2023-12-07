import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitUnitModuleDomainModel } from './kit-unit-module';

// This can be removed when the file has something other than types in it.
import './kit-unit-module';

it('type test', (): void => {
  const model: KitUnitModuleDomainModel = {
    id: 'test:domain-model:id',

    source_id: 'test:domain-model:source-id',
    source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

    kit_module_id: 'test:domain-model:kit-module-id',
    kit_unit_id: 'test:domain-model:kit-unit-id',

    quantity: 2,

    created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
  };

  expect(model).toBeTypeOf('object');
});
