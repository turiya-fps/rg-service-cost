import type { RequestHandlerFunction, RequestHandlerInputWithPath, RequestHandlerInputWithPayload } from '@project-rouge/service-core/http/client';
import type { CommonResponse, CommonResponseIdentifier, HttpMethod } from '@project-rouge/service-core/http/endpoint';
import type { ScenarioConfiguration } from '../../data/building';
import type { ResourceName } from '../../resource';
import type { ProjectCostingCalculationHttpResource } from '../../resource/project/project-costing-calculation-resource';

/**
 * Calculate the costs for a building using the projects costing configuration.
 *
 * @operation `post-project-costing-calculation-resource`
 */
export namespace PostProjectCostingCalculationResource {
  /**
   * Method required for the endpoint.
   */
  export type Method = HttpMethod.Post;

  /**
   * Path parameters required for the endpoint.
   */
  export type Path = {
    readonly projectId: string;
  };

  /**
   * The payload that is required when posting to this endpoint.
   */
  export type Payload = ScenarioConfiguration;

  /**
   * Response types that are used to conditionally switch on {@link Response} structures.
   */
  export namespace ResponseType {
    export type SuccessProjectCostingCalculationResourceReturned = CommonResponseIdentifier.SuccessData<ResourceName.ProjectCostingCalculation>;
  }

  /**
   * Responses structures for the defined {@link ResponseType} entries.
   */
  export type Response = (
    | Response.SuccessProjectCostingCalculationResourceReturned
  );

  export namespace Response {
    export type SuccessProjectCostingCalculationResourceReturned = CommonResponse.SuccessData<ResponseType.SuccessProjectCostingCalculationResourceReturned, ProjectCostingCalculationHttpResource>;
  }

  /**
   * The {@link RequestHandlerFunction} input parameters required for this endpoint.
   */
  export type RequestHandlerInput = (
    & RequestHandlerInputWithPath<Path>
    & RequestHandlerInputWithPayload<Payload>
  );

  /**
   * A {@link RequestHandlerFunction} that is typed against this endpoint.
   */
  export type RequestHandler = RequestHandlerFunction<RequestHandlerInput, Response>;
}

/**
 * A request handler function for invoking the endpoint via the given client.
 *
 * This function is bound to the types declared in {@link PostProjectCostingCalculationResource},
 * meaning the request and response types can be validated by the build.
 */
export const request: PostProjectCostingCalculationResource.RequestHandler = async (client, configuration) => {
  const { hostname, signal, path, payload } = configuration;

  return client({
    hostname,
    signal,

    method: 'POST' satisfies PostProjectCostingCalculationResource.Method,
    path: `/projects/${path.projectId}/costing/calculate`,

    payload,
  });
};
