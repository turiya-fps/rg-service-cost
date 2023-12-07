import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitModuleDomainModel } from './kit-module';

// This can be removed when the file has something other than types in it.
import './kit-module';

it('type test', (): void => {
  const model: KitModuleDomainModel = {
    id: 'test:domain-model:id',

    source_id: 'test:domain-model:source-id',
    source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

    label: 'test:domain-model:label',

    created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
  };

  expect(model).toBeTypeOf('object');
});
