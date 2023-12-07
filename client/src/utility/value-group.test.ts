import { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from '../data/cost-element-reference';
import type { ValueGroup } from '../data/value-breakdown';
import { recreateWithTotalForValueGroup } from './value-group';

describe('recreateWithTotalForValueGroup()', (): void => {
  it('with empty, returns empty', (): void => {
    expect(
      recreateWithTotalForValueGroup([]),
    ).toStrictEqual<ValueGroup<number>[]>([]);
  });

  it('with items, calculates totals and sorts values', (): void => {
    expect(
      recreateWithTotalForValueGroup([
        {
          index: CostElementReferenceGroupIndex.ExternalWorks,
          total: 0,
          items: [
            { index: CostElementReferenceGroupItemIndex.ExternalWorksDrainage, value: 1 },
            { index: CostElementReferenceGroupItemIndex.ExternalWorksExternalFixtures, value: 2 },
            { index: CostElementReferenceGroupItemIndex.ExternalWorksExternalServices, value: 3 },
          ],
        },
        {
          index: CostElementReferenceGroupIndex.Services,
          total: 2,
          items: [
            { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, value: 44 },
          ],
        },
      ]),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostElementReferenceGroupIndex.Services,
        total: 44,
        items: [
          { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, value: 44 },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.ExternalWorks,
        total: 6,
        items: [
          { index: CostElementReferenceGroupItemIndex.ExternalWorksExternalFixtures, value: 2 },
          { index: CostElementReferenceGroupItemIndex.ExternalWorksDrainage, value: 1 },
          { index: CostElementReferenceGroupItemIndex.ExternalWorksExternalServices, value: 3 },
        ],
      },
    ]);
  });
});
