import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitModuleDomainModel } from '../../domain/model/kit-module';
import type { KitModuleDatabaseRecord } from './kit-module';
import { fromKitModuleDomainModel, toKitModuleDomainModel } from './kit-module';

describe('toKitModuleDomainModel()', (): void => {
  it('with record, converts to domain model', (): void => {
    expect(
      toKitModuleDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        label: 'test:database-record:label',

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitModuleDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      label: 'test:database-record:label',

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });
});

describe('fromKitModuleDomainModel()', (): void => {
  it('with domain model, converts to database record', (): void => {
    expect(
      fromKitModuleDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        label: 'test:domain-model:label',

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitModuleDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      label: 'test:domain-model:label',

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });
});
