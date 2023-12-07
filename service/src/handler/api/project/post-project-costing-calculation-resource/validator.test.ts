import { partial } from '@matt-usurp/grok/testing';
import { BuildingData, BuildingOption, ScenarioData } from '@project-rouge/service-cost-client/src/data/building';
import type { PostProjectCostingCalculationResource } from '@project-rouge/service-cost-client/src/endpoint/project/post-project-costing-calculation-resource';
import type { SafeParseError, SafeParseSuccess, ZodError, ZodIssue } from 'zod';
import * as validator from './validator';

describe('path', (): void => {
  it('with empty, errors', async (): Promise<void> => {
    const result = await validator.path().spa({});

    expect(result).toStrictEqual<SafeParseError<unknown>>({
      success: false,

      error: expect.objectContaining(partial<ZodError<unknown>>({
        name: 'ZodError',

        issues: [
          expect.objectContaining({
            code: 'invalid_type',
            received: 'undefined',
            expected: 'string',
            path: ['projectId'],
          } satisfies Partial<ZodIssue>),
        ],
      })),
    });
  });

  it('with data, parses, validates', async (): Promise<void> => {
    const data: PostProjectCostingCalculationResource.Path = {
      projectId: '8860a24f-3bff-4bb0-94d4-b64ea6a4d04c',
    };

    const result = await validator.path().spa(data);

    expect(result).toStrictEqual<SafeParseSuccess<PostProjectCostingCalculationResource.Path>>({
      success: true,

      data: {
        projectId: '8860a24f-3bff-4bb0-94d4-b64ea6a4d04c',
      },
    });
  });
});

