import type { LambdaHandlerEntrypoint } from '@phasma/handler-aws/core/provider';
import { resolveProcessEnvironmentMapping } from '@project-rouge/service-core/environment/resolve';
import type { ApiEventSource, ApiEventSourcePayload, ApiEventSourceProviderLambdaFunctionContext } from '@project-rouge/service-core/handler/http-api';
import type { HttpMethod } from '@project-rouge/service-core/http/endpoint';
import * as syntax from '@project-rouge/service-core/http/route';
import chalk from 'chalk';
import cors from 'cors';
import type { RequestHandler } from 'express';
import express from 'express';
import path from 'path';
import { v4 as uuid } from 'uuid';
import * as GetProjectCostingResourceApiHandler from './handler/api/project/get-project-costing-resource/entrypoint';
import * as PatchProjectCostingResourceApiHandler from './handler/api/project/patch-project-costing-resource/entrypoint';
import * as PostProjectCostingCalculationResourceApiHandler from './handler/api/project/post-project-costing-calculation-resource/entrypoint';

/* eslint-disable no-console */

// --
// -- Environment
// --

console.log(chalk.cyan('Preparing environment ..'));

const envfile = path.resolve(__dirname, '..', '.env');
const environment = resolveProcessEnvironmentMapping(envfile);

console.log(environment);

// --
// -- Application
// --

const integrate = (handler: LambdaHandlerEntrypoint<ApiEventSource>): RequestHandler => async (request, response): Promise<void> => {
  console.log(`> ${chalk.green(request.method.toUpperCase())} ${chalk.yellow(request.url)}`);

  const id = uuid();

  try {
    const result = await handler(
      {
        requestContext: { requestId: id, http: { method: request.method } },
        queryStringParameters: request.query,
        pathParameters: request.params,
        headers: request.headers,
        body: JSON.stringify(request.body),
      } as ApiEventSourcePayload,
      { awsRequestId: id } as ApiEventSourceProviderLambdaFunctionContext,
    );

    const r = result.headers?.['api-response'] ?? 'unknown-response';

    console.log(`<< ${chalk.green(result.statusCode)} ${chalk.yellow(r)}`);
    console.log(chalk.grey(result.body ?? '<empty>'));

    response
      .set(result.headers)
      .status(result.statusCode ?? 501)
      .send(result.body);
  } catch (error) {
    console.error(error);

    response
      .status(500)
      .send();
  }
};

console.log(chalk.cyan('Preparing local server ..'));

const app = express();

app.use(cors());
app.use(express.json());

// --
// -- Endpoints
// --

app.get(GetProjectCostingResourceApiHandler.route.path(syntax.express), integrate(GetProjectCostingResourceApiHandler.handler));
app.patch(PatchProjectCostingResourceApiHandler.route.path(syntax.express), integrate(PatchProjectCostingResourceApiHandler.handler));
app.post(PostProjectCostingCalculationResourceApiHandler.route.path(syntax.express), integrate(PostProjectCostingCalculationResourceApiHandler.handler));

// --
// --
// --

/**
 * Express doesn't declare clear types for their router.
 * This has been taken created from a series of console logs.
 */
type RoughRouter = {
  readonly stack: {
    readonly route: {
      readonly path: string;
      readonly methods: Record<Lowercase<HttpMethod>, boolean>;
    };
  }[];
};

const port = 3103;

app.listen(port, () => {
  const router = app._router as RoughRouter;
  const routes = router.stack
    .filter((layer) => layer.route !== undefined)
    .map((layer) => layer.route);

  for (const route of routes) {
    const methods = Object.keys(route.methods).map((value) => value.toUpperCase()).join(', ');
    const path = route.path.replace(/:([a-zA-Z]+)/g, `${chalk.grey('{$1}')}`);

    console.log(`+ ${chalk.green(methods.padEnd(6))} ${chalk.yellow(path)}`);
  }

  console.log(chalk.cyan(`Listening on ${chalk.white(`http://localhost:${port}`)}`));
});
