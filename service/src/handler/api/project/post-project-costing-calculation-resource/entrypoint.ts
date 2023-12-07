import { date } from '@project-rouge/service-core/data/date';
import type { PostgresConnectionDetailsEnvironmentMapping } from '@project-rouge/service-core/environment/database/postgres';
import type { RuntimeEnvironmentMapping } from '@project-rouge/service-core/environment/runtime';
import { resolveRuntimeTypeFromEnvironment } from '@project-rouge/service-core/environment/runtime';
import { api } from '@project-rouge/service-core/handler/http-api';
import { WithHttpRequestBody } from '@project-rouge/service-core/handler/http-api/middleware/request-body';
import { WithHttpRequestPath } from '@project-rouge/service-core/handler/http-api/middleware/request-path';
import { WithHttpResponseTransformer } from '@project-rouge/service-core/handler/http-api/middleware/response-transformer';
import { router } from '@project-rouge/service-core/http/route';
import type { PostProjectCostingCalculationResource } from '@project-rouge/service-cost-client/src/endpoint/project/post-project-costing-calculation-resource';
import { createDatabaseConnectionManager } from '../../../../database/connection';
import { ProjectCostingDatabaseRepository } from '../../../../database/repository/project-costing';
import { PostProjectCostingCalculationResourceApiHandler } from './handler';
import * as validator from './validator';

/**
 * The environment variables required for this handler.
 */
export type HandlerEnvironmentMapping = (
  & RuntimeEnvironmentMapping
  & PostgresConnectionDetailsEnvironmentMapping
);

/**
 * The composed route for this endpoint.
 */
export const route = router<PostProjectCostingCalculationResource.Method, PostProjectCostingCalculationResource.Path>('POST', (x) => {
  return `/projects/${x('projectId')}/costing/calculate`;
});

/**
 * The lambda function "handler" entrypoint.
 */
export const handler = api(async (application, environment) => {
  const runtime = resolveRuntimeTypeFromEnvironment(environment);
  const database = await createDatabaseConnectionManager(date, runtime, environment);

  return application
    .use(new WithHttpResponseTransformer())
    .use(new WithHttpRequestPath<PostProjectCostingCalculationResource.Path>(validator.path()))
    .use(new WithHttpRequestBody<PostProjectCostingCalculationResource.Payload>(validator.payload()))
    .handle(
      new PostProjectCostingCalculationResourceApiHandler(
        database,
        new ProjectCostingDatabaseRepository(database),
      ),
    );
});
