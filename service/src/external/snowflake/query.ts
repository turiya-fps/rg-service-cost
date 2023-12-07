import * as quote from '@project-rouge/service-core/database/syntax/quote';
import type { BuildingDataMapping, ScenarioDataMapping, UnitCategoryMix } from '@project-rouge/service-cost-client/src/data/building';
import { BuildingData, ScenarioData } from '@project-rouge/service-cost-client/src/data/building';

export const comment = (message: string): string => {
  return `/* ${message} */`;
};

export const commentForValue = (label: string, value: string | number): string => {
  return `(${comment(label)} ${value})`;
};

type TemplateStringFunction = (fragments: TemplateStringsArray, ...params: string[]) => string;

export const sql: TemplateStringFunction = (fragments, ...parameters): string => {
  const parts: string[] = [];

  for (const index in fragments) {
    const fragment = fragments[index];
    const parameter = parameters[index];

    parts.push(fragment);

    if (parameter !== undefined) {
      parts.push(parameter);
    }
  }

  return parts.join('').trim();
};

export type QueryComposition = {
  readonly label: string;
  readonly pipeline: string;
  readonly selection: string;
};

export const compose = (composition: QueryComposition): string => {
  return sql`
WITH ${comment(composition.label)}
${composition.pipeline}

${composition.selection}
`;
};

export const withQueryFragment = (table: string, statement: string): string => {
  return sql`
${table} AS (
${statement}
)
`;
};

export const createUnitMixQueryFragment = (unitmix: UnitCategoryMix): string => {
  const items = unitmix.map((mix) => {
    return `('${mix.unit}', ${mix.quantity})`;
  });

  return sql`
SELECT
  x.unit_label
, x.unit_quantity
FROM
  (
    VALUES
    ${items.join('\n,   ')}
  ) AS x (unit_label, unit_quantity)
  `;
};

export type QueryDataMapping = (
  & ScenarioDataMapping
  & BuildingDataMapping
);

