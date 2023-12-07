import { toPrecision } from '@project-rouge/service-core/data/number';
import type { ToZodSchema } from '@project-rouge/service-core/validation/zod';
import type { BuildingData, ScenarioData } from '@project-rouge/service-cost-client/src/data/building';
import { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { BuildingHeightBreakpoint } from '../data';
import { FeedItemAreaOrQuantityType, FeedItemUnitOfMeasurement, convertFeedItemAreaOrQuantityTypeToBuildingData, convertFeedItemUnitOfMeasurementToUnitOfMeasurement, convertToBuildingHeightBreakpoints } from '../data';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { FeedTableName, createFeedItemValidationSchema, createFeedQueryExecutor, createSnowflakeIdentityValidationSchema } from '../table';

/**
 * @example
 * {
 *  "area_adjustment": null,
 *  "area_or_quantity_type": "None",
 *  "default_element": false,
 *  "default_element_13_storeys_plus": false,
 *  "default_element_8_12_storeys": false,
 *  "embodied_carbon_rate": null,
 *  "index_group": "2",
 *  "index_group_item": "2.2",
 *  "option_group_and_value_ids": [
 *    "recCPHD4VGszCJwSs"
 *  ],
 *  "option_count": 1,
 *  "rate": 0,
 *  "related_elements_for_percent_items": null,
 *  "unit_of_measurement": "Item"
 * }
 */
export type BaseBuildElementReferenceFeedItemData = {
  readonly area_adjustment: number | null;
  readonly area_or_quantity_type: FeedItemAreaOrQuantityType | null;
  readonly default_element: boolean;
  readonly default_element_8_12_storeys: boolean;
  readonly default_element_13_storeys_plus: boolean;
  readonly embodied_carbon_rate: number;
  readonly index_group: string;
  readonly index_group_item: string;
  readonly option_count: number;
  readonly option_group_and_value_ids: string[] | null;
  readonly rate: number;
  readonly related_elements_for_percent_items: string[] | null;
  readonly unit_of_measurement: FeedItemUnitOfMeasurement;
};

export type BaseBuildElementReferenceFeedItemDataSanitised = {
  readonly area_adjustment: number | null;
  readonly area_or_quantity_type: ScenarioData | BuildingData | null;
  readonly embodied_carbon_rate: number | null;
  readonly index_group: string;
  readonly index_group_item: string;
  readonly option_group_and_value_ids: string[] | undefined;
  readonly option_count: number;
  readonly rate: number;
  readonly related_elements_for_percent_items: string[] | undefined;
  readonly unit_of_measurement: UnitOfMeasurement;
  readonly building_height_breakpoints: BuildingHeightBreakpoint[];
};

export type BaseBuildElementReferenceFeedItem = FeedItem<FeedTableName.BaseBuildElementReference, BaseBuildElementReferenceFeedItemData>;
export type BaseBuildElementReferenceFeedItemSanitised = FeedItemSanitised<FeedTableName.BaseBuildElementReference, BaseBuildElementReferenceFeedItemDataSanitised>;

const data = z.object<ToZodSchema<BaseBuildElementReferenceFeedItemData>>({
  area_adjustment: z.number().nullable(),

  area_or_quantity_type: z.enum([
    FeedItemAreaOrQuantityType.AmenityLocationsArea,
    FeedItemAreaOrQuantityType.AmenityLocationsPerimeterWallLength,
    FeedItemAreaOrQuantityType.AmenityLocationsWallVerticalArea,
    FeedItemAreaOrQuantityType.Apartments,
    FeedItemAreaOrQuantityType.BuildingCount,
    FeedItemAreaOrQuantityType.BuildingFootprint,
    FeedItemAreaOrQuantityType.BuildingGia,
    FeedItemAreaOrQuantityType.BuildingNia,
    FeedItemAreaOrQuantityType.BuildingPerimeterTotalLength,
    FeedItemAreaOrQuantityType.CommercialLocationsArea,
    FeedItemAreaOrQuantityType.CommercialLocationsPerimeterWallLength,
    FeedItemAreaOrQuantityType.CommercialLocationsWallVerticalArea,
    FeedItemAreaOrQuantityType.CoreAndCorridorTotalArea,
    FeedItemAreaOrQuantityType.CoreAndCorridorAboveGroundFloorArea,
    FeedItemAreaOrQuantityType.CoreAndCorridorAboveGroundFloorPerimeterLength,
    FeedItemAreaOrQuantityType.CoreAndCorridorGroundFloorArea,
    FeedItemAreaOrQuantityType.CoreAndCorridorGroundFloorPerimeterLength,
    FeedItemAreaOrQuantityType.CoreLocationsArea,
    FeedItemAreaOrQuantityType.CoreLocationsPerimeterWallLength,
    FeedItemAreaOrQuantityType.CoreLocationsWallVerticalArea,
    FeedItemAreaOrQuantityType.CoreTypesFireFightingLifeCoreCount,
    FeedItemAreaOrQuantityType.CoreTypesLifeCoreCount,
    FeedItemAreaOrQuantityType.CoreTypesTotalCoreCount,
    FeedItemAreaOrQuantityType.CorridorLocationsArea,
    FeedItemAreaOrQuantityType.CorridorLocationsPerimeterWallLength,
    FeedItemAreaOrQuantityType.CorridorLocationsWallVerticalArea,
    FeedItemAreaOrQuantityType.Crossovers,
    FeedItemAreaOrQuantityType.DoubleDoors,
    FeedItemAreaOrQuantityType.Entrances,
    FeedItemAreaOrQuantityType.EntryExitDoorsCount,
    FeedItemAreaOrQuantityType.Facade,
    FeedItemAreaOrQuantityType.FacadeExternalCornerTotalLengthQuantity,
    FeedItemAreaOrQuantityType.FacadeInternalCornerTotalLengthQuantity,
    FeedItemAreaOrQuantityType.Houses,
    FeedItemAreaOrQuantityType.FlightsOfStairs,
    FeedItemAreaOrQuantityType.GlazedArea,
    FeedItemAreaOrQuantityType.GlazedFacade,
    FeedItemAreaOrQuantityType.InternalWallArea,
    FeedItemAreaOrQuantityType.LiftLevels,
    FeedItemAreaOrQuantityType.MiscDoors,
    FeedItemAreaOrQuantityType.None,
    FeedItemAreaOrQuantityType.ModulesQuantity,
    FeedItemAreaOrQuantityType.ModuleDoubleDoorsQuantity,
    FeedItemAreaOrQuantityType.ModuleSingleDoorsQuantity,
    FeedItemAreaOrQuantityType.Percent,
    FeedItemAreaOrQuantityType.PodiumGlazedFacadeArea,
    FeedItemAreaOrQuantityType.PodiumGrossFacadeArea,
    FeedItemAreaOrQuantityType.PodiumNetFacadeArea,
    FeedItemAreaOrQuantityType.ResidentialGlazedFacadeArea,
    FeedItemAreaOrQuantityType.ResidentialGrossFacadeArea,
    FeedItemAreaOrQuantityType.ResidentialNetFacadeArea,
    FeedItemAreaOrQuantityType.Roof,
    FeedItemAreaOrQuantityType.RoofGrossFacadeArea,
    FeedItemAreaOrQuantityType.RoofNetFacadeArea,
    FeedItemAreaOrQuantityType.RoofPerimeter,
    FeedItemAreaOrQuantityType.ServiceLocationsArea,
    FeedItemAreaOrQuantityType.ServiceLocationsPerimeterWallLength,
    FeedItemAreaOrQuantityType.ServiceLocationsWallVerticalArea,
    FeedItemAreaOrQuantityType.SingleDoors,
    FeedItemAreaOrQuantityType.SiteAreaNet,
    FeedItemAreaOrQuantityType.SiteAreaTotal,
    FeedItemAreaOrQuantityType.SitePerimeter,
    FeedItemAreaOrQuantityType.SubstructureConcreteWeight,
    FeedItemAreaOrQuantityType.SubstructureSteelRebarWeight,
    FeedItemAreaOrQuantityType.TotalWallArea,
    FeedItemAreaOrQuantityType.TotalWallPerimeter,
    FeedItemAreaOrQuantityType.WallPainting,
  ]).nullable(),

  default_element: z.boolean(),
  default_element_8_12_storeys: z.boolean(),
  default_element_13_storeys_plus: z.boolean(),

  embodied_carbon_rate: z.number().nullable(),

  index_group: z.string().min(1),
  index_group_item: z.string().min(1),

  option_group_and_value_ids: z.array(
    createSnowflakeIdentityValidationSchema(),
  ).min(1).nullable(),

  option_count: z.number(),

  rate: z.number(),

  related_elements_for_percent_items: z.array(
    createSnowflakeIdentityValidationSchema(),
  ).min(1).nullable(),

  unit_of_measurement: z.enum([
    FeedItemUnitOfMeasurement.CubicMetre,
    FeedItemUnitOfMeasurement.LinearMetre,
    FeedItemUnitOfMeasurement.SquareMetre,
    FeedItemUnitOfMeasurement.Item,
    FeedItemUnitOfMeasurement.Number,
    FeedItemUnitOfMeasurement.Percent,
    FeedItemUnitOfMeasurement.Tonnes,
    FeedItemUnitOfMeasurement.Kilogrammes,
  ]),
});

export const createBaseBuildElementReferenceFeedItemValidationSchema = (): ZodSchema => {
  return createFeedItemValidationSchema(FeedTableName.BaseBuildElementReference, data);
};

export const toBaseBuildElementReferenceFeedItemSanitised = (feed: BaseBuildElementReferenceFeedItem): BaseBuildElementReferenceFeedItemSanitised | undefined => {
  let rate_cost = toPrecision(feed.data.rate, 4);
  let rate_carbon = toPrecision(feed.data.embodied_carbon_rate, 4);

  // We are ignoring all records with no default checks.
  if (feed.data.default_element === false && feed.data.default_element_8_12_storeys === false && feed.data.default_element_13_storeys_plus === false) {
    return undefined;
  }

  // We ignore cases where this is null, this means data was input wrong in AirTable.
  // In theory this record will be fixed and be present in the feed again in a fixed state.
  if (feed.data.area_or_quantity_type === null) {
    // eslint-disable-next-line no-console
    console.dir({
      action: 'sanitise:record',
      reason: 'area_or_quantity_type:null',
      feed,
    }, { depth: null });

    return undefined;
  }

  // We have two places where percentage can be marked, and the area or quantity type should always be null really.
  // But in this case, if the record is not both marked as percentage we can error here.
  if (feed.data.area_or_quantity_type === FeedItemAreaOrQuantityType.Percent && feed.data.unit_of_measurement !== FeedItemUnitOfMeasurement.Percent) {
    // eslint-disable-next-line no-console
    console.dir({
      action: 'sanitise:record',
      reason: 'area_or_quantity_type:invalid-percentage',
      feed,
    }, { depth: null });

    return undefined;
  }

  const buildingDataTarget = convertFeedItemAreaOrQuantityTypeToBuildingData(feed.data.area_or_quantity_type);
  const buildingHeightBreakpoints = convertToBuildingHeightBreakpoints(feed.data);
  const unitOfMeasurement = convertFeedItemUnitOfMeasurementToUnitOfMeasurement(feed.data.unit_of_measurement);

  if (buildingDataTarget === undefined) {
    // eslint-disable-next-line no-console
    console.dir({
      action: 'sanitise:record',
      reason: 'building_data_target:cannot-convert',
      feed,
    }, { depth: null });

    return undefined;
  }

  if (buildingHeightBreakpoints.length === 0) {
    // eslint-disable-next-line no-console
    console.dir({
      action: 'sanitise:record',
      reason: 'building_height_breakpoint:cannot-convert',
      feed,
    }, { depth: null });

    return undefined;
  }

  if (unitOfMeasurement === undefined) {
    // eslint-disable-next-line no-console
    console.dir({
      action: 'sanitise:record',
      reason: 'unit_of_measurement:cannot-convert',
      feed,
    }, { depth: null });

    return undefined;
  }

  // Percentages are represented as 0-100 values in AirTable for readability.
  // This will normalise them so we have them stored as expected.
  if (unitOfMeasurement === UnitOfMeasurement.Percentage) {
    rate_cost = toPrecision(rate_cost / 100, 2);
    rate_carbon = toPrecision(rate_carbon / 100, 2);
  }

  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      area_adjustment: feed.data.area_adjustment,
      area_or_quantity_type: buildingDataTarget,
      embodied_carbon_rate: rate_carbon,
      index_group: feed.data.index_group,
      index_group_item: feed.data.index_group_item,
      option_group_and_value_ids: feed.data.option_group_and_value_ids === null
        ? undefined
        : feed.data.option_group_and_value_ids,
      option_count: feed.data.option_count,

      rate: rate_cost,
      unit_of_measurement: unitOfMeasurement,

      related_elements_for_percent_items: feed.data.related_elements_for_percent_items === null
        ? undefined
        : feed.data.related_elements_for_percent_items,

      building_height_breakpoints: buildingHeightBreakpoints,
    },
  };
};

export const createBaseBuildElementReferenceFeedItemQueryExecutor = (): QueryExecutor<BaseBuildElementReferenceFeedItem, BaseBuildElementReferenceFeedItemSanitised> => {
  const schema = createBaseBuildElementReferenceFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.BaseBuildElementReference, schema, toBaseBuildElementReferenceFeedItemSanitised);
};
