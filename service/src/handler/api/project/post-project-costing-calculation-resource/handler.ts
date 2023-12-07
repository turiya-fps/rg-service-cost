import type { Handler } from '@phasma/handler-aws';
import type { DatabaseConnectionManager } from '@project-rouge/service-core/database/source/manager';
import type { ApiEventSource } from '@project-rouge/service-core/handler/http-api';
import type { WithHttpRequestBodyContext } from '@project-rouge/service-core/handler/http-api/middleware/request-body';
import type { WithHttpRequestPathContext } from '@project-rouge/service-core/handler/http-api/middleware/request-path';
import type { HttpResponse } from '@project-rouge/service-core/handler/http-api/response';
import { http } from '@project-rouge/service-core/handler/http-api/response';
import type { BuildingOption, UnitCategoryMix } from '@project-rouge/service-cost-client/src/data/building';
import { EMPTY_BUILDING_DATA_MAPPING, EMPTY_SCENARIO_DATA_MAPPING } from '@project-rouge/service-cost-client/src/data/building';
import type { ValueBreakdown, ValueGroup } from '@project-rouge/service-cost-client/src/data/value-breakdown';
import type { PostProjectCostingCalculationResource } from '@project-rouge/service-cost-client/src/endpoint/project/post-project-costing-calculation-resource';
import type { ProjectCostingCalculationHttpResource } from '@project-rouge/service-cost-client/src/resource/project/project-costing-calculation-resource';
import { aggregateValueBreakdown, aggregateValueGroups, recreateWithTotalForValueGroupAggregated } from '@project-rouge/service-cost-client/src/utility/value-breakdown/aggregate-value-breakdown';
import type { ProjectCostingDatabaseRepository } from '../../../../database/repository/project-costing';
import type { Configuration } from '../../../../external/snowflake/data';
import { ConfigurationDefault } from '../../../../external/snowflake/data';
import type { QueryDataMapping } from '../../../../external/snowflake/query';
import { compose } from '../../../../external/snowflake/query';
import type { BuildingQueryRecord } from '../../../../external/snowflake/query/view';
import { QueryView, createBuildingQueryComposition } from '../../../../external/snowflake/query/view';
import { createEmbodiedCarbonCostElementReference } from '../../../../external/snowflake/transformer/carbon/embodied-carbon-element-reference';
import { createValueGroupFromQueryRecords, withOnCostsForValueGroupConstruction } from '../../../../external/snowflake/transformer/value-group';

type Context = (
  & WithHttpRequestPathContext<PostProjectCostingCalculationResource.Path>
  & WithHttpRequestBodyContext<PostProjectCostingCalculationResource.Payload>
);

type Response = HttpResponse<PostProjectCostingCalculationResource.Response>;
type Definition = Handler.Definition<ApiEventSource, Context, Response>;

/**
 * @operation `post-project-costing-calculation-resource`
 */
export class PostProjectCostingCalculationResourceApiHandler implements Handler.Implementation<Definition> {
  public constructor(
    private readonly database: DatabaseConnectionManager,
    private readonly projectCostingDatabaseRepository: ProjectCostingDatabaseRepository,
  ) {}

