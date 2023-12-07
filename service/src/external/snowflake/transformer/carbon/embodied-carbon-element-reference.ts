import { toPrecision } from '@project-rouge/service-core/data/number';
import { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from '@project-rouge/service-cost-client/src/data/cost-element-reference';
import type { ValueBreakdown, ValueGroup, ValueGroupItem } from '@project-rouge/service-cost-client/src/data/value-breakdown';
import { getValueGroupItemByIndex } from '@project-rouge/service-cost-client/src/data/value-breakdown';
import { withoutZeroValueGroups } from '../value-group';

export const sumValueGroupItems = (values: (ValueGroupItem<number> | undefined)[]): number => {
  return values.reduce<number>((p, x) => {
    return toPrecision(p + (x?.value ?? 0), 2);
  }, 0);
};

export const calculateSubstructureValueGroup = (breakdown: ValueBreakdown<number>): ValueGroup<number> => {
  const items: ValueGroupItem<number>[] = [];

  items.push({
    index: CostElementReferenceGroupItemIndex.Substructure,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.Substructure),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.Substructure),
    ]),
  });

  return {
    index: CostElementReferenceGroupIndex.Substructure,
    total: toPrecision(items.reduce<number>((p, x) => p + x.value, 0), 2),
    items: items.filter((x) => x.value !== 0),
  };
};

export const calculateStructureValueGroup = (breakdown: ValueBreakdown<number>): ValueGroup<number> => {
  const items: ValueGroupItem<number>[] = [];

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureFrame,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.PrefabricatedBuildingAndBuildingUnitsOffSitePanelManufactureAndAssembly),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.PrefabricatedBuildingAndBuildingUnitsOffSitePanelManufactureAndAssembly),
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureFrame),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureFrame),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureUpperFloors,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureUpperFloors),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureUpperFloors),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureRoof,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureRoof),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureRoof),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureStairsAndRamps,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureStairsAndRamps),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureStairsAndRamps),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureExternalWalls,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureExternalWalls),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureExternalWalls),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureWindowsAndExternalDoors,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureWindowsAndExternalDoors),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureWindowsAndExternalDoors),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureInternalWallsAndPartitions,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureInternalWallsAndPartitions),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureInternalWallsAndPartitions),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.SuperstructureInternalDoors,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.SuperstructureInternalDoors),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.SuperstructureInternalDoors),
    ]),
  });

  return {
    index: CostElementReferenceGroupIndex.Superstructure,
    total: toPrecision(items.reduce<number>((p, x) => p + x.value, 0), 2),
    items: items.filter((x) => x.value !== 0),
  };
};

export const calculateInternalFinishesValueGroup = (breakdown: ValueBreakdown<number>): ValueGroup<number> => {
  const items: ValueGroupItem<number>[] = [];

  items.push({
    index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.InternalFinishesFloorFinishes,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.InternalFinishesFloorFinishes),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.InternalFinishesFloorFinishes),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.InternalFinishesCeilingFinishes,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.InternalFinishesCeilingFinishes),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.InternalFinishesCeilingFinishes),
    ]),
  });

  return {
    index: CostElementReferenceGroupIndex.InternalFinishes,
    total: toPrecision(items.reduce<number>((p, x) => p + x.value, 0), 2),
    items: items.filter((x) => x.value !== 0),
  };
};

export const calculateFittingsAndFurnitureValueGroup = (breakdown: ValueBreakdown<number>): ValueGroup<number> => {
  const items: ValueGroupItem<number>[] = [];

  items.push({
    index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment),
    ]),
  });

  return {
    index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
    total: toPrecision(items.reduce<number>((p, x) => p + x.value, 0), 2),
    items: items.filter((x) => x.value !== 0),
  };
};

export const calculateServicesValueGroup = (breakdown: ValueBreakdown<number>): ValueGroup<number> => {
  const items: ValueGroupItem<number>[] = [];

  items.push({
    index: CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.ServicesDisposalInstallations),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.ServicesDisposalInstallations),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.ServicesWaterInstallations,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.ServicesWaterInstallations),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.ServicesWaterInstallations),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.ServicesVentilation,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.ServicesVentilation),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.ServicesVentilation),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.ServicesElectricalInstallations,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.ServicesElectricalInstallations),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.ServicesElectricalInstallations),
    ]),
  });

  items.push({
    index: CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations,
    value: sumValueGroupItems([
      getValueGroupItemByIndex(breakdown.modular.element, CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations),
      getValueGroupItemByIndex(breakdown.basebuild.element, CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations),
    ]),
  });

  return {
    index: CostElementReferenceGroupIndex.Services,
    total: toPrecision(items.reduce<number>((p, x) => p + x.value, 0), 2),
    items: items.filter((x) => x.value !== 0),
  };
};

export const createEmbodiedCarbonCostElementReference = (breakdown: ValueBreakdown<number>): ValueGroup<number>[] => {
  return withoutZeroValueGroups([
    calculateSubstructureValueGroup(breakdown),
    calculateStructureValueGroup(breakdown),
    calculateInternalFinishesValueGroup(breakdown),
    calculateFittingsAndFurnitureValueGroup(breakdown),
    calculateServicesValueGroup(breakdown),
  ]);
};
