import { partial } from '@matt-usurp/grok/testing';
import type { ApiEventSourcePayload, ApiEventSourceResponseValue } from '@project-rouge/service-core/handler/http-api';
import { express, lambda } from '@project-rouge/service-core/http/route';
import type { PostProjectCostingCalculationResource } from '@project-rouge/service-cost-client/src/endpoint/project/post-project-costing-calculation-resource';
import { handler, route } from './entrypoint';

describe('route', (): void => {
  it('method', (): void => {
    expect(route.method).toStrictEqual<PostProjectCostingCalculationResource.Method>('POST');
  });

  it('path, lambda syntax', (): void => {
    expect(route.path(lambda)).toStrictEqual<string>('/projects/{projectId}/costing/calculate');
  });

  it('path, express syntax', (): void => {
    expect(route.path(express)).toStrictEqual<string>('/projects/:projectId/costing/calculate');
  });
});

// handler testing is purely to test some specific middleware cases.
// such as validation of requests and expected error responses.
// we cannot effectively mock internally constructed instances here.

describe('handler', (): void => {
  it('with request, with authoriser response missing, return unauthorised', async (): Promise<void> => {
    const response = await handler(
      partial<ApiEventSourcePayload>({}),
      partial({}),
    );

    expect(response).toStrictEqual<ApiEventSourceResponseValue>({
      statusCode: 400,

      headers: {
        'content-type': 'application/json',
        'content-length': '17',

        'error-origin': 'path',
        'error-hint': 'missing',
      },

      body: '{"origin":"path"}',
    });
  });
});
