import type { Handler } from '@phasma/handler-aws';
import { optional } from '@project-rouge/service-core/data/optional';
import type { PercentageValue } from '@project-rouge/service-core/data/percentage';
import type { ApiEventSource } from '@project-rouge/service-core/handler/http-api';
import type { WithHttpRequestPathContext } from '@project-rouge/service-core/handler/http-api/middleware/request-path';
import type { HttpResponse } from '@project-rouge/service-core/handler/http-api/response';
import { http } from '@project-rouge/service-core/handler/http-api/response';
import type { GetProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/get-project-costing-resource';
import type { ProjectCostingHttpResource } from '@project-rouge/service-cost-client/src/resource/project/project-costing-resource';
import type { ProjectCostingDatabaseRepository } from '../../../../database/repository/project-costing';
import { ConfigurationDefault } from '../../../../external/snowflake/data';

type Context = (
  & WithHttpRequestPathContext<GetProjectCostingResource.Path>
);

type Response = HttpResponse<GetProjectCostingResource.Response>;
type Definition = Handler.Definition<ApiEventSource, Context, Response>;

/**
 * @operation `get-project-costing-resource`
 */
export class GetProjectCostingResourceApiHandler implements Handler.Implementation<Definition> {
  public constructor(
    private readonly projectCostingDatabaseRepository: ProjectCostingDatabaseRepository,
  ) {}

  /**
   * @inheritdoc
   */
  public async handle({ context }: Handler.Fn.Input<Definition>): Handler.Fn.Output<Definition> {
    const projectCosting = await this.projectCostingDatabaseRepository.findOneByProjectId(context.path.projectId);

    const resource: ProjectCostingHttpResource = {
      on_costs: {
        preliminiaries_percentage: optional<PercentageValue, null>(projectCosting?.on_cost_preliminiaries_percentage ?? null, ConfigurationDefault.Preliminaries),
        contingencies_percentage: optional<PercentageValue, null>(projectCosting?.on_cost_contingencies_percentage ?? null, ConfigurationDefault.Contingencies),
        overheads_and_profits_percentage: optional<PercentageValue, null>(projectCosting?.on_cost_overheads_and_profits_percentage ?? null, ConfigurationDefault.OverheadsAndProfits),
      },
    };

    return http<GetProjectCostingResource.Response.SuccessProjectCostingResourceReturned>({
      status: 200,

      headers: {
        'api-response': 'success:resource-returned:project-costing',
      },

      body: resource,
    });
  }
}
