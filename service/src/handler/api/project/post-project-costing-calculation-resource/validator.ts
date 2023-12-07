import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { BuildingConfiguration, BuildingDataMapping, ScenarioDataMapping, UnitCategoryWithQuantity } from '@project-rouge/service-cost-client/src/data/building';
import { BuildingData, BuildingOption, ScenarioData } from '@project-rouge/service-cost-client/src/data/building';
import type { PostProjectCostingCalculationResource } from '@project-rouge/service-cost-client/src/endpoint/project/post-project-costing-calculation-resource';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

/**
 * Endpoint request path parameter validation.
 */
export const path = (): ZodSchema => {
  return z.object<ToZodSchema<PostProjectCostingCalculationResource.Path>>({
    projectId: z.string().uuid(),
  });
};

/**
 * Endpoint request payload validation.
 */
export const payload = (): ZodSchema => {
  return z.object<ToZodSchema<PostProjectCostingCalculationResource.Payload>>({
    scenario: z.object<ToZodSchema<ScenarioDataMapping>>({
      [ScenarioData.ScenarioArea]: z.number(),
      [ScenarioData.ScenarioAreaNet]: z.number(),
      [ScenarioData.ScenarioPerimeter]: z.number(),

      [ScenarioData.NumberOfBuildings]: z.number(),
    }),

    buildings: z.object<ToZodSchema<BuildingConfiguration>>({
      data: z.object<ToZodSchema<BuildingDataMapping>>({
        [BuildingData.AmenityLocationsArea]: z.number(),
        [BuildingData.AmenityLocationsPerimeter]: z.number(),
        [BuildingData.AmenityLocationsWallArea]: z.number(),
        [BuildingData.CommercialLocationsArea]: z.number(),
        [BuildingData.CommercialLocationsPerimeter]: z.number(),
        [BuildingData.CommercialLocationsWallArea]: z.number(),
        [BuildingData.CoreAndCorridorArea]: z.number(),
        [BuildingData.CoreAndCorridorAreaGroundFloor]: z.number(),
        [BuildingData.CoreAndCorridorPerimeterGroundFloor]: z.number(),
        [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: z.number(),
        [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: z.number(),
        [BuildingData.CoreArea]: z.number(),
        [BuildingData.CorePerimeter]: z.number(),
        [BuildingData.CoreWallArea]: z.number(),
        [BuildingData.CorridorArea]: z.number(),
        [BuildingData.CorridorPerimeter]: z.number(),
        [BuildingData.CorridorWallArea]: z.number(),
        [BuildingData.ExternalWallPerimeter]: z.number(),
        [BuildingData.FacadeArea]: z.number(),
        [BuildingData.FacadeExternalCornerTotalLengthQuantity]: z.number(),
        [BuildingData.FacadeInternalCornerTotalLengthQuantity]: z.number(),
        [BuildingData.FootprintArea]: z.number(),
        [BuildingData.Gia]: z.number(),
        [BuildingData.GlazedFacadeArea]: z.number(),
        [BuildingData.Nia]: z.number(),
        [BuildingData.ResidentialGlazedFacadeArea]: z.number(),
        [BuildingData.ResidentialFacadeArea]: z.number(),
        [BuildingData.ResidentialFacadeAreaNet]: z.number(),
        [BuildingData.RoofArea]: z.number(),
        [BuildingData.RoofPerimeter]: z.number(),
        [BuildingData.RoofFacadeArea]: z.number(),
        [BuildingData.RoofFacadeAreaNet]: z.number(),
        [BuildingData.PodiumGlazedFacadeArea]: z.number(),
        [BuildingData.PodiumFacadeArea]: z.number(),
        [BuildingData.PodiumFacadeAreaNet]: z.number(),
        [BuildingData.ServiceLocationsArea]: z.number(),
        [BuildingData.ServiceLocationsPerimeter]: z.number(),
        [BuildingData.ServiceLocationsWallArea]: z.number(),

        [BuildingData.SubstructureConcreteWeight]: z.number().optional(),
        [BuildingData.SubstructureSteelRebarWeight]: z.number().optional(),

        [BuildingData.NumberOfEntrances]: z.number(),
        [BuildingData.NumberOfUnits]: z.number(),
        [BuildingData.NumberOfModules]: z.number(),

        [BuildingData.NumberOfModuleDoubleDoors]: z.number(),
        [BuildingData.NumberOfModuleSingleDoors]: z.number(),
        [BuildingData.NumberOfSingleDoors]: z.number(),
        [BuildingData.NumberOfDoubleDoors]: z.number(),
        [BuildingData.NumberOfMiscDoors]: z.number(),
        [BuildingData.NumberOfEntryExitDoors]: z.number(),

        [BuildingData.NumberOfLevels]: z.number(),
        [BuildingData.NumberOfLiftLevels]: z.number(),
        [BuildingData.NumberOfFlightsOfStairs]: z.number(),

        [BuildingData.NumberOfCores]: z.number(),
        [BuildingData.NumberOfCoreTypeFireFighting]: z.number(),
        [BuildingData.NumberOfCoreTypeLift]: z.number(),
      }),

      units: z.object<ToZodSchema<UnitCategoryWithQuantity>>({
        unit: z.string().min(1),
        quantity: z.number().min(1),
      }).array().min(1),

      options: z.enum([
        BuildingOption.FacadeFinishesFacingBrickwork,
        BuildingOption.FacadeFinishesBrickSlipAdhesive,
        BuildingOption.FacadeFinishesBrickSlipMechanical,
        BuildingOption.FacadeFinishesFibreCementCladding,
        BuildingOption.FacadeFinishesTimberPanelCladding,
        BuildingOption.FacadeFinishesMetalPanelCladdingProfiled,
        BuildingOption.FacadeFinishesMetalPanelCladdingFlat,
        BuildingOption.FinishLevelLow,
        BuildingOption.FinishLevelMedium,
        BuildingOption.FinishLevelHigh,
        BuildingOption.BuildingHeightBelow8Storeys,
        BuildingOption.BuildingHeightMidRise8To12Storey,
        BuildingOption.BuildingHeightMidRise13StoreysPlus,
      ]).array().optional().transform((value) => {
        if (value === undefined) {
          return [];
        }
        return value;
      }),

    }).array().min(1),
  });
};
