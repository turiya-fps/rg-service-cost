import { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from '../data/cost-element-reference';
import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from '../data/cost-summary';
import type { CarbonView, CostingView, CostingViewSummary } from './custom-view';
import { createCarbonViewForBuilding, createCarbonViewForTotal, createCostingViewForBuilding, createCostingViewForTotal, createCostingViewForTotalWithoutScenario, createCostingViewSummaryFromValueGroups } from './custom-view';

describe('createCostingViewSummaryFromValueGroups()', (): void => {
  it('with summary value groups, missing, returns zeros', (): void => {
    expect(
      createCostingViewSummaryFromValueGroups([]),
    ).toStrictEqual<CostingViewSummary>({
      constructionModules: 0,
      constructionFitOut: 0,
      constructionBaseBuild: 0,
      construction: 0,

      preliminaries: 0,
      contingencies: 0,
      overheadsAndProfits: 0,

      total: 0,
    });
  });

  it('with summary value groups, returns split values', (): void => {
    expect(
      createCostingViewSummaryFromValueGroups([
        {
          index: CostSummaryGroupIndex.Construction,
          total: 0,
          items: [
            { index: CostSummaryGroupItemIndex.ConstructionModules, value: 100 },
            { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: 230 },
            { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: 340 },
          ],
        },
        {
          index: CostSummaryGroupIndex.Preliminaries,
          total: 0,
          items: [
            { index: CostSummaryGroupItemIndex.Preliminaries, value: 50 },
          ],
        },
        {
          index: CostSummaryGroupIndex.Contingency,
          total: 0,
          items: [
            { index: CostSummaryGroupItemIndex.Contingency, value: 60 },
          ],
        },
        {
          index: CostSummaryGroupIndex.OverheadsAndProfit,
          total: 0,
          items: [
            { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: 70 },
          ],
        },
      ]),
    ).toStrictEqual<CostingViewSummary>({
      constructionModules: 100,
      constructionFitOut: 230,
      constructionBaseBuild: 340,
      construction: 670,

      preliminaries: 50,
      contingencies: 60,
      overheadsAndProfits: 70,

      total: 850,
    });
  });
});

describe('createCostingViewForTotal()', (): void => {
  it('with resource, empty values', (): void => {
    expect(
      createCostingViewForTotal({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [],
              element: [],
            },

            basebuild: {
              summary: [],
              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 0,
        constructionFitOut: 0,
        constructionBaseBuild: 0,
        construction: 0,

        preliminaries: 0,
        contingencies: 0,
        overheadsAndProfits: 0,

        total: 0,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, without scenario, summaries only', (): void => {
    expect(
      createCostingViewForTotal({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70] },
                  ],
                },
              ],

              element: [],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7] },
                  ],
                },
              ],

              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 300,
        constructionFitOut: 670,
        constructionBaseBuild: 900,
        construction: 1870,

        preliminaries: 55,
        contingencies: 66,
        overheadsAndProfits: 77,

        total: 2068,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, with scenario, summaries only', (): void => {
    expect(
      createCostingViewForTotal({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [
              {
                index: CostSummaryGroupIndex.Construction,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.ConstructionModules, value: 34 },
                  { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: 56 },
                  { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: 74 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Preliminaries,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Preliminaries, value: 34 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Contingency,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Contingency, value: 56 },
                ],
              },
              {
                index: CostSummaryGroupIndex.OverheadsAndProfit,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: 78 },
                ],
              },
            ],

            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70] },
                  ],
                },
              ],

              element: [],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7] },
                  ],
                },
              ],

              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 334,
        constructionFitOut: 726,
        constructionBaseBuild: 974,
        construction: 2034,

        preliminaries: 89,
        contingencies: 122,
        overheadsAndProfits: 155,

        total: 2400,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, with everything', (): void => {
    expect(
      createCostingViewForTotal({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [
              {
                index: CostSummaryGroupIndex.Construction,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.ConstructionModules, value: 34 },
                  { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: 56 },
                  { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: 74 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Preliminaries,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Preliminaries, value: 34 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Contingency,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Contingency, value: 56 },
                ],
              },
              {
                index: CostSummaryGroupIndex.OverheadsAndProfit,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: 78 },
                ],
              },
            ],

            element: [
              {
                index: CostElementReferenceGroupIndex.FacilitatingWorks,
                total: 0, // unused
                items: [
                  { index: CostElementReferenceGroupItemIndex.FacilitatingWorksSiteClearance, value: 5999 },
                ],
              },
              {
                index: CostElementReferenceGroupIndex.InternalFinishes,
                total: 0, // unused
                items: [
                  { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: 50 },
                ],
              },
            ],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70] },
                  ],
                },
              ],

              element: [
                {
                  index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment, value: [4330] },
                  ],
                },
              ],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7] },
                  ],
                },
              ],

              element: [
                {
                  index: CostElementReferenceGroupIndex.Substructure,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.Substructure, value: [400] },
                  ],
                },
                {
                  index: CostElementReferenceGroupIndex.InternalFinishes,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: [5111] },
                  ],
                },
              ],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 334,
        constructionFitOut: 726,
        constructionBaseBuild: 974,
        construction: 2034,

        preliminaries: 89,
        contingencies: 122,
        overheadsAndProfits: 155,

        total: 2400,
      },

      element: {
        modular: [
          {
            index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
            total: 4330,
            items: [
              { index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment, value: 4330 },
            ],
          },
        ],

        basebuild: [
          {
            index: CostElementReferenceGroupIndex.FacilitatingWorks,
            total: 5999,
            items: [
              { index: CostElementReferenceGroupItemIndex.FacilitatingWorksSiteClearance, value: 5999 },
            ],
          },
          {
            index: CostElementReferenceGroupIndex.Substructure,
            total: 400,
            items: [
              { index: CostElementReferenceGroupItemIndex.Substructure, value: 400 },
            ],
          },
          {
            index: CostElementReferenceGroupIndex.InternalFinishes,
            total: 5161,
            items: [
              { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: 5161 },
            ],
          },
        ],
      },
    });
  });
});

