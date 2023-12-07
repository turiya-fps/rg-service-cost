import type { SquareMeter } from '@project-rouge/service-core/data/area';
import type { Meter } from '@project-rouge/service-core/data/length';

/**
 * A mapping of unit categories against their quantity.
 */
export type UnitCategoryWithQuantity = {
  /**
   * The internal identifier for the unit category.
   */
  readonly unit: string;

  /**
   * The number of the given unit in total for the building.
   */
  readonly quantity: number;
};

/**
 * A collection of unit categories making a mix.
 */
export type UnitCategoryMix = UnitCategoryWithQuantity[];

/**
 * All supported units of measurement needed for costing.
 */
export const enum UnitOfMeasurement {
  /**
   * Apply this rate a single time.
   *
   * @example `rate * 1`
   */
  Once = 'once',

  /**
   * Apply this rate for each value in a building data metric.
   *
   * Simply, this is a multiplication against the data value and the rate.
   *
   * @example `rate * number_of_single_doors`
   */
  Each = 'each',

  /**
   * Essentially {@link UnitOfMeasurement.Each} but denoting a value that is a linear metre metric.
   *
   * @example `rate * footprint_perimeter`
   */
  MetreLinear = 'metre_linear',

  /**
   * Essentially {@link UnitOfMeasurement.Each} but denoting a value that is a area metre metric.
   *
   * @example `rate * footprint_area`
   */
  MetreSquare = 'metre_square',

  /**
   * Essentially {@link UnitOfMeasurement.Each} but denoting a value that is a volumetric metre metric.
   *
   * @example `rate * footprint_area`
   */
  MetreCubic = 'metre_cubic',

  /**
   * Essentially {@link UnitOfMeasurement.Each} but denoting a value that is a kilogram.
   *
   * @example `rate * footprint_area`
   */
  Kilogramme = 'kilogramme',

  /**
   * Apply this rate by treating it as a percentage.
   *
   * @example `(rate / 100) * facade_area` (simplified)
   */
  Percentage = 'percentage',

  /**
   * Essentially {@link UnitOfMeasurement.Each} but denoting a value that is a metric "tonne".
   *
   * @example `rate * footprint_area`
   */
  Tonne = 'tonne',
}

/**
 * A selection of data points needed for costing the scenario aspect.
 *
 * Note, all members have descriptions in the {@link ScenarioDataMapping}.
 */
export const enum ScenarioData {
  /**
   * The gross horizontal area (as {@link SquareMeter}) for the scenario.
   *
   * This is the sum of all sites, which should be the sum of all zones.
   */
  ScenarioArea = 'scenario_area',

  /**
   * The net horizontal area (as {@link SquareMeter}) for the scenario.
   *
   * This is the sum of all sites, which should be the sum of all zones with the building footprints removed.
   */
  ScenarioAreaNet = 'scenario_area_net',

  /**
   * The perimeter (as {@link Meter}) for the scenario.
   *
   * This is the perimeter of all sites, which should be composed of the area of all zones.
   * This is not the perimeter of all zones, but the sites.
   */
  ScenarioPerimeter = 'scenario_perimeter',

  /**
   * The count of buildings.
   */
  NumberOfBuildings = 'number_of_buildings',
}

/**
 * All scenario data requirements for costing.
 *
 * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4?blocks=hide Metrics Definitions
 */
export type ScenarioDataMapping = {
  readonly [ScenarioData.ScenarioArea]: SquareMeter;
  readonly [ScenarioData.ScenarioAreaNet]: SquareMeter;
  readonly [ScenarioData.ScenarioPerimeter]: Meter;

  readonly [ScenarioData.NumberOfBuildings]: number;
};

/**
 * An empty {@link ScenarioDataMapping}.
 */
export const EMPTY_SCENARIO_DATA_MAPPING: ScenarioDataMapping = Object.freeze<ScenarioDataMapping>({
  [ScenarioData.ScenarioArea]: 0,
  [ScenarioData.ScenarioAreaNet]: 0,
  [ScenarioData.ScenarioPerimeter]: 0,

  [ScenarioData.NumberOfBuildings]: 0,
});

