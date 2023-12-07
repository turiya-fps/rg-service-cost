import type { RequestHandlerFunction, RequestHandlerInputWithPath } from '@project-rouge/service-core/http/client';
import type { CommonResponse, CommonResponseIdentifier, HttpMethod } from '@project-rouge/service-core/http/endpoint';
import type { ResourceName } from '../../resource';
import type { ProjectCostingHttpResource } from '../../resource/project/project-costing-resource';

/**
 * Return the costing configuration for a given project.
 *
 * @operation `get-project-costing-resource`
 */
export namespace GetProjectCostingResource {
  /**
   * Method required for the endpoint.
   */
  export type Method = HttpMethod.Get;

  /**
   * Path parameters required for the endpoint.
   */
  export type Path = {
    readonly projectId: string;
  };

  /**
   * Response types that are used to conditionally switch on {@link Response} structures.
   */
  export namespace ResponseType {
    export type SuccessProjectCostingResourceReturned = CommonResponseIdentifier.SuccessResourceReturned<ResourceName.ProjectCosting>;
  }

  /**
   * Responses structures for the defined {@link ResponseType} entries.
   */
  export type Response = (
    | Response.SuccessProjectCostingResourceReturned
  );

  export namespace Response {
    export type SuccessProjectCostingResourceReturned = CommonResponse.SuccessResourceReturned<ResponseType.SuccessProjectCostingResourceReturned, ProjectCostingHttpResource>;
  }

  /**
   * The {@link RequestHandlerFunction} input parameters required for this endpoint.
   */
  export type RequestHandlerInput = (
    & RequestHandlerInputWithPath<Path>
  );

  /**
   * A {@link RequestHandlerFunction} that is typed against this endpoint.
   */
  export type RequestHandler = RequestHandlerFunction<RequestHandlerInput, Response>;
}

/**
 * A request handler function for invoking the endpoint via the given client.
 *
 * This function is bound to the types declared in {@link GetProjectCostingResource},
 * meaning the request and response types can be validated by the build.
 */
export const request: GetProjectCostingResource.RequestHandler = async (client, configuration) => {
  const { hostname, signal, path } = configuration;

  return client({
    hostname,
    signal,

    method: 'GET' satisfies GetProjectCostingResource.Method,
    path: `/projects/${path.projectId}/costing`,
  });
};