  /**
   * @inheritdoc
   */
  public async handle({ context }: Handler.Fn.Input<Definition>): Handler.Fn.Output<Definition> {
    const scenario = context.body.scenario;
    const buildings = context.body.buildings;

    const source = await this.database.source();
    const project = await this.projectCostingDatabaseRepository.findOneByProjectId(context.path.projectId);

    const configuration: Configuration = {
      preliminaries: project?.on_cost_preliminiaries_percentage ?? ConfigurationDefault.Preliminaries,
      contingencies: project?.on_cost_contingencies_percentage ?? ConfigurationDefault.Contingencies,
      overheads_and_profits: project?.on_cost_overheads_and_profits_percentage ?? ConfigurationDefault.OverheadsAndProfits,
    };

    const emptyUnitCategoryMix: UnitCategoryMix = [
      { unit: 'unused', quantity: 0 },
    ];

    const scenarioData: QueryDataMapping = {
      ...EMPTY_SCENARIO_DATA_MAPPING,
      ...EMPTY_BUILDING_DATA_MAPPING,
      ...scenario,
    };

    const scenarioQuery = compose(createBuildingQueryComposition(emptyUnitCategoryMix, scenarioData, []));
    const scenarioResult: BuildingQueryRecord[] = await source.query(scenarioQuery) ?? [];

    type BuildingResult = {
      readonly costing: ValueBreakdown<number>;
      readonly carbon: ValueGroup<number>[];
    };

    const buildingQueries = buildings.map<Promise<BuildingResult>>(async (building) => {
      const units = building.units;

      const data: QueryDataMapping = {
        ...EMPTY_SCENARIO_DATA_MAPPING,
        ...EMPTY_BUILDING_DATA_MAPPING,
        ...building.data,
      };

      const options: BuildingOption[] = building.options;

      const results: BuildingQueryRecord[] = await source.query(compose(createBuildingQueryComposition(units, data, options))) ?? [];

      const costing: ValueBreakdown<number> = {
        modular: {
          summary: withOnCostsForValueGroupConstruction(
            createValueGroupFromQueryRecords(
              results.filter((result) => result.view === QueryView.ModularSummary),
              'cost',
            ),
            configuration,
          ),

          element: createValueGroupFromQueryRecords(
            results.filter((result) => result.view === QueryView.ModularElementReference),
            'cost',
          ),
        },

        basebuild: {
          summary: withOnCostsForValueGroupConstruction(
            createValueGroupFromQueryRecords(
              results.filter((result) => result.view === QueryView.BaseBuildSummary),
              'cost',
            ),
            configuration,
          ),

          element: createValueGroupFromQueryRecords(
            results.filter((result) => result.view === QueryView.BaseBuildElementReference),
            'cost',
          ),
        },
      };

      const carbon: ValueBreakdown<number> = {
        modular: {
          summary: createValueGroupFromQueryRecords(
            results.filter((result) => result.view === QueryView.ModularSummary),
            'carbon',
          ),

          element: createValueGroupFromQueryRecords(
            results.filter((result) => result.view === QueryView.ModularElementReference),
            'carbon',
          ),
        },

        basebuild: {
          summary: createValueGroupFromQueryRecords(
            results.filter((result) => result.view === QueryView.BaseBuildSummary),
            'carbon',
          ),

          element: createValueGroupFromQueryRecords(
            results.filter((result) => result.view === QueryView.BaseBuildElementReference),
            'carbon',
          ),
        },
      };

      return {
        costing,
        carbon: createEmbodiedCarbonCostElementReference(carbon),
      };
    });

    const buildingResults = await Promise.all(buildingQueries);

    const body: ProjectCostingCalculationHttpResource = {
      configuration: {
        on_costs: {
          preliminiaries_percentage: configuration.preliminaries * 100,
          contingencies_percentage: configuration.contingencies * 100,
          overheads_and_profits_percentage: configuration.overheads_and_profits * 100,
        },
      },

      scenario: {
        costing: {
          summary: withOnCostsForValueGroupConstruction(
            createValueGroupFromQueryRecords(
              scenarioResult.filter((result) => result.view === QueryView.BaseBuildSummary),
              'cost',
            ),
            configuration,
          ),

          element: createValueGroupFromQueryRecords(
            scenarioResult.filter((result) => result.view === QueryView.BaseBuildElementReference),
            'cost',
          ),
        },

        carbon: createEmbodiedCarbonCostElementReference({
          modular: {
            summary: createValueGroupFromQueryRecords(
              scenarioResult.filter((result) => result.view === QueryView.ModularSummary),
              'carbon',
            ),

            element: createValueGroupFromQueryRecords(
              scenarioResult.filter((result) => result.view === QueryView.ModularElementReference),
              'carbon',
            ),
          },

          basebuild: {
            summary: createValueGroupFromQueryRecords(
              scenarioResult.filter((result) => result.view === QueryView.BaseBuildSummary),
              'carbon',
            ),

            element: createValueGroupFromQueryRecords(
              scenarioResult.filter((result) => result.view === QueryView.BaseBuildElementReference),
              'carbon',
            ),
          },
        }),
      },

      buildings: {
        costing: aggregateValueBreakdown(buildingResults.map((x) => x.costing)),

        carbon: recreateWithTotalForValueGroupAggregated(
          aggregateValueGroups(
            buildingResults.map((x) => x.carbon),
          ),
        ),
      },
    };

    return http<PostProjectCostingCalculationResource.Response.SuccessProjectCostingCalculationResourceReturned>({
      status: 200,

      headers: {
        'api-response': 'success:data:project-costing-calculation',
      },

      body,
    });
  }
}