describe('payload', (): void => {
  it('with empty, errors', async (): Promise<void> => {
    const result = await validator.payload().spa({});

    expect(result).toStrictEqual<SafeParseError<unknown>>({
      success: false,

      error: expect.objectContaining(partial<ZodError<unknown>>({
        name: 'ZodError',
      })),
    });
  });

  it('with data, invalid options, errors ', async (): Promise<void> => {
    const data: Partial<PostProjectCostingCalculationResource.Payload> | unknown = {
      scenario: {
        [ScenarioData.ScenarioArea]: 1,
        [ScenarioData.ScenarioAreaNet]: 2,
        [ScenarioData.ScenarioPerimeter]: 3,

        [ScenarioData.NumberOfBuildings]: 4,
      },

      buildings: [
        {
          data: {
            [BuildingData.AmenityLocationsArea]: 1,
            [BuildingData.AmenityLocationsPerimeter]: 2,
            [BuildingData.AmenityLocationsWallArea]: 3,
            [BuildingData.CommercialLocationsArea]: 4,
            [BuildingData.CommercialLocationsPerimeter]: 5,
            [BuildingData.CommercialLocationsWallArea]: 6,
            [BuildingData.CoreAndCorridorArea]: 7,
            [BuildingData.CoreAndCorridorAreaGroundFloor]: 8,
            [BuildingData.CoreAndCorridorPerimeterGroundFloor]: 9,
            [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: 10,
            [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: 11,
            [BuildingData.CoreArea]: 12,
            [BuildingData.CorePerimeter]: 13,
            [BuildingData.CoreWallArea]: 14,
            [BuildingData.CorridorArea]: 15,
            [BuildingData.CorridorPerimeter]: 16,
            [BuildingData.CorridorWallArea]: 17,
            [BuildingData.ExternalWallPerimeter]: 18,
            [BuildingData.FacadeArea]: 19,
            [BuildingData.FacadeExternalCornerTotalLengthQuantity]: 20,
            [BuildingData.FacadeInternalCornerTotalLengthQuantity]: 21,
            [BuildingData.FootprintArea]: 22,
            [BuildingData.Gia]: 23,
            [BuildingData.GlazedFacadeArea]: 24,
            [BuildingData.Nia]: 25,
            [BuildingData.ResidentialGlazedFacadeArea]: 26,
            [BuildingData.ResidentialFacadeArea]: 27,
            [BuildingData.ResidentialFacadeAreaNet]: 28,
            [BuildingData.RoofArea]: 29,
            [BuildingData.RoofPerimeter]: 30,
            [BuildingData.RoofFacadeArea]: 31,
            [BuildingData.RoofFacadeAreaNet]: 32,
            [BuildingData.PodiumGlazedFacadeArea]: 33,
            [BuildingData.PodiumFacadeArea]: 34,
            [BuildingData.PodiumFacadeAreaNet]: 35,
            [BuildingData.ServiceLocationsArea]: 36,
            [BuildingData.ServiceLocationsPerimeter]: 37,
            [BuildingData.ServiceLocationsWallArea]: 38,

            [BuildingData.SubstructureConcreteWeight]: 38.1,
            [BuildingData.SubstructureSteelRebarWeight]: 38.2,

            [BuildingData.NumberOfEntrances]: 39,
            [BuildingData.NumberOfUnits]: 40,
            [BuildingData.NumberOfModules]: 41,

            [BuildingData.NumberOfModuleDoubleDoors]: 42,
            [BuildingData.NumberOfModuleSingleDoors]: 43,
            [BuildingData.NumberOfSingleDoors]: 44,
            [BuildingData.NumberOfDoubleDoors]: 45,
            [BuildingData.NumberOfMiscDoors]: 46,
            [BuildingData.NumberOfEntryExitDoors]: 47,

            [BuildingData.NumberOfLevels]: 48,
            [BuildingData.NumberOfLiftLevels]: 49,
            [BuildingData.NumberOfFlightsOfStairs]: 50,

            [BuildingData.NumberOfCores]: 51,
            [BuildingData.NumberOfCoreTypeFireFighting]: 52,
            [BuildingData.NumberOfCoreTypeLift]: 53,
          },

          units: [
            { unit: 'A', quantity: 1 },
            { unit: 'B', quantity: 2 },
            { unit: 'C', quantity: 3 },
            { unit: 'D', quantity: 4 },
            { unit: 'E', quantity: 5 },
            { unit: 'F', quantity: 6 },
          ],

          options: [
            'test:invalid-option',
          ],
        },
      ],
    };

    const result = await validator.payload().spa(data);

    expect(result).toStrictEqual<SafeParseError<unknown>>({
      success: false,

      error: expect.objectContaining(partial<ZodError<unknown>>({
        name: 'ZodError',

        issues: [
          expect.objectContaining({
            code: 'invalid_enum_value',
            received: 'test:invalid-option',
            options: [
              'facade_finishes:facing_brickwork',
              'facade_finishes:brick_slip_adhesive',
              'facade_finishes:brick_slip_mechanical',
              'facade_finishes:fibre_cement_cladding',
              'facade_finishes:timber_panel_cladding',
              'facade_finishes:metal_panel_cladding_profiled',
              'facade_finishes:metal_panel_cladding_flat',
              'finish_level:low',
              'finish_level:medium',
              'finish_level:high',
              'building_height:below_8_storeys',
              'building_height:mid_rise_8_to_12_storeys',
              'building_height:mid_rise_13_storeys_plus',
            ],
            path: ['buildings', 0, 'options', 0],
          } satisfies Partial<ZodIssue>),
        ],
      })),
    });
  });

  it('with data, parses, validated', async (): Promise<void> => {
    const data: PostProjectCostingCalculationResource.Payload = {
      scenario: {
        [ScenarioData.ScenarioArea]: 1,
        [ScenarioData.ScenarioAreaNet]: 2,
        [ScenarioData.ScenarioPerimeter]: 3,

        [ScenarioData.NumberOfBuildings]: 4,
      },

      buildings: [
        {
          data: {
            [BuildingData.AmenityLocationsArea]: 1,
            [BuildingData.AmenityLocationsPerimeter]: 2,
            [BuildingData.AmenityLocationsWallArea]: 3,
            [BuildingData.CommercialLocationsArea]: 4,
            [BuildingData.CommercialLocationsPerimeter]: 5,
            [BuildingData.CommercialLocationsWallArea]: 6,
            [BuildingData.CoreAndCorridorArea]: 7,
            [BuildingData.CoreAndCorridorAreaGroundFloor]: 8,
            [BuildingData.CoreAndCorridorPerimeterGroundFloor]: 9,
            [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: 10,
            [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: 11,
            [BuildingData.CoreArea]: 12,
            [BuildingData.CorePerimeter]: 13,
            [BuildingData.CoreWallArea]: 14,
            [BuildingData.CorridorArea]: 15,
            [BuildingData.CorridorPerimeter]: 16,
            [BuildingData.CorridorWallArea]: 17,
            [BuildingData.ExternalWallPerimeter]: 18,
            [BuildingData.FacadeArea]: 19,
            [BuildingData.FacadeExternalCornerTotalLengthQuantity]: 20,
            [BuildingData.FacadeInternalCornerTotalLengthQuantity]: 21,
            [BuildingData.FootprintArea]: 22,
            [BuildingData.Gia]: 23,
            [BuildingData.GlazedFacadeArea]: 24,
            [BuildingData.Nia]: 25,
            [BuildingData.ResidentialGlazedFacadeArea]: 26,
            [BuildingData.ResidentialFacadeArea]: 27,
            [BuildingData.ResidentialFacadeAreaNet]: 28,
            [BuildingData.RoofArea]: 29,
            [BuildingData.RoofPerimeter]: 30,
            [BuildingData.RoofFacadeArea]: 31,
            [BuildingData.RoofFacadeAreaNet]: 32,
            [BuildingData.PodiumGlazedFacadeArea]: 33,
            [BuildingData.PodiumFacadeArea]: 34,
            [BuildingData.PodiumFacadeAreaNet]: 35,
            [BuildingData.ServiceLocationsArea]: 36,
            [BuildingData.ServiceLocationsPerimeter]: 37,
            [BuildingData.ServiceLocationsWallArea]: 38,

            [BuildingData.SubstructureConcreteWeight]: 38.1,
            [BuildingData.SubstructureSteelRebarWeight]: 38.2,

            [BuildingData.NumberOfEntrances]: 39,
            [BuildingData.NumberOfUnits]: 40,
            [BuildingData.NumberOfModules]: 41,

            [BuildingData.NumberOfModuleDoubleDoors]: 42,
            [BuildingData.NumberOfModuleSingleDoors]: 43,
            [BuildingData.NumberOfSingleDoors]: 44,
            [BuildingData.NumberOfDoubleDoors]: 45,
            [BuildingData.NumberOfMiscDoors]: 46,
            [BuildingData.NumberOfEntryExitDoors]: 47,

            [BuildingData.NumberOfLevels]: 48,
            [BuildingData.NumberOfLiftLevels]: 49,
            [BuildingData.NumberOfFlightsOfStairs]: 50,

            [BuildingData.NumberOfCores]: 51,
            [BuildingData.NumberOfCoreTypeFireFighting]: 52,
            [BuildingData.NumberOfCoreTypeLift]: 53,
          },

          units: [
            { unit: 'A', quantity: 1 },
            { unit: 'B', quantity: 2 },
            { unit: 'C', quantity: 3 },
            { unit: 'D', quantity: 4 },
            { unit: 'E', quantity: 5 },
            { unit: 'F', quantity: 6 },
          ],

          options: [
            BuildingOption.FacadeFinishesFacingBrickwork,
            BuildingOption.FinishLevelHigh,
            BuildingOption.BuildingHeightBelow8Storeys,
          ],
        },
      ],
    };

    const result = await validator.payload().spa(data);

    expect(result).toStrictEqual<SafeParseSuccess<PostProjectCostingCalculationResource.Payload>>({
      success: true,

      data: {
        scenario: {
          [ScenarioData.ScenarioArea]: 1,
          [ScenarioData.ScenarioAreaNet]: 2,
          [ScenarioData.ScenarioPerimeter]: 3,

          [ScenarioData.NumberOfBuildings]: 4,
        },

        buildings: [
          {
            data: {
              [BuildingData.AmenityLocationsArea]: 1,
              [BuildingData.AmenityLocationsPerimeter]: 2,
              [BuildingData.AmenityLocationsWallArea]: 3,
              [BuildingData.CommercialLocationsArea]: 4,
              [BuildingData.CommercialLocationsPerimeter]: 5,
              [BuildingData.CommercialLocationsWallArea]: 6,
              [BuildingData.CoreAndCorridorArea]: 7,
              [BuildingData.CoreAndCorridorAreaGroundFloor]: 8,
              [BuildingData.CoreAndCorridorPerimeterGroundFloor]: 9,
              [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: 10,
              [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: 11,
              [BuildingData.CoreArea]: 12,
              [BuildingData.CorePerimeter]: 13,
              [BuildingData.CoreWallArea]: 14,
              [BuildingData.CorridorArea]: 15,
              [BuildingData.CorridorPerimeter]: 16,
              [BuildingData.CorridorWallArea]: 17,
              [BuildingData.ExternalWallPerimeter]: 18,
              [BuildingData.FacadeArea]: 19,
              [BuildingData.FacadeExternalCornerTotalLengthQuantity]: 20,
              [BuildingData.FacadeInternalCornerTotalLengthQuantity]: 21,
              [BuildingData.FootprintArea]: 22,
              [BuildingData.Gia]: 23,
              [BuildingData.GlazedFacadeArea]: 24,
              [BuildingData.Nia]: 25,
              [BuildingData.ResidentialGlazedFacadeArea]: 26,
              [BuildingData.ResidentialFacadeArea]: 27,
              [BuildingData.ResidentialFacadeAreaNet]: 28,
              [BuildingData.RoofArea]: 29,
              [BuildingData.RoofPerimeter]: 30,
              [BuildingData.RoofFacadeArea]: 31,
              [BuildingData.RoofFacadeAreaNet]: 32,
              [BuildingData.PodiumGlazedFacadeArea]: 33,
              [BuildingData.PodiumFacadeArea]: 34,
              [BuildingData.PodiumFacadeAreaNet]: 35,
              [BuildingData.ServiceLocationsArea]: 36,
              [BuildingData.ServiceLocationsPerimeter]: 37,
              [BuildingData.ServiceLocationsWallArea]: 38,

              [BuildingData.SubstructureConcreteWeight]: 38.1,
              [BuildingData.SubstructureSteelRebarWeight]: 38.2,

              [BuildingData.NumberOfEntrances]: 39,
              [BuildingData.NumberOfUnits]: 40,
              [BuildingData.NumberOfModules]: 41,

              [BuildingData.NumberOfModuleDoubleDoors]: 42,
              [BuildingData.NumberOfModuleSingleDoors]: 43,
              [BuildingData.NumberOfSingleDoors]: 44,
              [BuildingData.NumberOfDoubleDoors]: 45,
              [BuildingData.NumberOfMiscDoors]: 46,
              [BuildingData.NumberOfEntryExitDoors]: 47,

              [BuildingData.NumberOfLevels]: 48,
              [BuildingData.NumberOfLiftLevels]: 49,
              [BuildingData.NumberOfFlightsOfStairs]: 50,

              [BuildingData.NumberOfCores]: 51,
              [BuildingData.NumberOfCoreTypeFireFighting]: 52,
              [BuildingData.NumberOfCoreTypeLift]: 53,
            },

            units: [
              { unit: 'A', quantity: 1 },
              { unit: 'B', quantity: 2 },
              { unit: 'C', quantity: 3 },
              { unit: 'D', quantity: 4 },
              { unit: 'E', quantity: 5 },
              { unit: 'F', quantity: 6 },
            ],

            options: [
              BuildingOption.FacadeFinishesFacingBrickwork,
              BuildingOption.FinishLevelHigh,
              BuildingOption.BuildingHeightBelow8Storeys,
            ],
          },
        ],
      },
    });
  });
});
