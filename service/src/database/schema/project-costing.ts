import { EntitySchema } from 'typeorm';
import type { ProjectCostingDatabaseRecord } from '../record/project-costing';
import { schema, TableName } from '../table';

export const ProjectCostingDatabaseSchema = new EntitySchema<ProjectCostingDatabaseRecord>({
  schema,
  name: TableName.ProjectCosting,

  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      nullable: false,
    },

    project_id: {
      name: 'project_id',
      type: 'uuid',
      nullable: false,
    },

    on_cost_preliminiaries_percentage: {
      name: 'on_cost_preliminiaries_percentage',
      type: 'numeric',
      nullable: true,
    },

    on_cost_contingencies_percentage: {
      name: 'on_cost_contingencies_percentage',
      type: 'numeric',
      nullable: true,
    },

    on_cost_overheads_and_profits_percentage: {
      name: 'on_cost_overheads_and_profits_percentage',
      type: 'numeric',
      nullable: true,
    },
  },

  indices: [
    { columns: ['project_id'], unique: true },
  ],
});
