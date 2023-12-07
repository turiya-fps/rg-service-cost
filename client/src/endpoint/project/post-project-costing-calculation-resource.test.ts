import type { ClientRequestInput } from '@project-rouge/service-core/http/client';
import { BuildingOption } from '../../data/building';
import { FIXTURE_BUILDING_DATA, FIXTURE_SCENARIO_DATA, FIXTURE_UNIT_CATEGORY_MIX } from '../../testing/fixture/building/nancy';
import type { PostProjectCostingCalculationResource } from './post-project-costing-calculation-resource';
import { request } from './post-project-costing-calculation-resource';

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
        scenario: FIXTURE_SCENARIO_DATA,
        buildings: [
          {
            data: FIXTURE_BUILDING_DATA,
            units: FIXTURE_UNIT_CATEGORY_MIX,
            options: [
              BuildingOption.BuildingHeightBelow8Storeys,
            ],
          },
        ],
      },
    });

    expect(client).toBeCalledTimes(1);
    expect(client).toBeCalledWith<[ClientRequestInput]>({
      hostname: 'https://service.something.net',

      method: 'POST',
      path: '/projects/15fabced-f309-4981-a3f9-ae3a27710b86/costing/calculate',

      payload: {
        scenario: FIXTURE_SCENARIO_DATA,

        buildings: [
          {
            data: FIXTURE_BUILDING_DATA,
            units: FIXTURE_UNIT_CATEGORY_MIX,
            options: [
              'building_height:below_8_storeys' as BuildingOption,
            ],
          },
        ],
      } satisfies PostProjectCostingCalculationResource.Payload,
    });

    expect(response).toStrictEqual<string>('test:client:response');
  });
});