export const createQueryDataMappingQueryFragment = (data: QueryDataMapping): string => {
  return sql`
SELECT
  x.key
, x.value
FROM
  (
    VALUES
    ${comment(':: scenario')}
    (${commentForValue('ScenarioData.ScenarioArea', quote.single(ScenarioData.ScenarioArea))}, ${data[ScenarioData.ScenarioArea].toString()})
  , (${commentForValue('ScenarioData.ScenarioAreaNet', quote.single(ScenarioData.ScenarioAreaNet))}, ${data[ScenarioData.ScenarioAreaNet].toString()})
  , (${commentForValue('ScenarioData.ScenarioPerimeter', quote.single(ScenarioData.ScenarioPerimeter))}, ${data[ScenarioData.ScenarioPerimeter].toString()})

  , (${commentForValue('ScenarioData.NumberOfBuildings', quote.single(ScenarioData.NumberOfBuildings))}, ${data[ScenarioData.NumberOfBuildings].toString()})

    ${comment(':: building')}
  , (${commentForValue('BuildingData.AmenityLocationsArea', quote.single(BuildingData.AmenityLocationsArea))}, ${data[BuildingData.AmenityLocationsArea].toString()})
  , (${commentForValue('BuildingData.AmenityLocationsPerimeter', quote.single(BuildingData.AmenityLocationsPerimeter))}, ${data[BuildingData.AmenityLocationsPerimeter].toString()})
  , (${commentForValue('BuildingData.AmenityLocationsWallArea', quote.single(BuildingData.AmenityLocationsWallArea))}, ${data[BuildingData.AmenityLocationsWallArea].toString()})
  , (${commentForValue('BuildingData.CommercialLocationsArea', quote.single(BuildingData.CommercialLocationsArea))}, ${data[BuildingData.CommercialLocationsArea].toString()})
  , (${commentForValue('BuildingData.CommercialLocationsPerimeter', quote.single(BuildingData.CommercialLocationsPerimeter))}, ${data[BuildingData.CommercialLocationsPerimeter].toString()})
  , (${commentForValue('BuildingData.CommercialLocationsWallArea', quote.single(BuildingData.CommercialLocationsWallArea))}, ${data[BuildingData.CommercialLocationsWallArea].toString()})
  , (${commentForValue('BuildingData.CoreAndCorridorArea', quote.single(BuildingData.CoreAndCorridorArea))}, ${data[BuildingData.CoreAndCorridorArea].toString()})
  , (${commentForValue('BuildingData.CoreAndCorridorAreaGroundFloor', quote.single(BuildingData.CoreAndCorridorAreaGroundFloor))}, ${data[BuildingData.CoreAndCorridorAreaGroundFloor].toString()})
  , (${commentForValue('BuildingData.CoreAndCorridorPerimeterGroundFloor', quote.single(BuildingData.CoreAndCorridorPerimeterGroundFloor))}, ${data[BuildingData.CoreAndCorridorPerimeterGroundFloor].toString()})
  , (${commentForValue('BuildingData.CoreAndCorridorAreaGroundFloorAbove', quote.single(BuildingData.CoreAndCorridorAreaGroundFloorAbove))}, ${data[BuildingData.CoreAndCorridorAreaGroundFloorAbove].toString()})
  , (${commentForValue('BuildingData.CoreAndCorridorPerimeterGroundFloorAbove', quote.single(BuildingData.CoreAndCorridorPerimeterGroundFloorAbove))}, ${data[BuildingData.CoreAndCorridorPerimeterGroundFloorAbove].toString()})
  , (${commentForValue('BuildingData.CoreArea', quote.single(BuildingData.CoreArea))}, ${data[BuildingData.CoreArea].toString()})
  , (${commentForValue('BuildingData.CorePerimeter', quote.single(BuildingData.CorePerimeter))}, ${data[BuildingData.CorePerimeter].toString()})
  , (${commentForValue('BuildingData.CoreWallArea', quote.single(BuildingData.CoreWallArea))}, ${data[BuildingData.CoreWallArea].toString()})
  , (${commentForValue('BuildingData.CorridorArea', quote.single(BuildingData.CorridorArea))}, ${data[BuildingData.CorridorArea].toString()})
  , (${commentForValue('BuildingData.CorridorPerimeter', quote.single(BuildingData.CorridorPerimeter))}, ${data[BuildingData.CorridorPerimeter].toString()})
  , (${commentForValue('BuildingData.CorridorWallArea', quote.single(BuildingData.CorridorWallArea))}, ${data[BuildingData.CorridorWallArea].toString()})
  , (${commentForValue('BuildingData.ExternalWallPerimeter', quote.single(BuildingData.ExternalWallPerimeter))}, ${data[BuildingData.ExternalWallPerimeter].toString()})
  , (${commentForValue('BuildingData.FacadeArea', quote.single(BuildingData.FacadeArea))}, ${data[BuildingData.FacadeArea].toString()})
  , (${commentForValue('BuildingData.FacadeExternalCornerTotalLengthQuantity', quote.single(BuildingData.FacadeExternalCornerTotalLengthQuantity))}, ${data[BuildingData.FacadeExternalCornerTotalLengthQuantity].toString()})
  , (${commentForValue('BuildingData.FacadeInternalCornerTotalLengthQuantity', quote.single(BuildingData.FacadeInternalCornerTotalLengthQuantity))}, ${data[BuildingData.FacadeInternalCornerTotalLengthQuantity].toString()})
  , (${commentForValue('BuildingData.FootprintArea', quote.single(BuildingData.FootprintArea))}, ${data[BuildingData.FootprintArea].toString()})
  , (${commentForValue('BuildingData.Gia', quote.single(BuildingData.Gia))}, ${data[BuildingData.Gia].toString()})
  , (${commentForValue('BuildingData.GlazedFacadeArea', quote.single(BuildingData.GlazedFacadeArea))}, ${data[BuildingData.GlazedFacadeArea].toString()})
  , (${commentForValue('BuildingData.Nia', quote.single(BuildingData.Nia))}, ${data[BuildingData.Nia].toString()})
  , (${commentForValue('BuildingData.ResidentialGlazedFacadeArea', quote.single(BuildingData.ResidentialGlazedFacadeArea))}, ${data[BuildingData.ResidentialGlazedFacadeArea].toString()})
  , (${commentForValue('BuildingData.ResidentialFacadeArea', quote.single(BuildingData.ResidentialFacadeArea))}, ${data[BuildingData.ResidentialFacadeArea].toString()})
  , (${commentForValue('BuildingData.ResidentialFacadeAreaNet', quote.single(BuildingData.ResidentialFacadeAreaNet))}, ${data[BuildingData.ResidentialFacadeAreaNet].toString()})
  , (${commentForValue('BuildingData.RoofArea', quote.single(BuildingData.RoofArea))}, ${data[BuildingData.RoofArea].toString()})
  , (${commentForValue('BuildingData.RoofPerimeter', quote.single(BuildingData.RoofPerimeter))}, ${data[BuildingData.RoofPerimeter].toString()})
  , (${commentForValue('BuildingData.RoofFacadeArea', quote.single(BuildingData.RoofFacadeArea))}, ${data[BuildingData.RoofFacadeArea].toString()})
  , (${commentForValue('BuildingData.RoofFacadeAreaNet', quote.single(BuildingData.RoofFacadeAreaNet))}, ${data[BuildingData.RoofFacadeAreaNet].toString()})
  , (${commentForValue('BuildingData.PodiumGlazedFacadeArea', quote.single(BuildingData.PodiumGlazedFacadeArea))}, ${data[BuildingData.PodiumGlazedFacadeArea].toString()})
  , (${commentForValue('BuildingData.PodiumFacadeArea', quote.single(BuildingData.PodiumFacadeArea))}, ${data[BuildingData.PodiumFacadeArea].toString()})
  , (${commentForValue('BuildingData.PodiumFacadeAreaNet', quote.single(BuildingData.PodiumFacadeAreaNet))}, ${data[BuildingData.PodiumFacadeAreaNet].toString()})
  , (${commentForValue('BuildingData.ServiceLocationsArea', quote.single(BuildingData.ServiceLocationsArea))}, ${data[BuildingData.ServiceLocationsArea].toString()})
  , (${commentForValue('BuildingData.ServiceLocationsPerimeter', quote.single(BuildingData.ServiceLocationsPerimeter))}, ${data[BuildingData.ServiceLocationsPerimeter].toString()})
  , (${commentForValue('BuildingData.ServiceLocationsWallArea', quote.single(BuildingData.ServiceLocationsWallArea))}, ${data[BuildingData.ServiceLocationsWallArea].toString()})

  , (${commentForValue('BuildingData.SubstructureConcreteWeight', quote.single(BuildingData.SubstructureConcreteWeight))}, ${data[BuildingData.SubstructureConcreteWeight].toString()})
  , (${commentForValue('BuildingData.SubstructureSteelRebarWeight', quote.single(BuildingData.SubstructureSteelRebarWeight))}, ${data[BuildingData.SubstructureSteelRebarWeight].toString()})

  , (${commentForValue('BuildingData.NumberOfEntrances', quote.single(BuildingData.NumberOfEntrances))}, ${data[BuildingData.NumberOfEntrances].toString()})
  , (${commentForValue('BuildingData.NumberOfUnits', quote.single(BuildingData.NumberOfUnits))}, ${data[BuildingData.NumberOfUnits].toString()})
  , (${commentForValue('BuildingData.NumberOfModules', quote.single(BuildingData.NumberOfModules))}, ${data[BuildingData.NumberOfModules].toString()})

  , (${commentForValue('BuildingData.NumberOfModuleDoubleDoors', quote.single(BuildingData.NumberOfModuleDoubleDoors))}, ${data[BuildingData.NumberOfModuleDoubleDoors].toString()})
  , (${commentForValue('BuildingData.NumberOfModuleSingleDoors', quote.single(BuildingData.NumberOfModuleSingleDoors))}, ${data[BuildingData.NumberOfModuleSingleDoors].toString()})
  , (${commentForValue('BuildingData.NumberOfSingleDoors', quote.single(BuildingData.NumberOfSingleDoors))}, ${data[BuildingData.NumberOfSingleDoors].toString()})
  , (${commentForValue('BuildingData.NumberOfDoubleDoors', quote.single(BuildingData.NumberOfDoubleDoors))}, ${data[BuildingData.NumberOfDoubleDoors].toString()})
  , (${commentForValue('BuildingData.NumberOfMiscDoors', quote.single(BuildingData.NumberOfMiscDoors))}, ${data[BuildingData.NumberOfMiscDoors].toString()})
  , (${commentForValue('BuildingData.NumberOfEntryExitDoors', quote.single(BuildingData.NumberOfEntryExitDoors))}, ${data[BuildingData.NumberOfEntryExitDoors].toString()})

  , (${commentForValue('BuildingData.NumberOfLevels', quote.single(BuildingData.NumberOfLevels))}, ${data[BuildingData.NumberOfLevels].toString()})
  , (${commentForValue('BuildingData.NumberOfLiftLevels', quote.single(BuildingData.NumberOfLiftLevels))}, ${data[BuildingData.NumberOfLiftLevels].toString()})
  , (${commentForValue('BuildingData.NumberOfFlightsOfStairs', quote.single(BuildingData.NumberOfFlightsOfStairs))}, ${data[BuildingData.NumberOfFlightsOfStairs].toString()})

  , (${commentForValue('BuildingData.NumberOfCores', quote.single(BuildingData.NumberOfCores))}, ${data[BuildingData.NumberOfCores].toString()})
  , (${commentForValue('BuildingData.NumberOfCoreTypeFireFighting', quote.single(BuildingData.NumberOfCoreTypeFireFighting))}, ${data[BuildingData.NumberOfCoreTypeFireFighting].toString()})
  , (${commentForValue('BuildingData.NumberOfCoreTypeLift', quote.single(BuildingData.NumberOfCoreTypeLift))}, ${data[BuildingData.NumberOfCoreTypeLift].toString()})
  ) x (key, value)
`;
};

/**
 * Converts a string[] input to `$${"a", "b", "c"}$$` array expression compatible with ANY keyword
 */
export const toPostgresAnyArray = (array: string[]): string => {
  return `$\${${array.map(quote.double).join(', ')}}$$`;
};
