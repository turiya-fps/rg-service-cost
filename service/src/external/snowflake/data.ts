import { never } from '@matt-usurp/grok';
import type { PercentageValue } from '@project-rouge/service-core/data/percentage';
import { BuildingData, BuildingOption, ScenarioData, UnitOfMeasurement } from '@project-rouge/service-cost-client/src/data/building';

export function isEnumMember<T extends Record<string, string>>(enums: T, str: string): str is T[keyof T] {
  return Object.values(enums).includes(str as T[keyof T]);
}

export const enum ConfigurationDefault {
  Preliminaries = 0.1,
  Contingencies = 0.03,
  OverheadsAndProfits = 0.055,
}

export type Configuration = {
  readonly preliminaries: PercentageValue;
  readonly contingencies: PercentageValue;
  readonly overheads_and_profits: PercentageValue;
};

export const enum FeedItemAssemblyOrGroup {
  Bathroom = 'Bathroom',
  Carpentry = 'Carpentry',
  CeilingCassette = 'Ceiling Cassette',
  CeilingFinish = 'Ceiling Finish',
  CeilingPanel = 'Ceiling Panel',
  CommsAndSecurity = '5.12 Comms and Security',
  DeploymentZipAndLink = 'Deployment Zip and Link',
  Disposal = '5.3 Disposal',
  Electrical = '5.8 Electrical',
  ExternalWallPanel = 'External Wall Panel',
  FloorCassette = 'Floor Cassette',
  FloorFinish = 'Floor Finish',
  FloorPanel = 'Floor Panel',
  GlazedFinishes = 'Glazed Finishes',
  Heating = '5.6 Heating',
  InternalDoors = 'Internal Doors',
  InternalWallPanel = 'Internal Wall Panel',
  InternalWalls = 'Internal Walls',
  Kitchen = 'Kitchen',
  KittingAndLogistics = 'Kitting and Logistics',
  Laydown = 'Laydown',
  MechanicalElectricalPlumbingDesign = 'MEP Design',
  MechanicalElectricalPlumbingManagement = 'MEP Management',
  MechanicalElectricalPlumbingTesting = 'MEP Testing',
  OffSiteAssembly = 'Off Site Assembly',
  PanelManufacture = 'Panel Manufacture',
  PlasterboardCeiling = 'Plasterboard Ceiling',
  SupplyAndAgencyFee = 'Supply & Agency Fee',
  Ventilation = '5.7 Ventilation',
  Water = '5.4 Water',
}

