import type { CarbonView, CostingView } from '../../../utility/custom-view';
import { createCarbonViewForTotal, createCostingViewForBuilding, createCostingViewForTotal, createCostingViewForTotalWithoutScenario } from '../../../utility/custom-view';
import { FIXTURE_COSTING_CALCULATION_RESOURCE } from './ann';

describe('with test building', (): void => {
  it('can create simple costing summary', (): void => {
    expect(
      createCostingViewForTotal(FIXTURE_COSTING_CALCULATION_RESOURCE),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 8455377.45,
        constructionFitOut: 5223311.30,
        constructionBaseBuild: 7795066.14,
        construction: 21473754.89,

        preliminaries: 2147375.49,
        contingencies: 708633.92,
        overheadsAndProfits: 1338137.04,

        total: 25667901.34,
      },

      element: {
        modular: expect.arrayContaining([]),
        basebuild: expect.arrayContaining([]),
      },
    });
  });

  it('can create simple costing summary for single building', (): void => {
    const building = createCostingViewForBuilding(FIXTURE_COSTING_CALCULATION_RESOURCE, 0);

    expect(building).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 8455377.45,
        constructionFitOut: 5223311.30,
        constructionBaseBuild: 7518039.00,
        construction: 21196727.75,

        preliminaries: 2119672.78,
        contingencies: 699492.02,
        overheadsAndProfits: 1320874.09,

        total: 25336766.64,
      },

      element: {
        modular: expect.arrayContaining([]),
        basebuild: expect.arrayContaining([]),
      },
    });

    expect(
      createCostingViewForTotalWithoutScenario(FIXTURE_COSTING_CALCULATION_RESOURCE),
    ).toStrictEqual(building);
  });

  it('can create carbon summary', (): void => {
    expect(
      createCarbonViewForTotal(FIXTURE_COSTING_CALCULATION_RESOURCE),
    ).toStrictEqual<CarbonView>({
      summary: {
        substructure: 0,
        superstructure: 5329991.49,
        other: 679200.79,
        total: 6009192.28,
      },

      element: expect.arrayContaining([]),
    });
  });
});
