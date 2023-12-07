import type { PercentageValue } from '@project-rouge/service-core/data/percentage';
import type { RequestHandlerFunction, RequestHandlerInputWithPath, RequestHandlerInputWithPayload } from '@project-rouge/service-core/http/client';
import type { CommonResponse, CommonResponseIdentifier, HttpMethod } from '@project-rouge/service-core/http/endpoint';
import type { ResourceName } from '../../resource';
import type { ProjectCostingHttpResource } from '../../resource/project/project-costing-resource';

/**
 * Update the costing configuration for a given project.
 *
 * @operation `patch-project-costing-resource`
 */
export namespace PatchProjectCostingResource {
  /**
   * Method required for the endpoint.
   */
  export type Method = HttpMethod.Patch;

  /**
   * Path parameters required for the endpoint.
   */
  export type Path = {
    readonly projectId: string;
  };

  /**
   * The payload that is required when posting to this endpoint.
   */
  export type Payload = {
    readonly on_costs?: Payload.OnCost;
  };

  export namespace Payload {
    export type OnCost = {
      readonly preliminiaries_percentage?: PercentageValue | null;
      readonly contingencies_percentage?: PercentageValue | null;
      readonly overheads_and_profits_percentage?: PercentageValue | null;
    };
  }

  /**
   * Response types that are used to conditionally switch on {@link Response} structures.
   */
  export namespace ResponseType {
    export type SuccessProjectCostingResourceUpdated = CommonResponseIdentifier.SuccessResourceUpdated<ResourceName.ProjectCosting>;
  }

  /**
   * Responses structures for the defined {@link ResponseType} entries.
   */
  export type Response = (
    | Response.SuccessProjectCostingResourceUpdated
  );

  export namespace Response {
    export type SuccessProjectCostingResourceUpdated = CommonResponse.SuccessResourceReturned<ResponseType.SuccessProjectCostingResourceUpdated, ProjectCostingHttpResource>;
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
 * This function is bound to the types declared in {@link PatchProjectCostingResource},
 * meaning the request and response types can be validated by the build.
 */
export const request: PatchProjectCostingResource.RequestHandler = async (client, configuration) => {
  const { hostname, signal, path, payload } = configuration;

  return client({
    hostname,
    signal,

    method: 'PATCH' satisfies PatchProjectCostingResource.Method,
    path: `/projects/${path.projectId}/costing`,

    payload,
  });
};
