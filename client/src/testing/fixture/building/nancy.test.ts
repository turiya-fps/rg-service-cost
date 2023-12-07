import type { CarbonView, CostingView } from '../../../utility/custom-view';
import { createCarbonViewForTotal, createCostingViewForBuilding, createCostingViewForTotal, createCostingViewForTotalWithoutScenario } from '../../../utility/custom-view';
import { FIXTURE_COSTING_CALCULATION_RESOURCE } from './nancy';

describe('with test building', (): void => {
  it('can create simple costing summary', (): void => {
    expect(
      createCostingViewForTotal(FIXTURE_COSTING_CALCULATION_RESOURCE),
    ).toStrictEqual<CostingView>({
      summary: {
        constructionModules: 2268378.16,
        constructionFitOut: 1581231.52,
        constructionBaseBuild: 3723073.67,
        construction: 7572683.35,

        preliminaries: 757268.34,
        contingencies: 249898.55,
        overheadsAndProfits: 471891.76,

        total: 9051742,
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
        constructionModules: 2268378.16,
        constructionFitOut: 1581231.52,
        constructionBaseBuild: 3358083.67,
        construction: 7207693.35,

        preliminaries: 720769.34,
        contingencies: 237853.88,
        overheadsAndProfits: 449147.41,

        total: 8615463.98,
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
        superstructure: 1781298.31,
        other: 210434.93,
        total: 1991733.24,
      },

      element: expect.arrayContaining([]),
    });
  });
});
