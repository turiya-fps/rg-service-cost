/**
 * Major cost element reference line item group indexes.
 *
 * These are only groups that are mentioned in the costing element reference, there are some gaps and this is okay.
 *
 * See {@link CostElementReferenceGroupItemIndex} for child items.
 */
export const enum CostElementReferenceGroupIndex {
  FacilitatingWorks = '0',
  Substructure = '1',
  Superstructure = '2',
  InternalFinishes = '3',
  FittingsFurnitureAndEquipment = '4',
  Services = '5',
  PrefabricatedBuildingAndBuildingUnits = '6',
  // WorksToExistingBuilding = '7',
  ExternalWorks = '8',
}

/**
 * A collection of all supported {@link CostElementReferenceGroupIndex}.
 */
export const COST_ELEMENT_REFERENCE_GROUP_INDEXES: CostElementReferenceGroupIndex[] = [
  CostElementReferenceGroupIndex.FacilitatingWorks,
  CostElementReferenceGroupIndex.Substructure,
  CostElementReferenceGroupIndex.Superstructure,
  CostElementReferenceGroupIndex.InternalFinishes,
  CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
  CostElementReferenceGroupIndex.Services,
  CostElementReferenceGroupIndex.PrefabricatedBuildingAndBuildingUnits,
  CostElementReferenceGroupIndex.ExternalWorks,
];

/**
 * Minor cost element reference group item indexes for items within an element reference group.
 *
 * These are only items that are mentioned in the costing element reference, there are some gaps and that is okay.
 *
 * These are named after their parent {@link CostElementReferenceGroupIndex} entry.
 * Those with the same name as their parent are just named their parent, there is no duplication.
 */
export const enum CostElementReferenceGroupItemIndex {
  // 0.x
  FacilitatingWorksSiteClearance = '0.2',

  // 1.x
  Substructure = '1.1',

  // 2.x
  SuperstructureFrame = '2.1',
  SuperstructureUpperFloors = '2.2',
  SuperstructureRoof = '2.3',
  SuperstructureStairsAndRamps = '2.4',
  SuperstructureExternalWalls = '2.5',
  SuperstructureWindowsAndExternalDoors = '2.6',
  SuperstructureInternalWallsAndPartitions = '2.7',
  SuperstructureInternalDoors = '2.8',

  // 3.x
  InternalFinishesWallFinishes = '3.1',
  InternalFinishesFloorFinishes = '3.2',
  InternalFinishesCeilingFinishes = '3.3',

  // 4.x
  FittingsFurnitureAndEquipment = '4.1',

  // 5.x
  ServicesSanitaryAppliances = '5.1',
  ServicesServicesEquipment = '5.2',
  ServicesDisposalInstallations = '5.3',
  ServicesWaterInstallations = '5.4',
  ServicesHeatSource = '5.5',
  ServicesSpaceHeatingAndAirConditioning = '5.6',
  ServicesVentilation = '5.7',
  ServicesElectricalInstallations = '5.8',
  ServicesFuelInstallations = '5.9',
  ServicesLiftsAndConveyorInstallations = '5.10',
  ServicesFireAndLightningProtection = '5.11',
  ServicesCommunicationSecurityAndControlSystems = '5.12',
  ServicesSpecialistInstallations = '5.13',
  ServicesBuildersWorkInConnectionWithServices = '5.14',

  // 6.x
  PrefabricatedBuildingAndBuildingUnits = '6.1',
  PrefabricatedBuildingAndBuildingUnitsOffSitePanelManufactureAndAssembly = '6.2',
  PrefabricatedBuildingAndBuildingUnitsOnSiteDeploymentOfModules = '6.3',

  // 8.x
  ExternalWorksSiteWorks = '8.1',
  ExternalWorksRoadsPathsAndPavings = '8.2',
  ExternalWorksSoftLandscapesPlatingAndIrrigation = '8.3',
  ExternalWorksFencingRailsAndWalls = '8.4',
  ExternalWorksExternalFixtures = '8.5',
  ExternalWorksDrainage = '8.6',
  ExternalWorksExternalServices = '8.7',
}

/**
 * A collection of all supported {@link CostElementReferenceGroupItemIndex}.
 */
export const COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES: CostElementReferenceGroupItemIndex[] = [
  // 0.x
  CostElementReferenceGroupItemIndex.FacilitatingWorksSiteClearance,

  // 1.x
  CostElementReferenceGroupItemIndex.Substructure,

  // 2.x
  CostElementReferenceGroupItemIndex.SuperstructureFrame,
  CostElementReferenceGroupItemIndex.SuperstructureUpperFloors,
  CostElementReferenceGroupItemIndex.SuperstructureRoof,
  CostElementReferenceGroupItemIndex.SuperstructureStairsAndRamps,
  CostElementReferenceGroupItemIndex.SuperstructureExternalWalls,
  CostElementReferenceGroupItemIndex.SuperstructureWindowsAndExternalDoors,
  CostElementReferenceGroupItemIndex.SuperstructureInternalWallsAndPartitions,
  CostElementReferenceGroupItemIndex.SuperstructureInternalDoors,

  // 3.x
  CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes,
  CostElementReferenceGroupItemIndex.InternalFinishesFloorFinishes,
  CostElementReferenceGroupItemIndex.InternalFinishesCeilingFinishes,

  // 4.x
  CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment,

  // 5.x
  CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances,
  CostElementReferenceGroupItemIndex.ServicesServicesEquipment,
  CostElementReferenceGroupItemIndex.ServicesDisposalInstallations,
  CostElementReferenceGroupItemIndex.ServicesWaterInstallations,
  CostElementReferenceGroupItemIndex.ServicesHeatSource,
  CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning,
  CostElementReferenceGroupItemIndex.ServicesVentilation,
  CostElementReferenceGroupItemIndex.ServicesElectricalInstallations,
  CostElementReferenceGroupItemIndex.ServicesFuelInstallations,
  CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations,
  CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection,
  CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems,
  CostElementReferenceGroupItemIndex.ServicesSpecialistInstallations,
  CostElementReferenceGroupItemIndex.ServicesBuildersWorkInConnectionWithServices,

  // 6.x
  CostElementReferenceGroupItemIndex.PrefabricatedBuildingAndBuildingUnits,
  CostElementReferenceGroupItemIndex.PrefabricatedBuildingAndBuildingUnitsOffSitePanelManufactureAndAssembly,
  CostElementReferenceGroupItemIndex.PrefabricatedBuildingAndBuildingUnitsOnSiteDeploymentOfModules,

  // 8.x
  CostElementReferenceGroupItemIndex.ExternalWorksSiteWorks,
  CostElementReferenceGroupItemIndex.ExternalWorksRoadsPathsAndPavings,
  CostElementReferenceGroupItemIndex.ExternalWorksSoftLandscapesPlatingAndIrrigation,
  CostElementReferenceGroupItemIndex.ExternalWorksFencingRailsAndWalls,
  CostElementReferenceGroupItemIndex.ExternalWorksExternalFixtures,
  CostElementReferenceGroupItemIndex.ExternalWorksDrainage,
  CostElementReferenceGroupItemIndex.ExternalWorksExternalServices,
];
