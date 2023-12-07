import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitModuleBillOfMaterialDomainModel } from '../../domain/model/kit-module-bill-of-material';
import type { KitModuleBillOfMaterialDatabaseRecord } from './kit-module-bill-of-material';
import { fromKitModuleBillOfMaterialDomainModel, toKitModuleBillOfMaterialDomainModel } from './kit-module-bill-of-material';

describe('toKitModuleBillOfMaterialDomainModel()', (): void => {
  it('with record, converts to domain model', (): void => {
    expect(
      toKitModuleBillOfMaterialDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        kit_module_id: 'test:database-record:kit-module-id',
        kit_module_element_reference_id: 'test:database-record:kit-module-element-reference-id',

        rate_cost: '304.56',
        rate_carbon: '20.34',

        quantity: '1',

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitModuleBillOfMaterialDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      kit_module_id: 'test:database-record:kit-module-id',
      kit_module_element_reference_id: 'test:database-record:kit-module-element-reference-id',

      rate_cost: 304.56,
      rate_carbon: 20.34,

      quantity: 1,

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });
});

describe('fromKitModuleBillOfMaterialDomainModel()', (): void => {
  it('with domain model, converts to database record', (): void => {
    expect(
      fromKitModuleBillOfMaterialDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        kit_module_id: 'test:domain-model:kit-module-id',
        kit_module_element_reference_id: 'test:domain-model:kit-module-element-reference-id',

        rate_cost: 304.56,
        rate_carbon: 20.34,

        quantity: 2,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitModuleBillOfMaterialDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      kit_module_id: 'test:domain-model:kit-module-id',
      kit_module_element_reference_id: 'test:domain-model:kit-module-element-reference-id',

      rate_cost: 304.56,
      rate_carbon: 20.34,

      quantity: 2,

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });
});