/**
 * A selection of data points needed for costing a building.
 *
 * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4?blocks=hide Metrics Definitions
 */
export const enum BuildingData {
  /**
   * The gross horizontal area (as {@link SquareMeter}) for all amentity locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/rec0iOEcQ7hQBqf5T/fld5vqTw1O8sXiagp
   */
  AmenityLocationsArea = 'amenity_locations_area',

  /**
   * The perimeter (as {@link Meter}) for all amentity locations.
   */
  AmenityLocationsPerimeter = 'amenity_locations_perimeter',

  /**
   * The gross vertical wall area (as {@link SquareMeter}) for all amentity locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/rec1vowI9QBDuyOeU/fld5vqTw1O8sXiagp
   */
  AmenityLocationsWallArea = 'amenity_locations_area_wall',

  /**
   * The total perimeter (as {@link Meter}) for a building.
   */
  BuildingPerimeter = 'building_perimeter',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for all commercial locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/reclnSsk0JX6znoFy/fld5vqTw1O8sXiagp
   */
  CommercialLocationsArea = 'commercial_locations_area',

  /**
   * The perimeter (as {@link Meter}) for all commercial locations.
   */
  CommercialLocationsPerimeter = 'commercial_locations_perimeter',

  /**
   * The gross vertical wall area (as {@link SquareMeter}) for commercial locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recw2RXDsGSQ4FZzo/fld5vqTw1O8sXiagp
   */
  CommercialLocationsWallArea = 'commercial_locations_area_wall',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for all cores and corridors on all levels.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recSmuoD4wmzYLKvT/fld5vqTw1O8sXiagp
   */
  CoreAndCorridorArea = 'core_and_corridor_area',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for all cores and corridors on the ground level.
   */
  CoreAndCorridorAreaGroundFloor = 'core_and_corridor_area_ground_floor',

  /**
   * The perimeter (as {@link SquareMeter}) for all cores and corridors on the ground level.
   */
  CoreAndCorridorPerimeterGroundFloor = 'core_and_corridor_perimeter_ground_floor',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for all cores and corridors on all levels minus the ground level.
   */
  CoreAndCorridorAreaGroundFloorAbove = 'core_and_corridor_area_ground_floor_above',

  /**
   * The perimeter (as {@link SquareMeter}) for all cores and corridors on all levels minus the ground level.
   */
  CoreAndCorridorPerimeterGroundFloorAbove = 'core_and_corridor_perimeter_ground_floor_above',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for cores (all levels).
   */
  CoreArea = 'core_area',

  /**
   * The perimeter (as {@link Meter}) for cores (all levels).
   */
  CorePerimeter = 'core_perimeter',

  /**
   * The gross vertical wall area (as {@link SquareMeter}) for cores (all levels).
   */
  CoreWallArea = 'core_area_wall',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for corridors.
   */
  CorridorArea = 'corridor_area',

  /**
   * The perimeter (as {@link Meter}) for corridors.
   */
  CorridorPerimeter = 'corridor_perimeter',

  /**
   * The gross vertical wall area (as {@link SquareMeter}) for corridors.
   */
  CorridorWallArea = 'corridor_area_wall',

  /**
   * The wall perimeter (as {@link Meter}) for the external walls of all levels.
   */
  ExternalWallPerimeter = 'external_wall_perimeter',

  /**
   * The gross facade area (as {@link SquareMeter}).
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/rec0TjDhW3o8DFU0S/fld5vqTw1O8sXiagp
   */
  FacadeArea = 'facade_area',

  /**
   * The total length of external corners (as {@link Meter}) for the facade.
   */
  FacadeExternalCornerTotalLengthQuantity = 'facade_external_corner_length',

  /**
   * The total length of internal corners (as {@link Meter}) for the facade.
   */
  FacadeInternalCornerTotalLengthQuantity = 'facade_internal_corner_length',

  /**
   * The building footprint area (as {@link SquareMeter}).
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recl6XROEOxE0mgeh/fld5vqTw1O8sXiagp
   */
  FootprintArea = 'footprint_area',

  /**
   * The gross internal area (as {@link SquareMeter}).
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recGX7Ltia0RgUhBM/fld5vqTw1O8sXiagp
   */
  Gia = 'gia',

  /**
   * The gross glazed facade area (as {@link SquareMeter}).
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recekoOLrLCsgRlvj/fld5vqTw1O8sXiagp
   */
  GlazedFacadeArea = 'facade_glazed_area',

  /**
   * The net internal area (as {@link SquareMeter}).
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recFBASzMXkrXYQ5Q/fld5vqTw1O8sXiagp
   */
  Nia = 'nia',

  /**
   * The gross glazed facade area (as {@link SquareMeter}) against residential locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recGCJj5gjplGQgDZ/fld5vqTw1O8sXiagp
   */
  ResidentialGlazedFacadeArea = 'residential_facade_glazed_area',

  /**
   * The gross facade area (as {@link SquareMeter}) against residential locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recadXXFYwtMeLkMn/fld5vqTw1O8sXiagp
   */
  ResidentialFacadeArea = 'residential_facade_area',

  /**
   * The net facade area (as {@link SquareMeter}) against residential locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recOA9bolP37yBtf4/fld5vqTw1O8sXiagp
   */
  ResidentialFacadeAreaNet = 'residential_facade_area_net',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for the roof.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recIIDQ07VU4hZlv7/fld5vqTw1O8sXiagp
   */
  RoofArea = 'roof_area',

  /**
   * The perimeter (as {@link Meter}) for the roof.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recqZRO9s1esJMM5M/fld5vqTw1O8sXiagp
   */
  RoofPerimeter = 'roof_perimeter',

  /**
   * The gross facade area (as {@link SquareMeter}) for the roof.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recCEvYpSlfQSOJoB/fld5vqTw1O8sXiagp
   */
  RoofFacadeArea = 'roof_facade_area',

  /**
   * The net facade area (as {@link SquareMeter}) for the roof.
   */
  RoofFacadeAreaNet = 'roof_facade_area_net',

  /**
   * The gross glazed facade area (as {@link SquareMeter}) for podiums.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recYtUV2S4LaoMyLo/fld5vqTw1O8sXiagp
   */
  PodiumGlazedFacadeArea = 'podium_facade_glazed_area',

  /**
   * The gross facade area (as {@link SquareMeter}) for podiums.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recOfmeROXALDpZ2B/fld5vqTw1O8sXiagp
   */
  PodiumFacadeArea = 'podium_facade_area',

  /**
   * The net facade area (as {@link SquareMeter}) for podiums (minus glazed).
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recwWft3JuCFumLl7/fld5vqTw1O8sXiagp
   */
  PodiumFacadeAreaNet = 'podium_facade_area_net',

  /**
   * The gross horizontal area (as {@link SquareMeter}) for service locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/rechQo1rjh2Yil3gS/fld5vqTw1O8sXiagp
   */
  ServiceLocationsArea = 'service_locations_area',

  /**
   * The perimeter (as {@link Meter}) for service locations.
   */
  ServiceLocationsPerimeter = 'service_locations_perimeter',

  /**
   * The gross vertical wall area (as {@link SquareMeter}) for service locations.
   *
   * @see https://airtable.com/appVvUYfIGX021xc1/tbl6RlyYUvs2HtgMp/viwXset5NGKDokgC4/recKEyj00LNcNnBm5/fld5vqTw1O8sXiagp
   */
  ServiceLocationsWallArea = 'service_locations_area_wall',

  /**
   * Weight of concrete in the substructure (kgs).
   */
  SubstructureConcreteWeight = 'substructure_concrete_weight',

  /**
   * Weight of rebar in the substructure (kgs).
   */
  SubstructureSteelRebarWeight = 'substructure_steel_rebar_weight',

  /**
   * The count of entrances.
   */
  NumberOfEntrances = 'number_of_entrances',

  /**
   * The count of units.
   */
  NumberOfUnits = 'number_of_units',

  /**
   * The count of modules.
   */
  NumberOfModules = 'number_of_modules',

  /**
   * The count of single doors in the modules.
   */
  NumberOfModuleSingleDoors = 'number_of_module_doors_single',

  /**
   * The count of double doors used in the modules.
   */
  NumberOfModuleDoubleDoors = 'number_of_module_doors_double',

  /**
   * The count of single doors used in the base build areas.
   */
  NumberOfSingleDoors = 'number_of_doors_single',

  /**
   * The count of double doors used in the base build areas.
   */
  NumberOfDoubleDoors = 'number_of_doors_double',

  /**
   * The count of miscellaneous doors used in the base build areas.
   */
  NumberOfMiscDoors = 'number_of_doors_misc',

  /**
   * The count of entry or exit doors.
   */
  NumberOfEntryExitDoors = 'number_of_doors_entry_exit',

  /**
   * The count of levels.
   */
  NumberOfLevels = 'number_of_levels',

  /**
   * The count of lift levels, this is lift stops per core with a lift.
   */
  NumberOfLiftLevels = 'number_of_lift_levels',

  /**
   * The count of flights of stairs.
   *
   * This is calculated as the number of cores with stairs against the number of levels of a building.
   * We used to double this number but now that is not the case, this should not be doubled anymore.
   */
  NumberOfFlightsOfStairs = 'number_of_flights_of_stairs',

  /**
   * The count of all core types.
   */
  NumberOfCores = 'number_of_cores',

  /**
   * The count of all cores that are fire fightining.
   */
  NumberOfCoreTypeFireFighting = 'number_of_cores_fire_fighting',

  /**
   * The count of all cores that are lifts.
   */
  NumberOfCoreTypeLift = 'number_of_cores_lift',
}

