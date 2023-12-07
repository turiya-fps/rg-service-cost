import { toPrecision } from '@project-rouge/service-core/data/number';
import { UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import { convertFeedItemUnitOfMeasurementToUnitOfMeasurement, FeedItemAssemblyOrGroup, FeedItemCostPlanSection, FeedItemUnitOfMeasurement } from '../data';
import type { FeedItem, FeedItemSanitised, QueryExecutor } from '../table';
import { createFeedItemValidationSchema, createFeedQueryExecutor, createSnowflakeIdentityValidationSchema, FeedTableName } from '../table';

/**
 * @example
 * {
 *  "assembly_or_group": "Internal Walls",
 *  "cost_plan_section": "05. Internal Walls",
 *  "element_name": "E/O for wall tiling - wc",
 *  "embodied_carbon_rate": 81.8,
 *  "index_group": "3",
 *  "index_group_item": "3.1",
 *  "option_group_and_value_ids": [
 *   "recCPHD4VGszCJwSs"
 *  ],
 *  "option_count": 1,
 *  "rate": 220,
 *  "related_elements_for_percent_items": null,
 *  "tall_building_rate": 220,
 *  "unit_of_measurement": "Number"
 * }
 */
export type ModuleElementReferenceFeedItemData = {
  readonly assembly_or_group: FeedItemAssemblyOrGroup;
  readonly cost_plan_section: FeedItemCostPlanSection;
  readonly element_name: string;
  readonly embodied_carbon_rate: number | null;
  readonly index_group: string;
  readonly index_group_item: string;
  readonly option_group_and_value_ids: string[] | null;
  readonly option_count: number;
  readonly rate: number;
  readonly tall_building_rate: number;
  readonly related_elements_for_percent_items: string[] | null;
  readonly unit_of_measurement: FeedItemUnitOfMeasurement;
};

export type ModuleElementReferenceFeedItemDataSanitised = {
  readonly assembly_or_group: FeedItemAssemblyOrGroup;
  readonly cost_plan_section: FeedItemCostPlanSection;
  readonly embodied_carbon_rate: number;
  readonly index_group: string;
  readonly index_group_item: string;
  readonly option_group_and_value_ids: string[] | undefined;
  readonly option_count: number;
  readonly rate: number;
  readonly rate_tall_building: number;
  readonly related_elements_for_percent_items: string[] | undefined;
  readonly unit_of_measurement: UnitOfMeasurement;
};

export type ModuleElementReferenceFeedItem = FeedItem<FeedTableName.ModuleElementReference, ModuleElementReferenceFeedItemData>;
export type ModuleElementReferenceFeedItemSanitised = FeedItemSanitised<FeedTableName.ModuleElementReference, ModuleElementReferenceFeedItemDataSanitised>;

const data = z.object({
  assembly_or_group: z.enum([
    FeedItemAssemblyOrGroup.Bathroom,
    FeedItemAssemblyOrGroup.Carpentry,
    FeedItemAssemblyOrGroup.CeilingCassette,
    FeedItemAssemblyOrGroup.CeilingFinish,
    FeedItemAssemblyOrGroup.CeilingPanel,
    FeedItemAssemblyOrGroup.CommsAndSecurity,
    FeedItemAssemblyOrGroup.DeploymentZipAndLink,
    FeedItemAssemblyOrGroup.Disposal,
    FeedItemAssemblyOrGroup.Electrical,
    FeedItemAssemblyOrGroup.ExternalWallPanel,
    FeedItemAssemblyOrGroup.FloorCassette,
    FeedItemAssemblyOrGroup.FloorFinish,
    FeedItemAssemblyOrGroup.FloorPanel,
    FeedItemAssemblyOrGroup.GlazedFinishes,
    FeedItemAssemblyOrGroup.Heating,
    FeedItemAssemblyOrGroup.InternalDoors,
    FeedItemAssemblyOrGroup.InternalWallPanel,
    FeedItemAssemblyOrGroup.InternalWalls,
    FeedItemAssemblyOrGroup.Kitchen,
    FeedItemAssemblyOrGroup.KittingAndLogistics,
    FeedItemAssemblyOrGroup.Laydown,
    FeedItemAssemblyOrGroup.MechanicalElectricalPlumbingDesign,
    FeedItemAssemblyOrGroup.MechanicalElectricalPlumbingManagement,
    FeedItemAssemblyOrGroup.MechanicalElectricalPlumbingTesting,
    FeedItemAssemblyOrGroup.OffSiteAssembly,
    FeedItemAssemblyOrGroup.PanelManufacture,
    FeedItemAssemblyOrGroup.PlasterboardCeiling,
    FeedItemAssemblyOrGroup.SupplyAndAgencyFee,
    FeedItemAssemblyOrGroup.Ventilation,
    FeedItemAssemblyOrGroup.Water,
  ]),

  cost_plan_section: z.enum([
    FeedItemCostPlanSection.CeilingFinish,
    FeedItemCostPlanSection.FixturesAndFittings,
    FeedItemCostPlanSection.FloorFinish,
    FeedItemCostPlanSection.InternalWalls,
    FeedItemCostPlanSection.InternalDoors,
    FeedItemCostPlanSection.MechanicalElectricalPlumbingAndHeating,
    FeedItemCostPlanSection.OffSite,
    FeedItemCostPlanSection.OnSite,
    FeedItemCostPlanSection.Sanitaryware,
  ]),

  element_name: z.string(),

  embodied_carbon_rate: z.number().nullable(),

  index_group: z.string().min(1),
  index_group_item: z.string().min(1),

  option_group_and_value_ids: z.array(
    createSnowflakeIdentityValidationSchema(),
  ).min(1).nullable(),

  option_count: z.number(),

  rate: z.number(),
  tall_building_rate: z.number(),

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
  ]),
});

