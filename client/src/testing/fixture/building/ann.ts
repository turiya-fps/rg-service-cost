import type { BuildingDataMapping, ScenarioDataMapping, UnitCategoryMix } from '../../../data/building';
import { BuildingData, ScenarioData } from '../../../data/building';
import type { ValueBreakdown, ValueGroup } from '../../../data/value-breakdown';
import type { ProjectCostingCalculationHttpResource } from '../../../resource/project/project-costing-calculation-resource';
import { flatternValueGroups } from '../../../utility/value-breakdown/flatten-value-group';

export const FIXTURE_METRIC_NUMBER_OF_LEVELS = 10;
export const FIXTURE_METRIC_NUMBER_OF_UNITS = 103;
export const FIXTURE_METRIC_NUMBER_OF_MODULES = 103;
export const FIXTURE_METRIC_GEA = 10884.03;
export const FIXTURE_METRIC_GIA = 9926.50;
export const FIXTURE_METRIC_NIA = 6984.45;

/**
 * A {@link BuildingDataMapping} fixture.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_SCENARIO_DATA: ScenarioDataMapping = {
  [ScenarioData.ScenarioArea]: 1736.63,
  [ScenarioData.ScenarioAreaNet]: 638.64,
  [ScenarioData.ScenarioPerimeter]: 178.14,

  [ScenarioData.NumberOfBuildings]: 1,
};

/**
 * A {@link BuildingDataMapping} fixture.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_BUILDING_DATA: BuildingDataMapping = {
  [BuildingData.AmenityLocationsArea]: 470.35,
  [BuildingData.AmenityLocationsPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.AmenityLocationsWallArea]: 670.43,
  [BuildingData.CommercialLocationsArea]: 0,
  [BuildingData.CommercialLocationsPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.CommercialLocationsWallArea]: 0,
  [BuildingData.CoreAndCorridorArea]: 2143.25,
  [BuildingData.CoreAndCorridorAreaGroundFloor]: 214.33,
  [BuildingData.CoreAndCorridorPerimeterGroundFloor]: 0, // missing in rg-suite metrics tables
  [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: 1928.93,
  [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: 0, // missing in rg-suite metrics tables
  [BuildingData.CoreArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorePerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.CoreWallArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorridorArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorridorPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorridorWallArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.ExternalWallPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.FacadeArea]: 5089.02,
  [BuildingData.FacadeExternalCornerTotalLengthQuantity]: 770.19,
  [BuildingData.FacadeInternalCornerTotalLengthQuantity]: 646,
  [BuildingData.FootprintArea]: 1097.99,
  [BuildingData.Gia]: FIXTURE_METRIC_GIA,
  [BuildingData.GlazedFacadeArea]: 925.08,
  [BuildingData.Nia]: FIXTURE_METRIC_NIA,
  [BuildingData.ResidentialGlazedFacadeArea]: 925.08,
  [BuildingData.ResidentialFacadeArea]: 5820.09,
  [BuildingData.ResidentialFacadeAreaNet]: 4895.02,
  [BuildingData.RoofArea]: 982.42,
  [BuildingData.RoofFacadeArea]: 194,
  [BuildingData.RoofFacadeAreaNet]: 194,
  [BuildingData.RoofPerimeter]: 189.62,
  [BuildingData.PodiumFacadeArea]: 0, // no podium
  [BuildingData.PodiumFacadeAreaNet]: 0, // no podium
  [BuildingData.PodiumGlazedFacadeArea]: 0, // no podium
  [BuildingData.ServiceLocationsArea]: 28.97,
  [BuildingData.ServiceLocationsPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.ServiceLocationsWallArea]: 69.12,

  [BuildingData.SubstructureConcreteWeight]: 342823.14,
  [BuildingData.SubstructureSteelRebarWeight]: 24997.52,

  [BuildingData.NumberOfEntrances]: 1,
  [BuildingData.NumberOfUnits]: FIXTURE_METRIC_NUMBER_OF_UNITS,
  [BuildingData.NumberOfModules]: FIXTURE_METRIC_NUMBER_OF_MODULES,

  [BuildingData.NumberOfModuleSingleDoors]: 593,
  [BuildingData.NumberOfModuleDoubleDoors]: 380,

  [BuildingData.NumberOfSingleDoors]: 22,
  [BuildingData.NumberOfDoubleDoors]: 6,
  [BuildingData.NumberOfMiscDoors]: 30,
  [BuildingData.NumberOfEntryExitDoors]: 0, // missing in rg-suite metrics tables

  [BuildingData.NumberOfLevels]: FIXTURE_METRIC_NUMBER_OF_LEVELS,
  [BuildingData.NumberOfLiftLevels]: 10,
  [BuildingData.NumberOfFlightsOfStairs]: 20,

  [BuildingData.NumberOfCores]: 2,
  [BuildingData.NumberOfCoreTypeFireFighting]: 1,
  [BuildingData.NumberOfCoreTypeLift]: 1,
};

/**
 * A {@link UnitCategoryMix} fixture.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_UNIT_CATEGORY_MIX: UnitCategoryMix = [
  { unit: 'Scarlet 100', quantity: 18 },
  { unit: 'Scarlet 200', quantity: 10 },
  { unit: 'Scarlet 201', quantity: 38 },
  { unit: 'Scarlet 202', quantity: 28 },
  { unit: 'Scarlet 301', quantity: 9 },
];

/**
 * A {@link ProjectCostingCalculationHttpResource} fixture.
 *
 * This is a direct snapshot of the response given from postman.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_CALCULATION_RESOURCE: ProjectCostingCalculationHttpResource = {
  'configuration': {
    'on_costs': {
      'preliminiaries_percentage': 10,
      'contingencies_percentage': 3,
      'overheads_and_profits_percentage': 5.5,
    },
  },
  'scenario': {
    'costing': {
      'summary': [
        {
          'index': '1',
          'total': 277027.14,
          'items': [
            {
              'index': '1.3',
              'value': 277027.14,
            },
          ],
        },
        {
          'index': '2',
          'total': 27702.71,
          'items': [
            {
              'index': '2.1',
              'value': 27702.71,
            },
          ],
        },
        {
          'index': '3',
          'total': 9141.9,
          'items': [
            {
              'index': '3.1',
              'value': 9141.9,
            },
          ],
        },
        {
          'index': '4',
          'total': 17262.95,
          'items': [
            {
              'index': '4.1',
              'value': 17262.95,
            },
          ],
        },
      ],
      'element': [
        {
          'index': '0',
          'total': 86831.5,
          'items': [
            {
              'index': '0.2',
              'value': 86831.5,
            },
          ],
        },
        {
          'index': '2',
          'total': 45250,
          'items': [
            {
              'index': '2.3',
              'value': 15250,
            },
            {
              'index': '2.7',
              'value': 30000,
            },
          ],
        },
        {
          'index': '8',
          'total': 144945.64,
          'items': [
            {
              'index': '8.1',
              'value': 143445.64,
            },
            {
              'index': '8.5',
              'value': 1500,
            },
          ],
        },
      ],
    },
    'carbon': [
      {
        'index': '2',
        'total': 60.99,
        'items': [
          {
            'index': '2.3',
            'value': 60.99,
          },
        ],
      },
    ],
  },
  'buildings': {
    'costing': {
      'modular': {
        'summary': [
          {
            'index': '1',
            'total': [
              13678688.75,
              13678688.75,
            ],
            'items': [
              {
                'index': '1.1',
                'value': [
                  8455377.45,
                  8455377.45,
                ],
              },
              {
                'index': '1.2',
                'value': [
                  5223311.3,
                  5223311.3,
                ],
              },
            ],
          },
          {
            'index': '2',
            'total': [
              1367868.88,
              1367868.88,
            ],
            'items': [
              {
                'index': '2.1',
                'value': [
                  1367868.88,
                  1367868.88,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              451396.73,
              451396.73,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  451396.73,
                  451396.73,
                ],
              },
            ],
          },
          {
            'index': '4',
            'total': [
              852387.49,
              852387.49,
            ],
            'items': [
              {
                'index': '4.1',
                'value': [
                  852387.49,
                  852387.49,
                ],
              },
            ],
          },
        ],
        'element': [
          {
            'index': '2',
            'total': [
              1159519.5,
              1159519.5,
            ],
            'items': [
              {
                'index': '2.6',
                'value': [
                  646756,
                  646756,
                ],
              },
              {
                'index': '2.8',
                'value': [
                  512763.5,
                  512763.5,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              1578908.83,
              1578908.83,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  422713.7,
                  422713.7,
                ],
              },
              {
                'index': '3.2',
                'value': [
                  794910.41,
                  794910.41,
                ],
              },
              {
                'index': '3.3',
                'value': [
                  361284.72,
                  361284.72,
                ],
              },
            ],
          },
          {
            'index': '4',
            'total': [
              255314.34,
              255314.34,
            ],
            'items': [
              {
                'index': '4.1',
                'value': [
                  255314.34,
                  255314.34,
                ],
              },
            ],
          },
          {
            'index': '5',
            'total': [
              2876324.63,
              2876324.63,
            ],
            'items': [
              {
                'index': '5.1',
                'value': [
                  196140.22,
                  196140.22,
                ],
              },
              {
                'index': '5.3',
                'value': [
                  35172.99,
                  35172.99,
                ],
              },
              {
                'index': '5.4',
                'value': [
                  225396.64,
                  225396.64,
                ],
              },
              {
                'index': '5.6',
                'value': [
                  425637.01,
                  425637.01,
                ],
              },
              {
                'index': '5.7',
                'value': [
                  437027.72,
                  437027.72,
                ],
              },
              {
                'index': '5.8',
                'value': [
                  1083357,
                  1083357,
                ],
              },
              {
                'index': '5.12',
                'value': [
                  144447.6,
                  144447.6,
                ],
              },
              {
                'index': '5.14',
                'value': [
                  329145.45,
                  329145.45,
                ],
              },
            ],
          },
          {
            'index': '6',
            'total': [
              7808621.45,
              7808621.45,
            ],
            'items': [
              {
                'index': '6.2',
                'value': [
                  6998808.05,
                  6998808.05,
                ],
              },
              {
                'index': '6.3',
                'value': [
                  809813.4,
                  809813.4,
                ],
              },
            ],
          },
        ],
      },
      'basebuild': {
        'summary': [
          {
            'index': '1',
            'total': [
              7518039,
              7518039,
            ],
            'items': [
              {
                'index': '1.3',
                'value': [
                  7518039,
                  7518039,
                ],
              },
            ],
          },
          {
            'index': '2',
            'total': [
              751803.9,
              751803.9,
            ],
            'items': [
              {
                'index': '2.1',
                'value': [
                  751803.9,
                  751803.9,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              248095.29,
              248095.29,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  248095.29,
                  248095.29,
                ],
              },
            ],
          },
          {
            'index': '4',
            'total': [
              468486.6,
              468486.6,
            ],
            'items': [
              {
                'index': '4.1',
                'value': [
                  468486.6,
                  468486.6,
                ],
              },
            ],
          },
        ],
        'element': [
          {
            'index': '1',
            'total': [
              869851.37,
              869851.37,
            ],
            'items': [
              {
                'index': '1.1',
                'value': [
                  869851.37,
                  869851.37,
                ],
              },
            ],
          },
          {
            'index': '2',
            'total': [
              5491454.13,
              5491454.13,
            ],
            'items': [
              {
                'index': '2.1',
                'value': [
                  645207.86,
                  645207.86,
                ],
              },
              {
                'index': '2.2',
                'value': [
                  202537.65,
                  202537.65,
                ],
              },
              {
                'index': '2.3',
                'value': [
                  309419.59,
                  309419.59,
                ],
              },
              {
                'index': '2.4',
                'value': [
                  157000,
                  157000,
                ],
              },
              {
                'index': '2.5',
                'value': [
                  3681489.03,
                  3681489.03,
                ],
              },
              {
                'index': '2.7',
                'value': [
                  458650,
                  458650,
                ],
              },
              {
                'index': '2.8',
                'value': [
                  37150,
                  37150,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              338633.5,
              338633.5,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  128595,
                  128595,
                ],
              },
              {
                'index': '3.2',
                'value': [
                  113592.25,
                  113592.25,
                ],
              },
              {
                'index': '3.3',
                'value': [
                  96446.25,
                  96446.25,
                ],
              },
            ],
          },
          {
            'index': '4',
            'total': [
              4800,
              4800,
            ],
            'items': [
              {
                'index': '4.1',
                'value': [
                  4800,
                  4800,
                ],
              },
            ],
          },
          {
            'index': '5',
            'total': [
              711000,
              711000,
            ],
            'items': [
              {
                'index': '5.3',
                'value': [
                  576000,
                  576000,
                ],
              },
              {
                'index': '5.10',
                'value': [
                  135000,
                  135000,
                ],
              },
            ],
          },
          {
            'index': '8',
            'total': [
              102300,
              102300,
            ],
            'items': [
              {
                'index': '8.5',
                'value': [
                  6300,
                  6300,
                ],
              },
              {
                'index': '8.7',
                'value': [
                  96000,
                  96000,
                ],
              },
            ],
          },
        ],
      },
    },
    'carbon': [
      {
        'index': '2',
        'total': [
          5329930.5,
          5329930.5,
        ],
        'items': [
          {
            'index': '2.1',
            'value': [
              2644487.03,
              2644487.03,
            ],
          },
          {
            'index': '2.2',
            'value': [
              1154561.05,
              1154561.05,
            ],
          },
          {
            'index': '2.3',
            'value': [
              333956.22,
              333956.22,
            ],
          },
          {
            'index': '2.4',
            'value': [
              12190,
              12190,
            ],
          },
          {
            'index': '2.5',
            'value': [
              1025040.96,
              1025040.96,
            ],
          },
          {
            'index': '2.6',
            'value': [
              96417.24,
              96417.24,
            ],
          },
          {
            'index': '2.7',
            'value': [
              5659.47,
              5659.47,
            ],
          },
          {
            'index': '2.8',
            'value': [
              57618.53,
              57618.53,
            ],
          },
        ],
      },
      {
        'index': '3',
        'total': [
          204098.67,
          204098.67,
        ],
        'items': [
          {
            'index': '3.1',
            'value': [
              15022.11,
              15022.11,
            ],
          },
          {
            'index': '3.2',
            'value': [
              175972.96,
              175972.96,
            ],
          },
          {
            'index': '3.3',
            'value': [
              13103.6,
              13103.6,
            ],
          },
        ],
      },
      {
        'index': '4',
        'total': [
          13564.07,
          13564.07,
        ],
        'items': [
          {
            'index': '4.1',
            'value': [
              13564.07,
              13564.07,
            ],
          },
        ],
      },
      {
        'index': '5',
        'total': [
          461538.05,
          461538.05,
        ],
        'items': [
          {
            'index': '5.1',
            'value': [
              7821.53,
              7821.53,
            ],
          },
          {
            'index': '5.3',
            'value': [
              2654.22,
              2654.22,
            ],
          },
          {
            'index': '5.4',
            'value': [
              10406.44,
              10406.44,
            ],
          },
          {
            'index': '5.6',
            'value': [
              219295.47,
              219295.47,
            ],
          },
          {
            'index': '5.7',
            'value': [
              114563.93,
              114563.93,
            ],
          },
          {
            'index': '5.8',
            'value': [
              92446.46,
              92446.46,
            ],
          },
          {
            'index': '5.10',
            'value': [
              14350,
              14350,
            ],
          },
        ],
      },
    ],
  },
};

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_SCENARIO_SUMMARY: ValueGroup<number>[] = FIXTURE_COSTING_CALCULATION_RESOURCE.scenario.costing.summary;

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_SCENARIO_ELEMENT_REFERENCE: ValueGroup<number>[] = FIXTURE_COSTING_CALCULATION_RESOURCE.scenario.costing.element;

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_MODULAR_SUMMARY: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.modular.summary);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_MODULAR_ELEMENT_REFERENCE: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.modular.element);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_BASEBUILD_SUMMARY: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.basebuild.summary);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_BASEBUILD_ELEMENT_REFERENCE: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.basebuild.element);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_BREAKDOWN: ValueBreakdown<number> = {
  modular: {
    summary: FIXTURE_COSTING_BUILDING_MODULAR_SUMMARY,
    element: FIXTURE_COSTING_BUILDING_MODULAR_ELEMENT_REFERENCE,
  },

  basebuild: {
    summary: FIXTURE_COSTING_BUILDING_BASEBUILD_SUMMARY,
    element: FIXTURE_COSTING_BUILDING_BASEBUILD_ELEMENT_REFERENCE,
  },
};

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_CARBON_SCENARIO: ValueGroup<number>[] = FIXTURE_COSTING_CALCULATION_RESOURCE.scenario.carbon;

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10710 Ann
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_CARBON_BUILDING: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.carbon);