export const enum FeedItemAreaOrQuantityType {
  AmenityLocationsArea = 'Amenity Locations - Area',
  AmenityLocationsWallVerticalArea = 'Amenity Locations - Wall Vertical Area',
  AmenityLocationsPerimeterWallLength = 'Amenity Locations - Perimeter Wall Length',
  Apartments = 'Apartments',
  BuildingCount = 'Building Count',
  BuildingFootprint = 'Building Footprint',
  BuildingGia = 'Building GIA',
  BuildingNia = 'Building NIA',
  BuildingPerimeterTotalLength = 'Building Perimeter - Total Length',
  CommercialLocationsArea = 'Commercial Locations - Area',
  CommercialLocationsPerimeterWallLength = 'Commercial Locations - Perimeter Wall Length',
  CommercialLocationsWallVerticalArea = 'Commercial Locations - Wall Vertical Area',
  CoreAndCorridorTotalArea = 'Core and Corridor Total - Area',
  CoreAndCorridorAboveGroundFloorArea = 'Core and Corridor Above GF - Area',
  CoreAndCorridorAboveGroundFloorPerimeterLength = 'Core and Corridor Above GF - Perimeter Length',
  CoreAndCorridorGroundFloorArea = 'Core and Corridor GF - Area',
  CoreAndCorridorGroundFloorPerimeterLength = 'Core and Corridor GF - Perimeter Length',
  CoreLocationsArea = 'Core Locations - Area',
  CoreLocationsPerimeterWallLength = 'Core Locations - Perimeter Wall Length',
  CoreLocationsWallVerticalArea = 'Core Locations - Wall Vertical Area',
  CoreTypesFireFightingLifeCoreCount = 'Core Types - Firefighting Lift Core Count',
  CoreTypesLifeCoreCount = 'Core Types - Lift Core Count',
  CoreTypesTotalCoreCount = 'Core Types - Total Core Count',
  CorridorLocationsArea = 'Corridor Locations - Area',
  CorridorLocationsPerimeterWallLength = 'Corridor Locations - Perimeter Wall Length',
  CorridorLocationsWallVerticalArea = 'Corridor Locations - Wall Vertical Area',
  Crossovers = 'Crossovers',
  DoubleDoors = 'Double Doors',
  Entrances = 'Entrances',
  EntryExitDoorsCount = 'Entry/Exit Doors - Count',
  Facade = 'Facade',
  FacadeExternalCornerTotalLengthQuantity = 'Facade - External Corner Total Length',
  FacadeInternalCornerTotalLengthQuantity = 'Facade - Internal Corner Total Length',
  Houses = 'Houses',
  FlightsOfStairs = 'Flights of Stairs',
  GlazedArea = 'Glazed Area',
  GlazedFacade = 'Glazed Facade',
  InternalWallArea = 'Internal Wall Area',
  LiftLevels = 'Lift Levels',
  MiscDoors = 'Misc Doors',
  None = 'None',
  ModulesQuantity = 'Modules',
  ModuleDoubleDoorsQuantity = 'Module Double Doors',
  ModuleSingleDoorsQuantity = 'Module Single Doors',
  Percent = 'Percent',
  PodiumGlazedFacadeArea = 'Podium Glazed Facade Area',
  PodiumGrossFacadeArea = 'Podium Gross Facade Area',
  PodiumNetFacadeArea = 'Podium Net Facade Area',
  ResidentialGlazedFacadeArea = 'Residential Glazed Facade Area',
  ResidentialGrossFacadeArea = 'Residential Gross Facade Area',
  ResidentialNetFacadeArea = 'Residential Net Facade Area',
  Roof = 'Roof',
  RoofGrossFacadeArea = 'Roof Gross Facade Area',
  RoofNetFacadeArea = 'Roof Net Facade Area',
  RoofPerimeter = 'Roof Perimeter',
  ServiceLocationsArea = 'Service Locations - Area',
  ServiceLocationsPerimeterWallLength = 'Service Locations - Perimeter Wall Length',
  ServiceLocationsWallVerticalArea = 'Service Locations - Wall Vertical Area',
  SingleDoors = 'Single Doors',
  SiteAreaNet = 'Site Area - Net',
  SiteAreaTotal = 'Site Area - Total',
  SitePerimeter = 'Site Perimeter',
  SubstructureConcreteWeight = 'Substructure Concrete Weight',
  SubstructureSteelRebarWeight = 'Substructure Steel Rebar Weight',
  TotalWallArea = 'Total Wall Area',
  TotalWallPerimeter = 'Total Wall Perimeter',
  WallPainting = 'Wall Painting',
}

export enum OptionGroup {
  FacadeFinishes = 'Facade Finishes',
  FinishLevel = 'Finish Level',
  BuildingHeight = 'Building Height',
}

export enum OptionValue {
  // OptionGroup.FacadeFinishes
  FibreCementCladding = 'Fibre Cement Cladding',
  TimberPanelCladding = 'Timber Panel Cladding',
  MetalPanelCladdingProfiled = 'Metal Panel Cladding (Profiled)',
  MetalPanelCladdingFlat = 'Metal Panel Cladding (Flat)',
  BrickSlipMechanical = 'Brick Slip (Mechanical)',
  BrickSlipAdhesive = 'Brick Slip (Adhesive)',
  FacingBrickwork = 'Facing Brickwork',

  // OptionGroup.FinishLevel
  Medium = 'Medium',
  High = 'High',
  Low = 'Low',

  // OptionGroup.BuildingHeight
  MidRise13StoreysPlus = 'Mid Rise 13 Storeys+',
  MidRise8To12Storey = 'Mid Rise 8-12 Storey',
  Below8Storeys = 'Below 8 Storeys',
}

export type OptionGroupAndValue = `${OptionGroup} : ${OptionValue}`;

export const isOptionGroup = (value: string): value is OptionGroup => {
  return isEnumMember(OptionGroup, value);
};

export const isOptionValue = (value: string): value is OptionValue => {
  return isEnumMember(OptionValue, value);
};

export const isOptionGroupAndValue = (value: string): value is OptionGroupAndValue => {
  const [group, option] = value.split(' : ');
  return isOptionGroup(group) && isOptionValue(option);
};

