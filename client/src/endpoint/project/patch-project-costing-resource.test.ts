import type { ClientRequestInput } from '@project-rouge/service-core/http/client';
import type { PatchProjectCostingResource } from './patch-project-costing-resource';
import { request } from './patch-project-costing-resource';

describe('request()', (): void => {
  it('with inputs, can trigger client as expected', async (): Promise<void> => {
    const client = vi.fn();

    client.mockImplementationOnce(async (): Promise<string> => {
      return 'test:client:response';
    });

    const response = await request(client, {
      hostname: 'https://service.something.net',

      path: {
        projectId: '15fabced-f309-4981-a3f9-ae3a27710b86',
      },

      payload: {
        on_costs: {
          preliminiaries_percentage: 35,
          contingencies_percentage: 30,
          overheads_and_profits_percentage: 10,
        },
      },
    });

    expect(client).toBeCalledTimes(1);
    expect(client).toBeCalledWith<[ClientRequestInput]>({
      hostname: 'https://service.something.net',

      method: 'PATCH',
      path: '/projects/15fabced-f309-4981-a3f9-ae3a27710b86/costing',

      payload: {
        on_costs: {
          preliminiaries_percentage: 35,
          contingencies_percentage: 30,
          overheads_and_profits_percentage: 10,
        },
      } satisfies PatchProjectCostingResource.Payload,
    });

    expect(response).toStrictEqual<string>('test:client:response');
  });
});
