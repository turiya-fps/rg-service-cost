import { toIdentityDatabaseValue } from '@project-rouge/service-core/database/data/identity';
import { toPercentageDatabaseValue } from '@project-rouge/service-core/database/data/percentage';
import type { ProjectCostingDomainModel } from '../../domain/model/project-costing';
import type { ProjectCostingDatabaseRecord } from './project-costing';
import { fromProjectCostingDomainModel, toProjectCostingDomainModel } from './project-costing';

describe('toProjectCostingDomainModel()', (): void => {
  it('with record, with no on costs, converts to domain model', (): void => {
    expect(
      toProjectCostingDomainModel({
        id: toIdentityDatabaseValue('test:database-record:id'),

        project_id: toIdentityDatabaseValue('test:database-record:project-id'),

        on_cost_preliminiaries_percentage: null,
        on_cost_contingencies_percentage: null,
        on_cost_overheads_and_profits_percentage: null,
      }),
    ).toStrictEqual<ProjectCostingDomainModel>({
      id: 'test:database-record:id',

      project_id: 'test:database-record:project-id',

      on_cost_preliminiaries_percentage: undefined,
      on_cost_contingencies_percentage: undefined,
      on_cost_overheads_and_profits_percentage: undefined,
    });
  });

  it('with record, with on costs, converts to domain model', (): void => {
    expect(
      toProjectCostingDomainModel({
        id: toIdentityDatabaseValue('test:database-record:id'),

        project_id: toIdentityDatabaseValue('test:database-record:project-id'),

        on_cost_preliminiaries_percentage: toPercentageDatabaseValue(0.1),
        on_cost_contingencies_percentage: toPercentageDatabaseValue(0.2),
        on_cost_overheads_and_profits_percentage: toPercentageDatabaseValue(0.3),
      }),
    ).toStrictEqual<ProjectCostingDomainModel>({
      id: 'test:database-record:id',

      project_id: 'test:database-record:project-id',

      on_cost_preliminiaries_percentage: 0.1,
      on_cost_contingencies_percentage: 0.2,
      on_cost_overheads_and_profits_percentage: 0.3,
    });
  });
});

describe('fromProjectCostingDomainModel()', (): void => {
  it('with domain model, with no on costs, converts to database record', (): void => {
    expect(
      fromProjectCostingDomainModel({
        id: 'test:domain-model:id',

        project_id: 'test:database-record:project-id',

        on_cost_preliminiaries_percentage: undefined,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      }),
    ).toStrictEqual<ProjectCostingDatabaseRecord>({
      id: toIdentityDatabaseValue('test:domain-model:id'),

      project_id: toIdentityDatabaseValue('test:database-record:project-id'),

      on_cost_preliminiaries_percentage: null,
      on_cost_contingencies_percentage: null,
      on_cost_overheads_and_profits_percentage: null,
    });
  });

  it('with domain model, with on costs, converts to database record', (): void => {
    expect(
      fromProjectCostingDomainModel({
        id: 'test:domain-model:id',

        project_id: 'test:database-record:project-id',

        on_cost_preliminiaries_percentage: 0.1,
        on_cost_contingencies_percentage: 0.2,
        on_cost_overheads_and_profits_percentage: 0.3,
      }),
    ).toStrictEqual<ProjectCostingDatabaseRecord>({
      id: toIdentityDatabaseValue('test:domain-model:id'),

      project_id: toIdentityDatabaseValue('test:database-record:project-id'),

      on_cost_preliminiaries_percentage: toPercentageDatabaseValue(0.1),
      on_cost_contingencies_percentage: toPercentageDatabaseValue(0.2),
      on_cost_overheads_and_profits_percentage: toPercentageDatabaseValue(0.3),
    });
  });
});
