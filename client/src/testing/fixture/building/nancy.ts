import type { BuildingDataMapping, ScenarioDataMapping, UnitCategoryMix } from '../../../data/building';
import { BuildingData, ScenarioData } from '../../../data/building';
import type { ValueBreakdown, ValueGroup } from '../../../data/value-breakdown';
import type { ProjectCostingCalculationHttpResource } from '../../../resource/project/project-costing-calculation-resource';
import { flatternValueGroups } from '../../../utility/value-breakdown/flatten-value-group';

export const FIXTURE_METRIC_NUMBER_OF_LEVELS = 5;
export const FIXTURE_METRIC_NUMBER_OF_UNITS = 32;
export const FIXTURE_METRIC_NUMBER_OF_MODULES = 84;
export const FIXTURE_METRIC_GEA = 3535.44;
export const FIXTURE_METRIC_GIA = 3210.14;
export const FIXTURE_METRIC_NIA = 2102.04;

/**
 * A {@link ScenarioDataMapping} fixture.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_SCENARIO_DATA: ScenarioDataMapping = {
  [ScenarioData.ScenarioArea]: 2400,
  [ScenarioData.ScenarioAreaNet]: 1683.47,
  [ScenarioData.ScenarioPerimeter]: 200,

  [ScenarioData.NumberOfBuildings]: 1,
};

/**
 * A {@link BuildingDataMapping} fixture.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_BUILDING_DATA: BuildingDataMapping = {
  [BuildingData.AmenityLocationsArea]: 180.09,
  [BuildingData.AmenityLocationsPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.AmenityLocationsWallArea]: 452.34,
  [BuildingData.CommercialLocationsArea]: 0,
  [BuildingData.CommercialLocationsPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.CommercialLocationsWallArea]: 0,
  [BuildingData.CoreAndCorridorArea]: 749.25,
  [BuildingData.CoreAndCorridorAreaGroundFloor]: 149.85,
  [BuildingData.CoreAndCorridorPerimeterGroundFloor]: 0, // missing in rg-suite metrics tables
  [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: 599.40,
  [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: 0, // missing in rg-suite metrics tables
  [BuildingData.CoreArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorePerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.CoreWallArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorridorArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorridorPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.CorridorWallArea]: 0, // missing in rg-suite metrics tables
  [BuildingData.ExternalWallPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.FacadeArea]: 2122.22,
  [BuildingData.FacadeExternalCornerTotalLengthQuantity]: 105,
  [BuildingData.FacadeInternalCornerTotalLengthQuantity]: 81,
  [BuildingData.FootprintArea]: 716.53,
  [BuildingData.Gia]: FIXTURE_METRIC_GIA,
  [BuildingData.GlazedFacadeArea]: 267.06,
  [BuildingData.Nia]: FIXTURE_METRIC_NIA,
  [BuildingData.ResidentialGlazedFacadeArea]: 87.45,
  [BuildingData.ResidentialFacadeArea]: 793.48,
  [BuildingData.ResidentialFacadeAreaNet]: 706.03,
  [BuildingData.RoofArea]: 633.59,
  [BuildingData.RoofFacadeArea]: 0, // no roof
  [BuildingData.RoofFacadeAreaNet]: 0, // no roof
  [BuildingData.RoofPerimeter]: 127.87,
  [BuildingData.PodiumFacadeArea]: 0, // no podium
  [BuildingData.PodiumFacadeAreaNet]: 0, // no podium
  [BuildingData.PodiumGlazedFacadeArea]: 0, // no podium
  [BuildingData.ServiceLocationsArea]: 75.71,
  [BuildingData.ServiceLocationsPerimeter]: 0, // missing in rg-suite metrics tables
  [BuildingData.ServiceLocationsWallArea]: 189.69,

  [BuildingData.SubstructureConcreteWeight]: 81216,
  [BuildingData.SubstructureSteelRebarWeight]: 5922,

  [BuildingData.NumberOfEntrances]: 1,
  [BuildingData.NumberOfUnits]: FIXTURE_METRIC_NUMBER_OF_UNITS,
  [BuildingData.NumberOfModules]: FIXTURE_METRIC_NUMBER_OF_MODULES,

  [BuildingData.NumberOfModuleSingleDoors]: 183,
  [BuildingData.NumberOfModuleDoubleDoors]: 115,

  [BuildingData.NumberOfSingleDoors]: 11,
  [BuildingData.NumberOfDoubleDoors]: 11,
  [BuildingData.NumberOfMiscDoors]: 20,
  [BuildingData.NumberOfEntryExitDoors]: 0, // missing in rg-suite metrics tables

  [BuildingData.NumberOfLevels]: FIXTURE_METRIC_NUMBER_OF_LEVELS,
  [BuildingData.NumberOfLiftLevels]: 5,
  [BuildingData.NumberOfFlightsOfStairs]: 10,

  [BuildingData.NumberOfCores]: 2,
  [BuildingData.NumberOfCoreTypeFireFighting]: 0,
  [BuildingData.NumberOfCoreTypeLift]: 1,
};

/**
 * A {@link UnitCategoryMix} fixture.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_UNIT_CATEGORY_MIX: UnitCategoryMix = [
  { unit: 'Scarlet 100', quantity: 16 },
  { unit: 'Scarlet 201', quantity: 8 },
  { unit: 'Scarlet 202', quantity: 4 },
  { unit: 'Scarlet 301', quantity: 4 },
];

/**
 * A {@link ProjectCostingCalculationHttpResource} fixture.
 *
 * This is a direct snapshot of the response given from postman.
 *
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
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
          'total': 364990,
          'items': [
            {
              'index': '1.3',
              'value': 364990,
            },
          ],
        },
        {
          'index': '2',
          'total': 36499,
          'items': [
            {
              'index': '2.1',
              'value': 36499,
            },
          ],
        },
        {
          'index': '3',
          'total': 12044.67,
          'items': [
            {
              'index': '3.1',
              'value': 12044.67,
            },
          ],
        },
        {
          'index': '4',
          'total': 22744.35,
          'items': [
            {
              'index': '4.1',
              'value': 22744.35,
            },
          ],
        },
      ],
      'element': [
        {
          'index': '0',
          'total': 120000,
          'items': [
            {
              'index': '0.2',
              'value': 120000,
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
          'total': 199740,
          'items': [
            {
              'index': '8.1',
              'value': 198240,
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
              3849609.68,
              3849609.68,
            ],
            'items': [
              {
                'index': '1.1',
                'value': [
                  2268378.16,
                  2268378.16,
                ],
              },
              {
                'index': '1.2',
                'value': [
                  1581231.52,
                  1581231.52,
                ],
              },
            ],
          },
          {
            'index': '2',
            'total': [
              384960.97,
              384960.97,
            ],
            'items': [
              {
                'index': '2.1',
                'value': [
                  384960.97,
                  384960.97,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              127037.12,
              127037.12,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  127037.12,
                  127037.12,
                ],
              },
            ],
          },
          {
            'index': '4',
            'total': [
              239888.43,
              239888.43,
            ],
            'items': [
              {
                'index': '4.1',
                'value': [
                  239888.43,
                  239888.43,
                ],
              },
            ],
          },
        ],
        'element': [
          {
            'index': '2',
            'total': [
              329290,
              329290,
            ],
            'items': [
              {
                'index': '2.6',
                'value': [
                  176496,
                  176496,
                ],
              },
              {
                'index': '2.8',
                'value': [
                  152794,
                  152794,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              474423.62,
              474423.62,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  127359.48,
                  127359.48,
                ],
              },
              {
                'index': '3.2',
                'value': [
                  238748.3,
                  238748.3,
                ],
              },
              {
                'index': '3.3',
                'value': [
                  108315.84,
                  108315.84,
                ],
              },
            ],
          },
          {
            'index': '4',
            'total': [
              79320.96,
              79320.96,
            ],
            'items': [
              {
                'index': '4.1',
                'value': [
                  79320.96,
                  79320.96,
                ],
              },
            ],
          },
          {
            'index': '5',
            'total': [
              874692.92,
              874692.92,
            ],
            'items': [
              {
                'index': '5.1',
                'value': [
                  61839.68,
                  61839.68,
                ],
              },
              {
                'index': '5.3',
                'value': [
                  10594,
                  10594,
                ],
              },
              {
                'index': '5.4',
                'value': [
                  68592.04,
                  68592.04,
                ],
              },
              {
                'index': '5.6',
                'value': [
                  130642.38,
                  130642.38,
                ],
              },
              {
                'index': '5.7',
                'value': [
                  133389.54,
                  133389.54,
                ],
              },
              {
                'index': '5.8',
                'value': [
                  326304,
                  326304,
                ],
              },
              {
                'index': '5.12',
                'value': [
                  43507.2,
                  43507.2,
                ],
              },
              {
                'index': '5.14',
                'value': [
                  99824.08,
                  99824.08,
                ],
              },
            ],
          },
          {
            'index': '6',
            'total': [
              2091882.16,
              2091882.16,
            ],
            'items': [
              {
                'index': '6.2',
                'value': [
                  1936126.84,
                  1936126.84,
                ],
              },
              {
                'index': '6.3',
                'value': [
                  155755.32,
                  155755.32,
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
              3358083.67,
              3358083.67,
            ],
            'items': [
              {
                'index': '1.3',
                'value': [
                  3358083.67,
                  3358083.67,
                ],
              },
            ],
          },
          {
            'index': '2',
            'total': [
              335808.37,
              335808.37,
            ],
            'items': [
              {
                'index': '2.1',
                'value': [
                  335808.37,
                  335808.37,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              110816.76,
              110816.76,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  110816.76,
                  110816.76,
                ],
              },
            ],
          },
          {
            'index': '4',
            'total': [
              209258.98,
              209258.98,
            ],
            'items': [
              {
                'index': '4.1',
                'value': [
                  209258.98,
                  209258.98,
                ],
              },
            ],
          },
        ],
        'element': [
          {
            'index': '1',
            'total': [
              368207.5,
              368207.5,
            ],
            'items': [
              {
                'index': '1.1',
                'value': [
                  368207.5,
                  368207.5,
                ],
              },
            ],
          },
          {
            'index': '2',
            'total': [
              2176394.67,
              2176394.67,
            ],
            'items': [
              {
                'index': '2.1',
                'value': [
                  209524,
                  209524,
                ],
              },
              {
                'index': '2.2',
                'value': [
                  62937,
                  62937,
                ],
              },
              {
                'index': '2.3',
                'value': [
                  205659.93,
                  205659.93,
                ],
              },
              {
                'index': '2.4',
                'value': [
                  78500,
                  78500,
                ],
              },
              {
                'index': '2.5',
                'value': [
                  1410798.74,
                  1410798.74,
                ],
              },
              {
                'index': '2.7',
                'value': [
                  179850,
                  179850,
                ],
              },
              {
                'index': '2.8',
                'value': [
                  29125,
                  29125,
                ],
              },
            ],
          },
          {
            'index': '3',
            'total': [
              118381.5,
              118381.5,
            ],
            'items': [
              {
                'index': '3.1',
                'value': [
                  44955,
                  44955,
                ],
              },
              {
                'index': '3.2',
                'value': [
                  39710.25,
                  39710.25,
                ],
              },
              {
                'index': '3.3',
                'value': [
                  33716.25,
                  33716.25,
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
              636000,
              636000,
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
                  60000,
                  60000,
                ],
              },
            ],
          },
          {
            'index': '8',
            'total': [
              54300,
              54300,
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
                  48000,
                  48000,
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
          1781237.32,
          1781237.32,
        ],
        'items': [
          {
            'index': '2.1',
            'value': [
              773206.75,
              773206.75,
            ],
          },
          {
            'index': '2.2',
            'value': [
              358770.87,
              358770.87,
            ],
          },
          {
            'index': '2.3',
            'value': [
              215637.46,
              215637.46,
            ],
          },
          {
            'index': '2.4',
            'value': [
              6095,
              6095,
            ],
          },
          {
            'index': '2.5',
            'value': [
              378087.63,
              378087.63,
            ],
          },
          {
            'index': '2.6',
            'value': [
              26361.84,
              26361.84,
            ],
          },
          {
            'index': '2.7',
            'value': [
              1978.47,
              1978.47,
            ],
          },
          {
            'index': '2.8',
            'value': [
              21099.3,
              21099.3,
            ],
          },
        ],
      },
      {
        'index': '3',
        'total': [
          63883.08,
          63883.08,
        ],
        'items': [
          {
            'index': '3.1',
            'value': [
              4714.58,
              4714.58,
            ],
          },
          {
            'index': '3.2',
            'value': [
              55202.76,
              55202.76,
            ],
          },
          {
            'index': '3.3',
            'value': [
              3965.74,
              3965.74,
            ],
          },
        ],
      },
      {
        'index': '4',
        'total': [
          4214.08,
          4214.08,
        ],
        'items': [
          {
            'index': '4.1',
            'value': [
              4214.08,
              4214.08,
            ],
          },
        ],
      },
      {
        'index': '5',
        'total': [
          142337.77,
          142337.77,
        ],
        'items': [
          {
            'index': '5.1',
            'value': [
              2496.36,
              2496.36,
            ],
          },
          {
            'index': '5.3',
            'value': [
              799.44,
              799.44,
            ],
          },
          {
            'index': '5.4',
            'value': [
              3138.56,
              3138.56,
            ],
          },
          {
            'index': '5.6',
            'value': [
              66129.39,
              66129.39,
            ],
          },
          {
            'index': '5.7',
            'value': [
              34754.41,
              34754.41,
            ],
          },
          {
            'index': '5.8',
            'value': [
              27844.61,
              27844.61,
            ],
          },
          {
            'index': '5.10',
            'value': [
              7175,
              7175,
            ],
          },
        ],
      },
    ],
  },
};

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_SCENARIO_SUMMARY: ValueGroup<number>[] = FIXTURE_COSTING_CALCULATION_RESOURCE.scenario.costing.summary;

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_SCENARIO_ELEMENT_REFERENCE: ValueGroup<number>[] = FIXTURE_COSTING_CALCULATION_RESOURCE.scenario.costing.element;

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_MODULAR_SUMMARY: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.modular.summary);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_MODULAR_ELEMENT_REFERENCE: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.modular.element);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_BASEBUILD_SUMMARY: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.basebuild.summary);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_COSTING_BUILDING_BASEBUILD_ELEMENT_REFERENCE: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.costing.basebuild.element);

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
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
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_CARBON_SCENARIO: ValueGroup<number>[] = FIXTURE_COSTING_CALCULATION_RESOURCE.scenario.carbon;

/**
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10670 Nancy
 * @see https://app.clickup.com/6610250/v/dc/69qaa-23768/69qaa-10048 Test Buildings Reference
 */
export const FIXTURE_CARBON_BUILDING: ValueGroup<number>[] = flatternValueGroups(FIXTURE_COSTING_CALCULATION_RESOURCE.buildings.carbon);
