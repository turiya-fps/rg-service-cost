import { createPercentageValueSchema } from '@project-rouge/service-core/validation/data/percentage';
import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { PatchProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/patch-project-costing-resource';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

/**
 * Endpoint request path parameter validation.
 */
export const path = (): ZodSchema => {
  return z.object<ToZodSchema<PatchProjectCostingResource.Path>>({
    projectId: z.string().uuid(),
  });
};

/**
 * Endpoint request payload validation.
 */
export const payload = (): ZodSchema => {
  return z.object<ToZodSchema<PatchProjectCostingResource.Payload>>({
    on_costs: z.object<ToZodSchema<PatchProjectCostingResource.Payload.OnCost>>({
      preliminiaries_percentage: createPercentageValueSchema().nullable().optional(),
      contingencies_percentage: createPercentageValueSchema().nullable().optional(),
      overheads_and_profits_percentage: createPercentageValueSchema().nullable().optional(),
    }).optional(),
  });
};
