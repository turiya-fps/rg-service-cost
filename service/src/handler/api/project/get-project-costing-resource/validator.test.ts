import { partial } from '@matt-usurp/grok/testing';
import type { GetProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/get-project-costing-resource';
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
          expect.objectContaining(partial<ZodIssue>({
            received: 'undefined',
            expected: 'string',

            path: expect.arrayContaining([
              'projectId',
            ]),
          })),
        ],
      })),
    });
  });

  it('with data, parses, validates', async (): Promise<void> => {
    const data: GetProjectCostingResource.Path = {
      projectId: '8860a24f-3bff-4bb0-94d4-b64ea6a4d04c',
    };

    const result = await validator.path().spa(data);

    expect(result).toStrictEqual<SafeParseSuccess<GetProjectCostingResource.Path>>({
      success: true,

      data: {
        projectId: '8860a24f-3bff-4bb0-94d4-b64ea6a4d04c',
      },
    });
  });
});
