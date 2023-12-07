import { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from '../../data/cost-element-reference';
import type { ValueGroup } from '../../data/value-breakdown';
import { flatternValueGroups, flatternValueGroupsForIndex } from './flatten-value-group';

const data: ValueGroup<number[]>[] = [
  {
    index: CostElementReferenceGroupIndex.Services,
    total: [100, 20, 30, 40, 10],
    items: [
      { index: CostElementReferenceGroupItemIndex.ServicesHeatSource, value: [200, 10, 20, 30, 40] },
      { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: [300, 11, 22, 33, 44] },
    ],
  },
  {
    index: CostElementReferenceGroupIndex.Substructure,
    total: [200, 22, 33, 44, 11],
    items: [
      { index: CostElementReferenceGroupIndex.Substructure, value: [111, 12, 23, 34, 45] },
    ],
  },
];

describe('flatternValueGroupsForIndex()', (): void => {
  it('with value group with numeric array, takes 0 index', (): void => {
    expect(
      flatternValueGroupsForIndex(data, 0),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostElementReferenceGroupIndex.Substructure,
        total: 111,
        items: [
          { index: CostElementReferenceGroupIndex.Substructure, value: 111 },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.Services,
        total: 500,
        items: [
          { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: 300 },
          { index: CostElementReferenceGroupItemIndex.ServicesHeatSource, value: 200 },
        ],
      },
    ]);
  });

  it('with value group with numeric array, takes 1 index', (): void => {
    expect(
      flatternValueGroupsForIndex(data, 1),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostElementReferenceGroupIndex.Substructure,
        total: 12,
        items: [
          { index: CostElementReferenceGroupIndex.Substructure, value: 12 },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.Services,
        total: 21,
        items: [
          { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: 11 },
          { index: CostElementReferenceGroupItemIndex.ServicesHeatSource, value: 10 },
        ],
      },
    ]);
  });

  it('with value group with numeric array, takes 2 index', (): void => {
    expect(
      flatternValueGroupsForIndex(data, 2),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostElementReferenceGroupIndex.Substructure,
        total: 23,
        items: [
          { index: CostElementReferenceGroupIndex.Substructure, value: 23 },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.Services,
        total: 42,
        items: [
          { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: 22 },
          { index: CostElementReferenceGroupItemIndex.ServicesHeatSource, value: 20 },
        ],
      },
    ]);
  });
});

describe('flatternValueGroups()', (): void => {
  it('with value group with numeric array, takes totals', (): void => {
    expect(
      flatternValueGroups(data),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostElementReferenceGroupIndex.Substructure,
        total: 111,
        items: [
          { index: CostElementReferenceGroupIndex.Substructure, value: 111 },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.Services,
        total: 500,
        items: [
          { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: 300 },
          { index: CostElementReferenceGroupItemIndex.ServicesHeatSource, value: 200 },
        ],
      },
    ]);
  });
});
