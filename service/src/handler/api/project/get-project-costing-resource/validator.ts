import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { GetProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/get-project-costing-resource';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

/**
 * Endpoint request path parameter validation.
 */
export const path = (): ZodSchema => {
  return z.object<ToZodSchema<GetProjectCostingResource.Path>>({
    projectId: z.string().uuid(),
  });
};
