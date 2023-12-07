import type { ProjectCostingDomainModel } from './project-costing';

// This can be removed when the file has something other than types in it.
import './project-costing';

it('type test', (): void => {
  const model: ProjectCostingDomainModel = {
    id: 'test:domain-model:id',

    project_id: 'test:domain-model:project-id',

    on_cost_preliminiaries_percentage: 1,
    on_cost_contingencies_percentage: 2,
    on_cost_overheads_and_profits_percentage: 3,
  };

  expect(model).toBeTypeOf('object');
});
