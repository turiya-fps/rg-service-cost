import { partial } from '@matt-usurp/grok/testing';
import type { PatchProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/patch-project-costing-resource';
import type { SafeParseError, SafeParseSuccess, ZodError, ZodIssue } from 'zod';
import * as validator from './validator';

describe('path', (): void => {
  it('with empty, errors', async (): Promise<void> => {
    const result = await validator.path().spa({});

    expect(result).toStrictEqual<SafeParseError<unknown>>({
      success: false,

      error: expect.objectContaining(partial<ZodError<unknown>>({
        name: 'ZodError',

        issues: [
          expect.objectContaining({
            code: 'invalid_type',
            received: 'undefined',
            expected: 'string',
            path: ['projectId'],
          } satisfies Partial<ZodIssue>),
        ],
      })),
    });
  });

  it('with data, parses, validates', async (): Promise<void> => {
    const data: PatchProjectCostingResource.Path = {
      projectId: '8860a24f-3bff-4bb0-94d4-b64ea6a4d04c',
    };

    const result = await validator.path().spa(data);

    expect(result).toStrictEqual<SafeParseSuccess<PatchProjectCostingResource.Path>>({
      success: true,

      data: {
        projectId: '8860a24f-3bff-4bb0-94d4-b64ea6a4d04c',
      },
    });
  });
});

describe('payload', (): void => {
  it('with data, empty, validated', async (): Promise<void> => {
    const data: PatchProjectCostingResource.Payload = {};

    const result = await validator.payload().spa(data);

    expect(result).toStrictEqual<SafeParseSuccess<PatchProjectCostingResource.Payload>>({
      success: true,

      data: {},
    });
  });

  it('with data, parses, validated', async (): Promise<void> => {
    const data: PatchProjectCostingResource.Payload = {
      on_costs: {
        preliminiaries_percentage: 0.1,
        contingencies_percentage: 0.2,
        overheads_and_profits_percentage: 0.3,
      },
    };

    const result = await validator.payload().spa(data);

    expect(result).toStrictEqual<SafeParseSuccess<PatchProjectCostingResource.Payload>>({
      success: true,

      data: {
        on_costs: {
          preliminiaries_percentage: 0.1,
          contingencies_percentage: 0.2,
          overheads_and_profits_percentage: 0.3,
        },
      },
    });
  });
});
