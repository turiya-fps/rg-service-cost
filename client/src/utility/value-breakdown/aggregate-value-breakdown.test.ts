import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '../../data/cost-summary';
import type { ValueBreakdown, ValueGroup } from '../../data/value-breakdown';
import { aggregateValueBreakdown, aggregateValueGroups, getAggregateValueGroupItemTotalByIndex, getAggregateValueGroupTotalByIndex, recreateWithTotalForValueGroupAggregated } from './aggregate-value-breakdown';

describe('recreateWithTotalForValueGroupAggregated()', (): void => {
  it('with summary group, single item, no children, creates total', (): void => {
    expect(
      recreateWithTotalForValueGroupAggregated([
        {
          index: '1',
          total: [100, 200, 300],
          items: [],
        },
      ]),
    ).toStrictEqual<ValueGroup<number[]>[]>([
      {
        index: '1',
        total: [600, 100, 200, 300],
        items: [],
      },
    ]);
  });

  it('with summary group, multiple items, no children, creates total', (): void => {
    expect(
      recreateWithTotalForValueGroupAggregated([
        {
          index: '1',
          total: [100, 200, 300],
          items: [],
        },
        {
          index: '2',
          total: [300, 200, 400],
          items: [],
        },
      ]),
    ).toStrictEqual<ValueGroup<number[]>[]>([
      {
        index: '1',
        total: [600, 100, 200, 300],
        items: [],
      },
      {
        index: '2',
        total: [900, 300, 200, 400],
        items: [],
      },
    ]);
  });

  it('with summary group, single item, with children, creates total', (): void => {
    expect(
      recreateWithTotalForValueGroupAggregated([
        {
          index: '1',
          total: [100, 200, 300],
          items: [
            {
              index: '1.1',
              value: [10, 20, 30],
            },
            {
              index: '1.2',
              value: [30, 40, 50],
            },
          ],
        },
      ]),
    ).toStrictEqual<ValueGroup<number[]>[]>([
      {
        index: '1',
        total: [600, 100, 200, 300],
        items: [
          {
            index: '1.1',
            value: [60, 10, 20, 30],
          },
          {
            index: '1.2',
            value: [120, 30, 40, 50],
          },
        ],
      },
    ]);
  });

  it('with summary group, multiple items, with children, creates total', (): void => {
    expect(
      recreateWithTotalForValueGroupAggregated([
        {
          index: '1',
          total: [100, 200, 300],
          items: [
            {
              index: '1.1',
              value: [10, 20, 30],
            },
            {
              index: '1.2',
              value: [30, 40, 50],
            },
          ],
        },
        {
          index: '2',
          total: [300, 500, 400],
          items: [
            {
              index: '2.1',
              value: [60, 50, 34],
            },
            {
              index: '2.2',
              value: [80, 40, 53],
            },
            {
              index: '2.3',
              value: [90, 30, 52],
            },
          ],
        },
      ]),
    ).toStrictEqual<ValueGroup<number[]>[]>([
      {
        index: '1',
        total: [600, 100, 200, 300],
        items: [
          {
            index: '1.1',
            value: [60, 10, 20, 30],
          },
          {
            index: '1.2',
            value: [120, 30, 40, 50],
          },
        ],
      },
      {
        index: '2',
        total: [1200, 300, 500, 400],
        items: [
          {
            index: '2.1',
            value: [144, 60, 50, 34],
          },
          {
            index: '2.2',
            value: [173, 80, 40, 53],
          },
          {
            index: '2.3',
            value: [172, 90, 30, 52],
          },
        ],
      },
    ]);
  });
});

describe('aggregateValueGroups()', (): void => {
  it('with collection, multiple items, all matching, groups and returned', (): void => {
    expect(
      aggregateValueGroups([
        [
          {
            index: '1',
            total: 100,
            items: [],
          },
        ],
        [
          {
            index: '1',
            total: 200,
            items: [],
          },
        ],
        [
          {
            index: '1',
            total: 300,
            items: [],
          },
        ],
      ]),
    ).toStrictEqual<ValueGroup<number[]>[]>([
      {
        index: '1',
        total: [
          100,
          200,
          300,
        ],
        items: [],
      },
    ]);
  });

  it('with collection, multiple items, all matching, groups and returned', (): void => {
    expect(
      aggregateValueGroups([
        [
          {
            index: '1',
            total: 100,
            items: [],
          },
        ],
        [
          {
            index: '1',
            total: 200,
            items: [],
          },
        ],
        [
          {
            index: '2',
            total: 300,
            items: [],
          },
        ],
      ]),
    ).toStrictEqual<ValueGroup<number[]>[]>([
      {
        index: '1',
        total: [
          100,
          200,
          0,
        ],
        items: [],
      },
      {
        index: '2',
        total: [
          0,
          0,
          300,
        ],
        items: [],
      },
    ]);
  });
});

