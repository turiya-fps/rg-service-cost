import { fromIsoString } from '@project-rouge/service-core/data/date';
import type { KitUnitDomainModel } from '../../domain/model/kit-unit';
import type { KitUnitDatabaseRecord } from './kit-unit';
import { fromKitUnitDomainModel, toKitUnitDomainModel } from './kit-unit';

describe('toKitUnitDomainModel()', (): void => {
  it('with record, converts to domain model', (): void => {
    expect(
      toKitUnitDomainModel({
        id: 'test:database-record:id',

        source_id: 'test:database-record:source-id',
        source_updated_at: '2023-02-14T10:44:49.386Z',

        label: 'test:database-record:name',

        created_at: '2023-02-14T10:44:26.210Z',
      }),
    ).toStrictEqual<KitUnitDomainModel>({
      id: 'test:database-record:id',

      source_id: 'test:database-record:source-id',
      source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

      label: 'test:database-record:name',

      created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
    });
  });
});

describe('fromKitUnitDomainModel()', (): void => {
  it('with domain model, converts to database record', (): void => {
    expect(
      fromKitUnitDomainModel({
        id: 'test:domain-model:id',

        source_id: 'test:domain-model:source-id',
        source_updated_at: fromIsoString('2023-02-14T10:44:49.386Z'),

        label: 'test:domain-model:name',

        created_at: fromIsoString('2023-02-14T10:44:26.210Z'),
      }),
    ).toStrictEqual<KitUnitDatabaseRecord>({
      id: 'test:domain-model:id',

      source_id: 'test:domain-model:source-id',
      source_updated_at: '2023-02-14T10:44:49.386Z',

      label: 'test:domain-model:name',

      created_at: '2023-02-14T10:44:26.210Z',
    });
  });
});