export enum FeedItemEmbodiedCarbonCategory {
  Others = 'Others',
  Insulation = 'Insulation',
  Board = 'Board',
  MEPServices = 'MEP Services',
  Metals = 'Metals',
  Cementitious = 'Cementitious',
}

export enum FeedItemEmbodiedCarbonSubCategory {
  // FeedItemEmbodiedCaarbonCategory.Others
  Membrane = 'Membrane',
  Paint = 'Paint',
  WoodenDoors = 'Wooden Doors',
  CeramicTiles = 'Ceramic Tiles',
  Carpet = 'Carpet',
  PineLaminate = 'Pine Laminate',
  Glass = 'Glass',

  // FeedItemEmbodiedCaarbonCategory.Insulation
  Earthwool = 'Earthwool',
  MineralWool = 'Mineral Wool',
  Rockwool = 'Rockwool',

  // FeedItemEmbodiedCarbonCategory.Board
  MDF = 'MDF',
  Cemrock = 'Cemrock',
  Plasterboard = 'Plasterboard',
  Firepanel = 'Firepanel',
  GIFABoard = 'GIFA board',
  Windliner = 'Windliner',

  // FeedItemEmbodiedCarbonCategory.MEPServices
  Sanitaryware = 'Sanitaryware',
  DisposalInstallations = 'Disposal Installations',
  PEX = 'PEX',
  CopperPipe = 'Copper pipe',
  HIU = 'HIU',
  MVHR = 'MVHR',
  VentilationDucting = 'Ventilation Ducting',
  ElectricCabling = 'Electric Cabling',
  BrassManifold = 'Brass manifold',

  // FeedItemEmbodiedCarbonCategory.Metals
  LightGaugeSteel = 'Light Gauge Steel',
  HotRolledSteel = 'Hot Rolled Steel',
  LewisDeck = 'Lewis Deck',
  AluminiumFrame = 'Aluminium Frame',
  Mesh = 'Mesh',

  // FeedItemEmbodiedCarbonCategory.Cementitious
  Screed = 'Screed',
}

export const isEmbodiedCarbonCategory = (value: string): value is FeedItemEmbodiedCarbonCategory => {
  return isEnumMember(FeedItemEmbodiedCarbonCategory, value);
};

export const isEmbodiedCarbonSubCategory = (value: string): value is FeedItemEmbodiedCarbonSubCategory => {
  return isEnumMember(FeedItemEmbodiedCarbonSubCategory, value);
};

export const convertFeedItemOptionGroupAndValueToBuildingOption = (value: OptionGroupAndValue): BuildingOption => {
  switch (value) {
    case `${OptionGroup.FacadeFinishes} : ${OptionValue.FacingBrickwork}`: return BuildingOption.FacadeFinishesFacingBrickwork;
    case `${OptionGroup.FacadeFinishes} : ${OptionValue.BrickSlipAdhesive}`: return BuildingOption.FacadeFinishesBrickSlipAdhesive;
    case `${OptionGroup.FacadeFinishes} : ${OptionValue.BrickSlipMechanical}`: return BuildingOption.FacadeFinishesBrickSlipMechanical;
    case `${OptionGroup.FacadeFinishes} : ${OptionValue.MetalPanelCladdingFlat}`: return BuildingOption.FacadeFinishesMetalPanelCladdingFlat;
    case `${OptionGroup.FacadeFinishes} : ${OptionValue.MetalPanelCladdingProfiled}`: return BuildingOption.FacadeFinishesMetalPanelCladdingProfiled;
    case `${OptionGroup.FacadeFinishes} : ${OptionValue.TimberPanelCladding}`: return BuildingOption.FacadeFinishesTimberPanelCladding;
    case `${OptionGroup.FacadeFinishes} : ${OptionValue.FibreCementCladding}`: return BuildingOption.FacadeFinishesFibreCementCladding;
    case `${OptionGroup.FinishLevel} : ${OptionValue.Low}`: return BuildingOption.FinishLevelLow;
    case `${OptionGroup.FinishLevel} : ${OptionValue.Medium}`: return BuildingOption.FinishLevelMedium;
    case `${OptionGroup.FinishLevel} : ${OptionValue.High}`: return BuildingOption.FinishLevelHigh;
    case `${OptionGroup.BuildingHeight} : ${OptionValue.Below8Storeys}`: return BuildingOption.BuildingHeightBelow8Storeys;
    case `${OptionGroup.BuildingHeight} : ${OptionValue.MidRise8To12Storey}`: return BuildingOption.BuildingHeightMidRise8To12Storey;
    case `${OptionGroup.BuildingHeight} : ${OptionValue.MidRise13StoreysPlus}`: return BuildingOption.BuildingHeightMidRise13StoreysPlus;
    default: throw new Error(`Unknown option group and value: ${value}`);
  }
};