describe('createCostingViewForTotalWithoutScenario()', (): void => {
  it('with resource, empty values', (): void => {
    expect(
      createCostingViewForTotalWithoutScenario({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [],
              element: [],
            },

            basebuild: {
              summary: [],
              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 0,
        constructionFitOut: 0,
        constructionBaseBuild: 0,
        construction: 0,

        preliminaries: 0,
        contingencies: 0,
        overheadsAndProfits: 0,

        total: 0,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, without scenario, summaries only', (): void => {
    expect(
      createCostingViewForTotalWithoutScenario({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70] },
                  ],
                },
              ],

              element: [],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7] },
                  ],
                },
              ],

              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 300,
        constructionFitOut: 670,
        constructionBaseBuild: 900,
        construction: 1870,

        preliminaries: 55,
        contingencies: 66,
        overheadsAndProfits: 77,

        total: 2068,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, with scenario, summaries only', (): void => {
    expect(
      createCostingViewForTotalWithoutScenario({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [
              {
                index: CostSummaryGroupIndex.Construction,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.ConstructionModules, value: 34 },
                  { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: 56 },
                  { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: 74 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Preliminaries,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Preliminaries, value: 34 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Contingency,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Contingency, value: 56 },
                ],
              },
              {
                index: CostSummaryGroupIndex.OverheadsAndProfit,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: 78 },
                ],
              },
            ],

            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70] },
                  ],
                },
              ],

              element: [],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7] },
                  ],
                },
              ],

              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 300,
        constructionFitOut: 670,
        constructionBaseBuild: 900,
        construction: 1870,

        preliminaries: 55,
        contingencies: 66,
        overheadsAndProfits: 77,

        total: 2068,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, with everything', (): void => {
    expect(
      createCostingViewForTotalWithoutScenario({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [
              {
                index: CostSummaryGroupIndex.Construction,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.ConstructionModules, value: 34 },
                  { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: 56 },
                  { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: 74 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Preliminaries,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Preliminaries, value: 34 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Contingency,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Contingency, value: 56 },
                ],
              },
              {
                index: CostSummaryGroupIndex.OverheadsAndProfit,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: 78 },
                ],
              },
            ],

            element: [
              {
                index: CostElementReferenceGroupIndex.FacilitatingWorks,
                total: 0, // unused
                items: [
                  { index: CostElementReferenceGroupItemIndex.FacilitatingWorksSiteClearance, value: 5999 },
                ],
              },
              {
                index: CostElementReferenceGroupIndex.InternalFinishes,
                total: 0, // unused
                items: [
                  { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: 50 },
                ],
              },
            ],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70] },
                  ],
                },
              ],

              element: [
                {
                  index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment, value: [4330] },
                  ],
                },
              ],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7] },
                  ],
                },
              ],

              element: [
                {
                  index: CostElementReferenceGroupIndex.Substructure,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.Substructure, value: [400] },
                  ],
                },
                {
                  index: CostElementReferenceGroupIndex.InternalFinishes,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: [5111] },
                  ],
                },
              ],
            },
          },
        },
      }),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 300,
        constructionFitOut: 670,
        constructionBaseBuild: 900,
        construction: 1870,

        preliminaries: 55,
        contingencies: 66,
        overheadsAndProfits: 77,

        total: 2068,
      },

      element: {
        modular: [
          {
            index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
            total: 4330,
            items: [
              { index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment, value: 4330 },
            ],
          },
        ],

        basebuild: [
          {
            index: CostElementReferenceGroupIndex.Substructure,
            total: 400,
            items: [
              { index: CostElementReferenceGroupItemIndex.Substructure, value: 400 },
            ],
          },
          {
            index: CostElementReferenceGroupIndex.InternalFinishes,
            total: 5111,
            items: [
              { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: 5111 },
            ],
          },
        ],
      },
    });
  });
});

