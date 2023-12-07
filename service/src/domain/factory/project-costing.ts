import type { IdentityFactory, IdentityValue } from '@project-rouge/service-core/data/identity';
import { resolveOptionalValueFromUserInput } from '@project-rouge/service-core/data/optional';
import type { PercentageValue } from '@project-rouge/service-core/data/percentage';
import { normalisePercentageValue } from '@project-rouge/service-core/data/percentage';
import type { PatchProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/patch-project-costing-resource';
import type { ProjectCostingDomainModel } from '../model/project-costing';

export class ProjectCostingDomainModelFactory {
  public constructor(
    private readonly identity: IdentityFactory,
  ) {}

  public fromPatchProjectCostingResourcePayload(payload: PatchProjectCostingResource.Payload, projectId: IdentityValue): ProjectCostingDomainModel {
    const id = this.identity();

    const preliminariesPercentageValue = resolveOptionalValueFromUserInput<PercentageValue>(payload.on_costs?.preliminiaries_percentage, null);
    const contingenciesPercentageValue = resolveOptionalValueFromUserInput<PercentageValue>(payload.on_costs?.contingencies_percentage, null);
    const overheadsAndProfitsPercentageValue = resolveOptionalValueFromUserInput<PercentageValue>(payload.on_costs?.overheads_and_profits_percentage, null);

    return {
      id,

      project_id: projectId,

      on_cost_preliminiaries_percentage: preliminariesPercentageValue === null
        ? undefined
        : normalisePercentageValue(preliminariesPercentageValue),

      on_cost_contingencies_percentage: contingenciesPercentageValue === null
        ? undefined
        : normalisePercentageValue(contingenciesPercentageValue),

      on_cost_overheads_and_profits_percentage: overheadsAndProfitsPercentageValue === null
        ? undefined
        : normalisePercentageValue(overheadsAndProfitsPercentageValue),
    };
  }

  public withPatchProjectCostingResourcePayload(model: ProjectCostingDomainModel, payload: PatchProjectCostingResource.Payload): ProjectCostingDomainModel {
    const preliminariesPercentageValue = resolveOptionalValueFromUserInput<PercentageValue>(payload.on_costs?.preliminiaries_percentage, model.on_cost_preliminiaries_percentage ?? null);
    const contingenciesPercentageValue = resolveOptionalValueFromUserInput<PercentageValue>(payload.on_costs?.contingencies_percentage, model.on_cost_contingencies_percentage ?? null);
    const overheadsAndProfitsPercentageValue = resolveOptionalValueFromUserInput<PercentageValue>(payload.on_costs?.overheads_and_profits_percentage, model.on_cost_overheads_and_profits_percentage ?? null);

    return {
      ...model,

      on_cost_preliminiaries_percentage: preliminariesPercentageValue === null
        ? undefined
        : normalisePercentageValue(preliminariesPercentageValue),

      on_cost_contingencies_percentage: contingenciesPercentageValue === null
        ? undefined
        : normalisePercentageValue(contingenciesPercentageValue),

      on_cost_overheads_and_profits_percentage: overheadsAndProfitsPercentageValue === null
        ? undefined
        : normalisePercentageValue(overheadsAndProfitsPercentageValue),
    };
  }
}
