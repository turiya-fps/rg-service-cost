import type { IdentityValue } from '@project-rouge/service-core/data/identity';
import { provideIdentityDatabaseValue } from '@project-rouge/service-core/database/data/identity';
import { providePercentageDatabaseValue } from '@project-rouge/service-core/database/data/percentage';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import * as cast from '@project-rouge/service-core/database/syntax/cast';
import type { ProjectCostingDomainModel } from '../../domain/model/project-costing';
import { fromProjectCostingDomainModel, toProjectCostingDomainModel } from '../record/project-costing';
import { ProjectCostingDatabaseSchema } from '../schema/project-costing';

export class ProjectCostingDatabaseRepository {
  public constructor(
    private readonly database: DatabaseConnectionManager,
  ) {}

  public async create(model: ProjectCostingDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(ProjectCostingDatabaseSchema).insert();
    const record = fromProjectCostingDomainModel(model);

    qb.values({
      id: provideIdentityDatabaseValue(record.id),

      project_id: provideIdentityDatabaseValue(record.project_id),

      on_cost_preliminiaries_percentage: record.on_cost_preliminiaries_percentage === null
        ? null
        : providePercentageDatabaseValue(record.on_cost_preliminiaries_percentage),

      on_cost_contingencies_percentage: record.on_cost_contingencies_percentage === null
        ? null
        : providePercentageDatabaseValue(record.on_cost_contingencies_percentage),

      on_cost_overheads_and_profits_percentage: record.on_cost_overheads_and_profits_percentage === null
        ? null
        : providePercentageDatabaseValue(record.on_cost_overheads_and_profits_percentage),
    });

    await qb.execute();
  }

  public async update(model: ProjectCostingDomainModel): Promise<void> {
    const qb = await this.database.querybuilder(ProjectCostingDatabaseSchema).update();
    const record = fromProjectCostingDomainModel(model);

    qb.set({
      on_cost_preliminiaries_percentage: record.on_cost_preliminiaries_percentage === null
        ? null
        : providePercentageDatabaseValue(record.on_cost_preliminiaries_percentage),

      on_cost_contingencies_percentage: record.on_cost_contingencies_percentage === null
        ? null
        : providePercentageDatabaseValue(record.on_cost_contingencies_percentage),

      on_cost_overheads_and_profits_percentage: record.on_cost_overheads_and_profits_percentage === null
        ? null
        : providePercentageDatabaseValue(record.on_cost_overheads_and_profits_percentage),
    });

    qb.where(`id = ${cast.uuid(':id')}`, {
      id: record.id,
    });

    await qb.execute();
  }

  public async findOneByProjectId(projectId: IdentityValue): Promise<ProjectCostingDomainModel | undefined> {
    const qb = await this.database.querybuilder(ProjectCostingDatabaseSchema).select('self');

    qb.where(`self.project_id = ${cast.uuid(':projectId')}`);

    qb.setParameters({
      projectId,
    });

    const result = await qb.getOne();

    if (result === null) {
      return undefined;
    }

    return toProjectCostingDomainModel(result);
  }
}