/**
 * All building data requirements for costing a building.
 *
 * Each key should be defined using {@link BuildingData} so we can manage the key naming.
 * Where values are not applicable use `0` to effictively disable this costing area.
 * More information can be found against the enum.
 */
export type BuildingDataMapping = {
  readonly [BuildingData.AmenityLocationsArea]: SquareMeter;
  readonly [BuildingData.AmenityLocationsPerimeter]: Meter;
  readonly [BuildingData.AmenityLocationsWallArea]: SquareMeter;
  // readonly [BuildingData.BuildingPerimeter]: Meter;
  readonly [BuildingData.CommercialLocationsArea]: SquareMeter;
  readonly [BuildingData.CommercialLocationsPerimeter]: SquareMeter;
  readonly [BuildingData.CommercialLocationsWallArea]: SquareMeter;
  readonly [BuildingData.CoreAndCorridorArea]: SquareMeter;
  readonly [BuildingData.CoreAndCorridorAreaGroundFloor]: SquareMeter;
  readonly [BuildingData.CoreAndCorridorPerimeterGroundFloor]: Meter;
  readonly [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: SquareMeter;
  readonly [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: SquareMeter;
  readonly [BuildingData.CoreArea]: SquareMeter;
  readonly [BuildingData.CorePerimeter]: Meter;
  readonly [BuildingData.CoreWallArea]: SquareMeter;
  readonly [BuildingData.CorridorArea]: SquareMeter;
  readonly [BuildingData.CorridorPerimeter]: Meter;
  readonly [BuildingData.CorridorWallArea]: SquareMeter;
  readonly [BuildingData.ExternalWallPerimeter]: Meter;
  readonly [BuildingData.FacadeArea]: SquareMeter;
  readonly [BuildingData.FacadeExternalCornerTotalLengthQuantity]: SquareMeter;
  readonly [BuildingData.FacadeInternalCornerTotalLengthQuantity]: SquareMeter;
  readonly [BuildingData.FootprintArea]: SquareMeter;
  readonly [BuildingData.Gia]: SquareMeter;
  readonly [BuildingData.GlazedFacadeArea]: SquareMeter;
  readonly [BuildingData.Nia]: SquareMeter;
  readonly [BuildingData.ResidentialGlazedFacadeArea]: SquareMeter;
  readonly [BuildingData.ResidentialFacadeArea]: SquareMeter;
  readonly [BuildingData.ResidentialFacadeAreaNet]: SquareMeter;
  readonly [BuildingData.RoofArea]: SquareMeter;
  readonly [BuildingData.RoofPerimeter]: Meter;
  readonly [BuildingData.RoofFacadeArea]: SquareMeter;
  readonly [BuildingData.RoofFacadeAreaNet]: SquareMeter;
  readonly [BuildingData.PodiumGlazedFacadeArea]: SquareMeter;
  readonly [BuildingData.PodiumFacadeArea]: SquareMeter;
  readonly [BuildingData.PodiumFacadeAreaNet]: SquareMeter;
  readonly [BuildingData.ServiceLocationsArea]: SquareMeter;
  readonly [BuildingData.ServiceLocationsPerimeter]: SquareMeter;
  readonly [BuildingData.ServiceLocationsWallArea]: SquareMeter;

  readonly [BuildingData.SubstructureConcreteWeight]: number;
  readonly [BuildingData.SubstructureSteelRebarWeight]: number;

  readonly [BuildingData.NumberOfEntrances]: number;
  readonly [BuildingData.NumberOfUnits]: number;
  readonly [BuildingData.NumberOfModules]: number;

  readonly [BuildingData.NumberOfModuleDoubleDoors]: number;
  readonly [BuildingData.NumberOfModuleSingleDoors]: number;
  readonly [BuildingData.NumberOfSingleDoors]: number;
  readonly [BuildingData.NumberOfDoubleDoors]: number;
  readonly [BuildingData.NumberOfMiscDoors]: number;
  readonly [BuildingData.NumberOfEntryExitDoors]: number;

  readonly [BuildingData.NumberOfLevels]: number;
  readonly [BuildingData.NumberOfLiftLevels]: number;
  readonly [BuildingData.NumberOfFlightsOfStairs]: number;

  readonly [BuildingData.NumberOfCores]: number;
  readonly [BuildingData.NumberOfCoreTypeFireFighting]: number;
  readonly [BuildingData.NumberOfCoreTypeLift]: number;
};

/**
 * An empty {@link BuildingDataMapping}.
 */
export const EMPTY_BUILDING_DATA_MAPPING: BuildingDataMapping = Object.freeze<BuildingDataMapping>({
  [BuildingData.AmenityLocationsArea]: 0,
  [BuildingData.AmenityLocationsPerimeter]: 0,
  [BuildingData.AmenityLocationsWallArea]: 0,
  // [BuildingData.BuildingPerimeter]: 0,
  [BuildingData.CommercialLocationsArea]: 0,
  [BuildingData.CommercialLocationsPerimeter]: 0,
  [BuildingData.CommercialLocationsWallArea]: 0,
  [BuildingData.CoreAndCorridorArea]: 0,
  [BuildingData.CoreAndCorridorAreaGroundFloor]: 0,
  [BuildingData.CoreAndCorridorPerimeterGroundFloor]: 0,
  [BuildingData.CoreAndCorridorAreaGroundFloorAbove]: 0,
  [BuildingData.CoreAndCorridorPerimeterGroundFloorAbove]: 0,
  [BuildingData.CoreArea]: 0,
  [BuildingData.CorePerimeter]: 0,
  [BuildingData.CoreWallArea]: 0,
  [BuildingData.CorridorArea]: 0,
  [BuildingData.CorridorPerimeter]: 0,
  [BuildingData.CorridorWallArea]: 0,
  [BuildingData.ExternalWallPerimeter]: 0,
  [BuildingData.FacadeArea]: 0,
  [BuildingData.FacadeExternalCornerTotalLengthQuantity]: 0,
  [BuildingData.FacadeInternalCornerTotalLengthQuantity]: 0,
  [BuildingData.FootprintArea]: 0,
  [BuildingData.Gia]: 0,
  [BuildingData.GlazedFacadeArea]: 0,
  [BuildingData.Nia]: 0,
  [BuildingData.ResidentialGlazedFacadeArea]: 0,
  [BuildingData.ResidentialFacadeArea]: 0,
  [BuildingData.ResidentialFacadeAreaNet]: 0,
  [BuildingData.RoofArea]: 0,
  [BuildingData.RoofPerimeter]: 0,
  [BuildingData.RoofFacadeArea]: 0,
  [BuildingData.RoofFacadeAreaNet]: 0,
  [BuildingData.PodiumGlazedFacadeArea]: 0,
  [BuildingData.PodiumFacadeArea]: 0,
  [BuildingData.PodiumFacadeAreaNet]: 0,
  [BuildingData.ServiceLocationsArea]: 0,
  [BuildingData.ServiceLocationsPerimeter]: 0,
  [BuildingData.ServiceLocationsWallArea]: 0,

  [BuildingData.SubstructureConcreteWeight]: 0,
  [BuildingData.SubstructureSteelRebarWeight]: 0,

  [BuildingData.NumberOfEntrances]: 0,
  [BuildingData.NumberOfUnits]: 0,
  [BuildingData.NumberOfModules]: 0,

  [BuildingData.NumberOfModuleDoubleDoors]: 0,
  [BuildingData.NumberOfModuleSingleDoors]: 0,
  [BuildingData.NumberOfSingleDoors]: 0,
  [BuildingData.NumberOfDoubleDoors]: 0,
  [BuildingData.NumberOfMiscDoors]: 0,
  [BuildingData.NumberOfEntryExitDoors]: 0,

  [BuildingData.NumberOfLevels]: 0,
  [BuildingData.NumberOfLiftLevels]: 0,
  [BuildingData.NumberOfFlightsOfStairs]: 0,

  [BuildingData.NumberOfCores]: 0,
  [BuildingData.NumberOfCoreTypeFireFighting]: 0,
  [BuildingData.NumberOfCoreTypeLift]: 0,
});

export const enum BuildingOption {
  FacadeFinishesFacingBrickwork = 'facade_finishes:facing_brickwork',
  FacadeFinishesBrickSlipAdhesive = 'facade_finishes:brick_slip_adhesive',
  FacadeFinishesBrickSlipMechanical = 'facade_finishes:brick_slip_mechanical',
  FacadeFinishesFibreCementCladding	= 'facade_finishes:fibre_cement_cladding',
  FacadeFinishesTimberPanelCladding	= 'facade_finishes:timber_panel_cladding',
  FacadeFinishesMetalPanelCladdingProfiled	= 'facade_finishes:metal_panel_cladding_profiled',
  FacadeFinishesMetalPanelCladdingFlat	= 'facade_finishes:metal_panel_cladding_flat',
  FinishLevelLow = 'finish_level:low',
  FinishLevelMedium = 'finish_level:medium',
  FinishLevelHigh = 'finish_level:high',
  BuildingHeightBelow8Storeys	= 'building_height:below_8_storeys',
  BuildingHeightMidRise8To12Storey	= 'building_height:mid_rise_8_to_12_storeys',
  BuildingHeightMidRise13StoreysPlus = 'building_height:mid_rise_13_storeys_plus',
}

/**
 * A set of requirements for costing a building.
 */
export type BuildingConfiguration = {
  readonly data: BuildingDataMapping;
  readonly units: UnitCategoryMix;
  readonly options: BuildingOption[];
};

/**
 * A set of requirements for costing the scenario.
 */
export type ScenarioConfiguration = {
  /**
   * Data points for the scenario.
   */
  readonly scenario: ScenarioDataMapping;

  /**
   * Data points for each building.
   * Values given here are returned in the same order.
   */
  readonly buildings: BuildingConfiguration[];
};
