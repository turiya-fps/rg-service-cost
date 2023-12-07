import type { IdentityDatabaseValue } from '@project-rouge/service-core/database/data/identity';
import { fromIdentityDatabaseValue, toIdentityDatabaseValue } from '@project-rouge/service-core/database/data/identity';
import type { PercentageDatabaseValue } from '@project-rouge/service-core/database/data/percentage';
import { fromPercentageDatabaseValue, toPercentageDatabaseValue } from '@project-rouge/service-core/database/data/percentage';
import type { ProjectCostingDomainModel } from '../../domain/model/project-costing';

export type ProjectCostingDatabaseRecord = {
  readonly id: IdentityDatabaseValue;
  readonly project_id: IdentityDatabaseValue;

  readonly on_cost_preliminiaries_percentage: PercentageDatabaseValue | null;
  readonly on_cost_contingencies_percentage: PercentageDatabaseValue | null;
  readonly on_cost_overheads_and_profits_percentage: PercentageDatabaseValue | null;
};

export const toProjectCostingDomainModel = (record: ProjectCostingDatabaseRecord): ProjectCostingDomainModel => {
  return {
    id: fromIdentityDatabaseValue(record.id),

    project_id: fromIdentityDatabaseValue(record.project_id),

    on_cost_preliminiaries_percentage: record.on_cost_preliminiaries_percentage === null
      ? undefined
      : fromPercentageDatabaseValue(record.on_cost_preliminiaries_percentage),

    on_cost_contingencies_percentage: record.on_cost_contingencies_percentage === null
      ? undefined
      : fromPercentageDatabaseValue(record.on_cost_contingencies_percentage),

    on_cost_overheads_and_profits_percentage: record.on_cost_overheads_and_profits_percentage === null
      ? undefined
      : fromPercentageDatabaseValue(record.on_cost_overheads_and_profits_percentage),
  };
};

export const fromProjectCostingDomainModel = (model: ProjectCostingDomainModel): ProjectCostingDatabaseRecord => {
  return {
    id: toIdentityDatabaseValue(model.id),

    project_id: toIdentityDatabaseValue(model.project_id),

    on_cost_preliminiaries_percentage: model.on_cost_preliminiaries_percentage === undefined
      ? null
      : toPercentageDatabaseValue(model.on_cost_preliminiaries_percentage),

    on_cost_contingencies_percentage: model.on_cost_contingencies_percentage === undefined
      ? null
      : toPercentageDatabaseValue(model.on_cost_contingencies_percentage),

    on_cost_overheads_and_profits_percentage: model.on_cost_overheads_and_profits_percentage === undefined
      ? null
      : toPercentageDatabaseValue(model.on_cost_overheads_and_profits_percentage),
  };
};
