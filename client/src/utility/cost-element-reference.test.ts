import { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from '../data/cost-element-reference';
import type { ValueGroup } from '../data/value-breakdown';
import { withMissingElementReferenceLineItemsForGroup } from './cost-element-reference';

describe('withMissingElementReferenceLineItemsForGroup()', (): void => {
  it('with empty group, adds all missing', (): void => {
    expect(
      withMissingElementReferenceLineItemsForGroup({
        index: CostElementReferenceGroupIndex.ExternalWorks,
        total: 0,
        items: [],
      }),
    ).toStrictEqual<ValueGroup<number>>({
      index: CostElementReferenceGroupIndex.ExternalWorks,
      total: 0,
      items: [
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksSiteWorks,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksRoadsPathsAndPavings,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksSoftLandscapesPlatingAndIrrigation,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksFencingRailsAndWalls,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksExternalFixtures,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksDrainage,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksExternalServices,
          value: 0,
        },
      ],
    });
  });

  it('with existing group items, adds all missing', (): void => {
    expect(
      withMissingElementReferenceLineItemsForGroup({
        index: CostElementReferenceGroupIndex.ExternalWorks,
        total: 30,
        items: [
          {
            index: CostElementReferenceGroupItemIndex.ExternalWorksSoftLandscapesPlatingAndIrrigation,
            value: 10,
          },
          {
            index: CostElementReferenceGroupItemIndex.ExternalWorksDrainage,
            value: 20,
          },
        ],
      }),
    ).toStrictEqual<ValueGroup<number>>({
      index: CostElementReferenceGroupIndex.ExternalWorks,
      total: 30,
      items: [
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksSiteWorks,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksRoadsPathsAndPavings,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksSoftLandscapesPlatingAndIrrigation,
          value: 10,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksFencingRailsAndWalls,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksExternalFixtures,
          value: 0,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksDrainage,
          value: 20,
        },
        {
          index: CostElementReferenceGroupItemIndex.ExternalWorksExternalServices,
          value: 0,
        },
      ],
    });
  });
});
