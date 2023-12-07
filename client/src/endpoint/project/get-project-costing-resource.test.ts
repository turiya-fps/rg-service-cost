import type { ClientRequestInput } from '@project-rouge/service-core/http/client';
import { request } from './get-project-costing-resource';

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
    });

    expect(client).toBeCalledTimes(1);
    expect(client).toBeCalledWith<[ClientRequestInput]>({
      hostname: 'https://service.something.net',

      method: 'GET',
      path: '/projects/15fabced-f309-4981-a3f9-ae3a27710b86/costing',
    });

    expect(response).toStrictEqual<string>('test:client:response');
  });
});
