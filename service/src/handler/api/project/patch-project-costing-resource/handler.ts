import type { Handler } from '@phasma/handler-aws';
import type { IdentityValue } from '@project-rouge/service-core/data/identity';
import { optional } from '@project-rouge/service-core/data/optional';
import type { PercentageValue } from '@project-rouge/service-core/data/percentage';
import type { ApiEventSource } from '@project-rouge/service-core/handler/http-api';
import type { WithHttpRequestBodyContext } from '@project-rouge/service-core/handler/http-api/middleware/request-body';
import type { WithHttpRequestPathContext } from '@project-rouge/service-core/handler/http-api/middleware/request-path';
import type { HttpResponse } from '@project-rouge/service-core/handler/http-api/response';
import { http } from '@project-rouge/service-core/handler/http-api/response';
import type { PatchProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/patch-project-costing-resource';
import type { ProjectCostingDatabaseRepository } from '../../../../database/repository/project-costing';
import type { ProjectCostingDomainModelFactory } from '../../../../domain/factory/project-costing';
import type { ProjectCostingDomainModel } from '../../../../domain/model/project-costing';
import { ConfigurationDefault } from '../../../../external/snowflake/data';

type Context = (
  & WithHttpRequestPathContext<PatchProjectCostingResource.Path>
  & WithHttpRequestBodyContext<PatchProjectCostingResource.Payload>
);

type Response = HttpResponse<PatchProjectCostingResource.Response>;
type Definition = Handler.Definition<ApiEventSource, Context, Response>;

/**
 * @operation `patch-project-costing-resource`
 */
export class PatchProjectCostingResourceApiHandler implements Handler.Implementation<Definition> {
  public constructor(
    private readonly projectCostingDatabaseRepository: ProjectCostingDatabaseRepository,
    private readonly projectCostingDomainModelFactory: ProjectCostingDomainModelFactory,
  ) {}

  /**
   * @inheritdoc
   */
  public async handle({ context }: Handler.Fn.Input<Definition>): Handler.Fn.Output<Definition> {
    const found = await this.projectCostingDatabaseRepository.findOneByProjectId(context.path.projectId);

    if (found === undefined) {
      return this.handleProjectCostingCreation(context.body, context.path.projectId);
    }

    return this.handleProjectCostingUpdate(context.body, found);
  }

  /**
   * Handle the case where a {@link ProjectCostingDomainModel} does not exist.
   */
  private async handleProjectCostingCreation(payload: PatchProjectCostingResource.Payload, projectId: IdentityValue): Handler.Fn.Output<Definition> {
    const model = this.projectCostingDomainModelFactory.fromPatchProjectCostingResourcePayload(payload, projectId);

    await this.projectCostingDatabaseRepository.create(model);

    return this.createSuccessResponse(model);
  }

  /**
   * Handle the updating of an existing {@link ProjectCostingDomainModel}.
   */
  private async handleProjectCostingUpdate(payload: PatchProjectCostingResource.Payload, existing: ProjectCostingDomainModel): Handler.Fn.Output<Definition> {
    const model = this.projectCostingDomainModelFactory.withPatchProjectCostingResourcePayload(existing, payload);

    await this.projectCostingDatabaseRepository.update(model);

    return this.createSuccessResponse(model);
  }

  /**
   * Create a success response using the given {@link ProjectCostingDomainModel}.
   */
  private createSuccessResponse(model: ProjectCostingDomainModel): HttpResponse<PatchProjectCostingResource.Response.SuccessProjectCostingResourceUpdated> {
    return http<PatchProjectCostingResource.Response.SuccessProjectCostingResourceUpdated>({
      status: 200,

      headers: {
        'api-response': 'success:resource-updated:project-costing',
      },

      body: {
        on_costs: {
          preliminiaries_percentage: optional<PercentageValue, null>(model.on_cost_preliminiaries_percentage ?? null, ConfigurationDefault.Preliminaries),
          contingencies_percentage: optional<PercentageValue, null>(model.on_cost_contingencies_percentage ?? null, ConfigurationDefault.Contingencies),
          overheads_and_profits_percentage: optional<PercentageValue, null>(model.on_cost_overheads_and_profits_percentage ?? null, ConfigurationDefault.OverheadsAndProfits),
        },
      },
    });
  }
}