export const convertFeedItemAreaOrQuantityTypeToBuildingData = (value: FeedItemAreaOrQuantityType): ScenarioData | BuildingData | null | undefined => {
  switch (value) {
    case FeedItemAreaOrQuantityType.AmenityLocationsArea: return BuildingData.AmenityLocationsArea;
    case FeedItemAreaOrQuantityType.AmenityLocationsPerimeterWallLength: return BuildingData.AmenityLocationsPerimeter;
    case FeedItemAreaOrQuantityType.AmenityLocationsWallVerticalArea: return BuildingData.AmenityLocationsWallArea;
    case FeedItemAreaOrQuantityType.BuildingCount: return ScenarioData.NumberOfBuildings;
    case FeedItemAreaOrQuantityType.Apartments: return BuildingData.NumberOfUnits;
    case FeedItemAreaOrQuantityType.BuildingFootprint: return BuildingData.FootprintArea;
    case FeedItemAreaOrQuantityType.BuildingGia: return BuildingData.Gia;
    case FeedItemAreaOrQuantityType.BuildingNia: return BuildingData.Nia;
    case FeedItemAreaOrQuantityType.BuildingPerimeterTotalLength: return BuildingData.BuildingPerimeter;
    case FeedItemAreaOrQuantityType.CommercialLocationsArea: return BuildingData.CommercialLocationsArea;
    case FeedItemAreaOrQuantityType.CommercialLocationsPerimeterWallLength: return BuildingData.CommercialLocationsPerimeter;
    case FeedItemAreaOrQuantityType.CommercialLocationsWallVerticalArea: return BuildingData.CommercialLocationsWallArea;
    case FeedItemAreaOrQuantityType.CoreAndCorridorTotalArea: return BuildingData.CoreAndCorridorArea;
    case FeedItemAreaOrQuantityType.CoreAndCorridorGroundFloorArea: return BuildingData.CoreAndCorridorAreaGroundFloor;
    case FeedItemAreaOrQuantityType.CoreAndCorridorGroundFloorPerimeterLength: return BuildingData.CoreAndCorridorPerimeterGroundFloor;
    case FeedItemAreaOrQuantityType.CoreAndCorridorAboveGroundFloorArea: return BuildingData.CoreAndCorridorAreaGroundFloorAbove;
    case FeedItemAreaOrQuantityType.CoreAndCorridorAboveGroundFloorPerimeterLength: return BuildingData.CoreAndCorridorPerimeterGroundFloorAbove;
    case FeedItemAreaOrQuantityType.CoreLocationsArea: return BuildingData.CoreArea;
    case FeedItemAreaOrQuantityType.CoreLocationsPerimeterWallLength: return BuildingData.CorePerimeter;
    case FeedItemAreaOrQuantityType.CoreLocationsWallVerticalArea: return BuildingData.CoreWallArea;
    case FeedItemAreaOrQuantityType.CoreTypesFireFightingLifeCoreCount: return BuildingData.NumberOfCoreTypeFireFighting;
    case FeedItemAreaOrQuantityType.CoreTypesLifeCoreCount: return BuildingData.NumberOfCoreTypeLift;
    case FeedItemAreaOrQuantityType.CoreTypesTotalCoreCount: return BuildingData.NumberOfCores;
    case FeedItemAreaOrQuantityType.CorridorLocationsArea: return BuildingData.CorridorArea;
    case FeedItemAreaOrQuantityType.CorridorLocationsPerimeterWallLength: return BuildingData.CorridorPerimeter;
    case FeedItemAreaOrQuantityType.CorridorLocationsWallVerticalArea: return BuildingData.CorridorWallArea;
    case FeedItemAreaOrQuantityType.DoubleDoors: return BuildingData.NumberOfDoubleDoors;
    case FeedItemAreaOrQuantityType.Entrances: return BuildingData.NumberOfEntrances;
    case FeedItemAreaOrQuantityType.EntryExitDoorsCount: return BuildingData.NumberOfEntryExitDoors;
    case FeedItemAreaOrQuantityType.Facade: return BuildingData.FacadeArea;
    case FeedItemAreaOrQuantityType.FacadeExternalCornerTotalLengthQuantity: return BuildingData.FacadeExternalCornerTotalLengthQuantity;
    case FeedItemAreaOrQuantityType.FacadeInternalCornerTotalLengthQuantity: return BuildingData.FacadeInternalCornerTotalLengthQuantity;
    case FeedItemAreaOrQuantityType.FlightsOfStairs: return BuildingData.NumberOfFlightsOfStairs;
    case FeedItemAreaOrQuantityType.GlazedArea: return BuildingData.GlazedFacadeArea;
    case FeedItemAreaOrQuantityType.GlazedFacade: return BuildingData.GlazedFacadeArea;
    case FeedItemAreaOrQuantityType.MiscDoors: return BuildingData.NumberOfMiscDoors;
    case FeedItemAreaOrQuantityType.ModulesQuantity: return BuildingData.NumberOfModules;
    case FeedItemAreaOrQuantityType.ModuleDoubleDoorsQuantity: return BuildingData.NumberOfModuleDoubleDoors;
    case FeedItemAreaOrQuantityType.ModuleSingleDoorsQuantity: return BuildingData.NumberOfModuleSingleDoors;
    case FeedItemAreaOrQuantityType.LiftLevels: return BuildingData.NumberOfLiftLevels;
    case FeedItemAreaOrQuantityType.PodiumGlazedFacadeArea: return BuildingData.PodiumGlazedFacadeArea;
    case FeedItemAreaOrQuantityType.PodiumGrossFacadeArea: return BuildingData.PodiumFacadeArea;
    case FeedItemAreaOrQuantityType.PodiumNetFacadeArea: return BuildingData.PodiumFacadeAreaNet;
    case FeedItemAreaOrQuantityType.ResidentialGlazedFacadeArea: return BuildingData.ResidentialGlazedFacadeArea;
    case FeedItemAreaOrQuantityType.ResidentialGrossFacadeArea: return BuildingData.ResidentialFacadeArea;
    case FeedItemAreaOrQuantityType.ResidentialNetFacadeArea: return BuildingData.ResidentialFacadeAreaNet;
    case FeedItemAreaOrQuantityType.Roof: return BuildingData.RoofArea;
    case FeedItemAreaOrQuantityType.RoofGrossFacadeArea: return BuildingData.RoofFacadeArea;
    case FeedItemAreaOrQuantityType.RoofNetFacadeArea: return BuildingData.RoofFacadeAreaNet;
    case FeedItemAreaOrQuantityType.RoofPerimeter: return BuildingData.RoofPerimeter;
    case FeedItemAreaOrQuantityType.SingleDoors: return BuildingData.NumberOfSingleDoors;
    case FeedItemAreaOrQuantityType.SiteAreaNet: return ScenarioData.ScenarioAreaNet;
    case FeedItemAreaOrQuantityType.SiteAreaTotal: return ScenarioData.ScenarioArea;
    case FeedItemAreaOrQuantityType.SitePerimeter: return ScenarioData.ScenarioPerimeter;
    case FeedItemAreaOrQuantityType.ServiceLocationsArea: return BuildingData.ServiceLocationsArea;
    case FeedItemAreaOrQuantityType.ServiceLocationsPerimeterWallLength: return BuildingData.ServiceLocationsPerimeter;
    case FeedItemAreaOrQuantityType.ServiceLocationsWallVerticalArea: return BuildingData.ServiceLocationsWallArea;
    case FeedItemAreaOrQuantityType.SubstructureConcreteWeight: return BuildingData.SubstructureConcreteWeight;
    case FeedItemAreaOrQuantityType.SubstructureSteelRebarWeight: return BuildingData.SubstructureSteelRebarWeight;
    case FeedItemAreaOrQuantityType.TotalWallPerimeter: return BuildingData.ExternalWallPerimeter;

    // Special case where this should actually be a unit of measurement.
    // If this is the case we can use null here, the check mentioned should come before this convertion.
    case FeedItemAreaOrQuantityType.Percent: return null;

    case FeedItemAreaOrQuantityType.None: return null;

    // Deprecated
    case FeedItemAreaOrQuantityType.Houses: return undefined;
    case FeedItemAreaOrQuantityType.Crossovers: return undefined;
    case FeedItemAreaOrQuantityType.InternalWallArea: return undefined;
    case FeedItemAreaOrQuantityType.TotalWallArea: return undefined;
    case FeedItemAreaOrQuantityType.WallPainting: return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw never(value);
};

export const enum FeedItemCostPlanSection {
  CeilingFinish = '07. Ceiling Finish',
  FixturesAndFittings = '09. Fixtures and Fittings',
  FloorFinish = '04. Floor Finish',
  InternalWalls = '05. Internal Walls',
  InternalDoors = '06. Internal Doors',
  MechanicalElectricalPlumbingAndHeating = '11. MEPH',
  OffSite = '01. Off Site',
  OnSite = '02. On Site',
  Sanitaryware = '10. Sanitaryware',
}

export const enum FeedItemUnitOfMeasurement {
  LinearMetre = 'Linear Metre',
  CubicMetre = 'Cubic Metre',
  SquareMetre = 'Square Metre',

  /** Once */
  Item = 'Item',

  /** Each */
  Number = 'Number',

  Percent = 'Percent',
  Tonnes = 'Tonnes',
  Kilogrammes = 'Kilogrammes',
}

export const convertFeedItemUnitOfMeasurementToUnitOfMeasurement = (value: FeedItemUnitOfMeasurement): UnitOfMeasurement | undefined => {
  switch (value) {
    case FeedItemUnitOfMeasurement.Item: return UnitOfMeasurement.Once;
    case FeedItemUnitOfMeasurement.Number: return UnitOfMeasurement.Each;

    case FeedItemUnitOfMeasurement.LinearMetre: return UnitOfMeasurement.MetreLinear;
    case FeedItemUnitOfMeasurement.SquareMetre: return UnitOfMeasurement.MetreSquare;
    case FeedItemUnitOfMeasurement.CubicMetre: return UnitOfMeasurement.MetreCubic;

    case FeedItemUnitOfMeasurement.Percent: return UnitOfMeasurement.Percentage;
    case FeedItemUnitOfMeasurement.Tonnes: return UnitOfMeasurement.Tonne;
    case FeedItemUnitOfMeasurement.Kilogrammes: return UnitOfMeasurement.Kilogramme;
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw never(value);
};

/**
 * Height breakpoints for costing taller buildings.
 */
export enum BuildingHeightBreakpoint {
  /**
   * @example `0-7`
   */
  SevenAndBelow = 'seven_and_below',

  /**
   * @example `8-12`
   */
  BetweenEightAndTwelve = 'between_eight_and_twelve',

  /**
   * @example `13+`
   */
  ThirteenAndAbove = 'thirteen_and_above',
}

export type TallBuildingDataLikeness = {
  default_element: boolean;
  default_element_13_storeys_plus: boolean;
  default_element_8_12_storeys: boolean;
};

export const convertToBuildingHeightBreakpoints = (data: TallBuildingDataLikeness): BuildingHeightBreakpoint[] => {
  const breakpoints: BuildingHeightBreakpoint[] = [];

  if (data.default_element === true) {
    breakpoints.push(BuildingHeightBreakpoint.SevenAndBelow);
  }

  if (data.default_element_8_12_storeys === true) {
    breakpoints.push(BuildingHeightBreakpoint.BetweenEightAndTwelve);
  }

  if (data.default_element_13_storeys_plus === true) {
    breakpoints.push(BuildingHeightBreakpoint.ThirteenAndAbove);
  }

  return breakpoints;
};

export const convertLevelToBuildingHeightBreakpointTarget = (levels: number): BuildingHeightBreakpoint => {
  if (levels <= 7) {
    return BuildingHeightBreakpoint.SevenAndBelow;
  }

  if (levels <= 12) {
    return BuildingHeightBreakpoint.BetweenEightAndTwelve;
  }

  return BuildingHeightBreakpoint.ThirteenAndAbove;
};

export const isTallBuilding = (levels: number): boolean => {
  const target = convertLevelToBuildingHeightBreakpointTarget(levels);

  switch (target) {
    case BuildingHeightBreakpoint.BetweenEightAndTwelve: return true;
    case BuildingHeightBreakpoint.ThirteenAndAbove: return true;
    default: return false;
  }
};