describe('createCostingViewForBuilding()', (): void => {
  it('with resource, empty values', (): void => {
    expect(
      createCostingViewForBuilding({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [],
              element: [],
            },

            basebuild: {
              summary: [],
              element: [],
            },
          },
        },
      }, 2),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 0,
        constructionFitOut: 0,
        constructionBaseBuild: 0,
        construction: 0,

        preliminaries: 0,
        contingencies: 0,
        overheadsAndProfits: 0,

        total: 0,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, without scenario, summaries only', (): void => {
    expect(
      createCostingViewForBuilding({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100, 10, 20, 30, 40, 50] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230, 11, 22, 33, 44, 55] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340, 1, 2, 3, 4, 5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50, 11, 12, 13, 14, 15] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60, 21, 22, 23, 24, 25] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70, 3, 4, 5, 6, 7] },
                  ],
                },
              ],

              element: [],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200, 41, 42, 43, 44, 45] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440, 20, 30, 40, 50, 60] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560, 15, 25, 35, 45, 55] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5, 1, 2, 3, 4, 5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6, 2, 3, 4, 5, 6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7, 3, 4, 5, 6, 7] },
                  ],
                },
              ],

              element: [],
            },
          },
        },
      }, 2),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 73,
        constructionFitOut: 73,
        constructionBaseBuild: 38,
        construction: 184,

        preliminaries: 16,
        contingencies: 27,
        overheadsAndProfits: 10,

        total: 237,
      },

      element: {
        modular: [],
        basebuild: [],
      },
    });
  });

  it('with resource, with everything', (): void => {
    expect(
      createCostingViewForBuilding({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [
              {
                index: CostSummaryGroupIndex.Construction,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.ConstructionModules, value: 34 },
                  { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: 56 },
                  { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: 74 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Preliminaries,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Preliminaries, value: 34 },
                ],
              },
              {
                index: CostSummaryGroupIndex.Contingency,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.Contingency, value: 56 },
                ],
              },
              {
                index: CostSummaryGroupIndex.OverheadsAndProfit,
                total: 0, // unsued
                items: [
                  { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: 78 },
                ],
              },
            ],

            element: [
              {
                index: CostElementReferenceGroupIndex.FacilitatingWorks,
                total: 0, // unused
                items: [
                  { index: CostElementReferenceGroupItemIndex.FacilitatingWorksSiteClearance, value: 5999 },
                ],
              },
              {
                index: CostElementReferenceGroupIndex.InternalFinishes,
                total: 0, // unused
                items: [
                  { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: 50 },
                ],
              },
            ],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [100, 3, 4, 5, 6, 7] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [230, 22, 33, 44, 55, 66] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [340, 33, 44, 55, 66, 77] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [50, 10, 20, 30, 40, 50] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [60, 11, 12, 13, 14, 15] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [70, 21, 22, 23, 24, 25] },
                  ],
                },
              ],

              element: [
                {
                  index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment, value: [4330, 100, 200, 300, 400, 500] },
                  ],
                },
              ],
            },

            basebuild: {
              summary: [
                {
                  index: CostSummaryGroupIndex.Construction,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.ConstructionModules, value: [200, 12, 13, 14, 15, 16] },
                    { index: CostSummaryGroupItemIndex.ConstructionFitOut, value: [440, 40, 41, 42, 43, 44] },
                    { index: CostSummaryGroupItemIndex.ConstructionBaseBuild, value: [560, 50, 60, 70, 80, 90] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Preliminaries,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Preliminaries, value: [5, 1, 2, 3, 4, 5] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.Contingency,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.Contingency, value: [6, 2, 3, 4, 5, 6] },
                  ],
                },
                {
                  index: CostSummaryGroupIndex.OverheadsAndProfit,
                  total: [0], // unsued
                  items: [
                    { index: CostSummaryGroupItemIndex.OverheadsAndProfit, value: [7, 3, 4, 5, 6, 7] },
                  ],
                },
              ],

              element: [
                {
                  index: CostElementReferenceGroupIndex.Substructure,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.Substructure, value: [400, 100, 110, 120, 130, 140] },
                  ],
                },
                {
                  index: CostElementReferenceGroupIndex.InternalFinishes,
                  total: [0], // unused
                  items: [
                    { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: [5111, 300, 400, 500, 600, 700] },
                  ],
                },
              ],
            },
          },
        },
      }, 2),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 19,
        constructionFitOut: 86,
        constructionBaseBuild: 125,
        construction: 230,

        preliminaries: 33,
        contingencies: 17,
        overheadsAndProfits: 28,

        total: 308,
      },

      element: {
        modular: [
          {
            index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
            total: 300,
            items: [
              { index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment, value: 300 },
            ],
          },
        ],

        basebuild: [
          {
            index: CostElementReferenceGroupIndex.Substructure,
            total: 120,
            items: [
              { index: CostElementReferenceGroupItemIndex.Substructure, value: 120 },
            ],
          },
          {
            index: CostElementReferenceGroupIndex.InternalFinishes,
            total: 500,
            items: [
              { index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, value: 500 },
            ],
          },
        ],
      },
    });
  });
});