export const createModuleElementReferenceFeedItemValidationSchema = (): ZodSchema => {
  return createFeedItemValidationSchema(FeedTableName.ModuleElementReference, data);
};

export const toModuleElementReferenceFeedItemSanitised = (feed: ModuleElementReferenceFeedItem): ModuleElementReferenceFeedItemSanitised | undefined => {
  let rate_cost = toPrecision(feed.data.rate, 4);
  let rate_cost_tall_building = toPrecision(feed.data.tall_building_rate, 4);
  let rate_carbon = toPrecision(feed.data.embodied_carbon_rate ?? 0, 4);

  const unitOfMeasurement = convertFeedItemUnitOfMeasurementToUnitOfMeasurement(feed.data.unit_of_measurement);

  if (unitOfMeasurement === undefined) {
    // eslint-disable-next-line no-console
    console.dir({
      action: 'sanitise:record',
      reason: 'unit_of_measurement',
      feed,
    }, { depth: null });

    return undefined;
  }

  // Percentages are represented as 0-100 values in AirTable for readability.
  // This will normalise them so we have them stored as expected.
  if (unitOfMeasurement === UnitOfMeasurement.Percentage) {
    rate_cost = toPrecision(rate_cost / 100, 2);
    rate_cost_tall_building = toPrecision(rate_cost_tall_building / 100, 2);
    rate_carbon = toPrecision(rate_carbon / 100, 2);
  }

  return {
    source_id: feed.source_id,
    source_table_name: feed.source_table_name,
    source_updated_at: feed.source_updated_at,

    data: {
      assembly_or_group: feed.data.assembly_or_group,
      cost_plan_section: feed.data.cost_plan_section,
      embodied_carbon_rate: rate_carbon,
      index_group: feed.data.index_group,
      index_group_item: feed.data.index_group_item,
      rate: rate_cost,
      rate_tall_building: rate_cost_tall_building,
      option_group_and_value_ids: feed.data.option_group_and_value_ids === null
        ? undefined
        : feed.data.option_group_and_value_ids,
      option_count: feed.data.option_count,
      unit_of_measurement: unitOfMeasurement,

      related_elements_for_percent_items: feed.data.related_elements_for_percent_items === null
        ? undefined
        : feed.data.related_elements_for_percent_items,
    },
  };
};

export const createModuleElementReferenceFeedItemQueryExecutor = (): QueryExecutor<ModuleElementReferenceFeedItem, ModuleElementReferenceFeedItemSanitised> => {
  const schema = createModuleElementReferenceFeedItemValidationSchema();

  return createFeedQueryExecutor(FeedTableName.ModuleElementReference, schema, toModuleElementReferenceFeedItemSanitised);
};