describe('aggregateValueBreakdown()', (): void => {
  it('with single costing, no children items, single items, returns single costing sum', (): void => {
    expect(
      aggregateValueBreakdown([
        {
          modular: {
            summary: [
              {
                index: '1',
                total: 100,
                items: [],
              },
            ],

            element: [
              {
                index: '1',
                total: 200,
                items: [],
              },
            ],
          },

          basebuild: {
            summary: [
              {
                index: '1',
                total: 300,
                items: [],
              },
            ],

            element: [
              {
                index: '1',
                total: 400,
                items: [],
              },
            ],
          },
        },
      ]),
    ).toStrictEqual<ValueBreakdown<number[]>>({
      modular: {
        summary: [
          {
            index: '1',
            total: [100, 100],
            items: [],
          },
        ],

        element: [
          {
            index: '1',
            total: [200, 200],
            items: [],
          },
        ],
      },

      basebuild: {
        summary: [
          {
            index: '1',
            total: [300, 300],
            items: [],
          },
        ],

        element: [
          {
            index: '1',
            total: [400, 400],
            items: [],
          },
        ],
      },
    });
  });

  it('with multiple costing, no children items, single items, returns single costing sum', (): void => {
    expect(
      aggregateValueBreakdown([
        {
          modular: {
            summary: [
              {
                index: '1',
                total: 100,
                items: [],
              },
            ],

            element: [
              {
                index: '1',
                total: 200,
                items: [],
              },
            ],
          },

          basebuild: {
            summary: [
              {
                index: '1',
                total: 300,
                items: [],
              },
            ],

            element: [
              {
                index: '1',
                total: 400,
                items: [],
              },
            ],
          },
        },
        {
          modular: {
            summary: [
              {
                index: '1',
                total: 100,
                items: [],
              },
            ],

            element: [
              {
                index: '1',
                total: 200,
                items: [],
              },
            ],
          },

          basebuild: {
            summary: [
              {
                index: '1',
                total: 300,
                items: [],
              },
            ],

            element: [
              {
                index: '1',
                total: 400,
                items: [],
              },
            ],
          },
        },
      ]),
    ).toStrictEqual<ValueBreakdown<number[]>>({
      modular: {
        summary: [
          {
            index: '1',
            total: [200, 100, 100],
            items: [],
          },
        ],

        element: [
          {
            index: '1',
            total: [400, 200, 200],
            items: [],
          },
        ],
      },

      basebuild: {
        summary: [
          {
            index: '1',
            total: [600, 300, 300],
            items: [],
          },
        ],

        element: [
          {
            index: '1',
            total: [800, 400, 400],
            items: [],
          },
        ],
      },
    });
  });
});

describe('getAggregateValueGroupTotalByIndex()', (): void => {
  it('with index, not found, return undefed', (): void => {
    expect(
      getAggregateValueGroupTotalByIndex([], CostSummaryGroupIndex.OverheadsAndProfit),
    ).toStrictEqual<undefined>(undefined);
  });

  it('with index, found, return total value', (): void => {
    expect(
      getAggregateValueGroupTotalByIndex([
        {
          index: '1',
          total: [123, 50, 50, 23],
          items: [],
        },
      ], CostSummaryGroupIndex.Construction),
    ).toStrictEqual<number>(123);
  });
});

describe('getAggregateValueGroupItemTotalByIndex()', (): void => {
  it('with index, not found, return undefed', (): void => {
    expect(
      getAggregateValueGroupItemTotalByIndex([], CostSummaryGroupItemIndex.OverheadsAndProfit),
    ).toStrictEqual<undefined>(undefined);
  });

  it('with index, found, return total value', (): void => {
    expect(
      getAggregateValueGroupItemTotalByIndex([
        {
          index: '1',
          total: [123, 50, 50, 23],
          items: [
            {
              index: '1.1',
              value: [50, 10, 20, 20],
            },
          ],
        },
      ], CostSummaryGroupItemIndex.ConstructionModules),
    ).toStrictEqual<number>(50);
  });
});