describe('createCarbonViewForTotal()', (): void => {
  it('with carbon values, adds scenario', (): void => {
    expect(
      createCarbonViewForTotal({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [],
              element: [],
            },

            basebuild: {
              summary: [],
              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CarbonView>({
      summary: {
        superstructure: 0,
        substructure: 0,
        other: 0,
        total: 0,
      },

      element: [],
    });
  });

  it('with carbon values, adds scenario', (): void => {
    expect(
      createCarbonViewForTotal({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [
            {
              index: CostElementReferenceGroupIndex.Substructure,
              total: 800,
              items: [
                { index: CostElementReferenceGroupItemIndex.Substructure, value: 800 },
              ],
            },
          ],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [
            {
              index: CostElementReferenceGroupIndex.Substructure,
              total: [300, 100, 200, 300],
              items: [
                { index: CostElementReferenceGroupItemIndex.Substructure, value: [300, 100, 200, 300] },
              ],
            },
            {
              index: CostElementReferenceGroupIndex.Superstructure,
              total: [400, 200, 100, 50, 25],
              items: [
                { index: CostElementReferenceGroupItemIndex.SuperstructureFrame, value: [300, 30, 33, 36, 39, 42] },
                { index: CostElementReferenceGroupItemIndex.SuperstructureInternalDoors, value: [300, 40, 44, 46, 49, 442] },
              ],
            },
            {
              index: CostElementReferenceGroupIndex.Services,
              total: [50, 10, 20, 30, 40],
              items: [
                { index: CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems, value: [200, 10, 20, 30, 40] },
                { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: [40, 1, 2, 3, 4] },
                { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, value: [550, 15, 24, 33, 42] },
              ],
            },
          ],

          costing: {
            modular: {
              summary: [],
              element: [],
            },

            basebuild: {
              summary: [],
              element: [],
            },
          },
        },
      }),
    ).toStrictEqual<CarbonView>({
      summary: {
        superstructure: 600,
        substructure: 1100,
        other: 790,
        total: 2490,
      },

      element: [
        {
          index: CostElementReferenceGroupIndex.Substructure,
          total: 1100,
          items: [
            { index: CostElementReferenceGroupItemIndex.Substructure, value: 1100 },
          ],
        },
        {
          index: CostElementReferenceGroupIndex.Superstructure,
          total: 600,
          items: [
            { index: CostElementReferenceGroupItemIndex.SuperstructureFrame, value: 300 },
            { index: CostElementReferenceGroupItemIndex.SuperstructureInternalDoors, value: 300 },
          ],
        },
        {
          index: CostElementReferenceGroupIndex.Services,
          total: 790,
          items: [
            { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: 40 },
            { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, value: 550 },
            { index: CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems, value: 200 },
          ],
        },
      ],
    });
  });
});

describe('createCarbonViewForBuilding()', (): void => {
  it('with carbon values, empty', (): void => {
    expect(
      createCarbonViewForBuilding({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [],

          costing: {
            modular: {
              summary: [],
              element: [],
            },

            basebuild: {
              summary: [],
              element: [],
            },
          },
        },
      }, 1),
    ).toStrictEqual<CarbonView>({
      summary: {
        superstructure: 0,
        substructure: 0,
        other: 0,
        total: 0,
      },

      element: [],
    });
  });

  it('with carbon values, adds scenario', (): void => {
    expect(
      createCarbonViewForBuilding({
        configuration: {
          on_costs: {
            preliminiaries_percentage: 1,
            contingencies_percentage: 2,
            overheads_and_profits_percentage: 3,
          },
        },

        scenario: {
          carbon: [
            {
              index: CostElementReferenceGroupIndex.Substructure,
              total: 800,
              items: [
                { index: CostElementReferenceGroupItemIndex.Substructure, value: 800 },
              ],
            },
          ],

          costing: {
            summary: [],
            element: [],
          },
        },

        buildings: {
          carbon: [
            {
              index: CostElementReferenceGroupIndex.Substructure,
              total: [300, 100, 200, 300],
              items: [
                { index: CostElementReferenceGroupItemIndex.Substructure, value: [300, 100, 200, 300] },
              ],
            },
            {
              index: CostElementReferenceGroupIndex.Superstructure,
              total: [400, 200, 100, 50, 25],
              items: [
                { index: CostElementReferenceGroupItemIndex.SuperstructureFrame, value: [300, 30, 33, 36, 39, 42] },
                { index: CostElementReferenceGroupItemIndex.SuperstructureInternalDoors, value: [300, 40, 44, 46, 49, 442] },
              ],
            },
            {
              index: CostElementReferenceGroupIndex.Services,
              total: [50, 10, 20, 30, 40],
              items: [
                { index: CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems, value: [200, 10, 20, 30, 40] },
                { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: [40, 1, 2, 3, 4] },
                { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, value: [550, 15, 24, 33, 42] },
              ],
            },
          ],

          costing: {
            modular: {
              summary: [],
              element: [],
            },

            basebuild: {
              summary: [],
              element: [],
            },
          },
        },
      }, 1),
    ).toStrictEqual<CarbonView>({
      summary: {
        superstructure: 77,
        substructure: 200,
        other: 46,
        total: 323,
      },

      element: [
        {
          index: CostElementReferenceGroupIndex.Substructure,
          total: 200,
          items: [
            { index: CostElementReferenceGroupItemIndex.Substructure, value: 200 },
          ],
        },
        {
          index: CostElementReferenceGroupIndex.Superstructure,
          total: 77,
          items: [
            { index: CostElementReferenceGroupItemIndex.SuperstructureFrame, value: 33 },
            { index: CostElementReferenceGroupItemIndex.SuperstructureInternalDoors, value: 44 },
          ],
        },
        {
          index: CostElementReferenceGroupIndex.Services,
          total: 46,
          items: [
            { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, value: 2 },
            { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, value: 24 },
            { index: CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems, value: 20 },
          ],
        },
      ],
    });
  });
});
