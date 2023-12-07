import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitUnitModuleDomainModel } from '../../domain/model/kit-unit-module';
import type { KitUnitModuleDatabaseRecord } from './kit-unit-module';
import { fromKitUnitModuleDomainModel, toKitUnitModuleDomainModel } from './kit-unit-module';

describe('toKitUnitModuleDomainModel()', (): void => {
  it('with record, converts to domain model', (): void => {
    expect(
      toKitUnitModuleDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        kit_module_id: 'test:database-record:kit-module-id',
        kit_unit_id: 'test:database-record:kit-unit-id',

        quantity: 5,

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitUnitModuleDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      kit_module_id: 'test:database-record:kit-module-id',
      kit_unit_id: 'test:database-record:kit-unit-id',

      quantity: 5,

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });
});

describe('fromKitUnitModuleDomainModel()', (): void => {
  it('with domain model, converts to database record', (): void => {
    expect(
      fromKitUnitModuleDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        kit_module_id: 'test:domain-model:kit-module-id',
        kit_unit_id: 'test:domain-model:kit-unit-id',

        quantity: 5,

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitUnitModuleDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      kit_module_id: 'test:domain-model:kit-module-id',
      kit_unit_id: 'test:domain-model:kit-unit-id',

      quantity: 5,

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });
});
